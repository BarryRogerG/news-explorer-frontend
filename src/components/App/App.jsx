import { useState, useEffect } from 'react'

import { Routes, Route } from 'react-router-dom'

import Header from '../Header/Header'
import Main from '../Main/Main'
import SavedNews from '../SavedNews/SavedNews'
import Footer from '../Footer/Footer'
import LoginModal from '../LoginModal/LoginModal'
import RegisterModal from '../RegisterModal/RegisterModal'
import {
  mockLogin,
  mockRegister,
  mockCheckToken,
  mockGetSavedArticles,
  mockSaveArticle,
  mockDeleteArticle,
} from '../../utils/mockApi'
import './App.css'

function App() {
  const [modalType, setModalType] = useState(null) // 'login' | 'register' | null
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [savedArticles, setSavedArticles] = useState([])

  const openLoginModal = () => setModalType('login')
  const openRegisterModal = () => setModalType('register')
  const closeModals = () => setModalType(null)

  const loadSavedArticles = async () => {
    try {
      const saved = await mockGetSavedArticles()
      setSavedArticles(saved)
    } catch (error) {
      console.error('Failed to load saved articles:', error)
    }
  }

  useEffect(() => {
    const checkAuth = async () => {
      const authData = await mockCheckToken()
      if (authData) {
        setIsLoggedIn(true)
        setCurrentUser(authData.user)
        await loadSavedArticles()
      }
    }
    checkAuth()
  }, [])

  const handleLogin = async (credentials) => {
    try {
      const { user } = await mockLogin(credentials)
      setIsLoggedIn(true)
      setCurrentUser(user)
      await loadSavedArticles()
      closeModals()
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  const handleRegister = async (userData) => {
    try {
      const { user } = await mockRegister(userData)
      setIsLoggedIn(true)
      setCurrentUser(user)
      setSavedArticles([])
      closeModals()
    } catch (error) {
      console.error('Registration failed:', error)
    }
  }

  const handleSignOut = () => {
    localStorage.removeItem('jwt')
    localStorage.removeItem('user')
    setIsLoggedIn(false)
    setCurrentUser(null)
    setSavedArticles([])
  }

  const handleSaveArticle = async (article) => {
    if (!isLoggedIn) return

    try {
      const updatedSavedArticles = await mockSaveArticle(article)
      setSavedArticles(updatedSavedArticles)
    } catch (error) {
      console.error('Save article failed:', error)
    }
  }

  const handleDeleteArticle = async (article) => {
    if (!isLoggedIn) return

    try {
      const updatedSavedArticles = await mockDeleteArticle(article)
      setSavedArticles(updatedSavedArticles)
    } catch (error) {
      console.error('Delete article failed:', error)
    }
  }

  return (
    <div className="app">
      <Header
        onSignInClick={openLoginModal}
        onSignOut={handleSignOut}
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Main
              isLoggedIn={isLoggedIn}
              savedArticles={savedArticles}
              onSaveArticle={handleSaveArticle}
              onDeleteArticle={handleDeleteArticle}
            />
          }
        />
        <Route
          path="/saved-news"
          element={
            <SavedNews
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
              savedArticles={savedArticles}
              onDeleteArticle={handleDeleteArticle}
            />
          }
        />
      </Routes>
      <Footer />
      <LoginModal
        isOpen={modalType === 'login'}
        onClose={closeModals}
        onLogin={handleLogin}
        onSwitchToRegister={openRegisterModal}
      />
      <RegisterModal
        isOpen={modalType === 'register'}
        onClose={closeModals}
        onRegister={handleRegister}
        onSwitchToLogin={openLoginModal}
      />
    </div>
  )
}

export default App
