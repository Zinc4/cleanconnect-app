<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import {
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
  CreditCardIcon,
} from "@heroicons/vue/24/outline";
import UserSidebar from "../components/UserSidebar.vue";
import PaymentModal from "../components/PaymentModal.vue";
import { getBillDetail } from "@/services/userBillService";
import { formatDate } from "@/utils/dateUtils";

const route = useRoute();
const searchQuery = ref("");
const showPaymentModal = ref(false);
const loading = ref(true);
const error = ref<string | null>(null);

const billDetail = ref({
  id: "",
  description: "",
  amount: 0,
  bill_date: "",
  bill_due: "",
  status: "",
  category: "",
  additional_bill_name: "",
  additional_amount: 0,
  qr_url: "",
});

onMounted(async () => {
  try {
    const billId = route.params.id as string;
    const data = await getBillDetail(billId);
    billDetail.value = data;
  } catch (err: any) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});

const handleDownload = () => {
  console.log("Downloading bill...");
};

const handlePaymentSuccess = () => {
  // Refresh bill details
  const billId = route.params.id as string;
  getBillDetail(billId).then((data) => {
    billDetail.value = data;
  });
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};

const getTotalAmount = () => {
  return billDetail.value.amount + billDetail.value.additional_amount;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Dibayar":
      return "bg-green-100 text-green-700";
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "overdue":
      return "bg-red-100 text-red-700";
    default:
      return "bg-orange-100 text-orange-700";
  }
};
</script>

<template>
  <div class="flex min-h-screen bg-gray-50">
    <UserSidebar currentPage="Billing" />
    <main class="flex-1 lg:ml-64">
      <div class="p-4 lg:p-8 -ml-64">
        <!-- Header Section -->
        <div class="flex justify-between items-center mb-8">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Tagihan</h1>
            <p class="text-sm text-gray-600 mt-1">CleanConnect</p>
          </div>
          <div class="flex items-center gap-4">
            <div class="relative hidden sm:block">
              <MagnifyingGlassIcon
                class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
              />
              <input
                type="text"
                v-model="searchQuery"
                placeholder="Search..."
                class="w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-100 focus:border-green-300"
              />
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div
          v-if="loading"
          class="flex justify-center items-center min-h-[400px]"
        >
          <div
            class="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"
          ></div>
        </div>

        <!-- Error State -->
        <div
          v-else-if="error"
          class="max-w-3xl mx-auto p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
        >
          {{ error }}
        </div>

        <!-- Bill Detail Card -->
        <div
          v-else
          class="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100"
        >
          <div class="px-6 lg:px-8 py-6 border-b border-gray-100">
            <h2 class="text-lg font-semibold text-gray-900">Detail Tagihan</h2>
            <p class="text-sm text-gray-500 mt-1">
              View your billing information
            </p>
          </div>

          <div class="p-6 lg:p-8">
            <!-- Description -->
            <div class="mb-8">
              <label class="block text-sm font-medium text-gray-500 mb-2"
                >Description</label
              >
              <p class="text-lg font-medium text-gray-900">
                {{ billDetail.description }}
              </p>
            </div>

            <!-- Status -->
            <div class="mb-8">
              <label class="block text-sm font-medium text-gray-500 mb-2"
                >Status</label
              >
              <span
                class="px-3 py-1 text-sm font-medium rounded-full inline-flex items-center"
                :class="getStatusColor(billDetail.status)"
              >
                <span
                  class="w-1.5 h-1.5 rounded-full mr-1.5"
                  :class="{
                    'bg-green-600': billDetail.status === 'Dibayar',
                    'bg-yellow-600': billDetail.status === 'Pending',
                    'bg-red-600': billDetail.status === 'Terlambat',
                    'bg-orange-600': billDetail.status !== 'Belum Dibayar',
                  }"
                ></span>
                {{ billDetail.status }}
              </span>
            </div>

            <!-- Dates -->
            <div class="mb-8">
              <label class="block text-sm font-medium text-gray-500 mb-2"
                >Date</label
              >
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <p class="text-sm text-gray-500">Bill Date</p>
                  <p class="text-gray-900 mt-1">
                    {{ formatDate(billDetail.bill_date) }}
                  </p>
                </div>
                <div>
                  <p class="text-sm text-gray-500">Due Date</p>
                  <p class="text-gray-900 mt-1">
                    {{ formatDate(billDetail.bill_due) }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Amount Details -->
            <div class="mb-8">
              <label class="block text-sm font-medium text-gray-500 mb-2"
                >Amount Details</label
              >
              <div
                class="bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-4"
              >
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">Base Amount</span>
                  <span class="font-medium text-gray-900">{{
                    formatPrice(billDetail.amount)
                  }}</span>
                </div>
                <div
                  v-if="billDetail.additional_amount > 0"
                  class="flex justify-between items-center"
                >
                  <span class="text-gray-600">{{
                    billDetail.additional_bill_name
                  }}</span>
                  <span class="font-medium text-gray-900">{{
                    formatPrice(billDetail.additional_amount)
                  }}</span>
                </div>
                <div class="pt-4 border-t border-gray-200">
                  <div class="flex justify-between items-center">
                    <span class="font-medium text-gray-900">Total Amount</span>
                    <span class="text-xl font-bold text-gray-900">{{
                      formatPrice(getTotalAmount())
                    }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div
              class="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <button
                @click="handleDownload"
                class="inline-flex items-center justify-center px-6 py-2.5 border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all duration-200"
              >
                <ArrowDownTrayIcon class="h-5 w-5 mr-2" />
                Download
              </button>
              <button
                v-if="billDetail.status.toLowerCase() !== 'paid'"
                @click="showPaymentModal = true"
                class="inline-flex items-center justify-center px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
              >
                <CreditCardIcon class="h-5 w-5 mr-2" />
                Pay Now
              </button>
            </div>
          </div>
        </div>

        <!-- Payment Modal -->
        <PaymentModal
          :show="showPaymentModal"
          :bill-id="String(billDetail.id)"
          :amount="getTotalAmount()"
          :qr-url="billDetail.qr_url"
          @close="showPaymentModal = false"
          @success="handlePaymentSuccess"
        />
      </div>
    </main>
  </div>
</template>
