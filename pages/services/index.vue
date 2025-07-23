<template>
  <div>
    <!-- Page Header -->
    <section class="bg-primary-500 text-white py-16 md:py-20">
      <div class="container-custom">
        <div class="max-w-3xl">
          <h1 class="mb-4 animate-fade-in">Our Services</h1>
          <p class="text-xl text-white/90 animate-slide-up">
            Comprehensive technology solutions tailored to your business needs
          </p>
        </div>
      </div>
    </section>
    
    <!-- Services Overview -->
    <section class="section bg-white dark:bg-neutral-900">
      <div class="container-custom">
        <div class="max-w-3xl mb-16">
          <h2 class="text-primary-500 mb-4">How We Can Help</h2>
          <p class="text-lg text-neutral-600 dark:text-neutral-300">
            At Ingen Cloud Technologies, we offer a comprehensive range of technology services designed to help your business thrive in the digital era. Our team of experts brings deep industry knowledge and technical expertise to every project.
          </p>
        </div>
        
        <div class="grid grid-cols-1 gap-12">
          <!-- Service 1: Application Development -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div class="lg:col-span-2 order-2 lg:order-1">
              <h3 class="text-2xl font-semibold mb-4">Application Development</h3>
              <p class="text-neutral-600 dark:text-neutral-300 mb-4">
                Our application development services help you create custom software solutions that address your unique business challenges. Whether you need a mobile app, web application, or enterprise software, our team delivers high-quality, scalable, and secure applications.
              </p>
              <ul class="space-y-2 mb-6">
                <li class="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-neutral-600 dark:text-neutral-300">Mobile App Development (iOS, Android)</span>
                </li>
                <li class="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-neutral-600 dark:text-neutral-300">Web Application Development</span>
                </li>
                <li class="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-neutral-600 dark:text-neutral-300">Custom Software Development</span>
                </li>
                <li class="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-neutral-600 dark:text-neutral-300">API Development & Integration</span>
                </li>
              </ul>
              <NuxtLink to="/services/application-development" class="btn-primary">
                Learn More
              </NuxtLink>
            </div>
            <div class="order-1 lg:order-2">
              <div class="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-8 shadow-md">
                <div class="aspect-square rounded-lg bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-800/30 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 text-primary-500/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Service 2: Product Management -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div class="order-1">
              <div class="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-8 shadow-md">
                <div class="aspect-square rounded-lg bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-800/30 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 text-primary-500/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
            </div>
            <div class="lg:col-span-2 order-2">
              <h3 class="text-2xl font-semibold mb-4">Product Management</h3>
              <p class="text-neutral-600 dark:text-neutral-300 mb-4">
                Our product management services help you bring your product vision to life. From concept to launch and beyond, we provide strategic guidance and execution support to ensure your product meets market needs and achieves business objectives.
              </p>
              <ul class="space-y-2 mb-6">
                <li class="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-neutral-600 dark:text-neutral-300">Product Strategy & Roadmapping</span>
                </li>
                <li class="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-neutral-600 dark:text-neutral-300">Market & User Research</span>
                </li>
                <li class="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-neutral-600 dark:text-neutral-300">Agile Development Management</span>
                </li>
                <li class="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-neutral-600 dark:text-neutral-300">Product Launch & Growth Strategies</span>
                </li>
              </ul>
              <NuxtLink to="/services/product-management" class="btn-primary">
                Learn More
              </NuxtLink>
            </div>
          </div>
          
          <!-- More services would be listed here -->
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
            <NuxtLink to="/cloud-estimator" class="btn bg-transparent border-2 border-white hover:bg-white/10">
              Try Our Cloud Cost Estimator
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Services overview page
</script>