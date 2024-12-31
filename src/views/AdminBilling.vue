<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import Sidebar from "../components/Sidebar.vue";
import BillingStats from "../components/admin/BillingStats.vue";
import BillingTable from "../components/admin/BillingTable.vue";
import BillingFilter from "../components/admin/BillingFilter.vue";
import BillingDownload from "../components/admin/BillingDownload.vue";
import { getAdminBills, type AdminBill } from "@/services/adminBillService";
import { formatMonth } from "@/utils/dateUtils";

const searchQuery = ref("");
const selectedMonth = ref(new Date().toISOString().slice(0, 7));
const selectedStatus = ref("all");

const loading = ref(false);
const error = ref<string | null>(null);
const bills = ref<AdminBill[]>([]);

const stats = ref({
  totalBills: 45,
  totalAmount: 6750000,
  paidAmount: 4500000,
  pendingAmount: 2250000,
});

onMounted(async () => {
  try {
    loading.value = true;
    bills.value = await getAdminBills();
  } catch (err: any) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});

// const bills = ref([
//   {
//     id: "1",
//     billNumber: "BILL-001",
//     customerName: "John Smith",
//     date: "2024-03-01",
//     dueDate: "2024-03-15",
//     amount: 150000,
//     status: "paid",
//   },
//   {
//     id: "2",
//     billNumber: "BILL-002",
//     customerName: "Emma Wilson",
//     date: "2024-03-05",
//     dueDate: "2024-03-20",
//     amount: 175000,
//     status: "pending",
//   },
//   {
//     id: "3",
//     billNumber: "BILL-003",
//     customerName: "Michael Brown",
//     date: "2024-03-10",
//     dueDate: "2024-03-25",
//     amount: 200000,
//     status: "overdue",
//   },
// ]);

const filteredBills = computed(() => {
  return bills.value.filter((bill) => {
    const matchesSearch =
      bill.customerName
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase()) ||
      bill.billNumber.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesStatus =
      selectedStatus.value === "all" || bill.status === selectedStatus.value;
    const billMonth = bill.date.slice(0, 7);
    const matchesMonth = billMonth === selectedMonth.value;

    return matchesSearch && matchesStatus && matchesMonth;
  });
});

const handleFilter = (filters: { month: string; status: string }) => {
  selectedMonth.value = filters.month;
  selectedStatus.value = filters.status;
};

const updateStats = () => {
  const monthlyBills = filteredBills.value;
  stats.value = {
    totalBills: monthlyBills.length,
    totalAmount: monthlyBills.reduce((sum, bill) => sum + bill.amount, 0),
    paidAmount: monthlyBills
      .filter((bill) => bill.status === "paid")
      .reduce((sum, bill) => sum + bill.amount, 0),
    pendingAmount: monthlyBills
      .filter((bill) => bill.status === "pending" || bill.status === "overdue")
      .reduce((sum, bill) => sum + bill.amount, 0),
  };
};
</script>

<template>
  <div class="flex min-h-screen bg-gray-50">
    <Sidebar currentPage="Billing Management" />
    <main class="flex-1 ml-64">
      <div class="p-8 -ml-64">
        <!-- Header Section -->
        <div class="flex justify-between items-center mb-8">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Billing Management</h1>
            <p class="text-sm text-gray-600 mt-1">
              Track and manage all billing records
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
                placeholder="Search bills..."
                class="w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-300"
              />
            </div>
            <!-- <BillingDownload :bills="bills" /> -->
          </div>
        </div>

        <!-- Filters -->
        <BillingFilter @filter="handleFilter" />

        <!-- Billing Stats -->
        <BillingStats :stats="stats" />

        <!-- Billing Table -->
        <BillingTable :bills="filteredBills" />
      </div>
    </main>
  </div>
</template>
