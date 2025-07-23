<template>
  <div>
    <!-- Page Header -->
    <section class="bg-primary-500 text-white py-16 md:py-20">
      <div class="container-custom">
        <div class="max-w-3xl">
          <h1 class="mb-4 animate-fade-in">Blog & Insights</h1>
          <p class="text-xl text-white/90 animate-slide-up">
            Thoughts, insights, and perspectives from our team of experts
          </p>
        </div>
      </div>
    </section>
    
    <!-- Blog Listing -->
    <section class="section bg-white dark:bg-neutral-900">
      <div class="container-custom">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2">
            <!-- Featured Article -->
            <div v-if="featuredArticle" class="mb-12">
              <h2 class="text-2xl font-semibold text-primary-500 mb-6">Featured Article</h2>
              <div class="card overflow-hidden hover:shadow-lg transition-all duration-300">
                <div class="aspect-video bg-neutral-100 dark:bg-neutral-800 relative">
                  <div v-if="featuredArticle.image" class="absolute inset-0 bg-cover bg-center" :style="`background-image: url(${featuredArticle.image})`"></div>
                  <div v-else class="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-800/30 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 text-primary-500/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 002-2V8a2 2 0 00-2-2h-5a2 2 0 00-2 2v12a2 2 0 002 2h5zm-9-3h2m-4-3h6m-6-3h4" />
                    </svg>
                  </div>
                </div>
                <div class="p-6">
                  <div class="flex items-center space-x-2 mb-3">
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300">
                      {{ featuredArticle.category }}
                    </span>
                    <span class="text-neutral-500 dark:text-neutral-400 text-sm">
                      {{ formatDate(featuredArticle.date) }}
                    </span>
                  </div>
                  <h3 class="text-xl font-semibold mb-3">{{ featuredArticle.title }}</h3>
                  <p class="text-neutral-600 dark:text-neutral-300 mb-4">
                    {{ featuredArticle.description }}
                  </p>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center">
                      <div class="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center mr-2">
                        <span class="text-primary-500 font-semibold text-xs">{{ getInitials(featuredArticle.author) }}</span>
                      </div>
                      <span class="text-sm text-neutral-600 dark:text-neutral-300">{{ featuredArticle.author }}</span>
                    </div>
                    <NuxtLink :to="`/blog/${featuredArticle.slug}`" class="text-primary-500 hover:text-primary-600 font-medium inline-flex items-center">
                      Read More
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Articles Grid -->
            <div>
              <h2 class="text-2xl font-semibold text-primary-500 mb-6">Latest Articles</h2>
              
              <div v-if="articles.length > 0" class="space-y-8">
                <div v-for="article in paginatedArticles" :key="article.slug" class="card overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div class="md:flex">
                    <div class="md:w-1/3 bg-neutral-100 dark:bg-neutral-800 relative">
                      <div v-if="article.image" class="absolute inset-0 bg-cover bg-center" :style="`background-image: url(${article.image})`"></div>
                      <div v-else class="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-800/30 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-primary-500/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 002-2V8a2 2 0 00-2-2h-5a2 2 0 00-2 2v12a2 2 0 002 2h5zm-9-3h2m-4-3h6m-6-3h4" />
                        </svg>
                      </div>
                      <div class="pb-[60%] md:pb-0"></div>
                    </div>
                    <div class="p-6 md:w-2/3">
                      <div class="flex items-center space-x-2 mb-3">
                        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300">
                          {{ article.category }}
                        </span>
                        <span class="text-neutral-500 dark:text-neutral-400 text-sm">
                          {{ formatDate(article.date) }}
                        </span>
                      </div>
                      <h3 class="text-xl font-semibold mb-3">{{ article.title }}</h3>
                      <p class="text-neutral-600 dark:text-neutral-300 mb-4">
                        {{ article.description }}
                      </p>
                      <div class="flex items-center justify-between">
                        <div class="flex items-center">
                          <div class="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center mr-2">
                            <span class="text-primary-500 font-semibold text-xs">{{ getInitials(article.author) }}</span>
                          </div>
                          <span class="text-sm text-neutral-600 dark:text-neutral-300">{{ article.author }}</span>
                        </div>
                        <NuxtLink :to="`/blog/${article.slug}`" class="text-primary-500 hover:text-primary-600 font-medium inline-flex items-center">
                          Read More
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </NuxtLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Empty State -->
              <div v-else class="text-center py-12 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-neutral-300 dark:text-neutral-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 002-2V8a2 2 0 00-2-2h-5a2 2 0 00-2 2v12a2 2 0 002 2h5zm-9-3h2m-4-3h6m-6-3h4" />
                </svg>
                <h3 class="text-xl font-semibold mb-2">No Articles Found</h3>
                <p class="text-neutral-600 dark:text-neutral-300 max-w-md mx-auto">
                  We're working on creating valuable content for you. Check back soon for new articles!
                </p>
              </div>
              
              <!-- Pagination -->
              <div v-if="totalPages > 1" class="mt-12 flex justify-center">
                <div class="flex space-x-2">
                  <button 
                    @click="currentPage > 1 && (currentPage--)" 
                    class="px-4 py-2 rounded-md border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    :disabled="currentPage === 1"
                  >
                    Previous
                  </button>
                  <div v-for="page in totalPages" :key="page" class="hidden md:block">
                    <button 
                      @click="currentPage = page" 
                      class="px-4 py-2 rounded-md border transition-colors duration-200"
                      :class="currentPage === page ? 
                        'bg-primary-500 text-white border-primary-500' : 
                        'border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800'"
                    >
                      {{ page }}
                    </button>
                  </div>
                  <button 
                    @click="currentPage < totalPages && (currentPage++)" 
                    class="px-4 py-2 rounded-md border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    :disabled="currentPage === totalPages"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Sidebar -->
          <div class="lg:col-span-1 space-y-8">
            <!-- Search -->
            <div class="card p-6">
              <h3 class="text-lg font-semibold mb-4">Search</h3>
              <div class="relative">
                <input 
                  v-model="searchQuery" 
                  type="text" 
                  placeholder="Search articles..." 
                  class="form-input pr-10"
                />
                <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <!-- Categories -->
            <div class="card p-6">
              <h3 class="text-lg font-semibold mb-4">Categories</h3>
              <div class="space-y-2">
                <button 
                  @click="selectedCategory = ''" 
                  class="w-full text-left px-3 py-2 rounded-md transition-colors duration-200"
                  :class="selectedCategory === '' ? 
                    'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300' : 
                    'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800'"
                >
                  All Categories
                </button>
                <button 
                  v-for="category in categories" 
                  :key="category" 
                  @click="selectedCategory = category" 
                  class="w-full text-left px-3 py-2 rounded-md transition-colors duration-200"
                  :class="selectedCategory === category ? 
                    'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300' : 
                    'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800'"
                >
                  {{ category }}
                </button>
              </div>
            </div>
            
            <!-- Recent Posts -->
            <div class="card p-6">
              <h3 class="text-lg font-semibold mb-4">Recent Posts</h3>
              <div class="space-y-4">
                <div v-for="article in recentArticles" :key="article.slug" class="flex items-start space-x-3">
                  <div class="w-12 h-12 rounded-md bg-neutral-100 dark:bg-neutral-800 flex-shrink-0 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-500/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 002-2V8a2 2 0 00-2-2h-5a2 2 0 00-2 2v12a2 2 0 002 2h5zm-9-3h2m-4-3h6m-6-3h4" />
                    </svg>
                  </div>
                  <div>
                    <NuxtLink :to="`/blog/${article.slug}`" class="font-medium text-neutral-800 dark:text-neutral-100 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200">
                      {{ article.title }}
                    </NuxtLink>
                    <p class="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                      {{ formatDate(article.date) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Newsletter Signup -->
            <div class="card p-6 bg-gradient-to-br from-primary-500 to-primary-600 text-white">
              <h3 class="text-lg font-semibold mb-2">Subscribe to Our Newsletter</h3>
              <p class="text-white/80 mb-4 text-sm">
                Get the latest insights and updates delivered to your inbox.
              </p>
              <form @submit.prevent="subscribeToNewsletter" class="space-y-3">
                <input 
                  v-model="newsletterEmail" 
                  type="email" 
                  placeholder="Your email address" 
                  class="form-input bg-white/10 border-white/20 text-white placeholder-white/60 w-full focus:bg-white/20"
                  required
                />
                <button type="submit" class="btn bg-white text-primary-600 hover:bg-white/90 w-full">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Pagination
