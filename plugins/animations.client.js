/**
 * Client-side animations plugin
 * This plugin adds page transitions and scroll animations to the website
 */

export default defineNuxtPlugin((nuxtApp) => {
  // Wait for the app to be mounted
  nuxtApp.hook('app:mounted', () => {
    // Initialize scroll animations
    initScrollAnimations();
    
    // Re-initialize on page changes
    nuxtApp.hook('page:finish', () => {
      setTimeout(() => {
        initScrollAnimations();
      }, 100);
    });
  });
});

/**
 * Initialize scroll animations for elements with the fade-in-scroll class
 */
function initScrollAnimations() {
  // Get all elements with the fade-in-scroll class
  const animatedElements = document.querySelectorAll('.fade-in-scroll');
  
  if (animatedElements.length === 0) return;
  
  // Create an Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Add the visible class when the element is in view
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Unobserve the element after it's been animated
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null, // viewport
    threshold: 0.1, // 10% of the element must be visible
    rootMargin: '0px 0px -50px 0px' // trigger slightly before the element is in view
  });
  
  // Observe each element
  animatedElements.forEach(element => {
    observer.observe(element);
  });
}