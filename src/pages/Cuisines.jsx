import React from 'react'

const cuisines = [
  { id: 'it', name: 'Italian', desc: 'Pasta, risotto, and southern comfort.', image: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'cn', name: 'Chinese', desc: 'Wok, noodles, and bold flavors.', image: 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'mx', name: 'Mexican', desc: 'Bright, spicy, and bold dishes.', image: 'https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'in', name: 'Indian', desc: 'Rich spices and aromatic curries.', image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'fr', name: 'French', desc: 'Elegant classics and refined techniques.', image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'th', name: 'Thai', desc: 'Sweet, sour, salty, and spicy harmony.', image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=800' }
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
