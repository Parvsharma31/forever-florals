# Food Diary

A modern React + Vite web application for exploring recipes, cuisines, and famous chefs.

## Features

- 📖 Browse and explore recipes by cuisine
- 👨‍🍳 Discover famous chefs and their specialties
- 🔐 User authentication with login modal
- 🎠 Featured recipe carousel
- 📱 Responsive design with modern UI
- ⚡ Lightning-fast development with Vite

## Tech Stack

- **Frontend**: React 18+
- **Build Tool**: Vite
- **Styling**: CSS3

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── FeaturedCarousel.jsx    # Featured recipes carousel
│   ├── LoginModal.jsx          # User authentication modal
│   └── RecipeCard.jsx          # Recipe card component
├── pages/
│   ├── Home.jsx                # Home page
│   ├── RecipeList.jsx          # All recipes list
│   ├── RecipeDetail.jsx        # Recipe details page
│   ├── Cuisines.jsx            # Cuisines catalog
│   ├── FamousChefs.jsx         # Famous chefs showcase
│   └── AboutUs.jsx             # About page
├── App.jsx                     # Main app component
├── main.jsx                    # Entry point
└── styles.css                  # Global styles
public/
├── data/
│   └── recipes.json            # Recipe data
└── assets/
    └── photos/                 # Recipe images
```

## Features Overview

- **Home**: Landing page featuring a carousel of popular recipes
- **Recipe List**: Browse all available recipes
- **Recipe Detail**: View detailed information about a recipe
- **Cuisines**: Explore recipes by cuisine type
- **Famous Chefs**: Learn about renowned chefs
- **About Us**: Information about the platform
- **Authentication**: User login functionality

## Contributing

Feel free to fork, modify, and extend this project. Contributions are welcome!

## License

MIT
