import React from 'react'

export default function RecipeModal({ recipe, onClose }) {
    if (!recipe) return null

    return (
        <div className="recipe-modal-overlay" onClick={onClose}>
            <div className="recipe-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose} aria-label="Close modal">
                    ×
                </button>

                <div className="modal-image-wrapper">
                    <img src={recipe.image} alt={recipe.title} className="modal-image" />
                </div>

                <div className="modal-body">
                    <h2>{recipe.title}</h2>
                    <p className="modal-description">{recipe.description}</p>

                    {/* Recipe Badges */}
                    <div className="recipe-badges">
                        {recipe.prepTime && (
                            <span className="badge badge-time">⏱️ Prep: {recipe.prepTime}</span>
                        )}
                        {recipe.cookTime && (
                            <span className="badge badge-time">🔥 Cook: {recipe.cookTime}</span>
                        )}
                        {recipe.difficulty && (
                            <span className={`badge badge-difficulty ${recipe.difficulty.toLowerCase()}`}>
                                {recipe.difficulty}
                            </span>
                        )}
                        {recipe.cuisine && (
                            <span className="badge badge-cuisine">🍴 {recipe.cuisine}</span>
                        )}
                    </div>

                    {/* Ingredients */}
                    {recipe.ingredients && recipe.ingredients.length > 0 && (
                        <div className="modal-section">
                            <h3>Ingredients</h3>
                            <ul className="ingredients-list">
                                {recipe.ingredients.map((ingredient, index) => (
                                    <li key={index}>{ingredient}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Instructions */}
                    {recipe.instructions && (
                        <div className="modal-section">
                            <h3>Instructions</h3>
                            <p className="instructions-text">{recipe.instructions}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
