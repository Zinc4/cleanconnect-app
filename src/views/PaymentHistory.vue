<script setup lang="ts">
import { ref } from "vue";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  CalendarIcon,
} from "@heroicons/vue/24/outline";
import UserSidebar from "../components/UserSidebar.vue";
import PaymentHistoryTable from "../components/PaymentHistoryTable.vue";
import PaymentSummary from "../components/PaymentSummary.vue";

const searchQuery = ref("");
const selectedFilter = ref("all");

const filters = [
  { id: "all", name: "All Payments" },
  { id: "paid", name: "Paid" },
  { id: "pending", name: "Pending" },
  { id: "overdue", name: "Overdue" },
];
</script>

<template>
  <div class="flex min-h-screen bg-gray-50">
    <UserSidebar currentPage="Payment History" />
    <main class="flex-1 ml-64">
      <div class="p-8 -ml-64">
        <!-- Header Section -->
        <div class="flex justify-between items-center mb-8">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Payment History</h1>
            <p class="text-sm text-gray-600 mt-1">
              Track and manage your payment records
            </p>
          </div>
          <div class="flex items-center gap-4">
            <!-- Search Bar -->
            <div class="relative">
              <MagnifyingGlassIcon
                class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
              />
              <input
                type="text"
                v-model="searchQuery"
                placeholder="Search payments..."
                class="w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-100 focus:border-green-300"
              />
            </div>
            <!-- Date Filter -->
            <button
              class="p-2 rounded-lg border border-gray-200 hover:bg-gray-50"
            >
              <CalendarIcon class="h-5 w-5 text-gray-500" />
            </button>
            <!-- Filter -->
            <button
              class="p-2 rounded-lg border border-gray-200 hover:bg-gray-50"
            >
              <FunnelIcon class="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        <!-- Payment Summary Cards -->
        <PaymentSummary />

        <!-- Filters -->
        <div class="flex flex-wrap gap-2 mb-6">
          <button
            v-for="filter in filters"
            :key="filter.id"
            @click="selectedFilter = filter.id"
            :class="[
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
              selectedFilter === filter.id
                ? 'bg-green-100 text-green-700'
                : 'bg-white text-gray-600 hover:bg-gray-50',
            ]"
          >
            {{ filter.name }}
          </button>
        </div>

        <!-- Payment History Table -->
        <PaymentHistoryTable />
      </div>
    </main>
  </div>
</template>
