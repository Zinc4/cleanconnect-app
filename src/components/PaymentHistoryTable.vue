<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  ChevronUpDownIcon,
  EyeIcon,
  ArrowDownTrayIcon,
} from "@heroicons/vue/24/outline";
import axios from "axios";

interface Payment {
  id: string;
  billNumber: string;
  date: string;
  amount: number;
  status: string;
  dueDate: string;
}

const payments = ref<Payment[]>([]);
const loading = ref(false);

const fetchPayments = async () => {
  loading.value = true;
  try {
    const token = localStorage.getItem("token"); // Ambil token dari localStorage
    const response = await axios.get(
      "https://sensible-annabal-cleanconnect-170c1a9e.koyeb.app/api/user/payments",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data && response.data.data) {
      payments.value = response.data.data.map((payment: any) => ({
        id: String(payment.bill_no),
        billNumber: `BILL-${payment.bill_no}`,
        date: payment.date,
        amount: payment.amount,
        status: payment.status,
        dueDate: payment.due_date,
      }));
    }
  } catch (error) {
    console.error("Failed to fetch payments:", error);
  } finally {
    loading.value = false;
  }
};

// Panggil fetchPayments saat komponen di-mount
onMounted(() => {
  fetchPayments();
});

const sortField = ref<keyof Payment | null>(null);
const sortDirection = ref<"asc" | "desc">("asc");

const sortBy = (field: keyof Payment) => {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    sortField.value = field;
    sortDirection.value = "asc";
  }

  payments.value.sort((a, b) => {
    const modifier = sortDirection.value === "asc" ? 1 : -1;
    if (a[field] < b[field]) return -1 * modifier;
    if (a[field] > b[field]) return 1 * modifier;
    return 0;
  });
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "paid":
      return "bg-green-100 text-green-700";
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "overdue":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};

const viewDetails = (id: string) => {
  console.log("View details for payment:", id);
};

const downloadReceipt = (id: string) => {
  console.log("Download receipt for payment:", id);
};
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100">
    <div class="overflow-x-auto">
      <div v-if="loading" class="text-center py-4">
        <p class="text-gray-500">Loading payments...</p>
      </div>
      <div v-else>
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                v-for="field in [
                  'billNumber',
                  'date',
                  'amount',
                  'status',
                  'dueDate',
                ]"
                :key="field"
                class="px-6 py-3 text-left"
              >
                <button
                  @click="sortBy(field as keyof Payment)"
                  class="group flex items-center text-xs font-medium text-gray-700 uppercase tracking-wider"
                >
                  {{
                    field === "billNumber"
                      ? "Bill No."
                      : field.charAt(0).toUpperCase() + field.slice(1)
                  }}
                  <ChevronUpDownIcon
                    class="ml-2 h-4 w-4 text-gray-400 group-hover:text-gray-500"
                    :class="{
                      'text-green-500': sortField === field,
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
              v-for="payment in payments"
              :key="payment.id"
              class="hover:bg-gray-50 transition-colors duration-150"
            >
              <td
                class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
              >
                {{ payment.billNumber }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {{ new Date(payment.date).toLocaleDateString() }}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
              >
                {{ formatPrice(payment.amount) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="px-2.5 py-1 text-xs font-medium rounded-full inline-flex items-center"
                  :class="getStatusColor(payment.status)"
                >
                  <span
                    class="w-1.5 h-1.5 rounded-full mr-1.5"
                    :class="{
                      'bg-green-600': payment.status === 'paid',
                      'bg-yellow-600': payment.status === 'pending',
                      'bg-red-600': payment.status === 'overdue',
                    }"
                  ></span>
                  {{
                    payment.status.charAt(0).toUpperCase() +
                    payment.status.slice(1)
                  }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {{ new Date(payment.dueDate).toLocaleDateString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div class="flex items-center space-x-3">
                  <button
                    @click="viewDetails(payment.id)"
                    class="text-gray-400 hover:text-green-500 transition-colors duration-150"
                    title="View Details"
                  >
                    <EyeIcon class="h-5 w-5" />
                  </button>
                  <button
                    v-if="payment.status === 'paid'"
                    @click="downloadReceipt(payment.id)"
                    class="text-gray-400 hover:text-green-500 transition-colors duration-150"
                    title="Download Receipt"
                  >
                    <ArrowDownTrayIcon class="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
