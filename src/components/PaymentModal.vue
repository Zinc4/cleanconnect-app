<script setup lang="ts">
import { ref, onMounted } from "vue";
import { XMarkIcon, ArrowUpTrayIcon } from "@heroicons/vue/24/outline";
import { payBill, getBillDetail } from "@/services/userBillService";
import axios from "axios";

const props = defineProps<{
  show: boolean;
  billId: string;
  amount: number;
  qrUrl: string;
}>();

const emit = defineEmits(["close", "success"]);

const selectedFile = ref<File | null>(null);
const loading = ref(false);
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

const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    selectedFile.value = input.files[0];
    error.value = null;
  }
};

const handleSubmit = async () => {
  if (!selectedFile.value) {
    error.value = "Please upload payment proof";
    return;
  }

  try {
    loading.value = true;
    error.value = null;
    await payBill(props.billId, selectedFile.value);
    emit("success");
    emit("close");
  } catch (err: any) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

const downloadQR = async () => {
  try {
    const proxyUrl = "https://api.codetabs.com/v1/proxy?quest=";
    const response = await axios.get(proxyUrl + props.qrUrl, {
      responseType: "blob",
    });

    const imgBlob = response.data;
    const img = new Image();
    img.crossOrigin = "anonymous";

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    img.onload = () => {
      canvas.width = 328; // Set to desired width
      canvas.height = 328; // Set to desired height
      if (ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height); // Optional: add white background
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Convert canvas to downloadable image
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.setAttribute("download", "qris.png");
        link.click();
      }
    };

    // Set the image source to the blob object
    img.src = URL.createObjectURL(imgBlob);
  } catch (error) {
    console.error("Failed to download QR:", error);
  }
};
</script>

<template>
  <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>

    <!-- Modal -->
    <div
      class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
    >
      <div
        class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
      >
        <!-- Header -->
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold text-gray-900">
              Payment Instructions
            </h3>
            <button
              @click="$emit('close')"
              class="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon class="h-6 w-6" />
            </button>
          </div>

          <!-- Error Message -->
          <div
            v-if="error"
            class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg"
          >
            {{ error }}
          </div>

          <!-- Amount -->
          <div class="mb-6 p-4 bg-green-50 rounded-lg">
            <p class="text-sm text-green-600 font-medium">Amount to Pay</p>
            <p class="text-2xl font-bold text-green-700">
              {{
                new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(amount)
              }}
            </p>
          </div>

          <!-- QRIS Section -->
          <div class="mb-6">
            <p class="text-sm text-gray-600 mb-2">
              Scan the QRIS code below to make a payment:
            </p>
            <div class="flex justify-center mb-4">
              <img
                :src="qrUrl"
                alt="QRIS Code"
                class="w-80 h-80 object-contain border border-gray-200 rounded-lg shadow-md"
              />
            </div>
            <button
              @click="downloadQR"
              class="inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <ArrowUpTrayIcon class="h-5 w-5 mr-2" />
              Download QRIS Code
            </button>
          </div>

          <!-- Upload Section -->
          <div class="mt-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Upload Payment Proof
            </label>
            <div
              class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg"
            >
              <div class="space-y-1 text-center">
                <ArrowUpTrayIcon class="mx-auto h-12 w-12 text-gray-400" />
                <div class="flex text-sm text-gray-600">
                  <label
                    for="file-upload"
                    class="relative cursor-pointer rounded-md font-medium text-green-600 hover:text-green-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      class="sr-only"
                      accept="image/*,.pdf"
                      @change="handleFileSelect"
                    />
                  </label>
                  <p class="pl-1">or drag and drop</p>
                </div>
                <p class="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                <p
                  v-if="selectedFile"
                  class="text-sm text-green-600 font-medium"
                >
                  Selected: {{ selectedFile.name }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="button"
            @click="handleSubmit"
            :disabled="loading"
            class="inline-flex w-full justify-center rounded-lg bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading">Processing...</span>
            <span v-else>Submit Payment</span>
          </button>
          <button
            type="button"
            @click="$emit('close')"
            :disabled="loading"
            class="mt-3 inline-flex w-full justify-center rounded-lg bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
