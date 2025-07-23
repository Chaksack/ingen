<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
      <div class="container-custom py-20 md:py-28 lg:py-32">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="space-y-6 max-w-2xl">
            <h1 class="animate-fade-in">
              Innovative Cloud Solutions for Your Business
            </h1>
            <p class="text-xl text-white/90 animate-slide-up">
              Ingen Cloud Technologies provides cutting-edge technology solutions to help your business thrive in the digital era.
            </p>
            <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4 animate-slide-up">
              <NuxtLink to="/services" class="btn bg-white text-primary-600 hover:bg-neutral-100">
                Explore Services
              </NuxtLink>
              <NuxtLink to="/contact" class="btn bg-transparent border-2 border-white hover:bg-white/10">
                Contact Us
              </NuxtLink>
            </div>
          </div>
          <div class="hidden lg:block">
            <!-- Placeholder for hero image or illustration -->
            <div class="bg-white/10 rounded-lg p-8 backdrop-blur-sm animate-fade-in">
              <div class="aspect-video rounded-lg bg-gradient-to-br from-primary-400/20 to-primary-800/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-32 w-32 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Services Overview -->
    <section class="section bg-white dark:bg-neutral-900">
      <div class="container-custom">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-primary-500 mb-4">Our Services</h2>
          <p class="text-xl text-neutral-600 dark:text-neutral-300">
            Comprehensive technology solutions tailored to your business needs
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="(service, index) in services" :key="index" 
               class="card hover:translate-y-[-5px] transition-all duration-300">
            <div class="p-6">
              <div class="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                <component :is="service.icon" class="h-6 w-6 text-primary-500" />
              </div>
              <h3 class="text-xl font-semibold mb-2">{{ service.title }}</h3>
              <p class="text-neutral-600 dark:text-neutral-400 mb-4">{{ service.description }}</p>
              <NuxtLink :to="service.link" class="text-primary-500 hover:text-primary-600 font-medium inline-flex items-center">
                Learn More
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </NuxtLink>
            </div>
          </div>
        </div>
        
        <div class="text-center mt-12">
          <NuxtLink to="/services" class="btn-primary">
            View All Services
          </NuxtLink>
        </div>
      </div>
    </section>
    
    <!-- Why Choose Us -->
    <section class="section bg-neutral-50 dark:bg-neutral-800">
      <div class="container-custom">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-primary-500 mb-4">Why Choose Us</h2>
          <p class="text-xl text-neutral-600 dark:text-neutral-300">
            Partner with Ingen Cloud Technologies for exceptional results
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="(feature, index) in features" :key="index" 
               class="text-center p-6 rounded-lg bg-white dark:bg-neutral-700 shadow-sm hover:shadow-md transition-all duration-300">
            <div class="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-4">
              <component :is="feature.icon" class="h-8 w-8 text-primary-500" />
            </div>
            <h3 class="text-lg font-semibold mb-2">{{ feature.title }}</h3>
            <p class="text-neutral-600 dark:text-neutral-300">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- CTA Section -->
    <section class="section bg-primary-500 text-white">
      <div class="container-custom">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="mb-6">Ready to Transform Your Business?</h2>
          <p class="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Let's discuss how Ingen Cloud Technologies can help you achieve your technology goals and drive your business forward.
          </p>
          <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <NuxtLink to="/contact" class="btn bg-white text-primary-600 hover:bg-neutral-100">
              Get in Touch
            </NuxtLink>
            <NuxtLink to="/services" class="btn bg-transparent border-2 border-white hover:bg-white/10">
              Explore Services
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Testimonials (Placeholder) -->
    <section class="section bg-white dark:bg-neutral-900">
      <div class="container-custom">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-primary-500 mb-4">What Our Clients Say</h2>
          <p class="text-xl text-neutral-600 dark:text-neutral-300">
            Trusted by businesses of all sizes
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="(testimonial, index) in testimonials" :key="index" 
               class="card p-6">
            <div class="flex items-center space-x-1 text-accent-500 mb-4">
              <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <p class="text-neutral-600 dark:text-neutral-300 mb-4 italic">
              "{{ testimonial.quote }}"
            </p>
            <div class="flex items-center">
              <div class="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center mr-3">
                <span class="text-primary-500 font-semibold">{{ testimonial.name.charAt(0) }}</span>
              </div>
              <div>
                <h4 class="font-semibold">{{ testimonial.name }}</h4>
                <p class="text-sm text-neutral-500 dark:text-neutral-400">{{ testimonial.position }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Cloud Cost Estimator Teaser -->
    <section class="section bg-neutral-50 dark:bg-neutral-800">
      <div class="container-custom">
        <div class="bg-white dark:bg-neutral-700 rounded-xl shadow-lg overflow-hidden">
          <div class="grid grid-cols-1 lg:grid-cols-2">
            <div class="p-8 md:p-12">
              <h2 class="text-primary-500 mb-4">Estimate Your Cloud Costs</h2>
              <p class="text-neutral-600 dark:text-neutral-300 mb-6">
                Use our simple Cloud Cost Estimator to get a rough idea of your potential cloud expenses based on your needs.
              </p>
              <NuxtLink to="/cloud-estimator" class="btn-primary">
                Try the Estimator
              </NuxtLink>
            </div>
            <div class="bg-gradient-to-r from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-800/30 p-8 md:p-12 flex items-center justify-center">
              <div class="w-full max-w-md">
                <div class="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6">
                  <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-semibold">Cloud Cost Preview</h3>
                    <span class="text-primary-500 text-sm">Simplified Estimate</span>
                  </div>
                  <div class="space-y-4 mb-6">
                    <div class="h-2 bg-neutral-100 dark:bg-neutral-600 rounded-full w-3/4"></div>
                    <div class="h-2 bg-neutral-100 dark:bg-neutral-600 rounded-full"></div>
                    <div class="h-2 bg-neutral-100 dark:bg-neutral-600 rounded-full w-5/6"></div>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-neutral-500 dark:text-neutral-400">Estimated Monthly Cost:</span>
                    <span class="text-2xl font-bold text-primary-500">$XXX - $XXX</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Define services
const services = [
  {
    title: 'Application Development',
    description: 'Custom mobile, web, and software applications tailored to your business requirements.',
    link: '/services/application-development',
    icon: 'svg-code'
  },
  {
    title: 'Product Management',
    description: 'Strategic planning and execution to bring your product vision to life.',
    link: '/services/product-management',
    icon: 'svg-chart'
  },
  {
    title: 'Cybersecurity',
    description: 'Protect your business with comprehensive security solutions and best practices.',
    link: '/services/cybersecurity',
    icon: 'svg-shield'
  },
  {
    title: 'Cloud Consultation',
    description: 'Expert guidance on cloud strategy, migration, and optimization.',
    link: '/services/cloud-consultation',
    icon: 'svg-cloud'
  },
  {
    title: 'IT Consultation',
    description: 'Strategic technology advice to align IT with your business objectives.',
    link: '/services/it-consultation',
    icon: 'svg-lightbulb'
  },
  {
    title: 'DevOps',
    description: 'Streamline development and operations for faster, more reliable delivery.',
    link: '/services/devops',
    icon: 'svg-refresh'
  }
]

// Define features
const features = [
  {
    title: 'Expertise',
    description: 'Team of experienced professionals with deep industry knowledge.',
    icon: 'svg-academic-cap'
  },
  {
    title: 'Innovation',
    description: 'Cutting-edge solutions using the latest technologies and methodologies.',
    icon: 'svg-light-bulb'
  },
  {
    title: 'Reliability',
    description: 'Consistent delivery of high-quality results on time and within budget.',
    icon: 'svg-check-circle'
  },
  {
    title: 'Partnership',
    description: 'Collaborative approach focused on long-term client relationships.',
    icon: 'svg-users'
  }
]

// Define testimonials (placeholder)
const testimonials = [
  {
    quote: 'Ingen Cloud Technologies transformed our IT infrastructure, resulting in significant cost savings and improved performance.',
    name: 'David Chen',
    position: 'CTO, Manufacturing Company'
  },
  {
    quote: 'The team delivered our mobile app on time and exceeded our expectations. Their expertise was invaluable.',
    name: 'Sarah Lee',
    position: 'Founder, E-commerce Startup'
  },
  {
    quote: 'Their cybersecurity assessment identified critical vulnerabilities we weren\'t aware of. Highly recommended.',
    name: 'Michael Rodriguez',
    position: 'IT Director, Financial Services'
  }
]
</script>

<script>
// SVG Icon Components
export default {
  components: {
    'svg-code': {
      template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>`
    },
    'svg-chart': {
      template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>`
    },
    'svg-shield': {
      template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>`
    },
    'svg-cloud': {
      template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>`
    },
    'svg-lightbulb': {
      template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>`
    },
    'svg-refresh': {
      template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>`
    },
    'svg-academic-cap': {
      template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M12 14l9-5-9-5-9 5 9 5z" />
        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
      </svg>`
    },
    'svg-light-bulb': {
      template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>`
    },
    'svg-check-circle': {
      template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>`
    },
    'svg-users': {
      template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>`
    }
  }
}
</script>