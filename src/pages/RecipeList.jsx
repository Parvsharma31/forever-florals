import React from 'react'
import RecipeCard from '../components/RecipeCard'


export default function RecipeList({ recipes }) {
  if (!recipes || recipes.length === 0) return <p>Loading recipes...</p>

  return (
    <div>
      <section className="recipe-list">
        {recipes.map(r => <RecipeCard key={r.id} recipe={r} />)}
      </section>
    </div>
  )
}
