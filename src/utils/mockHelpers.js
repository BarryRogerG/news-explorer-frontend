/**
 * Helper utilities for mock API functions
 */

/**
 * Simulate API delay
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise<void>}
 */
export const simulateDelay = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Get and parse value from localStorage
 * @param {string} key - localStorage key
 * @param {*} defaultValue - Default value if key doesn't exist
 * @returns {*} Parsed value or default
 */
export const getLocalStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key)
    if (!item) return defaultValue
    return JSON.parse(item)
  } catch {
    return defaultValue
  }
}

/**
 * Set value in localStorage (stringifies automatically)
 * @param {string} key - localStorage key
 * @param {*} value - Value to store
 */
export const setLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Failed to set localStorage key "${key}":`, error)
  }
}

/**
 * Generate a unique ID
 * @param {string} prefix - Prefix for the ID
 * @returns {string} Unique ID
 */
export const generateId = (prefix = 'id') => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Generate a unique token
 * @returns {string} Unique token
 */
export const generateToken = () => {
  return `mock-jwt-token-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

