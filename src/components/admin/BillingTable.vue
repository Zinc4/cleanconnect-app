<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  ChevronUpDownIcon,
  EyeIcon,
  DocumentArrowDownIcon,
} from "@heroicons/vue/24/outline";
import { getAdminBills, type AdminBill } from "@/services/adminBillService";
import { formatDate, formatCurrency } from "@/utils/dateUtils";
import BillDetailModal from "./BillDetailModal.vue";
import BillingDownload from "./BillingDownload.vue";
import axios from "axios";

const loading = ref(false);
const error = ref<string | null>(null);
const bills = ref<AdminBill[]>([]);

const sortField = ref<keyof AdminBill | null>(null);
const sortDirection = ref<"asc" | "desc">("asc");

const showModal = ref(false);
const selectedBillDetail = ref(null);

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

const sortBy = (field: keyof AdminBill) => {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    sortField.value = field;
    sortDirection.value = "asc";
  }

  bills.value.sort((a, b) => {
    const modifier = sortDirection.value === "asc" ? 1 : -1;
    if (a[field] < b[field]) return -1 * modifier;
    if (a[field] > b[field]) return 1 * modifier;
    return 0;
  });
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

const viewBillDetails = async (billId: string) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:3000/api/admin/payments/bill/${billId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data.status && response.data.data) {
      // Validate image URL before setting
      const imageUrl = response.data.data.image;
      selectedBillDetail.value = {
        ...response.data.data,
        image: imageUrl || null,
      };
      showModal.value = true;
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Error fetching bill details:", error);
    alert("Pelanggan belum melakukan pembayaran");
  }
};

const downloadBill = (id: string) => {
  console.log("Download bill:", id);
};

const verifyPayment = async (billId: number) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:3000/api/admin/payment/verify/${billId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you store the token in localStorage
        },
      }
    );
    if (response.data.status) {
      alert(response.data.message);
      // Refresh the bills list or update the status locally
      const billIndex = bills.value.findIndex(
        (bill) => bill.bill_no === billId
      );
      if (billIndex !== -1) {
        bills.value[billIndex].status = "Dibayar";
      }
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
  }
};
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100">
    <BillingDownload :bills="bills" />
    <!-- Loading State -->
    <div v-if="loading" class="p-8 flex justify-center">
      <div
        class="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"
      ></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="p-8">
      <div
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
      >
        {{ error }}
      </div>
    </div>

    <!-- Data Table -->
    <div v-else class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              v-for="field in [
                'bill_no',
                'username',
                'date',
                'due_date',
                'amount',
                'status',
              ]"
              :key="field"
              class="px-6 py-3 text-left"
            >
              <button
                @click="sortBy(field as keyof AdminBill)"
                class="group flex items-center text-xs font-medium text-gray-700 uppercase tracking-wider"
              >
                {{
                  field === "bill_no"
                    ? "Bill No."
                    : field === "due_date"
                    ? "Due Date"
                    : field.charAt(0).toUpperCase() + field.slice(1)
                }}
                <ChevronUpDownIcon
                  class="ml-2 h-4 w-4 text-gray-400 group-hover:text-gray-500"
                  :class="{
                    'text-primary-500': sortField === field,
                  }"
                />
              </button>
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-100">
          <tr
            v-for="bill in bills"
            :key="bill.bill_no"
            class="hover:bg-gray-50 transition-colors duration-150"
          >
            <td
              class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
            >
              {{ bill.bill_no }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
              {{ bill.username }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
              {{ formatDate(bill.date) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
              {{ formatDate(bill.due_date) }}
            </td>
            <td
              class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
            >
              {{ formatCurrency(bill.amount) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                class="px-2.5 py-1 text-xs font-medium rounded-full inline-flex items-center"
                :class="getStatusColor(bill.status)"
              >
                <span
                  class="w-1.5 h-1.5 rounded-full mr-1.5"
                  :class="{
                    'bg-green-600': bill.status.toLowerCase() === 'Dibayar',
                    'bg-yellow-600': bill.status.toLowerCase() === 'Pending',
                    'bg-red-600': bill.status.toLowerCase() === 'Terlambat',
                    'bg-orange-600':
                      bill.status.toLowerCase() === 'Belum Dibayar',
                  }"
                ></span>
                {{ bill.status.charAt(0).toUpperCase() + bill.status.slice(1) }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <div class="flex items-center space-x-3">
                <button
                  @click="viewBillDetails(String(bill.bill_no))"
                  class="text-gray-400 hover:text-primary-500 transition-colors duration-150"
                  title="View Details"
                >
                  <EyeIcon class="h-5 w-5" />
                </button>
                <button
                  @click="downloadBill(String(bill.bill_no))"
                  class="text-gray-400 hover:text-primary-500 transition-colors duration-150"
                  title="Download Bill"
                >
                  <DocumentArrowDownIcon class="h-5 w-5" />
                </button>
              </div>
            </td>
          </tr>

          <!-- Empty State -->
          <tr v-if="bills.length === 0">
            <td colspan="7" class="px-6 py-8 text-center text-gray-500">
              No bills found
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <BillDetailModal
    :is-open="showModal"
    :bill-detail="selectedBillDetail"
    @close="showModal = false"
    @verify="verifyPayment"
  />
</template>
