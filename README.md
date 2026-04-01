# Forever Florals - Online Bouquet Builder

A beautiful, interactive web application that lets you create personalized digital bouquets and share them with loved ones. Built with React, Vite, and Tailwind CSS.

## Features

- **Interactive Bouquet Builder**: Select up to 10 blooms to create your custom arrangement
- **7 Greenery Themes**: Cycle through Classic, Tropical, Eucalyptus, Meadow, Fern Garden, Olive Branch, and Romantic foliage styles
- **Shuffle Arrangement**: Randomize the flower layout to find the perfect look
- **Personalized Notes**: Add a heartfelt message with the recipient's name
- **Live Preview**: See your bouquet and note exactly as the recipient will before sharing
- **Shareable Links**: Generate a URL-encoded link — anyone who opens it sees your bouquet
- **Session Persistence**: Your progress is saved so refreshing the page doesn't lose your work
- **Mobile Responsive**: Fully optimized for touch devices with no tap delay or layout issues
- **Smooth Animations**: Powered by Framer Motion

## Getting Started

### Prerequisites

- **Node.js** v16 or higher
- **npm** (included with Node.js)

```bash
node --version
npm --version
```

Download Node.js from [nodejs.org](https://nodejs.org/) if needed.

### Installation

```bash
npm install
```

### Running the App

**Development** (with hot reload):
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

**Production build:**
```bash
npm run build
```

**Preview production build locally:**
```bash
npm run preview
```

## Project Structure

```
online bouquet/
├── public/
├── src/
│   ├── components/
│   │   ├── LandingPage.jsx        # Landing page
│   │   ├── SelectionScreen.jsx    # Flower picker with live mini-preview
│   │   ├── Note.jsx               # Note writing step
│   │   ├── PreviewPage.jsx        # Full preview before sharing
│   │   ├── FinalExport.jsx        # Share page with copyable link
│   │   └── ArrangementPreview.jsx # SVG bouquet renderer + greenery themes
│   ├── data/
│   │   └── flowers.jsx            # Flower definitions (id, name, SVG component)
│   ├── App.jsx                    # App shell, routing, sessionStorage persistence
│   ├── main.jsx
│   └── index.css                  # Global styles, touch-action, dvh support
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## How to Use

1. **Landing Page** — Click "Create Your Bouquet" or view a sample
2. **Pick Flowers** — Tap up to 10 blooms; tap again to remove; use the mini-preview to see the arrangement take shape
3. **Write a Note** — Fill in the recipient's name and a short message (up to 200 characters); use prompt suggestions if you need inspiration
4. **Preview** — See the final bouquet; shuffle the layout or switch greenery themes; go back to edit if needed
5. **Share** — Copy the generated link and send it — the recipient opens it and sees your bouquet

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Technologies

- **React 19** — UI library
- **Vite** — Build tool
- **Tailwind CSS 4** — Utility-first styling
- **Framer Motion** — Animations
- **Lucide React** — Icons

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import the repo at [vercel.com](https://vercel.com) — Vite is auto-detected

### Netlify
1. Run `npm run build`
2. Drop the `dist/` folder into [netlify.com](https://netlify.com)

### GitHub Pages
```bash
npm install --save-dev gh-pages
```
Add to `package.json`:
```json
"homepage": "https://yourusername.github.io/online-bouquet",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```
Then run `npm run deploy`.

## Troubleshooting

**Port in use:** Vite will try the next available port automatically, or run:
```bash
npm run dev -- --port 3000
```

**Dependency issues:**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

Made with care by Parv
