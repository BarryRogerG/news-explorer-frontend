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
export const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY || 'YOUR_API_KEY_HERE';

// To use this, create a .env file in the root directory with:
// VITE_NEWS_API_KEY=your_actual_api_key_here

