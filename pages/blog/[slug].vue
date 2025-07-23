<template>
  <div>
    <!-- Article Header -->
    <section class="bg-primary-500 text-white py-16 md:py-20">
      <div class="container-custom">
        <div class="max-w-3xl mx-auto">
          <div class="flex items-center space-x-2 mb-4 animate-fade-in">
            <NuxtLink to="/blog" class="text-white/80 hover:text-white transition-colors duration-200 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </NuxtLink>
            <span class="text-white/50">•</span>
            <span class="text-white/80">{{ article.category }}</span>
          </div>
          <h1 class="mb-4 animate-fade-in">{{ article.title }}</h1>
          <div class="flex items-center space-x-4 text-white/90 animate-slide-up">
            <div class="flex items-center">
              <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                <span class="text-white font-semibold">{{ getInitials(article.author) }}</span>
              </div>
              <div>
                <div class="font-medium">{{ article.author }}</div>
                <div class="text-sm text-white/70">{{ formatDate(article.date) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Article Content -->
    <section class="section bg-white dark:bg-neutral-900">
      <div class="container-custom">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2">
            <article class="prose prose-lg dark:prose-invert prose-primary max-w-none">
              <!-- Featured Image -->
              <div class="aspect-video bg-neutral-100 dark:bg-neutral-800 rounded-lg mb-8 relative overflow-hidden">
                <div v-if="article.image" class="absolute inset-0 bg-cover bg-center" :style="`background-image: url(${article.image})`"></div>
                <div v-else class="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-800/30 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 text-primary-500/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 002-2V8a2 2 0 00-2-2h-5a2 2 0 00-2 2v12a2 2 0 002 2h5zm-9-3h2m-4-3h6m-6-3h4" />
                  </svg>
                </div>
              </div>
              
              <!-- Article Introduction -->
              <p class="lead">
                {{ article.description }}
              </p>
              
              <!-- Sample Content (in a real app, this would come from Nuxt Content) -->
              <h2>Introduction</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
              </p>
              
              <p>
                Proin in sagittis nulla. Nulla facilisi. Nullam euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
              </p>
              
              <h2>Key Considerations</h2>
              <p>
                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
              </p>
              
              <ul>
                <li>First consideration point with detailed explanation</li>
                <li>Second consideration point with detailed explanation</li>
                <li>Third consideration point with detailed explanation</li>
                <li>Fourth consideration point with detailed explanation</li>
              </ul>
              
              <h2>Implementation Strategies</h2>
              <p>
                Curabitur euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
              </p>
              
              <blockquote>
                <p>The most effective approach is to start with a clear strategy and adapt as you learn more about your specific requirements and constraints.</p>
              </blockquote>
              
              <h3>Strategy 1: Incremental Approach</h3>
              <p>
                Nullam euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
              </p>
              
              <h3>Strategy 2: Comprehensive Solution</h3>
              <p>
                Etiam euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
              </p>
              
              <h2>Case Study</h2>
              <p>
                Fusce euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
              </p>
              
              <h2>Conclusion</h2>
              <p>
                In conclusion, lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
              </p>
            </article>
            
            <!-- Author Bio -->
            <div class="mt-12 p-6 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
              <div class="flex items-start space-x-4">
                <div class="w-16 h-16 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center flex-shrink-0">
                  <span class="text-primary-500 font-semibold text-xl">{{ getInitials(article.author) }}</span>
                </div>
                <div>
                  <h3 class="text-xl font-semibold mb-2">About the Author</h3>
                  <p class="text-neutral-600 dark:text-neutral-300 mb-3">
                    {{ article.author }} is an expert in {{ article.category.toLowerCase() }} with over 10 years of experience in the field. They have worked with numerous organizations to implement effective solutions and strategies.
                  </p>
                  <div class="flex space-x-3">
                    <a href="#" class="text-primary-500 hover:text-primary-600 transition-colors duration-200">
                      <span class="sr-only">Twitter</span>
                      <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                    <a href="#" class="text-primary-500 hover:text-primary-600 transition-colors duration-200">
                      <span class="sr-only">LinkedIn</span>
                      <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Article Navigation -->
            <div class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div v-if="prevArticle" class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-all duration-300">
                <NuxtLink :to="`/blog/${prevArticle.slug}`" class="flex flex-col h-full">
                  <div class="text-sm text-neutral-500 dark:text-neutral-400 mb-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous Article
                  </div>
                  <h4 class="font-medium text-neutral-800 dark:text-neutral-100 mb-1">{{ prevArticle.title }}</h4>
                  <p class="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2 flex-grow">{{ prevArticle.description }}</p>
                </NuxtLink>
              </div>
              <div v-if="nextArticle" class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-all duration-300">
                <NuxtLink :to="`/blog/${nextArticle.slug}`" class="flex flex-col h-full">
                  <div class="text-sm text-neutral-500 dark:text-neutral-400 mb-2 flex items-center justify-end">
                    Next Article
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <h4 class="font-medium text-neutral-800 dark:text-neutral-100 mb-1 text-right">{{ nextArticle.title }}</h4>
                  <p class="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2 text-right flex-grow">{{ nextArticle.description }}</p>
                </NuxtLink>
              </div>
            </div>
          </div>
          
          <!-- Sidebar -->
          <div class="lg:col-span-1 space-y-8">
            <!-- Share Article -->
            <div class="card p-6">
              <h3 class="text-lg font-semibold mb-4">Share This Article</h3>
              <div class="flex space-x-4">
                <a href="#" class="w-10 h-10 rounded-full bg-[#1DA1F2] flex items-center justify-center text-white hover:opacity-90 transition-opacity duration-200">
                  <span class="sr-only">Twitter</span>
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" class="w-10 h-10 rounded-full bg-[#0077B5] flex items-center justify-center text-white hover:opacity-90 transition-opacity duration-200">
                  <span class="sr-only">LinkedIn</span>
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href="#" class="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white hover:opacity-90 transition-opacity duration-200">
                  <span class="sr-only">WhatsApp</span>
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
                <a href="#" class="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors duration-200">
                  <span class="sr-only">Email</span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
            </div>
            
            <!-- Table of Contents -->
            <div class="card p-6">
              <h3 class="text-lg font-semibold mb-4">Table of Contents</h3>
              <nav class="space-y-2">
                <a href="#" class="block text-primary-500 hover:text-primary-600 transition-colors duration-200">Introduction</a>
                <a href="#" class="block text-primary-500 hover:text-primary-600 transition-colors duration-200">Key Considerations</a>
                <a href="#" class="block text-primary-500 hover:text-primary-600 transition-colors duration-200">Implementation Strategies</a>
                <div class="pl-4 space-y-2">
                  <a href="#" class="block text-primary-500 hover:text-primary-600 transition-colors duration-200">Strategy 1: Incremental Approach</a>
                  <a href="#" class="block text-primary-500 hover:text-primary-600 transition-colors duration-200">Strategy 2: Comprehensive Solution</a>
                </div>
                <a href="#" class="block text-primary-500 hover:text-primary-600 transition-colors duration-200">Case Study</a>
                <a href="#" class="block text-primary-500 hover:text-primary-600 transition-colors duration-200">Conclusion</a>
              </nav>
            </div>
            
            <!-- Related Articles -->
            <div class="card p-6">
              <h3 class="text-lg font-semibold mb-4">Related Articles</h3>
              <div class="space-y-4">
                <div v-for="article in relatedArticles" :key="article.slug" class="flex items-start space-x-3">
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
    
    <!-- CTA Section -->
    <section class="section bg-neutral-50 dark:bg-neutral-800">
      <div class="container-custom">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-primary-500 mb-6">Need Help With Your Technology Strategy?</h2>
          <p class="text-xl text-neutral-600 dark:text-neutral-300 mb-8 max-w-2xl mx-auto">
            Our team of experts can help you navigate the complex technology landscape and implement solutions that drive real business value.
          </p>
          <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <NuxtLink to="/contact" class="btn-primary">
              Get in Touch
            </NuxtLink>
            <NuxtLink to="/services" class="btn-outline">
              Explore Our Services
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const slug = route.params.slug

// Newsletter
const newsletterEmail = ref('')

// Mock data for articles (in a real app, this would come from Nuxt Content)
const allArticles = [
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
]

// Get current article
const article = computed(() => {
  return allArticles.find(article => article.slug === slug) || {
    title: 'Article Not Found',
    slug: 'not-found',
    description: 'The article you are looking for does not exist.',
    date: new Date().toISOString().split('T')[0],
    author: 'Ingen Cloud Technologies',
    category: 'Uncategorized',
    image: null
  }
})

// Get previous and next articles
const articleIndex = computed(() => {
  return allArticles.findIndex(a => a.slug === slug)
})

const prevArticle = computed(() => {
  return articleIndex.value > 0 ? allArticles[articleIndex.value - 1] : null
})

const nextArticle = computed(() => {
  return articleIndex.value < allArticles.length - 1 ? allArticles[articleIndex.value + 1] : null
})

// Get related articles (same category)
const relatedArticles = computed(() => {
  return allArticles
    .filter(a => a.category === article.value.category && a.slug !== slug)
    .slice(0, 3)
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

// In a real Nuxt app, we would fetch content from the content directory
// For example:
// const { data: article } = await useAsyncData(`article-${slug}`, () => 
//   queryContent('blog').where({ slug: slug }).findOne()
// )
</script>