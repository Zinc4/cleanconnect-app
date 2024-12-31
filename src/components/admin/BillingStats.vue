<script setup lang="ts">
import { DocumentTextIcon, CurrencyDollarIcon, ClockIcon } from '@heroicons/vue/24/outline';
import { formatCurrency } from '@/utils/dateUtils';

interface BillingStats {
  totalBills: number;
  totalAmount: number;
  paidAmount: number;
  pendingAmount: number;
}

defineProps<{
  stats: BillingStats;
}>();
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div class="flex items-center justify-between mb-4">
        <div class="p-2 bg-blue-50 rounded-lg">
          <DocumentTextIcon class="h-6 w-6 text-blue-500" />
        </div>
      </div>
      <h3 class="text-sm font-medium text-gray-500">Total Bills</h3>
      <p class="text-2xl font-bold text-gray-900 mt-2">{{ stats.totalBills }}</p>
    </div>

    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div class="flex items-center justify-between mb-4">
        <div class="p-2 bg-indigo-50 rounded-lg">
          <CurrencyDollarIcon class="h-6 w-6 text-indigo-500" />
        </div>
      </div>
      <h3 class="text-sm font-medium text-gray-500">Total Amount</h3>
      <p class="text-2xl font-bold text-gray-900 mt-2">{{ formatCurrency(stats.totalAmount) }}</p>
    </div>

    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div class="flex items-center justify-between mb-4">
        <div class="p-2 bg-green-50 rounded-lg">
          <CurrencyDollarIcon class="h-6 w-6 text-green-500" />
        </div>
      </div>
      <h3 class="text-sm font-medium text-gray-500">Paid Amount</h3>
      <p class="text-2xl font-bold text-gray-900 mt-2">{{ formatCurrency(stats.paidAmount) }}</p>
    </div>

    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div class="flex items-center justify-between mb-4">
        <div class="p-2 bg-yellow-50 rounded-lg">
          <ClockIcon class="h-6 w-6 text-yellow-500" />
        </div>
      </div>
      <h3 class="text-sm font-medium text-gray-500">Pending Amount</h3>
      <p class="text-2xl font-bold text-gray-900 mt-2">{{ formatCurrency(stats.pendingAmount) }}</p>
    </div>
  </div>
</template>