<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
  EyeIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  ClockIcon,
} from "@heroicons/vue/24/outline";
import { getBills, type Bills } from "@/services/userBillService";
import UserSidebar from "../components/UserSidebar.vue";
import router from "@/router";
import axios from "axios";

const searchQuery = ref("");
const currentFilter = ref("all");
const currentPage = ref(1);
// const itemsPerPage = 5;

const filters = [
  { id: "all", name: "All" },
  { id: "active", name: "Active" },
  { id: "inactive", name: "Inactive" },
  { id: "price", name: "Price" },
  { id: "date", name: "Date" },
];

const statistics = ref({
  activeBills: 0,
  totalAmount: 0,
  totalBills: 0,
});

const fetchDashboardData = async () => {
  try {
    const token = localStorage.getItem("token"); // Ganti dengan token valid
    const response = await axios.get(
      "https://sensible-annabal-cleanconnect-170c1a9e.koyeb.app/api/user/total-dashboard",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.status) {
      statistics.value = response.data.data;
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

const loading = ref(false);
const error = ref<string | null>(null);
const bills = ref<Bills[]>([]);

onMounted(async () => {
  try {
    loading.value = true;
    bills.value = await getBills();
  } catch (err: any) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});

const handleNewOrder = () => {
  console.log("New order clicked");
};

const handleEdit = (id: number) => {
  console.log("Edit item:", id);
};

const handleDelete = (id: number) => {
  console.log("Delete item:", id);
};

const handleViewDetails = (id: number) => {
  router.push(`/user/billing/${id}`);
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Dibayar":
      return "bg-green-100 text-green-700";
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "Terlambat":
      return "bg-red-100 text-red-700";
    case "Belum Dibayar":
      return "bg-orange-100 text-orange-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};
</script>

<template>
  <div class="flex min-h-screen bg-gray-50">
    <UserSidebar currentPage="Dashboard" :isOpen="true" />
    <main class="flex-1 ml-64">
      <div class="p-8 -ml-64">
        <!-- Header Section -->
        <div class="mb-8">
          <h1 class="text-2xl font-bold text-gray-900">Main Dashboard</h1>
          <p class="text-sm text-gray-600 mt-1">
            Welcome back! Here's your activity overview.
          </p>
        </div>

        <!-- Statistics Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <!-- Total Bills Card -->
          <div
            class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
          >
            <div class="flex items-center justify-between mb-4">
              <div class="p-2 bg-blue-50 rounded-lg">
                <ChartBarIcon class="h-6 w-6 text-blue-500" />
              </div>
              <span class="text-sm font-medium text-green-600">
                <!-- +{{ statistics.percentageChange.bills }}% -->
              </span>
            </div>
            <h3 class="text-sm font-medium text-gray-500">Total Bills</h3>
            <div class="mt-2 flex items-baseline">
              <p class="text-2xl font-bold text-gray-900">
                {{ statistics.totalBills }}
              </p>
              <p class="ml-2 text-sm text-gray-500">bills</p>
            </div>
            <p class="mt-2 text-xs text-gray-500">Compared to last month</p>
          </div>

          <!-- Total Costs Card -->
          <div
            class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
          >
            <div class="flex items-center justify-between mb-4">
              <div class="p-2 bg-green-50 rounded-lg">
                <CurrencyDollarIcon class="h-6 w-6 text-green-500" />
              </div>
              <span class="text-sm font-medium text-green-600">
                <!-- +{{ statistics.percentageChange.costs }}% -->
              </span>
            </div>
            <h3 class="text-sm font-medium text-gray-500">Total Biaya</h3>
            <div class="mt-2 flex items-baseline">
              <p class="text-2xl font-bold text-gray-900">
                {{ formatPrice(statistics.totalAmount) }}
              </p>
            </div>
            <p class="mt-2 text-xs text-gray-500">Total spending this month</p>
          </div>

          <!-- Active Orders Card -->
          <div
            class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
          >
            <div class="flex items-center justify-between mb-4">
              <div class="p-2 bg-purple-50 rounded-lg">
                <ClockIcon class="h-6 w-6 text-purple-500" />
              </div>
              <span class="text-sm font-medium text-green-600">
                <!-- +{{ statistics.percentageChange.orders }}% -->
              </span>
            </div>
            <h3 class="text-sm font-medium text-gray-500">
              Tagihan yang Aktif
            </h3>
            <div class="mt-2 flex items-baseline">
              <p class="text-2xl font-bold text-gray-900">
                {{ statistics.activeBills }}
              </p>
              <p class="ml-2 text-sm text-gray-500">orders</p>
            </div>
            <p class="mt-2 text-xs text-gray-500">Currently in progress</p>
          </div>
        </div>

        <!-- Search and Filters -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
          <div class="p-6">
            <div
              class="flex flex-col sm:flex-row justify-between items-center gap-4"
            >
              <!-- Search -->
              <div class="relative flex-1 max-w-md w-full">
                <MagnifyingGlassIcon
                  class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                />
                <input
                  type="text"
                  v-model="searchQuery"
                  placeholder="Search orders..."
                  class="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-100 focus:border-green-300"
                />
              </div>

              <!-- New Order Button -->
              <button
                @click="handleNewOrder"
                class="inline-flex items-center px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
              >
                New Order
              </button>
            </div>

            <!-- Filters -->
            <div class="flex flex-wrap gap-2 mt-4">
              <button
                v-for="filter in filters"
                :key="filter.id"
                @click="currentFilter = filter.id"
                :class="[
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  currentFilter === filter.id
                    ? 'bg-green-100 text-green-700 shadow-sm'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100',
                ]"
              >
                {{ filter.name }}
              </button>
            </div>
          </div>

          <!-- Table -->
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50 border-y border-gray-100">
                <tr>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Price
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr
                  v-for="item in bills"
                  :key="item.bill_no"
                  class="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                  >
                    {{ item.name }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {{ formatPrice(item.amount) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      class="px-2.5 py-1 text-xs font-medium rounded-full inline-flex items-center"
                      :class="getStatusColor(item.status)"
                    >
                      <span
                        class="w-1.5 h-1.5 rounded-full mr-1.5"
                        :class="{
                          'bg-green-600':
                            item.status.toLowerCase() === 'Dibayar',
                          'bg-yellow-600':
                            item.status.toLowerCase() === 'Pending',
                          'bg-red-600':
                            item.status.toLowerCase() === 'Terlambat',
                          'bg-orange-600':
                            item.status.toLowerCase() === 'Belum Dibayar',
                        }"
                      ></span>
                      {{
                        item.status.charAt(0).toUpperCase() +
                        item.status.slice(1)
                      }}
                    </span>
                    <!-- <span
                      :class="[
                        'px-2.5 py-1 text-xs font-medium rounded-full inline-flex items-center',
                        item.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700',
                      ]"
                    >
                      <span
                        class="w-1.5 h-1.5 rounded-full mr-1.5"
                        :class="
                          item.status === 'active'
                            ? 'bg-green-600'
                            : 'bg-red-600'
                        "
                      ></span>
                      {{
                        item.status.charAt(0).toUpperCase() +
                        item.status.slice(1)
                      }}
                    </span> -->
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {{ new Date(item.due_date).toLocaleDateString() }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div class="flex items-center space-x-3">
                      <button
                        @click="handleEdit(item.bill_no)"
                        class="text-gray-400 hover:text-gray-500 transition-colors duration-150"
                      >
                        <PencilSquareIcon class="h-5 w-5" />
                      </button>
                      <button
                        @click="handleDelete(item.bill_no)"
                        class="text-gray-400 hover:text-red-500 transition-colors duration-150"
                      >
                        <TrashIcon class="h-5 w-5" />
                      </button>
                      <button
                        @click="handleViewDetails(item.bill_no)"
                        class="inline-flex items-center px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                      >
                        <EyeIcon class="h-4 w-4 mr-1" />
                        Detail
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div
            class="px-6 py-4 flex items-center justify-between border-t border-gray-100"
          >
            <div class="flex-1 flex justify-between sm:hidden">
              <button
                class="px-4 py-2 border border-gray-200 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-150"
              >
                Previous
              </button>
              <button
                class="px-4 py-2 border border-gray-200 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-150"
              >
                Next
              </button>
            </div>
            <div
              class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
            >
              <div>
                <p class="text-sm text-gray-700">
                  Showing page
                  <span class="font-medium">{{ currentPage }}</span>
                </p>
              </div>
              <div>
                <nav
                  class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                >
                  <button
                    class="relative inline-flex items-center px-2 py-2 rounded-l-lg border border-gray-200 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-150"
                  >
                    Previous
                  </button>
                  <button
                    class="relative inline-flex items-center px-4 py-2 border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                  >
                    1
                  </button>
                  <button
                    class="relative inline-flex items-center px-4 py-2 border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                  >
                    2
                  </button>
                  <button
                    class="relative inline-flex items-center px-4 py-2 border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                  >
                    3
                  </button>
                  <button
                    class="relative inline-flex items-center px-2 py-2 rounded-r-lg border border-gray-200 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-150"
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
