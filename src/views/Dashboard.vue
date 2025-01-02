<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

const dashboardData = ref({
  totalPendingPayment: 0,
  totalSuccessPayment: 0,
  totalUser: 0,
});

const notifications = ref<
  {
    id: number;
    notification: string;
    username: string;
    user_id: number;
    amount: number;
    created_at: string;
  }[]
>([]);

const fetchNotifications = async () => {
  try {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImV4cCI6MTczNTg2MzkwMCwicm9sZSI6ImFkbWluIiwidXNlcklEIjo5fQ.EYO_c390DN0ii0PMEV-uIoAQNBWGItvPLjjejpYguw8";
    const response = await axios.get(
      "http://127.0.0.1:8080/api/admin/notifications",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.status) {
      notifications.value = response.data.data;
    } else {
      console.error(response.data.message || "Failed to fetch notifications");
    }
  } catch (error) {
    console.error("Error fetching notifications:", error);
  }
};

const fetchDashboardData = async () => {
  try {
    const token = localStorage.getItem("token"); // Ganti dengan token valid
    const response = await axios.get(
      "https://sensible-annabal-cleanconnect-170c1a9e.koyeb.app/api/admin/total-dashboard",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.status) {
      dashboardData.value = response.data.data;
    } else {
      console.error(response.data.message || "Failed to fetch dashboard data");
    }
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
  }
};

onMounted(() => {
  fetchDashboardData();
  fetchNotifications();
});
</script>

<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Total Users -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Total Users</h3>
        <p class="text-3xl font-bold text-primary-600">
          {{ dashboardData.totalUser }}
        </p>
        <p class="text-sm text-gray-500 mt-1">+12% from last month</p>
      </div>

      <!-- Total Pendapatan -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 class="text-lg font-semibold text-gray-900 mb-2">
          Total Pendapatan
        </h3>
        <p class="text-3xl font-bold text-green-600">
          Rp.{{ dashboardData.totalSuccessPayment }}
        </p>
        <p class="text-sm text-gray-500 mt-1">+8% from last month</p>
      </div>

      <!-- Tagihan yang Tertunda -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 class="text-lg font-semibold text-gray-900 mb-2">
          Tagihan yang Tertunda
        </h3>
        <p class="text-3xl font-bold text-red-600">
          {{ dashboardData.totalPendingPayment }}
        </p>
        <p class="text-sm text-gray-500 mt-1">-5% from last month</p>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      <div class="space-y-4">
        <div
          v-for="notification in notifications"
          :key="notification.id"
          class="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
        >
          <div>
            <p class="font-medium text-gray-900">
              {{ notification.notification }}
            </p>
            <p class="text-sm text-gray-500">
              {{ notification.username }} - {{ notification.user_id }}
            </p>
          </div>
          <div class="text-right">
            <p class="font-medium text-green-600">
              Rp.{{ notification.amount }}
            </p>
            <p class="text-sm text-gray-500">
              {{ new Date(notification.created_at).toLocaleString() }}
            </p>
          </div>
        </div>
        <p v-if="notifications.length === 0" class="text-sm text-gray-500">
          No recent activities found.
        </p>
      </div>
    </div>
  </div>
</template>
