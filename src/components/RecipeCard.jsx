import React from 'react'

export default function RecipeCard({ recipe, onClick }) {
  return (
    <article className="recipe-card animate-on-scroll" onClick={() => onClick(recipe)} style={{ cursor: 'pointer' }}>
      {recipe.image && (
        <div className="img-wrap">
          <img src={recipe.image} alt={recipe.title} />
        </div>
      )}
      <div className="recipe-card-body">
        <h3>{recipe.title}</h3>
        <p>{recipe.description}</p>

        {/* Recipe Badges */}
        {(recipe.prepTime || recipe.cookTime || recipe.difficulty || recipe.cuisine) && (
          <div className="recipe-badges">
            {recipe.prepTime && (
              <span className="badge badge-time">
                ⏱️ {recipe.prepTime}
              </span>
            )}
            {recipe.difficulty && (
              <span className={`badge badge-difficulty ${recipe.difficulty.toLowerCase()}`}>
                {recipe.difficulty}
              </span>
            )}
            {recipe.cuisine && (
              <span className="badge badge-cuisine">
                🍴 {recipe.cuisine}
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
