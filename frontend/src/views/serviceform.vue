<template>
    <main>
      <!-- Header -->
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">
        Create Service
      </h1>
  
      <div class="px-10 py-20">
        <!-- Form: Prevent page reload on submit -->
        <form @submit.prevent="handleSubmitForm">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
            <h2 class="text-2xl font-bold">Service Details</h2>
  
            <!-- Service Name input field -->
            <div class="flex flex-col">
              <label class="block">
                <span class="text-gray-700">Service Name</span>
                <span class="text-red-500">*</span>
                <input 
                  type="text" 
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  v-model="service.name" 
                />
              </label>
              <!-- Validation error message -->
              <span v-if="v$.service.name.$error" class="text-red-500">
                Service Name is required
              </span>
            </div>
  
            <!-- Description input field -->
            <div class="flex flex-col">
              <label>
                <span class="text-gray-700">Description:</span>
                <textarea 
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  v-model="service.description">
                </textarea>
              </label>
            </div>
          </div>
  
          <!-- Service Status Selection -->
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 mt-10">
            <div></div>
            <div class="flex flex-col">
              <label class="block">
                <span class="text-gray-700">Service Status</span>
                <span class="text-red-500">*</span>
                <div class="mt-1">
                  <label class="inline-flex items-center">
                    <input type="radio" class="form-radio" value="Active" v-model="service.status">
                    <span class="ml-2">Active</span>
                  </label>
                  <label class="inline-flex items-center ml-6">
                    <input type="radio" class="form-radio" value="Inactive" v-model="service.status">
                    <span class="ml-2">Inactive</span>
                  </label>
                </div>
              </label>
            </div>
          </div>
  
          <!-- Submit Button -->
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
            <div></div>
            <div class="flex justify-between mt-10">
              <button class="bg-red-700 text-white rounded px-4 py-2" type="submit">
                Add Service
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  </template>
  
  <script>
  import { reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import useVuelidate from '@vuelidate/core'
  import { required } from '@vuelidate/validators'
  import { createService } from '../api/api'
  import { useToast } from 'vue-toastification'
  
  export default {
    setup() {
      // Router instance for navigation
      const router = useRouter()
  
      // Toast notifications
      const toast = useToast()
  
      // Reactive state for service
      const service = reactive({
        name: null,
        description: null,
        status: "Active",
      })
  
      // Validation rules
      const rules = {
        service: {
          name: { required },
        }
      }
  
      // Initialize Vuelidate with validation rules
      const v$ = useVuelidate(rules, { service })
  
      // Form submission handler
      const handleSubmitForm = async () => {
        v$.value.$validate() // Trigger validation
  
        if (v$.value.$error) {
          // Validation failed, do not proceed
          return
        }
  
        try {
          const response = await createService(service)
          toast.success(response) // Show success message
          router.push('/findservice') // Navigate to service listing page
        } catch (error) {
          toast.error('Error creating new service') // Show error message
        }
      }
  
      // Return all reactive values and methods for template usage
      return { service, v$, handleSubmitForm }
    }
  }
  </script>
  