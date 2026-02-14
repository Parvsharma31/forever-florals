import React from 'react'
import RecipeCard from '../components/RecipeCard'


export default function RecipeList({ recipes, onRecipeClick }) {
  if (!recipes || recipes.length === 0) return <p>No recipes found. Try adjusting your filters!</p>

  return (
    <div>
      <section className="recipe-list">
        {recipes.map(r => <RecipeCard key={r.id} recipe={r} onClick={onRecipeClick} />)}
      </section>
    </div>
  )
}
