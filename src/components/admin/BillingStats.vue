<script setup lang="ts">
import {
  DocumentTextIcon,
  CurrencyDollarIcon,
  ClockIcon,
} from "@heroicons/vue/24/outline";
import { formatCurrency } from "@/utils/dateUtils";
import axios from "axios";
import { onMounted, ref } from "vue";

const billingStats = ref({
  totalAmountBills: 0,
  totalBills: 0,
  totalPendingPayment: 0,
  totalSuccessPayment: 0,
});

const fetchDashboardData = async () => {
  try {
    const token = localStorage.getItem("token"); // Ganti dengan token valid
    const response = await axios.get(
      "https://sensible-annabal-cleanconnect-170c1a9e.koyeb.app/api/admin/total-bills",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.status) {
      billingStats.value = response.data.data;
    } else {
      console.error(response.data.message || "Failed to fetch dashboard data");
    }
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
  }
};

onMounted(() => {
  fetchDashboardData();
});
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div class="flex items-center justify-between mb-4">
        <div class="p-2 bg-blue-50 rounded-lg">
          <DocumentTextIcon class="h-6 w-6 text-blue-500" />
        </div>
      </div>
      <h3 class="text-sm font-medium text-gray-500">Total Tagihan</h3>
      <p class="text-2xl font-bold text-gray-900 mt-2">
        {{ billingStats.totalBills }}
      </p>
    </div>

    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div class="flex items-center justify-between mb-4">
        <div class="p-2 bg-indigo-50 rounded-lg">
          <CurrencyDollarIcon class="h-6 w-6 text-indigo-500" />
        </div>
      </div>
      <h3 class="text-sm font-medium text-gray-500">Jumlah Total Tagihan</h3>
      <p class="text-2xl font-bold text-gray-900 mt-2">
        {{ formatCurrency(billingStats.totalAmountBills) }}
      </p>
    </div>

    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div class="flex items-center justify-between mb-4">
        <div class="p-2 bg-green-50 rounded-lg">
          <CurrencyDollarIcon class="h-6 w-6 text-green-500" />
        </div>
      </div>
      <h3 class="text-sm font-medium text-gray-500">Jumlah yang Dibayar</h3>
      <p class="text-2xl font-bold text-gray-900 mt-2">
        {{ formatCurrency(billingStats.totalSuccessPayment) }}
      </p>
    </div>

    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div class="flex items-center justify-between mb-4">
        <div class="p-2 bg-yellow-50 rounded-lg">
          <ClockIcon class="h-6 w-6 text-yellow-500" />
        </div>
      </div>
      <h3 class="text-sm font-medium text-gray-500">Jumlah Tertunda</h3>
      <p class="text-2xl font-bold text-gray-900 mt-2">
        {{ formatCurrency(billingStats.totalPendingPayment) }}
      </p>
    </div>
  </div>
</template>
