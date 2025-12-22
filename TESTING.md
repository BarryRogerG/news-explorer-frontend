# Testing Guide - API Key Functionality

This guide explains how to test the API key warning and error messages.

## Testing Scenarios

### Scenario 1: Test WITHOUT API Key (Warning & Error Messages)

1. **Remove or rename your `.env` file:**
   ```bash
   # Option 1: Rename it (to keep it safe)
   mv .env .env.backup
   
   # Option 2: Delete it (you can recreate it later)
   rm .env
   ```

2. **Restart the development server:**
   ```bash
   # Stop the server (Ctrl+C) and restart
   npm run dev
   ```

3. **What to check:**
   - ✅ **Warning Banner**: You should see a yellow warning banner above the search form saying "⚠️ API key not configured..."
   - ✅ **Error Message**: Try searching for something (e.g., "trump"). You should see:
     - A red error message: "API key is missing..."
     - A yellow help box with step-by-step instructions
     - A link to register for an API key

### Scenario 2: Test WITH API Key (Normal Functionality)

1. **Create or restore your `.env` file:**
   ```bash
   # If you renamed it:
   mv .env.backup .env
   
   # Or create a new one:
   echo "VITE_NEWS_API_KEY=your_actual_api_key_here" > .env
   ```

2. **Restart the development server:**
   ```bash
   npm run dev
   ```

3. **What to check:**
   - ✅ **No Warning**: The warning banner should NOT appear
   - ✅ **Search Works**: Try searching for something (e.g., "technology"). You should see:
     - Loading spinner
     - News articles displayed in cards
     - No error messages

### Scenario 3: Test with Invalid API Key

1. **Set an invalid API key in `.env`:**
   ```bash
   echo "VITE_NEWS_API_KEY=invalid_key_12345" > .env
   ```

2. **Restart the development server:**
   ```bash
   npm run dev
   ```

3. **What to check:**
   - ✅ **No Warning Banner**: The warning won't show (because a key exists)
   - ✅ **Error on Search**: When you search, you'll get an "Invalid API key" error from the API

## Quick Test Commands

### Test Without API Key
```bash
# Rename .env to hide it
mv .env .env.backup 2>/dev/null || true
npm run dev
```

### Test With API Key
```bash
# Restore .env
mv .env.backup .env 2>/dev/null || echo "VITE_NEWS_API_KEY=your_key" > .env
npm run dev
```

## Visual Testing Checklist

### Without API Key:
- [ ] Warning banner appears in hero section (yellow background)
- [ ] Warning text is readable and clear
- [ ] Search form is still visible and usable
- [ ] Searching shows detailed error message
- [ ] Error help box appears with instructions
- [ ] Link to newsapi.org/register works

### With API Key:
- [ ] No warning banner
- [ ] Search form works normally
- [ ] Articles load successfully
- [ ] No error messages

## Browser Console Testing

You can check the API key status directly in the browser console:

1. Open browser DevTools (F12)
2. Go to Console tab
3. Use the helper functions (automatically available in development):

   **Quick Check:**
   ```javascript
   isApiKeySet()
   // Output: 🔑 API Key is ✅ CONFIGURED (or ❌ NOT CONFIGURED)
   ```

   **Detailed Status:**
   ```javascript
   checkApiKey()
   // Output: Detailed status with key length and preview
   ```

   **Note:** When you first load the app, you'll see a message in the console showing these helper functions are available.

## Notes

- **Important**: Vite requires a server restart to pick up `.env` file changes
- The `.env` file is in `.gitignore`, so it won't be committed to git
- For production, API keys should be set as environment variables on your hosting platform

