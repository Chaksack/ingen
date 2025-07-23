<template>
  <header class="bg-white dark:bg-neutral-900 shadow-sm sticky top-0 z-50 transition-all duration-300" 
          :class="{ 'shadow-md': scrolled }">
    <div class="container-custom">
      <div class="flex items-center justify-between h-20">
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center">
          <NuxtLink to="/" class="flex items-center space-x-2">
            <span class="text-primary-500 text-2xl font-bold font-display">Ingen</span>
            <span class="text-neutral-800 dark:text-white text-2xl font-bold font-display">Cloud</span>
          </NuxtLink>
        </div>
        
        <!-- Desktop Navigation -->
        <nav class="hidden md:flex space-x-8">
          <NuxtLink v-for="item in navigationItems" :key="item.name" 
                    :to="item.href"
                    class="text-neutral-600 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
                    active-class="text-primary-500 dark:text-primary-400">
            {{ item.name }}
          </NuxtLink>
        </nav>
        
        <!-- CTA Button (Desktop) -->
        <div class="hidden md:flex items-center space-x-4">
          <NuxtLink to="/contact" class="btn-primary">
            Contact Us
          </NuxtLink>
        </div>
        
        <!-- Mobile Menu Button -->
        <div class="flex md:hidden">
          <button @click="mobileMenuOpen = !mobileMenuOpen" 
                  class="inline-flex items-center justify-center p-2 rounded-md text-neutral-600 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 focus:outline-none">
            <span class="sr-only">Open main menu</span>
            <!-- Icon when menu is closed -->
            <svg v-if="!mobileMenuOpen" class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <!-- Icon when menu is open -->
            <svg v-else class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div v-if="mobileMenuOpen" class="md:hidden bg-white dark:bg-neutral-900 shadow-lg">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NuxtLink v-for="item in navigationItems" :key="item.name" 
                    :to="item.href"
                    class="block px-3 py-2 rounded-md text-base font-medium text-neutral-600 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors duration-200"
                    active-class="text-primary-500 dark:text-primary-400 bg-neutral-50 dark:bg-neutral-800"
                    @click="mobileMenuOpen = false">
            {{ item.name }}
          </NuxtLink>
          <NuxtLink to="/contact" 
                    class="block px-3 py-2 rounded-md text-base font-medium text-white bg-primary-500 hover:bg-primary-600 transition-colors duration-200"
                    @click="mobileMenuOpen = false">
            Contact Us
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Navigation items
const navigationItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Careers', href: '/careers' },
  { name: 'Blog', href: '/blog' }
]

// Mobile menu state
const mobileMenuOpen = ref(false)

// Scroll state for header shadow
const scrolled = ref(false)

// Update scrolled state on scroll
const handleScroll = () => {
  scrolled.value = window.scrollY > 10
}

// Add and remove scroll event listener
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>