const currentPage = ref(1)
const articlesPerPage = 5

// Filtering
const searchQuery = ref('')
const selectedCategory = ref('')

// Newsletter
const newsletterEmail = ref('')

// Mock data for articles (in a real app, this would come from Nuxt Content)
const allArticles = ref([
  {
    title: 'The Future of Cloud Computing: Trends to Watch',
    slug: 'future-of-cloud-computing',
    description: 'Explore the emerging trends in cloud computing that are shaping the future of technology infrastructure.',
    date: '2025-07-15',
    author: 'Michael Johnson',
    category: 'Cloud',
    image: null,
    featured: true
  },
  {
    title: 'Building Scalable Web Applications with Vue 3 and Nuxt',
    slug: 'building-scalable-web-applications',
    description: 'Learn how to leverage Vue 3 and Nuxt to build web applications that can scale to meet growing demands.',
    date: '2025-07-10',
    author: 'Sarah Williams',
    category: 'Development',
    image: null
  },
  {
    title: 'Cybersecurity Best Practices for Remote Teams',
    slug: 'cybersecurity-best-practices',
    description: 'Discover essential cybersecurity practices to protect your business when working with remote teams.',
    date: '2025-07-05',
    author: 'Robert Chen',
    category: 'Cybersecurity',
    image: null
  },
  {
    title: 'Optimizing Cloud Costs: Strategies for Efficiency',
    slug: 'optimizing-cloud-costs',
    description: 'Learn effective strategies to optimize your cloud spending without compromising performance or security.',
    date: '2025-06-28',
    author: 'Emily Rodriguez',
    category: 'Cloud',
    image: null
  },
  {
    title: 'The Role of DevOps in Modern Software Development',
    slug: 'role-of-devops',
    description: 'Explore how DevOps practices are transforming software development and operations in today\'s tech landscape.',
    date: '2025-06-20',
    author: 'David Kim',
    category: 'DevOps',
    image: null
  },
  {
    title: 'Implementing Microservices Architecture',
    slug: 'implementing-microservices',
    description: 'A comprehensive guide to implementing microservices architecture in your organization.',
    date: '2025-06-15',
    author: 'Jennifer Lee',
    category: 'Architecture',
    image: null
  },
  {
    title: 'AI and Machine Learning in Business Applications',
    slug: 'ai-machine-learning-business',
    description: 'How businesses are leveraging AI and machine learning to gain competitive advantages and improve operations.',
    date: '2025-06-10',
    author: 'Michael Johnson',
    category: 'Technology',
    image: null
  }
])

