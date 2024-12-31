<script setup lang="ts">
import { ref } from 'vue';
import { FunnelIcon, CalendarIcon } from '@heroicons/vue/24/outline';

const emit = defineEmits(['filter']);

const selectedMonth = ref(new Date().toISOString().slice(0, 7));
const selectedStatus = ref('all');

const statuses = [
  { id: 'all', name: 'All Status' },
  { id: 'paid', name: 'Paid' },
  { id: 'pending', name: 'Pending' },
  { id: 'overdue', name: 'Overdue' }
];

const handleFilter = () => {
  emit('filter', {
    month: selectedMonth.value,
    status: selectedStatus.value
  });
};
</script>

<template>
  <div class="flex flex-wrap items-center gap-4 mb-6">
    <div class="flex items-center gap-2">
      <CalendarIcon class="h-5 w-5 text-gray-400" />
      <input
        type="month"
        v-model="selectedMonth"
        @change="handleFilter"
        class="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-300"
      />
    </div>
    
    <div class="flex items-center gap-2">
      <FunnelIcon class="h-5 w-5 text-gray-400" />
      <select
        v-model="selectedStatus"
        @change="handleFilter"
        class="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-300"
      >
        <option v-for="status in statuses" :key="status.id" :value="status.id">
          {{ status.name }}
        </option>
      </select>
    </div>
  </div>
</template>