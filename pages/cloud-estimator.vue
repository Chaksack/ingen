<template>
  <div>
    <!-- Page Header -->
    <section class="bg-primary-500 text-white py-16 md:py-20">
      <div class="container-custom">
        <div class="max-w-3xl">
          <h1 class="mb-4 animate-fade-in">Cloud Cost Estimator</h1>
          <p class="text-xl text-white/90 animate-slide-up">
            Get a simplified estimate of your potential cloud costs based on your needs
          </p>
        </div>
      </div>
    </section>
    
    <!-- Estimator Tool -->
    <section class="section bg-white dark:bg-neutral-900">
      <div class="container-custom">
        <div class="max-w-4xl mx-auto">
          <!-- Introduction -->
          <div class="mb-12 text-center">
            <h2 class="text-primary-500 mb-4">Estimate Your Cloud Costs</h2>
            <p class="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
              Use our simple estimator to get a rough idea of your potential monthly cloud expenses. Adjust the parameters below to see how different factors affect your costs.
            </p>
          </div>
          
          <!-- Estimator Card -->
          <div class="bg-white dark:bg-neutral-800 rounded-xl shadow-lg overflow-hidden">
            <div class="p-8">
              <!-- Inputs -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div class="space-y-6">
                  <!-- Number of Users -->
                  <div>
                    <label for="users" class="form-label flex justify-between">
                      <span>Number of Users</span>
                      <span class="text-primary-500 font-medium">{{ formattedUsers }}</span>
                    </label>
                    <input 
                      id="users" 
                      v-model="users" 
                      type="range" 
                      min="1" 
                      max="1000" 
                      step="1" 
                      class="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <div class="flex justify-between text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                      <span>1</span>
                      <span>250</span>
                      <span>500</span>
                      <span>750</span>
                      <span>1000</span>
                    </div>
                  </div>
                  
                  <!-- Data Storage -->
                  <div>
                    <label class="form-label">Data Storage Needed</label>
                    <div class="grid grid-cols-3 gap-3">
                      <button 
                        v-for="option in storageOptions" 
                        :key="option.value" 
                        @click="storage = option.value" 
                        class="py-2 px-3 rounded-md text-sm font-medium transition-colors duration-200 border"
                        :class="storage === option.value ? 
                          'bg-primary-500 text-white border-primary-500' : 
                          'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-700'"
                      >
                        {{ option.label }}
                      </button>
                    </div>
                  </div>
                  
                  <!-- Application Complexity -->
                  <div>
                    <label class="form-label">Application Complexity</label>
                    <div class="grid grid-cols-3 gap-3">
                      <button 
                        v-for="option in complexityOptions" 
                        :key="option.value" 
                        @click="complexity = option.value" 
                        class="py-2 px-3 rounded-md text-sm font-medium transition-colors duration-200 border"
                        :class="complexity === option.value ? 
                          'bg-primary-500 text-white border-primary-500' : 
                          'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-700'"
                      >
                        {{ option.label }}
                      </button>
                    </div>
                  </div>
                </div>
                
                <!-- Results -->
                <div class="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-6">
                  <h3 class="text-xl font-semibold mb-4 text-center">Estimated Monthly Cost</h3>
                  
                  <div class="flex justify-center mb-6">
                    <div class="relative">
                      <div class="text-5xl font-bold text-primary-500 transition-all duration-500 estimate-change">
                        ${{ estimatedCostRange.min.toLocaleString() }} - ${{ estimatedCostRange.max.toLocaleString() }}
                      </div>
                      <div class="absolute -top-3 -right-3">
                        <div class="bg-accent-100 text-accent-800 dark:bg-accent-900/30 dark:text-accent-300 text-xs font-medium px-2 py-1 rounded-full">
                          Per Month
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="space-y-4">
                    <div class="flex justify-between items-center">
                      <span class="text-sm text-neutral-600 dark:text-neutral-400">Compute</span>
                      <span class="font-medium">${{ computeCost.toLocaleString() }}</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-sm text-neutral-600 dark:text-neutral-400">Storage</span>
                      <span class="font-medium">${{ storageCost.toLocaleString() }}</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-sm text-neutral-600 dark:text-neutral-400">Network</span>
                      <span class="font-medium">${{ networkCost.toLocaleString() }}</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-sm text-neutral-600 dark:text-neutral-400">Other Services</span>
                      <span class="font-medium">${{ otherServicesCost.toLocaleString() }}</span>
                    </div>
                    <div class="border-t border-neutral-200 dark:border-neutral-700 pt-3 flex justify-between items-center">
                      <span class="font-medium">Subtotal</span>
                      <span class="font-medium">${{ subtotal.toLocaleString() }}</span>
                    </div>
                    <div class="flex justify-between items-center text-sm text-neutral-500 dark:text-neutral-400">
                      <span>Variability Range (±20%)</span>
                      <span>±${{ variabilityAmount.toLocaleString() }}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Disclaimer -->
              <div class="bg-neutral-100 dark:bg-neutral-700 p-4 rounded-lg text-sm text-neutral-600 dark:text-neutral-300">
                <p class="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-neutral-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>
                    <strong>Disclaimer:</strong> This is a simplified estimate based on general cloud pricing models and is not a quote. Actual costs may vary based on specific provider pricing, region, usage patterns, and additional services required. For a detailed consultation and accurate pricing, please contact our team.
                  </span>
                </p>
              </div>
            </div>
            
            <!-- CTA -->
            <div class="bg-primary-500 p-6 text-white text-center">
              <p class="mb-4 text-lg">Need a more detailed and accurate cost analysis?</p>
              <NuxtLink to="/contact" class="btn bg-white text-primary-600 hover:bg-neutral-100">
                Get a Detailed Consultation
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- How It Works -->
    <section class="section bg-neutral-50 dark:bg-neutral-800">
      <div class="container-custom">
        <div class="max-w-3xl mx-auto mb-16 text-center">
          <h2 class="text-primary-500 mb-4">How Our Estimator Works</h2>
          <p class="text-lg text-neutral-600 dark:text-neutral-300">
            Understanding the factors that influence your cloud costs
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Factor 1 -->
          <div class="bg-white dark:bg-neutral-700 rounded-lg p-6 shadow-sm">
            <div class="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-3">Number of Users</h3>
            <p class="text-neutral-600 dark:text-neutral-300">
              The number of users affects compute resources, database connections, and authentication services. More users typically means higher costs for scaling your infrastructure.
            </p>
          </div>
          
          <!-- Factor 2 -->
          <div class="bg-white dark:bg-neutral-700 rounded-lg p-6 shadow-sm">
            <div class="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-3">Data Storage</h3>
            <p class="text-neutral-600 dark:text-neutral-300">
              Storage costs are based on the amount of data you need to store, including databases, file storage, and backups. Different storage tiers have different pricing models.
            </p>
          </div>
          
          <!-- Factor 3 -->
          <div class="bg-white dark:bg-neutral-700 rounded-lg p-6 shadow-sm">
            <div class="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-3">Application Complexity</h3>
            <p class="text-neutral-600 dark:text-neutral-300">
              More complex applications require additional services, more compute resources, and often more sophisticated architecture, all of which impact your overall cloud costs.
            </p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Cost Optimization Tips -->
    <section class="section bg-white dark:bg-neutral-900">
      <div class="container-custom">
        <div class="max-w-3xl mx-auto mb-16 text-center">
          <h2 class="text-primary-500 mb-4">Cloud Cost Optimization Tips</h2>
          <p class="text-lg text-neutral-600 dark:text-neutral-300">
            Strategies to help you maximize value and minimize costs
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Tip 1 -->
          <div class="flex items-start space-x-4">
            <div class="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
              <span class="text-primary-500 font-semibold">1</span>
            </div>
            <div>
              <h3 class="text-lg font-semibold mb-2">Right-size Your Resources</h3>
              <p class="text-neutral-600 dark:text-neutral-300">
                Regularly review your resource utilization and adjust instance sizes to match your actual needs. Many organizations over-provision resources, leading to unnecessary costs.
              </p>
            </div>
          </div>
          
          <!-- Tip 2 -->
          <div class="flex items-start space-x-4">
            <div class="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
              <span class="text-primary-500 font-semibold">2</span>
            </div>
            <div>
              <h3 class="text-lg font-semibold mb-2">Use Reserved Instances</h3>
              <p class="text-neutral-600 dark:text-neutral-300">
                For predictable workloads, consider purchasing reserved instances instead of on-demand. This can provide significant discounts for 1-3 year commitments.
              </p>
            </div>
          </div>
          
          <!-- Tip 3 -->
          <div class="flex items-start space-x-4">
            <div class="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
              <span class="text-primary-500 font-semibold">3</span>
            </div>
            <div>
              <h3 class="text-lg font-semibold mb-2">Implement Auto-scaling</h3>
              <p class="text-neutral-600 dark:text-neutral-300">
                Configure auto-scaling to automatically adjust resources based on demand. This ensures you're only paying for what you need when you need it.
              </p>
            </div>
          </div>
          
          <!-- Tip 4 -->
          <div class="flex items-start space-x-4">
            <div class="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
              <span class="text-primary-500 font-semibold">4</span>
            </div>
            <div>
              <h3 class="text-lg font-semibold mb-2">Optimize Storage Usage</h3>
              <p class="text-neutral-600 dark:text-neutral-300">
                Implement lifecycle policies to move infrequently accessed data to lower-cost storage tiers. Regularly clean up unused storage resources.
              </p>
            </div>
          </div>
          
          <!-- Tip 5 -->
          <div class="flex items-start space-x-4">
            <div class="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
              <span class="text-primary-500 font-semibold">5</span>
            </div>
            <div>
              <h3 class="text-lg font-semibold mb-2">Monitor and Analyze Costs</h3>
              <p class="text-neutral-600 dark:text-neutral-300">
                Use cloud cost management tools to track spending, identify trends, and detect anomalies. Regular monitoring helps prevent unexpected cost increases.
              </p>
            </div>
          </div>
          
          <!-- Tip 6 -->
          <div class="flex items-start space-x-4">
            <div class="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
              <span class="text-primary-500 font-semibold">6</span>
            </div>
            <div>
              <h3 class="text-lg font-semibold mb-2">Leverage Managed Services</h3>
              <p class="text-neutral-600 dark:text-neutral-300">
                Consider using managed services instead of self-managed infrastructure when appropriate. This can reduce operational overhead and often provides better cost efficiency.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- CTA Section -->
    <section class="section bg-primary-500 text-white">
      <div class="container-custom">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="mb-6">Ready for a Detailed Cloud Cost Analysis?</h2>
          <p class="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Our cloud experts can provide a comprehensive assessment of your specific needs and help you optimize your cloud infrastructure for maximum efficiency and cost-effectiveness.
          </p>
          <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <NuxtLink to="/contact" class="btn bg-white text-primary-600 hover:bg-neutral-100">
              Get a Detailed Consultation
            </NuxtLink>
            <NuxtLink to="/services/cloud-consultation" class="btn bg-transparent border-2 border-white hover:bg-white/10">
              Learn About Our Cloud Services
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// Form inputs
const users = ref(50)
const storage = ref('medium')
const complexity = ref('medium')

