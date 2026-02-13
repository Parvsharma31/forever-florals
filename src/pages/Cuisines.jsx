import React from 'react'

const cuisines = [
  { id: 'it', name: 'Italian', desc: 'Pasta, risotto, and southern comfort.', image: 'https://images.unsplash.com/photo-1498579150354-977475b7ea0b?auto=format&fit=crop&w=800&q=80' },
  { id: 'cn', name: 'Chinese', desc: 'Wok, noodles, and bold flavors.', image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=80' },
  { id: 'mx', name: 'Mexican', desc: 'Bright, spicy, and bold dishes.', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80' },
  { id: 'in', name: 'Indian', desc: 'Rich spices and aromatic curries.', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80' }
]

export default function Cuisines() {
  return (
    <section id="cuisines" className="cuisines container">
      <h2>Cuisines</h2>
      <div className="cuisines-grid">
        {cuisines.map(c => (
          <article className="cuisine-card" key={c.id}>
            <img
              className="cuisine-image"
              src={c.image}
              alt={c.name}
            />
            <div className="cuisine-body">
              <h3>{c.name}</h3>
              <p>{c.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
