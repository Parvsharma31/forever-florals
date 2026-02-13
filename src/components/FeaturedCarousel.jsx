import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function FeaturedCarousel({ recipes = [] }) {
  const [index, setIndex] = useState(0)

  // Filter or slice recipes if needed, or just use the passed prop
  const items = recipes.slice(0, 4)

  useEffect(() => {
    if (items.length <= 1) return
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % items.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [items])

  if (!items || items.length === 0) return null

  return (
    <div className="featured-carousel">
      {items.map((r, i) => (
        <div
          className={`featured-item ${i === index ? 'active' : ''}`}
          key={r.id}
        >
          {r.image && <img src={r.image} alt={r.title} />}
          <div className="featured-meta">
            <h3>{r.title}</h3>
            <p>{r.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
