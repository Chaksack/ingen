<template>
  <footer class="bg-neutral-900 text-white pt-16 pb-8">
    <div class="container-custom">
      <!-- Footer Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <!-- Company Info -->
        <div class="space-y-4">
          <div class="flex items-center space-x-2 mb-4">
            <span class="text-primary-500 text-xl font-bold font-display">Ingen</span>
            <span class="text-white text-xl font-bold font-display">Cloud</span>
          </div>
          <p class="text-neutral-400 text-sm">
            Leading provider of technology solutions including Application Development, 
            Product Management, Cybersecurity, Cloud Consultation, IT Consultation, and DevOps.
          </p>
          <div class="flex space-x-4 mt-4">
            <a href="#" class="text-neutral-400 hover:text-primary-500 transition-colors duration-200">
              <span class="sr-only">LinkedIn</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="#" class="text-neutral-400 hover:text-primary-500 transition-colors duration-200">
              <span class="sr-only">Twitter</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="#" class="text-neutral-400 hover:text-primary-500 transition-colors duration-200">
              <span class="sr-only">GitHub</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"/>
              </svg>
            </a>
          </div>
        </div>
        
        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
          <ul class="space-y-2">
            <li><NuxtLink to="/" class="text-neutral-400 hover:text-primary-500 transition-colors duration-200">Home</NuxtLink></li>
            <li><NuxtLink to="/about" class="text-neutral-400 hover:text-primary-500 transition-colors duration-200">About Us</NuxtLink></li>
            <li><NuxtLink to="/services" class="text-neutral-400 hover:text-primary-500 transition-colors duration-200">Services</NuxtLink></li>
            <li><NuxtLink to="/careers" class="text-neutral-400 hover:text-primary-500 transition-colors duration-200">Careers</NuxtLink></li>
            <li><NuxtLink to="/blog" class="text-neutral-400 hover:text-primary-500 transition-colors duration-200">Blog</NuxtLink></li>
            <li><NuxtLink to="/contact" class="text-neutral-400 hover:text-primary-500 transition-colors duration-200">Contact</NuxtLink></li>
          </ul>
        </div>
        
        <!-- Services -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Services</h3>
          <ul class="space-y-2">
            <li><NuxtLink to="/services/application-development" class="text-neutral-400 hover:text-primary-500 transition-colors duration-200">Application Development</NuxtLink></li>
            <li><NuxtLink to="/services/product-management" class="text-neutral-400 hover:text-primary-500 transition-colors duration-200">Product Management</NuxtLink></li>
            <li><NuxtLink to="/services/cybersecurity" class="text-neutral-400 hover:text-primary-500 transition-colors duration-200">Cybersecurity</NuxtLink></li>
            <li><NuxtLink to="/services/cloud-consultation" class="text-neutral-400 hover:text-primary-500 transition-colors duration-200">Cloud Consultation</NuxtLink></li>
            <li><NuxtLink to="/services/it-consultation" class="text-neutral-400 hover:text-primary-500 transition-colors duration-200">IT Consultation</NuxtLink></li>
            <li><NuxtLink to="/services/devops" class="text-neutral-400 hover:text-primary-500 transition-colors duration-200">DevOps</NuxtLink></li>
          </ul>
        </div>
        
        <!-- Contact Info -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Contact Us</h3>
          <ul class="space-y-3">
            <li class="flex items-start space-x-3">
              <svg class="h-6 w-6 text-primary-500 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span class="text-neutral-400">info@ingencloudtechnologies.com</span>
            </li>
            <li class="flex items-start space-x-3">
              <svg class="h-6 w-6 text-primary-500 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span class="text-neutral-400">Remote-first company</span>
            </li>
            <li class="mt-4">
              <NuxtLink to="/contact" class="btn-primary">
                Schedule a Call
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      
      <!-- Divider -->
      <div class="border-t border-neutral-800 my-8"></div>
      
      <!-- Copyright -->
      <div class="flex flex-col md:flex-row justify-between items-center">
        <p class="text-neutral-500 text-sm">
          &copy; {{ new Date().getFullYear() }} Ingen Cloud Technologies. All rights reserved.
        </p>
        <div class="flex space-x-6 mt-4 md:mt-0">
          <NuxtLink to="/privacy-policy" class="text-neutral-500 hover:text-primary-500 text-sm transition-colors duration-200">
            Privacy Policy
          </NuxtLink>
          <NuxtLink to="/terms-of-service" class="text-neutral-500 hover:text-primary-500 text-sm transition-colors duration-200">
            Terms of Service
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Footer component with company info, navigation links, services, contact info, and copyright
</script>