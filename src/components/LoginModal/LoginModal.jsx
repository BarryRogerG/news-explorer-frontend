import { useState, useMemo } from 'react'
import ModalWithForm from '../ModalWithForm/ModalWithForm'
import './LoginModal.css'

function LoginModal({ isOpen, onClose, onLogin, onSwitchToRegister }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailTouched, setEmailTouched] = useState(false)
  const [passwordTouched, setPasswordTouched] = useState(false)

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
    return ''
  }, [password, passwordTouched])

  // Validate form whenever email or password changes
  const isValid = useMemo(() => {
    const emailValid = email.trim() !== '' && email.includes('@')
    const passwordValid = password.trim() !== ''
    return emailValid && passwordValid
  }, [email, password])

  // Update validation when inputs change
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleEmailBlur = () => {
    setEmailTouched(true)
  }

  const handlePasswordBlur = () => {
    setPasswordTouched(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Mark all fields as touched when form is submitted
    setEmailTouched(true)
    setPasswordTouched(true)
    
    if (isValid && onLogin) {
      onLogin({ email, password })
    }
  }

  const handleSwitchToRegister = () => {
    setEmail('')
    setPassword('')
    setEmailTouched(false)
    setPasswordTouched(false)
    if (onSwitchToRegister) {
      onSwitchToRegister()
    }
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="login"
      title="Sign in"
      buttonText="Sign in"
      onSubmit={handleSubmit}
      linkText="Sign up"
      onLinkClick={handleSwitchToRegister}
      isValid={isValid}
    >
      <div className="login-modal__field">
        <label htmlFor="login-email" className="login-modal__label">
          Email
        </label>
        <input
          type="email"
          id="login-email"
          name="email"
          className={`login-modal__input ${emailError ? 'login-modal__input_error' : ''}`}
          placeholder="Enter email"
          value={email}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          required
        />
        {emailError && (
          <span className="login-modal__error">{emailError}</span>
        )}
      </div>
      <div className="login-modal__field">
        <label htmlFor="login-password" className="login-modal__label">
          Password
        </label>
        <input
          type="password"
          id="login-password"
          name="password"
          className={`login-modal__input ${passwordError ? 'login-modal__input_error' : ''}`}
          placeholder="Enter password"
          value={password}
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
          required
        />
        {passwordError && (
          <span className="login-modal__error">{passwordError}</span>
        )}
      </div>
    </ModalWithForm>
  )
}

export default LoginModal

