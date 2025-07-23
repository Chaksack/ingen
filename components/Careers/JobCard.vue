<template>
  <div class="bg-gray-900 shadow rounded-lg p-6">
    <h3 class="text-xl font-bold dark:text-white">{{ title }}</h3>
    <p class="text-sm text-gray-400">{{ location }}</p>
    <p class="text-gray-400 mt-4">{{ description }}</p>
    <a
        :href="link"
        class="block mt-4 text-purple-800 hover:underline font-semibold"
    >
      View Details
    </a>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  location: String,
  description: String,
  link: String,
});
</script>
