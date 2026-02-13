import React, { useEffect, useState } from 'react'
import RecipeList from './RecipeList'
import FeaturedCarousel from '../components/FeaturedCarousel'
import RecipeModal from '../components/RecipeModal'

export default function Home() {
  const [recipes, setRecipes] = useState([])
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [cuisineFilter, setCuisineFilter] = useState('all')
  const [difficultyFilter, setDifficultyFilter] = useState('all')

  useEffect(() => {
    fetch('/data/recipes.json')
      .then(res => res.json())
      .then(setRecipes)
      .catch(err => console.error('Failed to load recipes', err))
  }, [])

  // Filter recipes based on search and filters
  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCuisine = cuisineFilter === 'all' || recipe.cuisine === cuisineFilter
    const matchesDifficulty = difficultyFilter === 'all' || recipe.difficulty === difficultyFilter

    return matchesSearch && matchesCuisine && matchesDifficulty
  })

  // Get unique cuisines and difficulties for filters
  const cuisines = ['all', ...new Set(recipes.map(r => r.cuisine).filter(Boolean))]
  const difficulties = ['all', 'Easy', 'Medium', 'Hard']

  return (
    <section id="home" className="home-section">
      {/* Hero Section */}
      <div className="hero-content animate-on-scroll">
        <h1 className="hero-tagline">Discover Delicious Recipes for Every Occasion</h1>
        <p className="hero-subtitle">
          From quick weeknight dinners to elegant brunches, find your next favorite dish
        </p>
        <a href="#recipes" className="hero-cta">
          Explore Recipes →
        </a>
      </div>

      <FeaturedCarousel recipes={recipes} />

      <section id="collections" className="collections">
        <div className="container">
          <h2>Collections</h2>
          <div className="collection-list">
            <article className="collection-card animate-on-scroll delay-1">
              <img src="https://images.pexels.com/photos/884600/pexels-photo-884600.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Comfort Noodles" />
              <div className="collection-overlay">
                <h3>Comfort Noodles</h3>
                <p>Warm, slurpable bowls for cozy nights.</p>
              </div>
            </article>

            <article className="collection-card animate-on-scroll delay-2">
              <img src="https://images.pexels.com/photos/3026808/pexels-photo-3026808.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Breakfast & Brunch" />
              <div className="collection-overlay">
                <h3>Breakfast & Brunch</h3>
                <p>Sweet and savory starts to your day.</p>
              </div>
            </article>

            <article className="collection-card animate-on-scroll delay-3">
              <img src="https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Fresh Salads" />
              <div className="collection-overlay">
                <h3>Fresh Salads</h3>
                <p>Bright, healthy, and refreshing bowls.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="tips" className="tips-section">
        <div className="container">
          <h2>Kitchen Tips</h2>
          <div className="tips-grid">
            <div className="tip">
              <h4>Salt Pasta Water</h4>
              <p>Salt generously so the pasta itself has flavor — it should taste like the sea.</p>
            </div>
            <div className="tip">
              <h4>Rest Meat</h4>
              <p>Let roasted or grilled meat rest before slicing to keep it juicy.</p>
            </div>
            <div className="tip">
              <h4>Finish with Herbs</h4>
              <p>Add fresh herbs at the end to preserve their aroma and color.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section id="recipes" className="recipes-section">
        <div className="container">
          <h2>All Recipes</h2>

          <div className="search-filter-bar">
            <input
              type="text"
              placeholder="🔍 Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />

            <select
              value={cuisineFilter}
              onChange={(e) => setCuisineFilter(e.target.value)}
              className="filter-select"
            >
              {cuisines.map(cuisine => (
                <option key={cuisine} value={cuisine}>
                  {cuisine === 'all' ? 'All Cuisines' : cuisine}
                </option>
              ))}
            </select>

            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="filter-select"
            >
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>
                  {difficulty === 'all' ? 'All Levels' : difficulty}
                </option>
              ))}
            </select>

            {(searchTerm || cuisineFilter !== 'all' || difficultyFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('')
                  setCuisineFilter('all')
                  setDifficultyFilter('all')
                }}
                className="btn-ghost clear-filters"
              >
                Clear Filters
              </button>
            )}
          </div>

          <p className="results-count">
            Showing {filteredRecipes.length} {filteredRecipes.length === 1 ? 'recipe' : 'recipes'}
          </p>
        </div>
      </section>

      <RecipeList recipes={filteredRecipes} onRecipeClick={setSelectedRecipe} />

      {selectedRecipe && (
        <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
      )}
    </section>
  )
}
