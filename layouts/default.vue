<template>
  <div class="flex flex-col min-h-screen">
    <!-- Header -->
    <AppHeader />
    
    <!-- Main Content -->
    <main class="flex-grow">
      <slot />
    </main>
    
    <!-- Footer -->
    <AppFooter />
    
    <!-- Chatbot -->
    <ClientOnly>
      <AppChatbot />
    </ClientOnly>
  </div>
</template>

<script setup>
// The default layout includes the header, main content area, footer, and chatbot
</script>