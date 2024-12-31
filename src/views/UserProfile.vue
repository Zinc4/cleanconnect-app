<script setup lang="ts">
import { ref, onMounted } from "vue";
import { MagnifyingGlassIcon, PencilIcon } from "@heroicons/vue/24/outline";
import UserSidebar from "../components/UserSidebar.vue";
import EditProfileModal from "./EditProfileModal.vue";
import axios from "axios";

const searchQuery = ref("");
// const user = ref({
//   id: "110A",
//   name: "Adela Parkson",
//   address: "Khumaltar, Lalitpur",
//   phone: "9841236978",
//   email: "Adela98@gmail.com",
// });

// const loading = ref(true);
// const error = ref<string | null>(null);

// const userProfile = ref({
//   id: 0,
//   name: "",
//   email: "",
//   address: "",
//   no_hp: "",
//   kategori: "",
//   nik: "",
// });

// onMounted(async () => {
//   try {
//     const response = await getUserProfile();
//     userProfile.value = response;
//   } catch (err: any) {
//     error.value = err.message;
//   } finally {
//     loading.value = false;
//   }
// });

const userProfile = ref({
  id: 0,
  name: "",
  email: "",
  address: "",
  no_hp: "",
  kategori: "",
  nik: "",
  image: "",
});
const loading = ref(false);
const error = ref<string | null>(null);
const showEditModal = ref(false);

// Fetch user profile
const fetchUserProfile = async () => {
  try {
    loading.value = true;
    const token = localStorage.getItem("token"); // Assuming you use token authentication
    if (!token) throw new Error("Token not found");

    const response = await axios.get("http://127.0.0.1:3000/api/user/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Map response to userProfile
    const data = response.data.data;
    userProfile.value = {
      id: data.id,
      name: data.name,
      email: data.email,
      address: data.address,
      no_hp: data.no_hp,
      kategori: data.kategori,
      nik: data.nik,
      image: data.image,
    };
  } catch (err: any) {
    error.value = err.message || "Failed to fetch profile data";
  } finally {
    loading.value = false;
  }
};

onMounted(fetchUserProfile);

const handleProfileUpdated = () => {
  fetchUserProfile();
};

const handleEdit = () => {
  showEditModal.value = true;
};
</script>

<template>
  <div class="flex min-h-screen bg-gray-50">
    <UserSidebar currentPage="Profile" />
    <main class="flex-1 ml-64">
      <div class="p-8 -ml-64">
        <!-- Header Section -->
        <div class="flex justify-between items-center mb-8">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Profile</h1>
            <p class="text-sm text-gray-600 mt-1">
              Manage your account settings
            </p>
          </div>
          <div class="relative max-w-xs">
            <MagnifyingGlassIcon
              class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
            />
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search..."
              class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-100 focus:border-green-300"
            />
          </div>
        </div>

        <!-- Profile Card -->
        <div
          class="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <!-- Banner -->
          <div
            class="h-24 bg-gradient-to-r from-green-400 to-green-600 relative"
          >
            <div class="absolute inset-0 bg-white/10"></div>
            <div class="absolute bottom-4 left-8">
              <h2 class="text-white text-lg font-semibold">Your Profile</h2>
            </div>
          </div>

          <div class="p-8">
            <div class="flex items-start gap-8">
              <!-- Profile Details -->
              <div class="flex-grow space-y-6">
                <!-- User ID -->
                <div>
                  <label class="block text-sm font-medium text-green-600 mb-1"
                    >User ID</label
                  >
                  <p class="text-gray-900">
                    {{ userProfile.id }}
                  </p>
                </div>

                <!-- Name -->
                <div>
                  <label class="block text-sm font-medium text-green-600 mb-1"
                    >Name</label
                  >
                  <p class="text-gray-900">{{ userProfile.name }}</p>
                </div>

                <!-- Address -->
                <div>
                  <label class="block text-sm font-medium text-green-600 mb-1"
                    >Address</label
                  >
                  <p class="text-gray-900">{{ userProfile.address }}</p>
                </div>

                <!-- Contact Number -->
                <div>
                  <label class="block text-sm font-medium text-green-600 mb-1"
                    >Contact Number</label
                  >
                  <p class="text-gray-900">{{ userProfile.no_hp }}</p>
                </div>

                <!-- Email -->
                <div>
                  <label class="block text-sm font-medium text-green-600 mb-1"
                    >Email Address</label
                  >
                  <p class="text-gray-900">{{ userProfile.email }}</p>
                </div>
              </div>

              <!-- Profile Picture -->
              <div class="flex-shrink-0">
                <div
                  class="w-32 h-32 rounded-full bg-gradient-to-br from-green-50 to-green-100 border-4 border-white shadow-lg flex items-center justify-center overflow-hidden"
                >
                  <img
                    :src="userProfile.image"
                    alt="Profile Picture"
                    class="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <!-- Edit Button -->
            <div class="mt-8 flex justify-end">
              <button
                @click="handleEdit"
                class="inline-flex items-center px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
              >
                <PencilIcon class="h-5 w-5 mr-2" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
    <EditProfileModal
      :is-open="showEditModal"
      :user-profile="userProfile"
      @close="showEditModal = false"
      @profile-updated="handleProfileUpdated"
    />
  </div>
</template>
