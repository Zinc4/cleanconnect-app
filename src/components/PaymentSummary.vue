<script setup lang="ts">
import { CurrencyDollarIcon, ClockIcon } from "@heroicons/vue/24/outline";
import axios from "axios";
import { onMounted, ref } from "vue";

const summary = ref({
  pendingAmount: 0,
  totalAmount: 0,
});

const fetchSummaryData = async () => {
  try {
    const token = localStorage.getItem("token"); // Ganti dengan token valid
    const response = await axios.get(
      "https://sensible-annabal-cleanconnect-170c1a9e.koyeb.app/api/user/total-payments-history",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.status) {
      summary.value = response.data.data;
    } else {
      console.error(response.data.message || "Failed to fetch dashboard data");
    }
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
  }
};

onMounted(() => {
  fetchSummaryData();
});

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
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
      <p class="text-2xl font-bold text-gray-900 mt-2">
        {{ formatPrice(summary.totalAmount) }}
      </p>
    </div>

    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div class="flex items-center justify-between mb-4">
        <div class="p-2 bg-yellow-50 rounded-lg">
          <ClockIcon class="h-6 w-6 text-yellow-500" />
        </div>
      </div>
      <h3 class="text-sm font-medium text-gray-500">Pending Payments</h3>
      <p class="text-2xl font-bold text-gray-900 mt-2">
        {{ formatPrice(summary.pendingAmount) }}
      </p>
    </div>
  </div>
</template>
