/**
 * Configuration file
 * Store API keys and other configuration here
 * 
 * IMPORTANT: Add .env file to .gitignore to keep your API key secure
 * For production, use environment variables instead
 */

// News API Key - Get yours from https://newsapi.org
// For development, you can use a placeholder, but you'll need a real key to test
// In Vite, use import.meta.env instead of process.env
// Environment variables must be prefixed with VITE_
// 
// For reviewers: Please create a .env file in the root directory with:
// VITE_NEWS_API_KEY=your_actual_api_key_here
// 
// You can get a free API key from https://newsapi.org/register
export const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY || '';

// Helper to check if API key is configured
export const isApiKeyConfigured = () => {
  return !!NEWS_API_KEY && NEWS_API_KEY !== '';
};

// Helper to get API key status (for debugging/testing)
// This can be called from browser console via window object
export const getApiKeyStatus = () => {
  const hasKey = isApiKeyConfigured();
  const keyLength = NEWS_API_KEY ? NEWS_API_KEY.length : 0;
  const keyPreview = NEWS_API_KEY 
    ? NEWS_API_KEY.substring(0, 4) + '...' + NEWS_API_KEY.substring(keyLength - 4)
    : 'NOT SET';
  
  return {
    configured: hasKey,
    keyLength: keyLength,
    keyPreview: keyPreview,
    message: hasKey 
      ? `API key is configured (${keyLength} characters)` 
      : 'API key is NOT configured'
  };
};

