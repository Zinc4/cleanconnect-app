```vue
<script setup lang="ts">
import { ref } from 'vue';
import BillForm from '../components/admin/BillForm.vue';
import AdditionalBillForm from '../components/admin/AdditionalBillForm.vue';

const showAdditionalBillForm = ref(false);

const handleBillSuccess = (response: any) => {
  console.log('Bill generated successfully:', response);
};

const handleAdditionalBillSuccess = (response: any) => {
  console.log('Additional bill created successfully:', response);
  showAdditionalBillForm.value = false;
};
</script>

<template>
  <div class="max-w-2xl mx-auto space-y-6">
    <!-- Additional Bill Form -->
    <div class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div class="px-8 py-6 bg-gradient-to-r from-green-50 to-green-100 border-b border-green-100 flex justify-between items-center">
        <div>
          <h2 class="text-xl font-bold text-gray-900">Additional Bill Types</h2>
          <p class="text-sm text-gray-600 mt-1">Create new bill types</p>
        </div>
        <button
          @click="showAdditionalBillForm = !showAdditionalBillForm"
          class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
        >
          {{ showAdditionalBillForm ? 'Cancel' : 'Add New Type' }}
        </button>
      </div>

      <div v-if="showAdditionalBillForm" class="p-8">
        <AdditionalBillForm @success="handleAdditionalBillSuccess" />
      </div>
    </div>

    <!-- Bill Generation Form -->
    <div class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div class="px-8 py-6 bg-gradient-to-r from-green-50 to-green-100 border-b border-green-100">
        <h2 class="text-xl font-bold text-gray-900">Generate Bill</h2>
        <p class="text-sm text-gray-600 mt-1">Create a new bill for a customer</p>
      </div>

      <div class="p-8">
        <BillForm @success="handleBillSuccess" />
      </div>
    </div>
  </div>
</template>
```