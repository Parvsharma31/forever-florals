// Intersection Observer for scroll-triggered animations
export function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible')
                // Optionally unobserve after animation
                // observer.unobserve(entry.target)
            }
        })
    }, observerOptions)

    // Observe all elements with scroll-reveal class
    const elements = document.querySelectorAll('.scroll-reveal')
    elements.forEach(el => observer.observe(el))

    return observer
}

// Cleanup function
export function cleanupScrollAnimations(observer) {
    if (observer) {
        observer.disconnect()
    }
}
