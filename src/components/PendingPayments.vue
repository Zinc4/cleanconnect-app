```typescript
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ChevronRightIcon } from '@heroicons/vue/24/outline';
import { getPendingPayments, type PendingPayment } from '@/services/paymentService';

const loading = ref(false);
const error = ref<string | null>(null);
const pendingPayments = ref<PendingPayment[]>([]);

onMounted(async () => {
  try {
    loading.value = true;
    pendingPayments.value = await getPendingPayments();
  } catch (err: any) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
};

const getInitial = (name: string) => {
  return name.charAt(0).toUpperCase();
};
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-100">
    <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
      <div>
        <h2 class="text-lg font-semibold text-gray-900">Pending Payments</h2>
        <p class="text-sm text-gray-500 mt-1">Outstanding payments</p>
      </div>
      <button class="text-sm font-medium text-primary-600 hover:text-primary-700">
        See all
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="p-6 flex justify-center">
      <div class="animate-spin rounded-full h-8 w-8 border-2 border-primary-500 border-t-transparent"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="p-6">
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {{ error }}
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="pendingPayments.length === 0" class="p-6 text-center text-gray-500">
      No pending payments found
    </div>

    <!-- Payments List -->
    <div v-else class="p-4">
      <div class="space-y-4">
        <div v-for="payment in pendingPayments" 
             :key="payment.id"
             class="flex items-center justify-between p-2 hover:bg-primary-50 rounded-lg transition-colors duration-200">
          <div class="flex items-center space-x-3">
            <div v-if="payment.image" class="w-10 h-10 rounded-full overflow-hidden">
              <img :src="payment.image" :alt="payment.username" class="w-full h-full object-cover" />
            </div>
            <div v-else class="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
              <span class="text-sm font-medium text-primary-600">{{ getInitial(payment.username) }}</span>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-900">{{ payment.username }}</p>
              <p class="text-xs text-gray-500">Pending Payment</p>
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <p class="text-sm font-medium text-gray-900">{{ formatCurrency(payment.amount) }}</p>
            <ChevronRightIcon class="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
```