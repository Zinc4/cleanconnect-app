<script setup lang="ts">
</script>

<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Total Users</h3>
        <p class="text-3xl font-bold text-primary-600">1,234</p>
        <p class="text-sm text-gray-500 mt-1">+12% from last month</p>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Total Revenue</h3>
        <p class="text-3xl font-bold text-green-600">$45,678</p>
        <p class="text-sm text-gray-500 mt-1">+8% from last month</p>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Pending Bills</h3>
        <p class="text-3xl font-bold text-red-600">89</p>
        <p class="text-sm text-gray-500 mt-1">-5% from last month</p>
      </div>
    </div>

    <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      <div class="space-y-4">
        <div v-for="i in 5" :key="i" class="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
          <div>
            <p class="font-medium text-gray-900">User Payment Received</p>
            <p class="text-sm text-gray-500">John Doe - SC001</p>
          </div>
          <div class="text-right">
            <p class="font-medium text-green-600">$125.00</p>
            <p class="text-sm text-gray-500">2 hours ago</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>