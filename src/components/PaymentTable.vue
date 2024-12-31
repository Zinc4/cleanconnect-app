```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ChevronUpDownIcon } from '@heroicons/vue/24/outline';
import { getSuccessfulPayments, type Payment } from '@/services/paymentService';
import { formatCurrency } from '@/utils/formatters';

const loading = ref(false);
const error = ref<string | null>(null);
const payments = ref<Payment[]>([]);

const sortField = ref<keyof Payment | null>(null);
const sortDirection = ref<'asc' | 'desc'>('asc');

onMounted(async () => {
  try {
    loading.value = true;
    payments.value = await getSuccessfulPayments();
  } catch (err: any) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});

const sortBy = (field: keyof Payment) => {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortField.value = field;
    sortDirection.value = 'asc';
  }

  payments.value.sort((a, b) => {
    const modifier = sortDirection.value === 'asc' ? 1 : -1;
    if (a[field] < b[field]) return -1 * modifier;
    if (a[field] > b[field]) return 1 * modifier;
    return 0;
  });
};
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-100">
    <div class="px-6 py-4 border-b border-gray-100">
      <h2 class="text-lg font-semibold text-gray-900">Payment Details</h2>
      <p class="text-sm text-gray-500 mt-1">Recent payment transactions</p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="p-8 text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent mx-auto"></div>
      <p class="mt-4 text-gray-600">Loading payments...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="p-8">
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>{{ error }}</p>
      </div>
    </div>

    <!-- Data Table -->
    <div v-else class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-primary-50">
          <tr>
            <th v-for="field in ['username', 'address', 'date', 'amount']" 
                :key="field"
                class="px-6 py-3 text-left">
              <button 
                @click="sortBy(field as keyof Payment)"
                class="group flex items-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                {{ field === 'username' ? 'User' : field.charAt(0).toUpperCase() + field.slice(1) }}
                <ChevronUpDownIcon 
                  class="ml-2 h-4 w-4 text-gray-400 group-hover:text-gray-500"
                  :class="{
                    'text-primary-500': sortField === field
                  }"
                />
              </button>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-100">
          <tr v-for="payment in payments" 
              :key="`${payment.id}-${payment.date}`"
              class="hover:bg-primary-50/50 transition-colors duration-150">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ payment.username }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
              {{ payment.address || 'No address provided' }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ new Date(payment.date).toLocaleDateString() }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {{ formatCurrency(payment.amount) }}
            </td>
          </tr>
          
          <!-- Empty State -->
          <tr v-if="payments.length === 0">
            <td colspan="4" class="px-6 py-8 text-center text-gray-500">
              No payment records found
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
```