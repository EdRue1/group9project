<!-- please refer to prompt eleven in the sources folder -->
<!-- This view allows for the creation of a new event -->
<template>
  <main>
    <div>
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">Create New Event</h1>
    </div>
    <div class="px-10 py-20">
      <form @submit.prevent="handleSubmitForm">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          <h2 class="text-2xl font-bold">Event Details</h2>

          <!-- Event Name Input -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Event Name</span><span style="color: #ff0000">*</span>
              <input type="text" class="w-full rounded-md border-gray-300 shadow-sm" v-model="event.name" />
            </label>
            <span v-if="v$.event.name.$error" class="text-red-500">Event Name is required</span>
          </div>

          <!-- Date Input -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Date</span><span style="color: #ff0000">*</span>
              <input type="date" class="w-full rounded-md border-gray-300 shadow-sm" v-model="event.date" />
            </label>
            <span v-if="v$.event.date.$error" class="text-red-500">
              <span v-if="v$.event.date.required.$invalid">Event Date is required</span>
              <span v-else-if="v$.event.date.validDate.$invalid">Event Date must be valid</span>
              <span v-else-if="v$.event.date.notBeforeToday.$invalid">Date cannot be in the past</span>
            </span>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="mt-10 flex justify-between">
          <button class="bg-red-700 text-white rounded px-4 py-2" type="submit">Add New Event</button>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
import { ref, onMounted } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { getServices, createEvent } from '../api/api';
import { useToast } from 'vue-toastification';

export default {
  setup() {
    const toast = useToast();

    // Define reactive state for event data
    const event = ref({
      name: '',
      date: '',
      services: [],
      address: { line1: '', line2: '', city: '', county: '', zip: '' }
    });

    // Store active services
    const activeServices = ref([]);

    // Validation rules
    const rules = {
      event: {
        name: { required },
        date: {
          required,
          validDate: (value) => !isNaN(new Date(value)),
          notBeforeToday: (value) => new Date(value) >= new Date().setHours(0, 0, 0, 0)
        }
      }
    };

    const v$ = useVuelidate(rules, { event });

    // Fetch services when component is mounted
    onMounted(async () => {
      try {
        const response = await getServices();
        activeServices.value = response.filter(service => service.status === "Active");
      } catch (error) {
        toast.error("Error loading services");
      }
    });

    // Handle form submission
    const handleSubmitForm = async () => {
      v$.value.$validate();
      if (v$.value.$error) {
        toast.error('Please fix input errors');
        return;
      }
      try {
        await createEvent(event.value);
        toast.success("Event created successfully");
      } catch (error) {
        toast.error("Error creating event");
      }
    };

    return { event, activeServices, handleSubmitForm, v$ };
  }
};
</script>