// Storage options
const storageOptions = [
  { value: 'small', label: 'Small (100GB)' },
  { value: 'medium', label: 'Medium (1TB)' },
  { value: 'large', label: 'Large (10TB+)' }
]

// Complexity options
const complexityOptions = [
  { value: 'simple', label: 'Simple Website' },
  { value: 'medium', label: 'Complex Web App' },
  { value: 'complex', label: 'Enterprise System' }
]

// Format users display
const formattedUsers = computed(() => {
  return users.value.toLocaleString()
})

// Calculate costs
const computeCost = computed(() => {
  // Base cost per user
  let baseCost = 5
  
  // Adjust based on complexity
  if (complexity.value === 'simple') {
    baseCost = 3
  } else if (complexity.value === 'complex') {
    baseCost = 8
  }
  
  // Calculate with some economies of scale
  let cost = 0
  if (users.value <= 10) {
    cost = users.value * baseCost
  } else if (users.value <= 100) {
    cost = 10 * baseCost + (users.value - 10) * baseCost * 0.9
  } else if (users.value <= 500) {
    cost = 10 * baseCost + 90 * baseCost * 0.9 + (users.value - 100) * baseCost * 0.8
  } else {
    cost = 10 * baseCost + 90 * baseCost * 0.9 + 400 * baseCost * 0.8 + (users.value - 500) * baseCost * 0.7
  }
  
  return Math.round(cost * 30) // Monthly cost
})

const storageCost = computed(() => {
  // Base storage costs per month
  if (storage.value === 'small') {
    return 20
  } else if (storage.value === 'medium') {
    return 150
  } else {
    return 1200
  }
})

const networkCost = computed(() => {
  // Network costs based on users and complexity
  let baseCost = 0.5 * users.value
  
  if (complexity.value === 'simple') {
    baseCost *= 0.7
  } else if (complexity.value === 'complex') {
    baseCost *= 1.5
  }
  
  return Math.round(baseCost)
})

const otherServicesCost = computed(() => {
  // Other services based on complexity
  let baseCost = 50
  
  if (complexity.value === 'simple') {
    baseCost = 30
  } else if (complexity.value === 'complex') {
    baseCost = 200
  }
  
  // Scale with users
  return Math.round(baseCost + (users.value * 0.2))
})

const subtotal = computed(() => {
  return computeCost.value + storageCost.value + networkCost.value + otherServicesCost.value
})

const variabilityAmount = computed(() => {
  return Math.round(subtotal.value * 0.2)
})

const estimatedCostRange = computed(() => {
  return {
    min: Math.round(subtotal.value - variabilityAmount.value),
    max: Math.round(subtotal.value + variabilityAmount.value)
  }
})
</script>