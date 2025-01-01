<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import {
  MagnifyingGlassIcon,
  CalendarIcon,
  FunnelIcon,
} from "@heroicons/vue/24/outline";
import UserSidebar from "../components/UserSidebar.vue";

interface LogEntry {
  id: number;
  type: string;
  description: string;
  oldValue: string;
  newValue: string;
  timestamp: string;
  status: string;
}

const searchQuery = ref("");
const selectedFilter = ref("all");
// const currentPage = ref(1);

const filters = [
  { id: "all", name: "All Changes" },
  { id: "profile", name: "Profile Updates" },
  { id: "password", name: "Password Changes" },
  { id: "email", name: "Email Updates" },
  { id: "address", name: "Address Changes" },
];

const logEntries = ref<LogEntry[]>([]);

const fetchLogEntries = async () => {
  try {
    const token = localStorage.getItem("token"); // Ganti dengan token valid
    const response = await axios.get(
      "https://sensible-annabal-cleanconnect-170c1a9e.koyeb.app/api/user/logs",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.status) {
      logEntries.value = response.data.data.map((log: any) => ({
        id: log.id,
        type: log.change_type.split(" ")[1].toLowerCase(), // Menyesuaikan tipe
        description: log.change_type,
        oldValue: log.old_value,
        newValue: log.new_value,
        timestamp: log.created_at,
        status: log.status,
      }));
    } else {
      console.error(response.data.message || "Failed to fetch logs");
    }
  } catch (error) {
    console.error("Error fetching logs:", error);
  }
};

onMounted(() => {
  fetchLogEntries();
});

const getStatusColor = (status: string) => {
  switch (status) {
    case "success":
      return "bg-green-100 text-green-700";
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "failed":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case "profile":
      return "bg-blue-100 text-blue-600";
    case "password":
      return "bg-purple-100 text-purple-600";
    case "email":
      return "bg-green-100 text-green-600";
    case "address":
      return "bg-orange-100 text-orange-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};
</script>

<template>
  <div class="flex min-h-screen bg-gray-50">
    <UserSidebar currentPage="Account Log" :isOpen="true" />
    <main class="flex-1 ml-64">
      <div class="p-8 -ml-64">
        <!-- Header Section -->
        <div class="flex justify-between items-center mb-8">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Account Log</h1>
            <p class="text-sm text-gray-600 mt-1">
              Track all changes made to your account
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
                placeholder="Search logs..."
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

        <!-- Log Entries -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100">
          <div class="p-6">
            <div class="space-y-6">
              <div
                v-for="entry in logEntries"
                :key="entry.id"
                class="flex items-start gap-4 p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors duration-200"
              >
                <!-- Type Icon -->
                <div
                  class="w-10 h-10 rounded-lg flex items-center justify-center"
                  :class="getTypeIcon(entry.type)"
                >
                  <span class="text-lg font-semibold">{{
                    entry.type.charAt(0).toUpperCase()
                  }}</span>
                </div>

                <!-- Content -->
                <div class="flex-grow">
                  <div class="flex justify-between items-start">
                    <div>
                      <h3 class="text-base font-semibold text-gray-900">
                        {{ entry.description }}
                      </h3>
                      <div class="mt-1 text-sm text-gray-600">
                        <p>From: {{ entry.oldValue }}</p>
                        <p>To: {{ entry.newValue }}</p>
                      </div>
                    </div>
                    <span
                      class="px-3 py-1 rounded-full text-xs font-medium"
                      :class="getStatusColor(entry.status)"
                    >
                      {{
                        entry.status.charAt(0).toUpperCase() +
                        entry.status.slice(1)
                      }}
                    </span>
                  </div>
                  <p class="mt-2 text-sm text-gray-500">
                    {{ new Date(entry.timestamp).toLocaleString() }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
