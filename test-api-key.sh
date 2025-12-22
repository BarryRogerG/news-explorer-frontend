#!/bin/bash

# Simple script to test API key functionality
# Usage: ./test-api-key.sh [with|without]

MODE=${1:-without}

echo "🧪 Testing API Key Functionality"
echo "================================"

if [ "$MODE" = "without" ]; then
  echo ""
  echo "📝 Testing WITHOUT API key..."
  echo ""
  
  # Backup .env if it exists
  if [ -f .env ]; then
    mv .env .env.backup
    echo "✅ Backed up .env to .env.backup"
  fi
  
  echo ""
  echo "⚠️  .env file removed/renamed"
  echo "📋 What to check:"
  echo "   1. Warning banner should appear above search form"
  echo "   2. Searching should show error message with instructions"
  echo ""
  echo "🚀 Starting dev server..."
  echo "   After testing, restore with: mv .env.backup .env"
  echo ""
  
elif [ "$MODE" = "with" ]; then
  echo ""
  echo "📝 Testing WITH API key..."
  echo ""
  
  # Restore .env if backup exists
  if [ -f .env.backup ]; then
    mv .env.backup .env
    echo "✅ Restored .env from backup"
  elif [ ! -f .env ]; then
    echo "⚠️  No .env file found. Creating template..."
    echo "VITE_NEWS_API_KEY=your_api_key_here" > .env
    echo "✅ Created .env template - please add your actual API key"
  fi
  
  echo ""
  echo "✅ .env file is present"
  echo "📋 What to check:"
  echo "   1. No warning banner should appear"
  echo "   2. Search should work normally"
  echo ""
  echo "🚀 Starting dev server..."
  echo ""
  
else
  echo "Usage: ./test-api-key.sh [with|without]"
  echo ""
  echo "  without  - Test without API key (shows warnings/errors)"
  echo "  with     - Test with API key (normal functionality)"
  exit 1
fi

npm run dev

