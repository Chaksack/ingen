<template>
<!--  <header>-->
<!--    <nav class="bg-purple-800 px-4 lg:px-6 py-2.5">-->
<!--      <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">-->
<!--        <a href="/careers" class="flex items-center">-->
<!--          <span class="self-center text-xl font-semibold whitespace-nowrap text-white">Careers</span>-->
<!--        </a>-->
<!--        <div class="flex items-center lg:order-2">-->
<!--          <button data-collapse-toggle="mobile-menu-2" type="button" class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">-->
<!--            <span class="sr-only">Open main menu</span>-->
<!--            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">-->
<!--              <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>-->
<!--            </svg>-->
<!--          </button>-->
<!--        </div>-->
<!--        <div class="hidden justify-between items-end w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">-->
<!--          <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">-->
<!--            <li>-->
<!--              <a href="/jobsearch" class="block py-2 pr-4 pl-3 text-gray-300 hover:text-white">Job Search</a>-->
<!--            </li>-->
<!--            <li>-->
<!--              <a href="#" class="block py-2 pr-4 pl-3 text-gray-300 hover:text-white">Saved Jobs</a>-->
<!--            </li>-->
<!--          </ul>-->
<!--        </div>-->
<!--      </div>-->
<!--    </nav>-->
<!--  </header>-->
  <div class="flex justify-center mt-16 mb-16">
    <div class="relative w-full items-center max-w-4xl">
      <input type="text" name="floating_email" id="search" class="block py-2.5 px-0 w-full text-lg text-white bg-transparent border-0 border-b-2 border-white appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-800 focus:outline-none focus:ring-0 focus:border-blue-600 peer text-center"
             placeholder=" Find your next opportunity "

      />

    </div>
  </div>
  <main class="container mx-auto px-4 py-8 flex gap-8">
  <CareersFilterSidebar />
  <div class="flex-1">
    <div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 mt-6">
      <CareersJobCard
          v-for="job in jobs"
          :key="job.id"
          :title="job.title"
          :location="job.location"
          :description="job.description"
          :link="job.link"
      />
    </div>

    <!-- Pagination -->
    <Pagination />
  </div>
  </main>


</template>

<script setup lang="ts">
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-vue-next';

const jobs = [
  { id: 1, title: 'Software Engineer', location: 'New York, NY', description: 'Exciting opportunity...', link: '#' },
  { id: 2, title: 'Data Analyst', location: 'San Francisco, CA', description: 'Analyze complex data...', link: '#' },
  { id: 3, title: 'Product Manager', location: 'Austin, TX', description: 'Lead product teams...', link: '#' },
];
</script>
