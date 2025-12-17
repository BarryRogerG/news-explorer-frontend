import {
  simulateDelay,
  getLocalStorage,
  setLocalStorage,
  generateId,
  generateToken,
} from './mockHelpers'

// Mock login
export const mockLogin = async (credentials) => {
  await simulateDelay(500)

  const mockUser = {
    _id: generateId('user'),
    name: 'Test User',
    email: credentials.email,
  }
  const token = generateToken()

  setLocalStorage('jwt', token)
  setLocalStorage('user', mockUser)

  return { token, user: mockUser }
}

// Mock registration
export const mockRegister = async (userData) => {
  await simulateDelay(500)

  const mockUser = {
    _id: generateId('user'),
    name: userData.name,
    email: userData.email,
  }
  const token = generateToken()

  setLocalStorage('jwt', token)
  setLocalStorage('user', mockUser)

  return { token, user: mockUser }
}

// Check token
export const mockCheckToken = async () => {
  await simulateDelay(200)

  const token = localStorage.getItem('jwt')
  const user = getLocalStorage('user')

  if (!token || !user) return null
  return { token, user }
}

// Get saved articles
export const mockGetSavedArticles = async () => {
  await simulateDelay(200)
  return getLocalStorage('savedArticles', [])
}

// Save article
export const mockSaveArticle = async (article) => {
  if (!article?.url) throw new Error('Invalid article object')

  await simulateDelay(300)

  const savedArticles = getLocalStorage('savedArticles', [])

  if (savedArticles.some((a) => a.url === article.url)) return savedArticles

  const articleToSave = {
    ...article,
    _id: generateId('article'),
    savedAt: new Date().toISOString(),
  }
  const updatedArticles = [...savedArticles, articleToSave]

  setLocalStorage('savedArticles', updatedArticles)
  return updatedArticles
}

// Delete article
export const mockDeleteArticle = async (article) => {
  if (!article?.url) throw new Error('Invalid article object')

  await simulateDelay(300)

  const savedArticles = getLocalStorage('savedArticles', [])
  const updatedArticles = savedArticles.filter((a) => a.url !== article.url)

  setLocalStorage('savedArticles', updatedArticles)
  return updatedArticles
}
