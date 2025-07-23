<template>
  <div class="fixed bottom-6 right-6 z-50">
    <!-- Chat Bubble Button -->
    <button 
      @click="toggleChat" 
      class="bg-primary-500 hover:bg-primary-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2"
      :class="{ 'scale-0': isChatOpen }"
    >
      <span class="sr-only">Open chat</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    </button>
    
    <!-- Chat Window -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div v-if="isChatOpen" class="bg-white dark:bg-neutral-800 rounded-lg shadow-xl w-80 sm:w-96 absolute bottom-0 right-0 overflow-hidden flex flex-col max-h-[500px]">
        <!-- Chat Header -->
        <div class="bg-primary-500 text-white p-4 flex justify-between items-center">
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h3 class="font-medium">IngenBot</h3>
              <p class="text-xs text-white/80">Online</p>
            </div>
          </div>
          <button @click="toggleChat" class="text-white hover:text-white/80 focus:outline-none">
            <span class="sr-only">Close chat</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <!-- Chat Messages -->
        <div class="flex-grow p-4 overflow-y-auto" ref="messagesContainer">
          <TransitionGroup
            name="chat-bubble"
            tag="div"
            class="space-y-4"
          >
            <div v-for="(message, index) in messages" :key="index" 
                 :class="[
                   'max-w-[80%] rounded-lg p-3 shadow-sm', 
                   message.isBot ? 'bg-neutral-100 dark:bg-neutral-700 text-neutral-800 dark:text-white self-start' : 'bg-primary-500 text-white self-end ml-auto'
                 ]">
              {{ message.text }}
              <div v-if="message.links && message.links.length" class="mt-2 space-y-1">
                <NuxtLink 
                  v-for="(link, linkIndex) in message.links" 
                  :key="linkIndex" 
                  :to="link.url" 
                  class="block text-sm bg-white dark:bg-neutral-600 text-primary-500 dark:text-primary-300 px-2 py-1 rounded hover:bg-primary-50 dark:hover:bg-neutral-500 transition-colors duration-200">
                  {{ link.text }} →
                </NuxtLink>
              </div>
            </div>
          </TransitionGroup>
        </div>
        
        <!-- Chat Input -->
        <div class="border-t border-neutral-200 dark:border-neutral-700 p-3">
          <form @submit.prevent="sendMessage" class="flex space-x-2">
            <input 
              v-model="userInput" 
              type="text" 
              placeholder="Type your message..." 
              class="form-input flex-grow py-2 text-sm"
              :disabled="isProcessing"
            />
            <button 
              type="submit" 
              class="bg-primary-500 hover:bg-primary-600 text-white rounded-md px-3 py-2 flex items-center justify-center transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="!userInput.trim() || isProcessing"
            >
              <span v-if="isProcessing" class="loading-spinner"></span>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'

// Chat state
const isChatOpen = ref(false)
const userInput = ref('')
const messages = ref([])
const isProcessing = ref(false)
const messagesContainer = ref(null)

// Toggle chat window
const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value
  
  // If opening chat and no messages, show greeting
  if (isChatOpen.value && messages.value.length === 0) {
    addBotMessage({
      text: "Hello! How can I help you today?",
      links: []
    })
  }
}

// Add a bot message to the chat
const addBotMessage = (message) => {
  messages.value.push({
    text: message.text,
    links: message.links,
    isBot: true
  })
  
  scrollToBottom()
}

// Add a user message to the chat
const addUserMessage = (text) => {
  messages.value.push({
    text,
    isBot: false
  })
  
  scrollToBottom()
}

// Process user message and generate bot response
const processMessage = (text) => {
  const lowerText = text.toLowerCase()
  
  // Simple rule-based responses
  if (lowerText.includes('services') || lowerText.includes('offer') || lowerText.includes('provide')) {
    return {
      text: "We offer a range of services including Application Development, Product Management, Cybersecurity, Cloud Consultation, IT Consultation, and DevOps.",
      links: [
        { text: "View All Services", url: "/services" }
      ]
    }
  } 
  else if (lowerText.includes('contact') || lowerText.includes('reach') || lowerText.includes('email')) {
    return {
      text: "You can contact us at info@ingencloudtechnologies.com or use our contact form.",
      links: [
        { text: "Contact Us", url: "/contact" }
      ]
    }
  }
  else if (lowerText.includes('mobile') || lowerText.includes('app') || lowerText.includes('development')) {
    return {
      text: "Yes, we offer mobile app development as part of our Application Development services.",
      links: [
        { text: "Application Development", url: "/services/application-development" }
      ]
    }
  }
  else if (lowerText.includes('location') || lowerText.includes('located') || lowerText.includes('where')) {
    return {
      text: "We are a remote-first company with team members working from various locations.",
      links: []
    }
  }
  else if (lowerText.includes('job') || lowerText.includes('career') || lowerText.includes('apply') || lowerText.includes('work')) {
    return {
      text: "We're always looking for talented individuals to join our team. Check out our careers page for current openings.",
      links: [
        { text: "View Careers", url: "/careers" }
      ]
    }
  }
  else {
    return {
      text: "I'm not sure I understand. Would you like to speak with our team directly?",
      links: [
        { text: "Contact Us", url: "/contact" },
        { text: "Schedule a Call", url: "/contact" }
      ]
    }
  }
}

// Send a message
const sendMessage = async () => {
  const message = userInput.value.trim()
  if (!message) return
  
  // Add user message
  addUserMessage(message)
  userInput.value = ''
  
  // Simulate processing
  isProcessing.value = true
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Generate and add bot response
  const response = processMessage(message)
  addBotMessage(response)
  
  isProcessing.value = false
}

// Scroll to bottom of messages
const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

// Watch for changes in messages and scroll to bottom
watch(messages, () => {
  scrollToBottom()
}, { deep: true })
</script>