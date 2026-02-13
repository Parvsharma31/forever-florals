import React from 'react'

const chefs = [
  { id: '1', name: 'Aiko Tanaka', bio: 'Ramen specialist and broth master.', image: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?auto=format&fit=crop&w=400&q=80' },
  { id: '2', name: 'Marco Ricci', bio: 'Traditional Italian techniques with modern twists.', image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80' },
  { id: '3', name: 'Lena Martinez', bio: 'Creative brunch and pastry chef.', image: 'https://images.unsplash.com/photo-1583394238232-9636231d3604?auto=format&fit=crop&w=400&q=80' }
]

export default function FamousChefs() {
  return (
    <section id="chefs" className="chefs container">
      <h2>Famous Chefs</h2>
      <div className="chefs-grid">
        {chefs.map(c => (
          <article className="chef-card" key={c.id}>
            <img
              className="chef-avatar"
              src={c.image}
              alt={c.name}
            />
            <div className="chef-info">
              <h3>{c.name}</h3>
              <p>{c.bio}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
