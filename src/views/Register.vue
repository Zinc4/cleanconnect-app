<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "@/composables/useAuth";

const router = useRouter();
const { register, loading, error } = useAuth();

const formData = ref({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  nik: "",
  kategori: "",
});

const handleRegister = async () => {
  if (formData.value.password !== formData.value.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    await register({
      firstName: formData.value.firstName,
      lastName: formData.value.lastName,
      email: formData.value.email,
      password: formData.value.password,
      nik: formData.value.nik,
      kategori: formData.value.kategori,
    });

    alert("Registration successful!");
    router.push("/login");
  } catch (err) {
    console.error("Registration failed:", err);
  }
};

const handleGoogleSignup = () => {
  console.log("Google signup...");
};

const handleFacebookSignup = () => {
  console.log("Facebook signup...");
};
</script>

<template>
  <div class="min-h-screen flex flex-col lg:flex-row">
    <!-- Left Section -->
    <div
      class="hidden lg:flex lg:w-1/2 bg-white flex-col items-center justify-center p-12"
    >
      <div class="max-w-md">
        <!-- Logo -->
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-green-600">CleanConnect</h1>
          <p class="text-gray-600 mt-2">Waste Management Made Simple</p>
        </div>
        <!-- Illustration -->
        <div class="mb-8">
          <img
            src="/illustration.svg"
            alt="Woman with laptop"
            class="w-full h-auto"
          />
        </div>
        <!-- Welcome Text -->
        <h2 class="text-2xl font-bold text-green-800 text-center">
          Starts for free and get attractive offers
        </h2>
        <p class="mt-4 text-gray-600 text-center">
          Join our community and experience hassle-free waste management
          services
        </p>
      </div>
    </div>

    <!-- Right Section -->
    <div
      class="w-full lg:w-1/2 bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center p-6 lg:p-8"
    >
      <div class="w-full max-w-md">
        <!-- Mobile Logo -->
        <div class="text-center mb-8 lg:hidden">
          <h1 class="text-3xl font-bold text-white">CleanConnect</h1>
          <p class="text-green-100 mt-2">Waste Management Made Simple</p>
        </div>

        <!-- Register Header -->
        <div class="mb-8">
          <h1 class="text-4xl font-bold text-white mb-2">Create Account</h1>
          <p class="text-green-100">Please fill in your details to register</p>
        </div>

        <!-- Error Message -->
        <div
          v-if="error"
          class="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
        >
          {{ error }}
        </div>

        <!-- Register Form -->
        <form @submit.prevent="handleRegister" class="space-y-6">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-green-100 mb-2">
                First Name
              </label>
              <input
                type="text"
                v-model="formData.firstName"
                placeholder="Enter first name"
                class="w-full px-4 py-3 rounded-lg bg-white/10 border border-green-400 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-green-100 mb-2">
                Last Name
              </label>
              <input
                type="text"
                v-model="formData.lastName"
                placeholder="Enter last name"
                class="w-full px-4 py-3 rounded-lg bg-white/10 border border-green-400 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-green-100 mb-2">
              Category
            </label>
            <select
              v-model="formData.kategori"
              class="w-full px-4 py-3 rounded-lg bg-white/10 border border-green-400 text-gray focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
              required
            >
              <option value="" disabled selected>Pilih Kategori</option>
              <option value="regular">Reguler</option>
              <option value="industry">Industri</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-green-100 mb-2">
              NIK
            </label>
            <input
              type="text"
              v-model="formData.nik"
              placeholder="Enter your NIK"
              class="w-full px-4 py-3 rounded-lg bg-white/10 border border-green-400 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-green-100 mb-2">
              Email
            </label>
            <input
              type="email"
              v-model="formData.email"
              placeholder="Enter your email"
              class="w-full px-4 py-3 rounded-lg bg-white/10 border border-green-400 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-green-100 mb-2">
              Password
            </label>
            <input
              type="password"
              v-model="formData.password"
              placeholder="Create a password"
              class="w-full px-4 py-3 rounded-lg bg-white/10 border border-green-400 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-green-100 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              v-model="formData.confirmPassword"
              placeholder="Confirm your password"
              class="w-full px-4 py-3 rounded-lg bg-white/10 border border-green-400 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-green-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading">Registering...</span>
            <span v-else>Create Account</span>
          </button>
        </form>

        <!-- Divider -->
        <div class="relative my-8">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-green-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-4 text-green-100 bg-green-500"
              >or sign up with</span
            >
          </div>
        </div>

        <!-- Social Sign Up Buttons -->
        <div class="space-y-4">
          <button
            @click="handleGoogleSignup"
            class="w-full bg-white text-gray-700 px-6 py-3 rounded-lg font-medium flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
          >
            <svg class="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27c3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10c5.35 0 9.25-3.67 9.25-9.09c0-1.15-.15-1.81-.15-1.81Z"
              />
            </svg>
            Sign up with Google
          </button>
          <button
            @click="handleFacebookSignup"
            class="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center hover:bg-blue-700 transition-colors duration-200"
          >
            <svg class="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02Z"
              />
            </svg>
            Sign up with Facebook
          </button>
        </div>

        <!-- Login Link -->
        <p class="mt-6 text-center text-green-100">
          Already have an account?
          <a
            @click="router.push('/login')"
            class="font-medium text-white hover:underline cursor-pointer"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  </div>
</template>
