<template>
  <header>
    <nav class="bg-blue-800 px-4 lg:px-6 py-2.5"
         :class="[
      isScrolled ? 'bg-syentiaBlue backdrop-blur-lg' : 'bg-blue-800',
      'sticky top-0',
    ]">
      <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <a href="/cloud" class="flex items-center">
          <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Cloud</span>
        </a>
        <div class=" justify-between items-end w-full lg:flex lg:w-auto lg:order-1">
          <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            <li>
              <a href="#" class="block py-2 pr-4 pl-3 text-gray-100 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 ">What to do</a>
            </li>
            <li>
              <a href="#" class="block py-2 pr-4 pl-3 text-gray-100 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 ">Partners</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <CloudSection1 />
  <CloudSection3 />
  <CloudSection2 />
  <CloudSection4 />


</template>
<script setup>
import {onMounted, onUnmounted} from "vue";

const handleScroll = () => {
  isScrolled.value = window.scrollY > 0;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
