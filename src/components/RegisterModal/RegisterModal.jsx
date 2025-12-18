import { useState, useMemo } from 'react'
import ModalWithForm from '../ModalWithForm/ModalWithForm'
import './RegisterModal.css'

function RegisterModal({ isOpen, onClose, onRegister, onSwitchToLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [emailTouched, setEmailTouched] = useState(false)
  const [passwordTouched, setPasswordTouched] = useState(false)
  const [nameTouched, setNameTouched] = useState(false)

  // Validate email
  const emailError = useMemo(() => {
    if (!emailTouched) return ''
    if (email.trim() === '') return 'Email is required'
    if (!email.includes('@')) return 'Please enter a valid email address'
    return ''
  }, [email, emailTouched])

  // Validate password
  const passwordError = useMemo(() => {
    if (!passwordTouched) return ''
    if (password.trim() === '') return 'Password is required'
    if (password.length < 8) return 'Password must be at least 8 characters'
    return ''
  }, [password, passwordTouched])

  // Validate name
  const nameError = useMemo(() => {
    if (!nameTouched) return ''
    if (name.trim() === '') return 'Name is required'
    if (name.trim().length < 2) return 'Name must be at least 2 characters'
    return ''
  }, [name, nameTouched])

  // Validate form whenever email, password, or name changes
  const isValid = useMemo(() => {
    const emailValid = email.trim() !== '' && email.includes('@')
    const passwordValid = password.trim() !== '' && password.length >= 8
    const nameValid = name.trim() !== '' && name.length >= 2
    return emailValid && passwordValid && nameValid
  }, [email, password, name])

  // Update validation when inputs change
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handleEmailBlur = () => {
    setEmailTouched(true)
  }

  const handlePasswordBlur = () => {
    setPasswordTouched(true)
  }

  const handleNameBlur = () => {
    setNameTouched(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Mark all fields as touched when form is submitted
    setEmailTouched(true)
    setPasswordTouched(true)
    setNameTouched(true)
    
    if (isValid && onRegister) {
      onRegister({ email, password, name })
    }
  }

  const handleSwitchToLogin = () => {
    setEmail('')
    setPassword('')
    setName('')
    setEmailTouched(false)
    setPasswordTouched(false)
    setNameTouched(false)
    if (onSwitchToLogin) {
      onSwitchToLogin()
    }
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="register"
      title="Sign up"
      buttonText="Sign up"
      onSubmit={handleSubmit}
      linkText="Sign in"
      onLinkClick={handleSwitchToLogin}
      isValid={isValid}
    >
      <div className="register-modal__field">
        <label htmlFor="register-email" className="register-modal__label">
          Email
        </label>
        <input
          type="email"
          id="register-email"
          name="email"
          className={`register-modal__input ${emailError ? 'register-modal__input_error' : ''}`}
          placeholder="Enter email"
          value={email}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          required
        />
        {emailError && (
          <span className="register-modal__error">{emailError}</span>
        )}
      </div>
      <div className="register-modal__field">
        <label htmlFor="register-password" className="register-modal__label">
          Password
        </label>
        <input
          type="password"
          id="register-password"
          name="password"
          className={`register-modal__input ${passwordError ? 'register-modal__input_error' : ''}`}
          placeholder="Enter password"
          value={password}
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
          minLength="8"
          required
        />
        {passwordError && (
          <span className="register-modal__error">{passwordError}</span>
        )}
      </div>
      <div className="register-modal__field">
        <label htmlFor="register-name" className="register-modal__label">
          Name
        </label>
        <input
          type="text"
          id="register-name"
          name="name"
          className={`register-modal__input ${nameError ? 'register-modal__input_error' : ''}`}
          placeholder="Enter your name"
          value={name}
          onChange={handleNameChange}
          onBlur={handleNameBlur}
          minLength="2"
          required
        />
        {nameError && (
          <span className="register-modal__error">{nameError}</span>
        )}
      </div>
    </ModalWithForm>
  )
}

export default RegisterModal

