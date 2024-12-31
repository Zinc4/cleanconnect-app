<script setup lang="ts">
import { ref } from 'vue';
import { MagnifyingGlassIcon, UserPlusIcon } from '@heroicons/vue/24/outline';

const searchQuery = ref('');

const handleAddUser = () => {
  // Add user functionality will be implemented here
  console.log('Add user clicked');
};
</script>

<template>
  <div class="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
    <div class="relative flex-1 max-w-md w-full">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search users..."
        class="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-300 transition-colors duration-200 bg-white"
      />
    </div>
    <button
      @click="handleAddUser"
      class="inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors duration-200 whitespace-nowrap shadow-sm"
    >
      <UserPlusIcon class="h-5 w-5 mr-2" />
      Add User
    </button>
  </div>
</template>