<template>
  <div>
    <!-- Page Header -->
    <section class="bg-primary-500 text-white py-16 md:py-20">
      <div class="container-custom">
        <div class="max-w-3xl">
          <h1 class="mb-4 animate-fade-in">Schedule a Consultation</h1>
          <p class="text-xl text-white/90 animate-slide-up">
            Book a 30-minute call with our team to discuss your technology needs
          </p>
        </div>
      </div>
    </section>
    
    <!-- Scheduling System -->
    <section class="section bg-white dark:bg-neutral-900">
      <div class="container-custom">
        <div class="max-w-4xl mx-auto">
          <!-- Introduction -->
          <div class="mb-12 text-center">
            <h2 class="text-primary-500 mb-4">Book Your 30-Minute Consultation</h2>
            <p class="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
              Select a date and time that works for you, and our team will be ready to discuss how we can help with your technology needs.
            </p>
          </div>
          
          <!-- Scheduling Interface -->
          <div class="bg-white dark:bg-neutral-800 rounded-xl shadow-lg overflow-hidden">
            <div class="grid grid-cols-1 lg:grid-cols-3">
              <!-- Step Indicator -->
              <div class="bg-neutral-50 dark:bg-neutral-900 p-8">
                <h3 class="text-xl font-semibold mb-6">Booking Steps</h3>
                
                <div class="space-y-6">
                  <!-- Step 1 -->
                  <div class="flex items-start">
                    <div class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mr-3"
                         :class="currentStep >= 1 ? 'bg-primary-500 text-white' : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400'">
                      <span class="font-medium">1</span>
                    </div>
                    <div>
                      <h4 class="font-medium" :class="currentStep >= 1 ? 'text-primary-500' : 'text-neutral-600 dark:text-neutral-300'">
                        Select Date & Time
                      </h4>
                      <p class="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                        Choose from available time slots
                      </p>
                    </div>
                  </div>
                  
                  <!-- Step 2 -->
                  <div class="flex items-start">
                    <div class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mr-3"
                         :class="currentStep >= 2 ? 'bg-primary-500 text-white' : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400'">
                      <span class="font-medium">2</span>
                    </div>
                    <div>
                      <h4 class="font-medium" :class="currentStep >= 2 ? 'text-primary-500' : 'text-neutral-600 dark:text-neutral-300'">
                        Your Information
                      </h4>
                      <p class="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                        Provide your contact details
                      </p>
                    </div>
                  </div>
                  
                  <!-- Step 3 -->
                  <div class="flex items-start">
                    <div class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mr-3"
                         :class="currentStep >= 3 ? 'bg-primary-500 text-white' : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400'">
                      <span class="font-medium">3</span>
                    </div>
                    <div>
                      <h4 class="font-medium" :class="currentStep >= 3 ? 'text-primary-500' : 'text-neutral-600 dark:text-neutral-300'">
                        Confirmation
                      </h4>
                      <p class="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                        Review and confirm your booking
                      </p>
                    </div>
                  </div>
                </div>
                
                <div class="mt-12">
                  <h4 class="font-medium text-neutral-700 dark:text-neutral-200 mb-2">Need Help?</h4>
                  <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                    If you have any questions or need assistance, please contact us:
                  </p>
                  <div class="flex items-center text-primary-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href="mailto:info@ingencloudtechnologies.com" class="hover:underline">
                      info@ingencloudtechnologies.com
                    </a>
                  </div>
                </div>
              </div>
              
              <!-- Main Content Area -->
              <div class="lg:col-span-2 p-8">
                <!-- Step 1: Select Date & Time -->
                <div v-if="currentStep === 1">
                  <h3 class="text-xl font-semibold mb-6">Select a Date & Time</h3>
                  
                  <!-- Date Picker -->
                  <div class="mb-8">
                    <label class="form-label">Date</label>
                    <div class="grid grid-cols-7 gap-2 mb-4">
                      <div v-for="day in 7" :key="day" class="text-center text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                        {{ getDayName(day - 1) }}
                      </div>
                      <div v-for="date in availableDates" :key="date.value" class="text-center">
                        <button 
                          @click="selectedDate = date.value" 
                          class="w-10 h-10 rounded-full flex items-center justify-center text-sm transition-colors duration-200"
                          :class="selectedDate === date.value ? 
                            'bg-primary-500 text-white' : 
                            date.available ? 
                              'hover:bg-primary-100 dark:hover:bg-primary-900/30 text-neutral-700 dark:text-neutral-300' : 
                              'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-600 cursor-not-allowed'"
                          :disabled="!date.available"
                        >
                          {{ date.day }}
                        </button>
                      </div>
                    </div>
                    <p class="text-sm text-neutral-500 dark:text-neutral-400">
                      All times are in your local timezone ({{ timezone }})
                    </p>
                  </div>
                  
                  <!-- Time Slots -->
                  <div v-if="selectedDate">
                    <label class="form-label">Available Time Slots</label>
                    <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                      <button 
                        v-for="slot in availableTimeSlots" 
                        :key="slot.value" 
                        @click="selectedTimeSlot = slot.value" 
                        class="py-2 px-3 rounded-md text-sm font-medium transition-colors duration-200 border"
                        :class="selectedTimeSlot === slot.value ? 
                          'bg-primary-500 text-white border-primary-500' : 
                          'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-700'"
                      >
                        {{ slot.label }}
                      </button>
                    </div>
                  </div>
                  
                  <!-- Navigation -->
                  <div class="flex justify-end mt-8">
                    <button 
                      @click="goToStep(2)" 
                      class="btn-primary"
                      :disabled="!selectedDate || !selectedTimeSlot"
                    >
                      Continue
                    </button>
                  </div>
                </div>
                
                <!-- Step 2: Your Information -->
                <div v-if="currentStep === 2">
                  <h3 class="text-xl font-semibold mb-6">Your Information</h3>
                  
                  <form @submit.prevent="goToStep(3)" class="space-y-6">
                    <!-- Name -->
                    <div>
                      <label for="name" class="form-label">Full Name</label>
                      <input 
                        id="name" 
                        v-model="form.name" 
                        type="text" 
                        class="form-input" 
                        :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.name }"
                        placeholder="Your name"
                        required
                      />
                      <p v-if="errors.name" class="mt-1 text-sm text-red-500">{{ errors.name }}</p>
                    </div>
                    
                    <!-- Email -->
                    <div>
                      <label for="email" class="form-label">Email Address</label>
                      <input 
                        id="email" 
                        v-model="form.email" 
                        type="email" 
                        class="form-input" 
                        :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.email }"
                        placeholder="your.email@example.com"
                        required
                      />
                      <p v-if="errors.email" class="mt-1 text-sm text-red-500">{{ errors.email }}</p>
                    </div>
                    
                    <!-- Phone -->
                    <div>
                      <label for="phone" class="form-label">Phone Number (Optional)</label>
                      <input 
                        id="phone" 
                        v-model="form.phone" 
                        type="tel" 
                        class="form-input" 
                        :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.phone }"
                        placeholder="Your phone number"
                      />
                      <p v-if="errors.phone" class="mt-1 text-sm text-red-500">{{ errors.phone }}</p>
                    </div>
                    
                    <!-- Purpose -->
                    <div>
                      <label for="purpose" class="form-label">Purpose of the Call</label>
                      <textarea 
                        id="purpose" 
                        v-model="form.purpose" 
                        rows="3" 
                        class="form-input" 
                        :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.purpose }"
                        placeholder="Please briefly describe what you'd like to discuss during the call"
                        required
                      ></textarea>
                      <p v-if="errors.purpose" class="mt-1 text-sm text-red-500">{{ errors.purpose }}</p>
                    </div>
                    
                    <!-- Navigation -->
                    <div class="flex justify-between mt-8">
                      <button 
                        type="button"
                        @click="goToStep(1)" 
                        class="btn bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-700"
                      >
                        Back
                      </button>
                      <button 
                        type="submit" 
                        class="btn-primary"
                      >
                        Review Booking
                      </button>
                    </div>
                  </form>
                </div>
                
                <!-- Step 3: Confirmation -->
                <div v-if="currentStep === 3">
                  <h3 class="text-xl font-semibold mb-6">Confirm Your Booking</h3>
                  
                  <div class="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-6 mb-8">
                    <h4 class="font-medium text-lg mb-4">Booking Details</h4>
                    
                    <div class="space-y-4">
                      <div class="flex justify-between">
                        <span class="text-neutral-500 dark:text-neutral-400">Date:</span>
                        <span class="font-medium">{{ formatDate(selectedDate) }}</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-neutral-500 dark:text-neutral-400">Time:</span>
                        <span class="font-medium">{{ getTimeSlotLabel(selectedTimeSlot) }}</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-neutral-500 dark:text-neutral-400">Duration:</span>
                        <span class="font-medium">30 minutes</span>
                      </div>
                      <div class="border-t border-neutral-200 dark:border-neutral-700 pt-4">
                        <span class="text-neutral-500 dark:text-neutral-400">Name:</span>
                        <span class="font-medium block">{{ form.name }}</span>
                      </div>
                      <div>
                        <span class="text-neutral-500 dark:text-neutral-400">Email:</span>
                        <span class="font-medium block">{{ form.email }}</span>
                      </div>
                      <div v-if="form.phone">
                        <span class="text-neutral-500 dark:text-neutral-400">Phone:</span>
                        <span class="font-medium block">{{ form.phone }}</span>
                      </div>
                      <div>
                        <span class="text-neutral-500 dark:text-neutral-400">Purpose:</span>
                        <p class="font-medium mt-1">{{ form.purpose }}</p>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Navigation -->
                  <div class="flex justify-between mt-8">
                    <button 
                      @click="goToStep(2)" 
                      class="btn bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-700"
                    >
                      Back
                    </button>
                    <button 
                      @click="confirmBooking" 
                      class="btn-primary"
                      :disabled="isSubmitting"
                    >
                      <span v-if="isSubmitting" class="loading-spinner mr-2"></span>
                      {{ isSubmitting ? 'Confirming...' : 'Confirm Booking' }}
                    </button>
                  </div>
                </div>
                
                <!-- Success Message -->
                <div v-if="currentStep === 4" class="text-center py-8">
                  <div class="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 class="text-2xl font-semibold mb-4">Booking Confirmed!</h3>
                  <p class="text-neutral-600 dark:text-neutral-300 mb-6 max-w-md mx-auto">
                    Your 30-minute consultation has been scheduled for {{ formatDate(selectedDate) }} at {{ getTimeSlotLabel(selectedTimeSlot) }}.
                  </p>
                  <p class="text-neutral-600 dark:text-neutral-300 mb-8 max-w-md mx-auto">
                    We've sent a confirmation email to <strong>{{ form.email }}</strong> with all the details and a calendar invitation.
                  </p>
                  <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <NuxtLink to="/" class="btn-primary">
                      Return to Home
                    </NuxtLink>
                    <button @click="resetForm" class="btn-outline">
                      Schedule Another Call
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- What to Expect -->
    <section class="section bg-neutral-50 dark:bg-neutral-800">
      <div class="container-custom">
        <div class="max-w-3xl mx-auto mb-16 text-center">
          <h2 class="text-primary-500 mb-4">What to Expect</h2>
          <p class="text-lg text-neutral-600 dark:text-neutral-300">
            Here's what you can expect during your 30-minute consultation
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Step 1 -->
          <div class="bg-white dark:bg-neutral-700 rounded-lg p-6 shadow-sm">
            <div class="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
              <span class="text-primary-500 font-semibold text-xl">1</span>
            </div>
            <h3 class="text-xl font-semibold mb-3">Introduction</h3>
            <p class="text-neutral-600 dark:text-neutral-300">
              We'll start with brief introductions and get to know your business and technology needs at a high level.
            </p>
          </div>
          
          <!-- Step 2 -->
          <div class="bg-white dark:bg-neutral-700 rounded-lg p-6 shadow-sm">
            <div class="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
              <span class="text-primary-500 font-semibold text-xl">2</span>
            </div>
            <h3 class="text-xl font-semibold mb-3">Deep Dive</h3>
            <p class="text-neutral-600 dark:text-neutral-300">
              We'll discuss your specific challenges, goals, and requirements in more detail to understand how we can help.
            </p>
          </div>
          
          <!-- Step 3 -->
          <div class="bg-white dark:bg-neutral-700 rounded-lg p-6 shadow-sm">
            <div class="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
              <span class="text-primary-500 font-semibold text-xl">3</span>
            </div>
            <h3 class="text-xl font-semibold mb-3">Next Steps</h3>
            <p class="text-neutral-600 dark:text-neutral-300">
              We'll outline potential solutions and discuss the next steps for working together to address your needs.
            </p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- FAQ Section -->
    <section class="section bg-white dark:bg-neutral-900">
      <div class="container-custom">
        <div class="max-w-3xl mx-auto mb-16 text-center">
          <h2 class="text-primary-500 mb-4">Frequently Asked Questions</h2>
          <p class="text-lg text-neutral-600 dark:text-neutral-300">
            Common questions about our consultation process
          </p>
        </div>
        
        <div class="max-w-3xl mx-auto space-y-6">
          <!-- FAQ Item 1 -->
          <div class="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-6">
            <h3 class="text-xl font-semibold mb-3">Is there a cost for the initial consultation?</h3>
            <p class="text-neutral-600 dark:text-neutral-300">
              No, the initial 30-minute consultation is completely free. It's an opportunity for us to understand your needs and determine how we can help.
            </p>
          </div>
          
          <!-- FAQ Item 2 -->
          <div class="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-6">
            <h3 class="text-xl font-semibold mb-3">How should I prepare for the call?</h3>
            <p class="text-neutral-600 dark:text-neutral-300">
              It's helpful to have a general idea of your goals, challenges, and any specific questions you'd like to discuss. However, there's no formal preparation required.
            </p>
          </div>
          
          <!-- FAQ Item 3 -->
          <div class="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-6">
            <h3 class="text-xl font-semibold mb-3">What happens after the consultation?</h3>
            <p class="text-neutral-600 dark:text-neutral-300">
              After the call, we'll send you a follow-up email with a summary of our discussion and recommended next steps. If you decide to move forward, we'll work with you to develop a detailed proposal.
            </p>
          </div>
          
          <!-- FAQ Item 4 -->
          <div class="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-6">
            <h3 class="text-xl font-semibold mb-3">Can I reschedule my appointment?</h3>
            <p class="text-neutral-600 dark:text-neutral-300">
              Yes, you can reschedule your appointment by clicking the link in your confirmation email or by contacting us directly at info@ingencloudtechnologies.com.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

