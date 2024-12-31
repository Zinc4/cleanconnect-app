<script setup lang="ts">
import { CurrencyDollarIcon, ClockIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/outline';

const summary = {
  totalPaid: 525000,
  pendingPayments: 125000,
  overdueAmount: 200000
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price);
};
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div class="flex items-center justify-between mb-4">
        <div class="p-2 bg-green-50 rounded-lg">
          <CurrencyDollarIcon class="h-6 w-6 text-green-500" />
        </div>
      </div>
      <h3 class="text-sm font-medium text-gray-500">Total Paid</h3>
      <p class="text-2xl font-bold text-gray-900 mt-2">{{ formatPrice(summary.totalPaid) }}</p>
    </div>

    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div class="flex items-center justify-between mb-4">
        <div class="p-2 bg-yellow-50 rounded-lg">
          <ClockIcon class="h-6 w-6 text-yellow-500" />
        </div>
      </div>
      <h3 class="text-sm font-medium text-gray-500">Pending Payments</h3>
      <p class="text-2xl font-bold text-gray-900 mt-2">{{ formatPrice(summary.pendingPayments) }}</p>
    </div>

    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div class="flex items-center justify-between mb-4">
        <div class="p-2 bg-red-50 rounded-lg">
          <ExclamationTriangleIcon class="h-6 w-6 text-red-500" />
        </div>
      </div>
      <h3 class="text-sm font-medium text-gray-500">Overdue Amount</h3>
      <p class="text-2xl font-bold text-gray-900 mt-2">{{ formatPrice(summary.overdueAmount) }}</p>
    </div>
  </div>
</template>