<script setup lang="ts">
import { ref } from "vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";

interface BillDetail {
  id: number;
  bill_id: number;
  status: string;
  image: string;
  name: string;
}

const props = defineProps<{
  isOpen: boolean;
  billDetail: BillDetail | null;
}>();

const emit = defineEmits(["close", "verify"]);

const verifyPayment = () => {
  emit("verify", props.billDetail?.bill_id);
};

// Add new ref for image loading state
const imageError = ref(false);
const imageLoaded = ref(false);

// const handleImageError = (event: Event) => {
//   imageError.value = true;
//   console.error("Failed to load image");
// };

// Add new method to handle image loading
const resetImageError = () => {
  imageError.value = false;
  imageLoaded.value = false;
};
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-lg p-8 max-w-md w-full">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">Bill Details</h2>
        <button
          @click="$emit('close')"
          class="text-gray-500 hover:text-gray-700"
        >
          <XMarkIcon class="h-6 w-6" />
        </button>
      </div>
      <div v-if="billDetail">
        <p><strong>Bill ID:</strong> {{ billDetail.bill_id }}</p>
        <p><strong>Name:</strong> {{ billDetail.name }}</p>
        <p><strong>Status:</strong> {{ billDetail.status }}</p>
        <div v-if="billDetail.image" class="mt-4">
          <div v-if="!imageError" class="relative">
            <img
              :src="billDetail.image"
              alt="Payment proof"
              class="max-w-full h-auto rounded-lg shadow-md"
            />
          </div>
          <div v-else class="p-4 bg-gray-100 rounded-lg text-center">
            <p class="text-gray-500">Failed to load image</p>
            <button
              @click="resetImageError"
              class="mt-2 text-primary-500 hover:text-primary-600"
            >
              Retry
            </button>
          </div>
        </div>
        <p v-else class="mt-4 text-gray-500 italic">No image available</p>
        <button
          @click="verifyPayment"
          class="mt-4 bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600"
          :disabled="billDetail.status !== 'pending'"
        >
          Verify Payment
        </button>
      </div>
    </div>
  </div>
</template>
