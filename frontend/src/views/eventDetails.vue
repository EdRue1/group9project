<!-- please refer to prompt four in the sources folder -->
<!-- This component allows a user to update a specific event's information. -->
<template>
  <main>
    <div>
      <!-- Header -->
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">
        Event Details
      </h1>
    </div>
    <div class="px-10 py-20">
      <!-- Grid container for event details -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        <h2 class="text-2xl font-bold">Event Details</h2>
        <!-- Event Name input field -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">Event Name</span>
            <span style="color: #ff0000">*</span>
            <input type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="event.name" />
            <span v-if="v$.event.name.$error" class="text-red-500">
              Event Name is required
            </span>
          </label>
        </div>

        <!-- Date input field -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">Date</span>
            <span style="color: #ff0000">*</span>
            <input type="date"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="event.date" />
            <span v-if="v$.event.date.$error" class="text-red-500">
              <span v-if="v$.event.date.required.$invalid">
                Event Date is required
              </span>
              <span v-else-if="!v$.event.date.required.$invalid && v$.event.date.validDate.$invalid">
                Event Date must be a valid date
              </span>
            </span>
          </label>
        </div>

        <div></div>
        <div></div>
        <!-- Description input field -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">Description</span>
            <textarea
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              rows="2" v-model="event.description"></textarea>
          </label>
        </div>
      </div>

      <!-- Services Offered at Event checkboxes -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 mt-10">
        <h2 class="text-2xl font-bold">Services Offered at Event</h2>
        <div class="flex flex-col grid-cols-3">
          <div>
            <ul v-if="services.length" class="space-y-2">
              <li v-for="service in services" :key="service._id" :data-service-id="service._id"
                class="rounded-lg border border-gray-300 p-2 hover:bg-gray-100 transition-colors relative">
                <label class="block w-full h-full">
                  <input type="checkbox" :id="service._id" :value="service._id"
                    :checked="event.services.includes(service._id)" v-model="event.services"
                    :disabled="service.status === 'Inactive'"
                    class="rounded border-gray-300 disabled:opacity-50 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50 mr-2">
                  <span class="font-medium">{{ service.name }}</span>
                </label>
              </li>
            </ul>
            <!-- If there are no active services for the user's organization, this will appear instead of list of checkboxes -->
            <p v-else class="text-gray-600">No Active Services Available</p>
          </div>
        </div>
      </div>

      <!-- Grid container for address details -->
      <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        <h2 class="text-2xl font-bold">Address</h2>
        <!-- Address 1 input field -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">Address Line 1</span>
            <input type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder v-model="event.address.line1" />
          </label>
        </div>
        <!-- Address 2 input field -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">Address Line 2</span>
            <input type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder v-model="event.address.line2" />
          </label>
        </div>
        <!-- City input field -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">City</span>
            <input type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder v-model="event.address.city" />
          </label>
        </div>
        <div></div>
        <!-- County input field -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">County</span>
            <input type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder v-model="event.address.county" />
          </label>
        </div>
        <!-- Zip Code input field -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">Zip Code</span>
            <input type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder v-model="event.address.zip" />
          </label>
        </div>
      </div>

      <!-- Grid container for buttons -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        <div></div>
        <!-- Update Event button -->
        <div class="flex justify-between mt-10 mr-20">
          <button @click="submitEventUpdate" type="submit" class="bg-green-700 disabled:opacity-50 text-white rounded"
            :disabled="user.role === 'viewer'">
            Update Event
          </button>
        </div>
        <!-- Delete Event button -->
        <div class="flex justify-between mt-10 mr-20">
          <button @click="submitDeleteEvent" type="submit" class="bg-red-700  disabled:opacity-50 text-white rounded"
            :disabled="user.role === 'viewer'">
            Delete Event
          </button>
        </div>
        <!-- Go back button -->
        <div class="flex justify-between mt-10 mr-20">
          <button type="reset" class="border border-red-700 bg-white text-red-700 rounded" @click="router.back()">
            Go back
          </button>
        </div>
      </div>

      <hr class="mt-10 mb-10" />

      <!-- Grid container for list of attendees -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        <div>
          <h2 class="text-2xl font-bold">List of Attendees</h2>
          <h3 class="italic">Click table row to view client details</h3>
        </div>
        <!-- Table showing the list of attendees for the selected event -->
        <div class="flex flex-col col-span-2">
          <table class="min-w-full shadow-md rounded">
            <thead class="bg-gray-50 text-xl">
              <tr>
                <th class="p-4 text-left">Name</th>
                <th class="p-4 text-left">City</th>
                <th class="p-4 text-left">Phone Number</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-300">
              <tr @click="router.push({ name: 'clientdetails', params: { id: client._id } })"
              v-for="client in clients" :key="client._id" class="cursor-pointer"
                :class="{ 'hoverRow': hoverId === client._id }" @mouseenter="hoverId = client._id"
                @mouseleave="hoverId = null">
                <td class="p-2 text-left">
                  {{ client.firstName + ' ' + client.lastName }}
                </td>
                <td class="p-2 text-left">{{ client.address.city }}</td>
                <td class="p-2 text-left">
                  {{ client.phoneNumber.primary }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>
</template>

<!-- change from options API to composition API -->
<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { useLoggedInUserStore } from "../store/loggedInUser";
import { getEventById, getEventAttendees, getServices, updateEvent, deleteEvent } from '../api/api';
import { useToast } from 'vue-toastification';

// Initialize toast for notifications
const toast = useToast();
const router = useRouter();
const user = useLoggedInUserStore();

// Reactive state for event data
const event = ref({
  name: null,
  description: null,
  date: null,
  address: {
    line1: null,
    line2: null,
    city: null,
    county: null,
    zip: null,
  },
  attendees: [],
  services: [],
});

// Reactive state for clients and services
const clients = ref([]);
const services = ref([]);

// Reactive state for hover ID
const hoverId = ref(null);

// Custom validation for date
const validDate = (value) => {
  const date = new Date(value);
  return !isNaN(date);
};

// Vuelidate validation rules
const rules = {
  event: {
    name: { required },
    date: {
      required,
      validDate,
    },
  },
};

// Initialize Vuelidate with the rules and event data
const v$ = useVuelidate(rules, { event });

// Fetch event details, attendees, and services when the component is mounted
onMounted(async () => {
  try {
    const [eventResponse, clientsResponse, servicesResponse] = await Promise.all([
      getEventById(router.currentRoute.value.params.id),
      getEventAttendees(router.currentRoute.value.params.id),
      getServices(),
    ]);

    // Format the date for the input field
    eventResponse.date = new Date(eventResponse.date).toISOString().substring(0, 10);

    // Update reactive state
    event.value = eventResponse;
    clients.value = clientsResponse;
    services.value = servicesResponse;

  } catch (error) {
    toast.error('Error loading data', error);
  }
});

// Method to handle event update
const submitEventUpdate = async () => {
  // Trigger validation
  v$.value.$validate();

  if (v$.value.$error) {
    // Form is invalid, do not proceed
    return;
  }

  try {
    const response = await updateEvent(router.currentRoute.value.params.id, event.value);
    toast.success(response);
    router.push('/findevents');
  } catch (error) {
    toast.error('Error updating event', error);
  }
};

// Method to handle event deletion
const submitDeleteEvent = async () => {
  try {
    if (event.value.attendees.length !== 0) {
      toast.info('Event cannot be deleted since it has attendees.');
      return;
    }
    const response = await deleteEvent(router.currentRoute.value.params.id);
    toast.success(response);
    router.push('/findevents');
  } catch (error) {
    toast.error(error);
  }
};
</script>
