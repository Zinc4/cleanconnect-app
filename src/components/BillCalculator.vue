<script setup lang="ts">
import { ref } from 'vue';
import { CalculatorIcon, CalendarIcon } from '@heroicons/vue/24/outline';

interface BillData {
  uid: string;
  date: string;
  dueDate: string;
  units: number;
  ratePerUnit: number;
  billAmount: number | null;
}

const billData = ref<BillData>({
  uid: '',
  date: new Date().toISOString().split('T')[0],
  dueDate: '',
  units: 0,
  ratePerUnit: 2.5,
  billAmount: null
});

const calculateBill = () => {
  billData.value.billAmount = billData.value.units * billData.value.ratePerUnit;
};

const resetForm = () => {
  billData.value = {
    uid: '',
    date: new Date().toISOString().split('T')[0],
    dueDate: '',
    units: 0,
    ratePerUnit: 2.5,
    billAmount: null
  };
};
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <div class="bg-white rounded-xl shadow-lg border border-primary-100 overflow-hidden">
      <!-- Header -->
      <div class="px-8 py-6 bg-gradient-to-r from-primary-50 to-green-50 border-b border-primary-100">
        <h2 class="text-xl font-bold text-gray-900">Generate Bill</h2>
        <p class="text-sm text-gray-600 mt-1">Enter details to calculate the bill amount</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="calculateBill" class="p-8 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- UID -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-green-600">
              User ID
            </label>
            <input
              type="text"
              v-model="billData.uid"
              class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-100 focus:border-primary-300 transition-colors duration-200"
              placeholder="Enter UID"
              required
            />
          </div>

          <!-- Date -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-green-600">
              Bill Date
            </label>
            <div class="relative">
              <input
                type="date"
                v-model="billData.date"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-100 focus:border-primary-300 transition-colors duration-200"
                required
              />
              <CalendarIcon class="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <!-- Due Date -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-green-600">
              Due Date
            </label>
            <div class="relative">
              <input
                type="date"
                v-model="billData.dueDate"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-100 focus:border-primary-300 transition-colors duration-200"
                required
              />
              <CalendarIcon class="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <!-- Units -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-green-600">
              Units
            </label>
            <input
              type="number"
              v-model="billData.units"
              class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-100 focus:border-primary-300 transition-colors duration-200"
              placeholder="Enter units"
              required
              min="0"
              step="0.01"
            />
          </div>

          <!-- Rate per Unit -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-green-600">
              Rate per Unit ($)
            </label>
            <input
              type="number"
              v-model="billData.ratePerUnit"
              class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-100 focus:border-primary-300 transition-colors duration-200"
              required
              min="0"
              step="0.01"
            />
          </div>
        </div>

        <!-- Result -->
        <div v-if="billData.billAmount !== null" 
             class="mt-6 p-6 bg-gradient-to-r from-green-50 to-primary-50 rounded-lg border border-green-100">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Bill Summary</h3>
          <div class="space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Units:</span>
              <span class="font-medium text-gray-900">{{ billData.units }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Rate per Unit:</span>
              <span class="font-medium text-gray-900">${{ billData.ratePerUnit.toFixed(2) }}</span>
            </div>
            <div class="pt-3 border-t border-green-100">
              <div class="flex justify-between items-center">
                <span class="text-lg font-semibold text-gray-900">Total Amount:</span>
                <span class="text-xl font-bold text-green-600">${{ billData.billAmount.toFixed(2) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex justify-end gap-4 pt-4">
          <button
            type="button"
            @click="resetForm"
            class="px-6 py-2.5 border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            Reset
          </button>
          <button
            type="submit"
            class="inline-flex items-center px-6 py-2.5 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
          >
            <CalculatorIcon class="h-5 w-5 mr-2" />
            Calculate Bill
          </button>
        </div>
      </form>
    </div>
  </div>
</template>