# 🌸 Forever Florals - Online Bouquet Builder

A beautiful, interactive web application that lets you create personalized digital bouquets and share them with loved ones. Built with React, Vite, and Tailwind CSS.

## ✨ Features

- **Interactive Bouquet Builder**: Select 6-10 beautiful blooms to create your custom bouquet
- **Personalized Notes**: Add heartfelt messages to accompany your bouquet
- **Live Preview**: See your bouquet and note before sharing
- **Easy Sharing**: Generate shareable links to send your digital bouquet to anyone
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Smooth Animations**: Powered by Framer Motion for delightful user experience

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your system:
- **Node.js** (version 16.0 or higher)
- **npm** (comes with Node.js)

To check if you have Node.js and npm installed, run:
```bash
node --version
npm --version
```

If you don't have Node.js installed, download it from [nodejs.org](https://nodejs.org/).

### Installation

1. **Navigate to the project directory**
   ```bash
   cd "c:\Users\parvs\OneDrive\Desktop\coding\online bouquet"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   This will install all required packages including React, Vite, Tailwind CSS, Framer Motion, and other dependencies.

### Running the Application

#### Development Mode

To run the application in development mode with hot module replacement (HMR):

```bash
npm run dev
```

This will start the development server. You should see output similar to:
```
VITE v7.3.1  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

Open your browser and navigate to `http://localhost:5173/` to view the application.

The application will automatically reload when you make changes to the source code.

#### Production Build

To create an optimized production build:

```bash
npm run build
```

This will generate a `dist` folder with optimized static files ready for deployment.

#### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

This will serve the production build on a local server.

## 📁 Project Structure

```
online bouquet/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── LandingPage.jsx       # Landing page with start options
│   │   ├── SelectionScreen.jsx   # Flower selection interface
│   │   ├── Note.jsx              # Note writing interface
│   │   ├── PreviewPage.jsx       # Preview before sharing
│   │   ├── FinalExport.jsx       # Share page with link generation
│   │   └── ...                   # Other UI components
│   ├── data/            # Application data (flower definitions)
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── assets/          # Images and other assets
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── package.json         # Project dependencies and scripts
├── vite.config.js       # Vite configuration
└── README.md            # This file
```

## 🎨 How to Use

1. **Landing Page**: Click "Create Your Bouquet" to start building
2. **Select Flowers**: Choose 6-10 blooms from the available options
3. **Write a Note**: Add a personal message with recipient name
4. **Preview**: Review your bouquet and note
5. **Share**: Generate a shareable link and send it to your loved one

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Create production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

## 🧰 Technologies Used

- **React 19** - UI library
- **Vite** - Build tool and development server
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **clsx & tailwind-merge** - Utility for conditional class names

## 🌐 Deployment

This application can be deployed to various platforms:

### Vercel (Recommended)
1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Vercel will auto-detect Vite and deploy

### Netlify
1. Run `npm run build`
2. Deploy the `dist` folder to [Netlify](https://netlify.com)

### GitHub Pages
1. Install `gh-pages`: `npm install --save-dev gh-pages`
2. Add to `package.json`:
   ```json
   "homepage": "https://yourusername.github.io/online-bouquet",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
3. Run `npm run deploy`

## 🐛 Troubleshooting

### Port Already in Use
If port 5173 is already in use, Vite will automatically try the next available port. You can also specify a custom port:
```bash
npm run dev -- --port 3000
```

### Dependencies Issues
If you encounter dependency issues, try:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
Clear the cache and rebuild:
```bash
npm run build -- --force
```

## 📝 License

This project is private and not licensed for public use.

## 🤝 Contributing

This is a personal project. If you'd like to suggest improvements, feel free to reach out!

## 💡 Future Enhancements

- Add more flower varieties
- Implement different bouquet arrangements
- Add background music options
- Create downloadable image versions
- Add seasonal themes

---

Made with 💐 and ❤️
