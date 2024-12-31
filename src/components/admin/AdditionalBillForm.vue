```vue
<script setup lang="ts">
import { ref } from 'vue';
import { createAdditionalBill } from '@/services/billService';

const emit = defineEmits(['success']);

const loading = ref(false);
const error = ref<string | null>(null);
const formData = ref({
  name: '',
  price: 0
});

const handleSubmit = async () => {
  try {
    loading.value = true;
    error.value = null;
    const response = await createAdditionalBill(formData.value);
    emit('success', response);
    resetForm();
  } catch (err: any) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

const resetForm = () => {
  formData.value = {
    name: '',
    price: 0
  };
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Error Message -->
    <div v-if="error" class="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
      {{ error }}
    </div>

    <!-- Name -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Bill Name
      </label>
      <input
        type="text"
        v-model="formData.name"
        required
        placeholder="e.g., Hari Besar"
        class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-100 focus:border-green-300"
      />
    </div>

    <!-- Price -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Price
      </label>
      <input
        type="number"
        v-model="formData.price"
        required
        min="0"
        placeholder="Enter price"
        class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-100 focus:border-green-300"
      />
    </div>

    <!-- Submit Button -->
    <div class="flex justify-end">
      <button
        type="submit"
        :disabled="loading"
        class="px-6 py-2.5 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        <span v-if="loading">Creating...</span>
        <span v-else>Create Additional Bill</span>
      </button>
    </div>
  </form>
</template>
```