/**
 * Responsive Design and Animation Testing Script
 * 
 * This script helps verify that the website is responsive across different screen sizes
 * and that animations work properly. It can be run in the browser console.
 */

(function() {
  console.log('Starting responsive design and animation testing...');
  
  // Define common screen sizes to test
  const screenSizes = [
    { name: 'Mobile Small', width: 320, height: 568 },
    { name: 'Mobile Medium', width: 375, height: 667 },
    { name: 'Mobile Large', width: 425, height: 812 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Laptop', width: 1024, height: 768 },
    { name: 'Desktop', width: 1440, height: 900 }
  ];
  
  // Test responsive design
  function testResponsiveDesign() {
    console.log('=== RESPONSIVE DESIGN TESTING ===');
    
    // Check if media queries are working
    const mediaQueryList = [
      window.matchMedia('(max-width: 640px)'),
      window.matchMedia('(min-width: 641px) and (max-width: 768px)'),
      window.matchMedia('(min-width: 769px) and (max-width: 1024px)'),
      window.matchMedia('(min-width: 1025px)')
    ];
    
    console.log('Current viewport size:', window.innerWidth, 'x', window.innerHeight);
    console.log('Media query matches:');
    mediaQueryList.forEach((mq, index) => {
      const ranges = ['Mobile', 'Tablet', 'Laptop', 'Desktop'];
      console.log(`- ${ranges[index]}: ${mq.matches}`);
    });
    
    // Check for horizontal overflow issues
    const bodyWidth = document.body.scrollWidth;
    const viewportWidth = window.innerWidth;
    if (bodyWidth > viewportWidth) {
      console.warn('⚠️ Horizontal overflow detected:', bodyWidth - viewportWidth, 'pixels');
    } else {
      console.log('✓ No horizontal overflow detected');
    }
    
    // Check for elements that might cause responsive issues
    const largeImages = Array.from(document.querySelectorAll('img')).filter(img => 
      !img.hasAttribute('width') || parseInt(img.getAttribute('width'), 10) > viewportWidth
    );
    
    if (largeImages.length > 0) {
      console.warn('⚠️ Found', largeImages.length, 'images without proper responsive attributes');
    } else {
      console.log('✓ All images have proper responsive attributes');
    }
  }
  
  // Test animations
  function testAnimations() {
    console.log('=== ANIMATION TESTING ===');
    
    // Check if CSS animations are supported
    const animationsSupported = 'AnimationEvent' in window;
    console.log('CSS Animations supported:', animationsSupported);
    
    // Check for animation elements
    const animatedElements = document.querySelectorAll('.fade-in-scroll, .stagger-item');
    console.log('Found', animatedElements.length, 'elements with animation classes');
    
    // Check if Intersection Observer is supported (used for scroll animations)
    const intersectionObserverSupported = 'IntersectionObserver' in window;
    console.log('Intersection Observer supported:', intersectionObserverSupported);
    
    if (!intersectionObserverSupported) {
      console.warn('⚠️ Intersection Observer not supported - scroll animations may not work');
    }
    
    // Test page transitions
    if (typeof window.$nuxt !== 'undefined') {
      console.log('✓ Nuxt.js detected - page transitions should work');
    } else {
      console.warn('⚠️ Nuxt.js instance not found - page transitions may not work');
    }
  }
  
  // Run tests
  testResponsiveDesign();
  testAnimations();
  
  // Provide instructions for manual testing
  console.log('=== MANUAL TESTING INSTRUCTIONS ===');
  console.log('1. Resize browser window to test different screen sizes:');
  screenSizes.forEach(size => {
    console.log(`   - ${size.name}: ${size.width}x${size.height}px`);
  });
  console.log('2. Check that all elements reflow properly and remain usable');
  console.log('3. Verify that animations trigger when scrolling');
  console.log('4. Test hover effects on interactive elements');
  console.log('5. Navigate between pages to test page transitions');
  console.log('6. Test loading indicators by simulating slow network (in DevTools)');
  
  console.log('Testing complete! Check the console for any warnings.');
})();