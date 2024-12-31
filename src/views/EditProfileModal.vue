<script setup lang="ts">
import { ref, watch } from "vue";
import axios from "axios";

const props = defineProps<{
  isOpen: boolean;
  userProfile: {
    id: number;
    name: string;
    email: string;
    address: string;
    no_hp: string;
    kategori: string;
    nik: string;
  };
}>();

const emit = defineEmits(["close", "profileUpdated"]);

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const address = ref("");
const noHp = ref("");
const image = ref<File | null>(null);

const loading = ref(false);
const error = ref<string | null>(null);

watch(
  () => props.userProfile,
  (newProfile) => {
    const [first, ...rest] = newProfile.name.split(" ");
    firstName.value = first;
    lastName.value = rest.join(" ");
    email.value = newProfile.email;
    address.value = newProfile.address;
    noHp.value = newProfile.no_hp;
  },
  { immediate: true }
);

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    image.value = target.files[0];
  }
};

const updateProfile = async () => {
  loading.value = true;
  error.value = null;

  try {
    const formData = new FormData();
    formData.append("first_name", firstName.value);
    formData.append("last_name", lastName.value);
    formData.append("email", email.value);
    formData.append("address", address.value);
    formData.append("no_hp", noHp.value);
    if (image.value) {
      formData.append("image", image.value);
    }

    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token not found");

    const response = await axios.put(
      "http://127.0.0.1:3000/api/user/profile",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.data.status) {
      emit("profileUpdated");
      emit("close");
    } else {
      throw new Error(response.data.message || "Failed to update profile");
    }
  } catch (err: any) {
    error.value = err.message || "An error occurred while updating the profile";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-lg p-8 max-w-md w-full">
      <h2 class="text-2xl font-bold mb-6">Edit Profile</h2>
      <form @submit.prevent="updateProfile" class="space-y-4">
        <div>
          <label for="firstName" class="block text-sm font-medium text-gray-700"
            >First Name</label
          >
          <input
            v-model="firstName"
            id="firstName"
            type="text"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label for="lastName" class="block text-sm font-medium text-gray-700"
            >Last Name</label
          >
          <input
            v-model="lastName"
            id="lastName"
            type="text"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email</label
          >
          <input
            v-model="email"
            id="email"
            type="email"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label for="address" class="block text-sm font-medium text-gray-700"
            >Address</label
          >
          <input
            v-model="address"
            id="address"
            type="text"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label for="noHp" class="block text-sm font-medium text-gray-700"
            >Phone Number</label
          >
          <input
            v-model="noHp"
            id="noHp"
            type="tel"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label for="image" class="block text-sm font-medium text-gray-700"
            >Profile Picture</label
          >
          <input
            @change="handleFileChange"
            id="image"
            type="file"
            accept="image/*"
            class="mt-1 block w-full"
          />
        </div>
        <div v-if="error" class="text-red-600 text-sm">{{ error }}</div>
        <div class="flex justify-end space-x-3">
          <button
            @click="emit('close')"
            type="button"
            class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="loading"
            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? "Updating..." : "Update Profile" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
