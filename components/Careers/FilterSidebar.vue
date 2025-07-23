<template>
  <aside class="w-1/4 hidden lg:block  shadow rounded-lg p-4">
    <h2 class="font-bold text-xl mb-4">Filters</h2>
    <div class="space-y-4">
      <div>
        <label class="block font-medium">Job Type</label>
        <select class="w-full border-gray-300 rounded">
          <option>Full-Time</option>
          <option>Part-Time</option>
          <option>Contract</option>
        </select>
      </div>
      <div>
        <label class="block font-medium">Location</label>
        <input type="text" class="w-full border-gray-300 rounded" placeholder="Enter a location" />
      </div>
    </div>
  </aside>
</template>

<script setup></script>
