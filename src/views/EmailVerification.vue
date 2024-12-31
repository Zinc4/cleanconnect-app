<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { verifyEmail } from '@/services/api';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/vue/24/outline';

const route = useRoute();
const router = useRouter();
const loading = ref(true);
const error = ref<string | null>(null);
const success = ref(false);

onMounted(async () => {
  const token = route.params.token as string;
  
  try {
    await verifyEmail(token);
    success.value = true;
  } catch (err: any) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});

const handleRedirect = () => {
  router.push('/login');
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
    <div class="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
      <!-- Logo -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-green-600">CleanConnect</h1>
        <p class="text-gray-600 mt-2">Email Verification</p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="space-y-4">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent mx-auto"></div>
        <p class="text-gray-600">Verifying your email address...</p>
      </div>

      <!-- Success State -->
      <div v-else-if="success" class="space-y-6">
        <CheckCircleIcon class="h-16 w-16 text-green-500 mx-auto" />
        <div>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Email Verified!</h2>
          <p class="text-gray-600">Your email has been successfully verified. You can now log in to your account.</p>
        </div>
        <button
          @click="handleRedirect"
          class="w-full bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors duration-200 shadow-sm hover:shadow-md"
        >
          Continue to Login
        </button>
      </div>

      <!-- Error State -->
      <div v-else class="space-y-6">
        <XCircleIcon class="h-16 w-16 text-red-500 mx-auto" />
        <div>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Verification Failed</h2>
          <p class="text-red-600">{{ error }}</p>
          <p class="text-gray-600 mt-2">Please try again or contact support if the problem persists.</p>
        </div>
        <button
          @click="handleRedirect"
          class="w-full bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors duration-200 shadow-sm hover:shadow-md"
        >
          Back to Login
        </button>
      </div>
    </div>
  </div>
</template>