// Featured article
const featuredArticle = computed(() => {
  return allArticles.value.find(article => article.featured)
})

// Filter articles based on search and category
const filteredArticles = computed(() => {
  // Remove featured article from the list
  let articles = allArticles.value.filter(article => !article.featured)
  
  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    articles = articles.filter(article => 
      article.title.toLowerCase().includes(query) || 
      article.description.toLowerCase().includes(query) ||
      article.author.toLowerCase().includes(query)
    )
  }
  
  // Apply category filter
  if (selectedCategory.value) {
    articles = articles.filter(article => article.category === selectedCategory.value)
  }
  
  return articles
})

// Get articles for current page
const paginatedArticles = computed(() => {
  const startIndex = (currentPage.value - 1) * articlesPerPage
  const endIndex = startIndex + articlesPerPage
  return filteredArticles.value.slice(startIndex, endIndex)
})

// Calculate total pages
const totalPages = computed(() => {
  return Math.ceil(filteredArticles.value.length / articlesPerPage)
})

// Get recent articles for sidebar
const recentArticles = computed(() => {
  return [...allArticles.value].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3)
})

// Get unique categories
const categories = computed(() => {
  const categorySet = new Set(allArticles.value.map(article => article.category))
  return Array.from(categorySet)
})

// Format date
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('en-US', options)
}

// Get initials from name
const getInitials = (name) => {
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
}

// Subscribe to newsletter
const subscribeToNewsletter = () => {
  // In a real app, this would send the email to a backend service
  alert(`Thank you for subscribing with ${newsletterEmail.value}!`)
  newsletterEmail.value = ''
}

// Reset to page 1 when filters change
watch([searchQuery, selectedCategory], () => {
  currentPage.value = 1
})

// In a real Nuxt app, we would fetch content from the content directory
// For example:
// const { data: articles } = await useAsyncData('articles', () => 
//   queryContent('blog').sort({ date: -1 }).find()
// )
</script>