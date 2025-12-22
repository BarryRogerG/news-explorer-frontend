# News Explorer Frontend

A React application that allows users to search for news articles using the News API and save them to their personal account.

## About the Project

News Explorer is a full-stack news aggregation application. This frontend allows users to:
- Search for news articles by keyword
- View articles from the past 7 days
- Save articles to their personal account (when logged in)
- View saved articles on a dedicated page
- Sign up and log in to access saved articles

## Technologies and Techniques Used

- **React 19.2.0**: Functional components with hooks
- **React Router 7.10.1**: Client-side routing
- **Vite 7.2.4**: Build tool and development server
- **News API**: Third-party API for fetching news articles
- **Inter Font**: Typography from Google Fonts
- **Roboto Slab Font**: Logo typography
- **CSS3**: Custom styling with BEM methodology
- **LocalStorage**: Mock backend for authentication and saved articles

## Project Structure

```
src/
├── components/
│   ├── App/              # Main application component
│   ├── Header/           # Site header with navigation
│   ├── Navigation/       # Navigation menu
│   ├── Main/             # Main page with search
│   ├── SavedNews/        # Saved articles page
│   ├── SearchForm/       # Search input form
│   ├── NewsCard/         # Individual article card
│   ├── Preloader/        # Loading animation
│   ├── Footer/           # Site footer
│   ├── ModalWithForm/    # Reusable modal component
│   ├── LoginModal/       # Login modal
│   └── RegisterModal/    # Registration modal
├── utils/
│   ├── newsApi.js        # News API integration
│   ├── config.js         # Configuration (API keys)
│   └── mockApi.js        # Mock backend functions
└── images/
    └── hero-background.jpg  # Hero section background
```

## Features

- **Search Functionality**: Search for news articles from the past 7 days
- **Article Display**: View articles in a responsive grid layout
- **Show More Button**: Load articles 3 at a time
- **Save Articles**: Save articles when logged in
- **User Authentication**: Sign up and log in (mock backend)
- **Saved Articles Page**: View all saved articles
- **Responsive Design**: Works on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- News API key (get one at https://newsapi.org)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/BarryRogerG/news-explorer-frontend.git
cd news-explorer-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
VITE_NEWS_API_KEY=your_api_key_here
```

   **Important for Reviewers:** 
   - Copy the `.env.example` file to create your `.env` file
   - Get a free API key from https://newsapi.org/register
   - Add your API key to the `.env` file: `VITE_NEWS_API_KEY=your_actual_api_key`
   - **Restart the development server** after adding the API key (stop with Ctrl+C and run `npm run dev` again)
   - Without the API key, you'll see a warning message and search functionality won't work

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Testing

See [TESTING.md](./TESTING.md) for detailed instructions on testing the API key functionality, including:
- Testing without API key (warning/error messages)
- Testing with API key (normal functionality)
- Quick test scripts for Windows and Unix systems

## Deployment

The application can be deployed using several platforms. Choose the option that works best for you:

**📖 For detailed Google Cloud deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)**

### Option 1: Google Cloud VM (If you already have a VM)

If you have an existing Google Cloud VM instance:

1. Build the project: `npm run build`
2. Follow the detailed guide in [DEPLOYMENT_GOOGLE_CLOUD.md](./DEPLOYMENT_GOOGLE_CLOUD.md)
3. Your app will be available at: `http://YOUR_EXTERNAL_IP:8080` (or the port you configure)

**Deployed Site:** [Add your Google Cloud VM external IP and port here after deployment, e.g., `http://34.123.45.67:8080`]

### Option 2: Vercel (Recommended - Easiest)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New Project"
3. Import your repository: `BarryRogerG/news-explorer-frontend`
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Environment Variables**: Add `VITE_NEWS_API_KEY` (your API key)
5. Click "Deploy"
6. Your app will be live at `https://your-project-name.vercel.app`

**Deployed Site:** [Add your Vercel deployment URL here after deploying]

### Option 2: GitHub Pages

The application is configured for GitHub Pages deployment via GitHub Actions.

**Prerequisites:**
1. Enable GitHub Pages in your repository settings:
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` (or select GitHub Actions)

2. Add your API key as a GitHub Secret:
   - Go to Settings → Secrets and variables → Actions
   - Add new secret: `VITE_NEWS_API_KEY` with your API key value

3. Push to the `main` branch - deployment will happen automatically

**Deployed Site:** [Add your GitHub Pages URL here: `https://barryrogerg.github.io/news-explorer-frontend/`]

### Option 3: Netlify

1. Go to [netlify.com](https://netlify.com) and sign in with GitHub
2. Click "Add new site" → "Import an existing project"
3. Select your repository
4. Configure:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Environment variables**: Add `VITE_NEWS_API_KEY`
5. Click "Deploy site"

**Deployed Site:** [Add your Netlify deployment URL here after deploying]

### Manual Deployment

To deploy manually:
1. Build the project: `npm run build`
2. The `dist` folder will contain the production build
3. Upload the contents of `dist` to your hosting provider

## API Configuration

The application uses the News API (https://newsapi.org) to fetch news articles.

- **Development**: Uses `https://newsapi.org/v2/everything`
- **Production**: Uses proxy URL `https://nomoreparties.co/news/v2/everything`

## Mock Backend

Currently, the application uses mock backend functions stored in `src/utils/mockApi.js`:
- User authentication (login/register)
- Token checking
- Saving/deleting articles
- All data is stored in localStorage

In Stage 2, these will be replaced with real backend API calls.

## Project Status

- ✅ Stage 1.1: JSX and Styles - Complete
- ✅ Stage 1.2: API Integration - Complete
- ⏳ Stage 2: Backend Integration - Pending

## Repository

- **Frontend Repository**: https://github.com/BarryRogerG/news-explorer-frontend
- **Backend Repository**: [Add when available]

## License

ISC
