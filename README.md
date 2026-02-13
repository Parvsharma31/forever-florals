# 🍽️ Food Diary

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0.0-646CFF.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A modern, responsive web application for exploring recipes, cuisines, and famous chefs. Built with React and Vite for a lightning-fast user experience.

## 🌐 Live Demo

**[Visit Food Diary →](YOUR_DEPLOYMENT_URL_HERE)**

> 🚀 Replace `YOUR_DEPLOYMENT_URL_HERE` with your actual deployment URL (Vercel, Netlify, GitHub Pages, etc.)

## ✨ Features

- 📖 **Recipe Browser** - Explore a curated collection of recipes
- 🌍 **Cuisine Explorer** - Discover recipes by cuisine type
- 👨‍🍳 **Famous Chefs** - Learn about renowned chefs and their specialties
- 🔐 **User Authentication** - Secure login functionality
- 🎠 **Featured Carousel** - Showcase of popular recipes
- 📱 **Responsive Design** - Optimized for all devices
- ⚡ **Lightning Fast** - Built with Vite for optimal performance

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.2+
- **Build Tool**: Vite 5.0
- **Routing**: React Router DOM 6.30+
- **Styling**: CSS3 with custom properties
- **Fonts**: Google Fonts (Outfit, Playfair Display)

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd food-diary-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── FeaturedCarousel.jsx    # Featured recipes carousel
│   ├── LoginModal.jsx          # User authentication modal
│   └── RecipeCard.jsx          # Recipe card component
├── pages/
│   ├── Home.jsx                # Home page with featured content
│   ├── RecipeList.jsx          # All recipes list view
│   ├── RecipeDetail.jsx        # Individual recipe details
│   ├── Cuisines.jsx            # Cuisines catalog
│   ├── FamousChefs.jsx         # Famous chefs showcase
│   └── AboutUs.jsx             # About page
├── App.jsx                     # Main app component with routing
├── main.jsx                    # Application entry point
└── styles.css                  # Global styles and CSS variables
public/
├── data/
│   └── recipes.json            # Recipe data store
└── assets/
    └── photos/                 # Recipe images
```

## 📄 Pages Overview

- **Home** - Landing page featuring a carousel of popular recipes
- **Recipe List** - Browse all available recipes with filtering
- **Recipe Detail** - View detailed information, ingredients, and instructions
- **Cuisines** - Explore recipes organized by cuisine type
- **Famous Chefs** - Learn about renowned chefs and their signature dishes
- **About Us** - Information about the platform and team
- **Authentication** - User login functionality via modal

## 🚀 Deployment

### Deploy to Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

Or use the [Vercel Dashboard](https://vercel.com) to import your GitHub repository.

### Deploy to Netlify

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist/` folder to [Netlify](https://www.netlify.com/)

Or connect your GitHub repository for automatic deployments.

### Deploy to GitHub Pages

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to `package.json`:
   ```json
   "homepage": "https://yourusername.github.io/food-diary",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

## 📸 Screenshots

> Add screenshots of your application here to showcase the UI

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgments

- Recipe data and images sourced from various culinary resources
- Icons and design inspiration from modern food platforms
- Built with ❤️ using React and Vite

---

**Made with 🍳 by [Your Name]**

