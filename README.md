# Ingen Cloud Technologies Website

This is the official website for Ingen Cloud Technologies, a tech startup specializing in various IT services including Application Development, Product Management, Cybersecurity, Cloud Consultation, IT Consultation, and DevOps.

## Technology Stack

- **Frontend Framework**: Nuxt 3 (Vue 3, Vite, Nitro)
- **Styling Framework**: Tailwind CSS
- **Content Management**: Nuxt Content (for blogs/articles)

## Features

### Core Pages
- Home Page
- About Us Page
- Services Overview Page
- Service Detail Pages
- Blog Listing and Article Pages
- Careers Page
- Contact Us Page
- Meeting Scheduling Page
- Cloud Cost Estimator

### Interactive Features
- AI-powered Chatbot
- Meeting Scheduling System
- Cloud Cost Estimator

### Animations and UI Enhancements

#### Page Transitions
The website features smooth page transitions to enhance the user experience when navigating between pages. These transitions are implemented using Nuxt's built-in page transition system and custom CSS animations.

```css
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
```

#### Scroll Animations
Elements animate into view as the user scrolls down the page, creating a more engaging experience. These animations are implemented using the Intersection Observer API and CSS transitions.

To add scroll animations to an element:
```html
<div class="fade-in-scroll">
  <!-- Content here -->
</div>
```

For staggered list animations:
```html
<ul class="stagger-list">
  <li class="stagger-item">Item 1</li>
  <li class="stagger-item">Item 2</li>
  <li class="stagger-item">Item 3</li>
</ul>
```

#### Hover Effects
Interactive elements like buttons, cards, and links have subtle hover effects to provide visual feedback to users.

Available hover effect classes:
- `hover-lift`: Slightly raises the element and adds a shadow
- `hover-scale`: Slightly scales the element up
- `hover-glow`: Adds a subtle glow effect

#### Loading Indicators
The website includes various loading indicators to provide feedback during asynchronous operations:

- Spinner: `<div class="loading-spinner"></div>`
- Dots: 
  ```html
  <div class="loading-dots">
    <span></span>
    <span></span>
    <span></span>
  </div>
  ```
- Loading Bar: `<div class="loading-bar"></div>`

### SEO Optimization
The website is optimized for search engines with:

- Comprehensive meta tags
- Open Graph and Twitter Card metadata
- Structured data using Schema.org
- Automatically generated sitemap
- Robots.txt configuration

### Performance Optimization
Performance optimizations include:

- Image optimization (multiple formats, responsive sizes)
- Asset compression
- Caching strategies
- Font preloading
- CSS and JavaScript minification
- Lazy loading of images and components

## Development

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Building for Production
```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## Testing

### Responsive Design Testing
The website includes a script to test responsive design and animations across different screen sizes. To use it:

1. Open the website in a browser
2. Open the browser's developer console
3. Copy and paste the contents of `scripts/test-responsive.js` into the console
4. Press Enter to run the tests

The script will check for:
- Media query functionality
- Horizontal overflow issues
- Responsive image attributes
- Animation support
- Intersection Observer support

It also provides instructions for manual testing at different screen sizes.

### Browser Compatibility
The website is designed to work on modern browsers including:
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## Project Structure

```
ingen-cloud-tech/
├── app.vue                  # Main app component
├── assets/                  # Static assets
│   └── css/
│       └── main.css         # Main CSS file with animations
├── components/              # Vue components
├── layouts/                 # Page layouts
├── pages/                   # Page components
├── plugins/                 # Nuxt plugins
│   └── animations.client.js # Client-side animations plugin
├── public/                  # Public static files
├── scripts/                 # Utility scripts
│   └── test-responsive.js   # Responsive testing script
├── nuxt.config.ts           # Nuxt configuration
└── tailwind.config.js       # Tailwind CSS configuration
```

## License
Proprietary - All rights reserved# ingen
