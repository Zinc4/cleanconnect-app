<script setup lang="ts">
import PaymentTable from '../components/PaymentTable.vue';
import WeeklyPayments from '../components/WeeklyPayments.vue';
import PendingPayments from '../components/PendingPayments.vue';
</script>

<template>
  <div class="grid grid-cols-12 gap-6">
    <div class="col-span-12">
      <PaymentTable />
    </div>
    <div class="col-span-12 lg:col-span-8">
      <WeeklyPayments />
    </div>
    <div class="col-span-12 lg:col-span-4">
      <PendingPayments />
    </div>
  </div>
</template>