// Current step
const currentStep = ref(1)

// Form data
const form = reactive({
  name: '',
  email: '',
  phone: '',
  purpose: ''
})

// Form state
const errors = reactive({})
const isSubmitting = ref(false)

// Date and time selection
const selectedDate = ref('')
const selectedTimeSlot = ref('')

// Get user's timezone
const timezone = computed(() => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone
})

// Generate available dates (next 14 days)
const availableDates = computed(() => {
  const dates = []
  const today = new Date()
  
  for (let i = 0; i < 21; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    
    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) continue
    
    const dateValue = date.toISOString().split('T')[0]
    const day = date.getDate()
    
    // Randomly make some dates unavailable
    const available = Math.random() > 0.3
    
    dates.push({
      value: dateValue,
      day,
      available
    })
  }
  
  return dates
})

// Generate available time slots
const availableTimeSlots = computed(() => {
  // In a real app, these would be fetched from an API based on the selected date
  return [
    { value: '09:00', label: '9:00 AM' },
    { value: '09:30', label: '9:30 AM' },
    { value: '10:00', label: '10:00 AM' },
    { value: '10:30', label: '10:30 AM' },
    { value: '11:00', label: '11:00 AM' },
    { value: '11:30', label: '11:30 AM' },
    { value: '13:00', label: '1:00 PM' },
    { value: '13:30', label: '1:30 PM' },
    { value: '14:00', label: '2:00 PM' },
    { value: '14:30', label: '2:30 PM' },
    { value: '15:00', label: '3:00 PM' },
    { value: '15:30', label: '3:30 PM' }
  ]
})

