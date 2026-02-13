import React from 'react'

export default function AboutUs() {
  return (
    <section id="about" className="about-us container">
      <h2>About Us</h2>
      <div className="about-grid">
        <div className="about-text">
          <p><strong>Food Diary</strong> is a small project showcasing home-cooked favorites and chef-inspired ideas. We curate simple, delicious recipes and practical kitchen tips to help you cook with confidence.</p>
          <p>Our mission is to make great food approachable: clear recipes, helpful tips, and a few chef secrets to elevate your everyday meals.</p>
        </div>
        <div className="about-photos">
          <img src="/assets/chef-aiko.svg" alt="Aiko Tanaka" />
          <img src="/assets/chef-marco.svg" alt="Marco Ricci" />
          <img src="/assets/chef-lena.svg" alt="Lena Martinez" />
        </div>
      </div>
    </section>
  )
}
