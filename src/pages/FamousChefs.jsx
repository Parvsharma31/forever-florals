import React from 'react'

const chefs = [
  { id: '1', name: 'Aiko Tanaka', bio: 'Ramen specialist and broth master.', image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: '2', name: 'Marco Ricci', bio: 'Traditional Italian techniques with modern twists.', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: '3', name: 'Lena Martinez', bio: 'Creative brunch and pastry chef.', image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400' }
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
