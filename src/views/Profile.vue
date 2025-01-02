<script setup lang="ts">
import { ref } from "vue";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  IdentificationIcon,
} from "@heroicons/vue/24/outline";

const profile = ref({
  adminId: "ADM001",
  name: "John Smith",
  email: "john.smith@example.com",
  phone: "+1 (555) 123-4567",
  address: "123 Business Avenue, Tech District, Innovation City, 12345",
  role: "Administrator",
  joinDate: "2023-01-15",
});

// const handleEdit = () => {
//   console.log("Edit profile clicked");
// };
</script>

<template>
  <div
    class="max-w-4xl mx-auto bg-gradient-to-b from-white to-green-50/30 rounded-xl shadow-lg border border-green-100"
  >
    <div class="px-8 py-6 border-b border-green-100 bg-white">
      <h2 class="text-xl font-bold text-gray-900">Profile Information</h2>
      <p class="text-sm text-gray-500 mt-1">
        Manage your account details and preferences
      </p>
    </div>

    <div class="p-8">
      <div class="flex flex-col md:flex-row gap-8 items-start">
        <!-- Profile Picture -->
        <div class="flex-shrink-0">
          <div
            class="w-32 h-32 rounded-full bg-gradient-to-br from-green-50 to-green-100 border-4 border-white shadow-inner flex items-center justify-center overflow-hidden"
          >
            <span class="text-4xl font-bold text-green-600">
              {{ profile.name.charAt(0) }}
            </span>
          </div>
        </div>

        <!-- Profile Details -->
        <div class="flex-grow space-y-8">
          <!-- Basic Info -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="space-y-2 group">
              <div class="flex items-center gap-2 text-gray-600">
                <IdentificationIcon
                  class="h-5 w-5 text-green-500 group-hover:text-green-600 transition-colors"
                />
                <span class="text-sm font-semibold">Admin ID</span>
              </div>
              <p class="text-gray-900 pl-7">{{ profile.adminId }}</p>
            </div>

            <div class="space-y-2 group">
              <div class="flex items-center gap-2 text-gray-600">
                <EnvelopeIcon
                  class="h-5 w-5 text-green-500 group-hover:text-green-600 transition-colors"
                />
                <span class="text-sm font-semibold">Email</span>
              </div>
              <p class="text-gray-900 pl-7">{{ profile.email }}</p>
            </div>

            <div class="space-y-2 group">
              <div class="flex items-center gap-2 text-gray-600">
                <PhoneIcon
                  class="h-5 w-5 text-green-500 group-hover:text-green-600 transition-colors"
                />
                <span class="text-sm font-semibold">Contact No.</span>
              </div>
              <p class="text-gray-900 pl-7">{{ profile.phone }}</p>
            </div>

            <div class="space-y-2 group">
              <div class="flex items-center gap-2 text-gray-600">
                <MapPinIcon
                  class="h-5 w-5 text-green-500 group-hover:text-green-600 transition-colors"
                />
                <span class="text-sm font-semibold">Address</span>
              </div>
              <p class="text-gray-900 pl-7">{{ profile.address }}</p>
            </div>
          </div>

          <!-- Additional Info -->
          <div class="pt-6 border-t border-green-100">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="space-y-2">
                <p class="text-sm font-semibold text-gray-600">Role</p>
                <p class="text-gray-900">{{ profile.role }}</p>
              </div>
              <div class="space-y-2">
                <p class="text-sm font-semibold text-gray-600">Join Date</p>
                <p class="text-gray-900">{{ profile.joinDate }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Edit Button -->
      <!-- <div class="mt-8 flex justify-end">
        <button
          @click="handleEdit"
          class="inline-flex items-center px-6 py-2.5 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
        >
          <PencilIcon class="h-5 w-5 mr-2" />
          Edit Profile
        </button>
      </div> -->
    </div>
  </div>
</template>