// Get day name
const getDayName = (index) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  return days[index]
}

// Format date
const formatDate = (dateString) => {
  if (!dateString) return ''
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('en-US', options)
}

// Get time slot label
const getTimeSlotLabel = (value) => {
  const slot = availableTimeSlots.value.find(slot => slot.value === value)
  return slot ? slot.label : ''
}

// Navigate to step
const goToStep = (step) => {
  // Validate before proceeding
  if (step === 3) {
    // Reset errors
    Object.keys(errors).forEach(key => delete errors[key])
    
    // Validate form
    if (!form.name) errors.name = 'Name is required'
    if (!form.email) errors.email = 'Email is required'
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = 'Please enter a valid email address'
    if (!form.purpose) errors.purpose = 'Purpose is required'
    
    // If there are errors, don't proceed
    if (Object.keys(errors).length > 0) return
  }
  
  currentStep.value = step
  window.scrollTo(0, 0)
}

// Confirm booking
const confirmBooking = async () => {
  isSubmitting.value = true
  
  try {
    // In a real app, this would send the booking data to a backend service
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Show success message
    currentStep.value = 4
  } catch (error) {
    console.error('Error confirming booking:', error)
  } finally {
    isSubmitting.value = false
  }
}

// Reset form
const resetForm = () => {
  form.name = ''
  form.email = ''
  form.phone = ''
  form.purpose = ''
  selectedDate.value = ''
  selectedTimeSlot.value = ''
  currentStep.value = 1
}
</script>