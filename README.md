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

   **For Reviewers:** Please create a `.env` file in the root directory with your News API key.
   You can get a free API key from https://newsapi.org/register

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

## Deployment

### GitHub Pages

The application is deployed using GitHub Pages. The deployment is automated via GitHub Actions.

**Deployed Site:** [Deployment link will be added here after deployment]

**Note:** The app is configured for GitHub Pages deployment. After deploying, update this link with your actual deployment URL.

To deploy manually:
1. Build the project: `npm run build`
2. Follow GitHub Pages deployment instructions
3. Update the base URL in `vite.config.js` if needed

### Alternative Deployment Options

- **Netlify**: Connect your GitHub repository to Netlify for automatic deployments
- **Vercel**: Deploy with Vercel for fast, global CDN
- **Google Cloud**: Deploy to your existing VM (see previous project instructions)

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
