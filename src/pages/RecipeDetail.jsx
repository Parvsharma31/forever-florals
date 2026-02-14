import React from 'react'

export default function RecipeDetail({ recipe }) {
  if (!recipe) return <div className="recipe-detail">Select a recipe to see details</div>

  return (
    <article className="recipe-detail">
      <h2>{recipe.title}</h2>
      {recipe.image && <img src={recipe.image} alt={recipe.title} />}
      <h3>Ingredients</h3>
      <ul>{recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}</ul>
      <h3>Instructions</h3>
      <p>{recipe.instructions}</p>
    </article>
  )
}
