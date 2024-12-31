<script setup lang="ts">
import { useRouter } from "vue-router";
import {
  HomeIcon,
  ChartBarIcon,
  UserGroupIcon,
  DocumentTextIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  CurrencyDollarIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";

const props = defineProps<{
  currentPage: string;
  isOpen: boolean;
}>();

const emit = defineEmits(["toggle"]);

const router = useRouter();

const menuItems = [
  { name: "Dashboard", icon: HomeIcon, path: "/dashboard" },
  { name: "Reports", icon: ChartBarIcon, path: "/reports" },
  { name: "Manage User", icon: UserGroupIcon, path: "/manage-user" },
  { name: "Generate Bill", icon: DocumentTextIcon, path: "/generate-bill" },
  {
    name: "Billing Management",
    icon: CurrencyDollarIcon,
    path: "/billing-management",
  },
  { name: "Profile", icon: UserIcon, path: "/profile" },
];

const handleLogout = () => {
  console.log("Logging out...");
  localStorage.removeItem("token");
  router.push("/login");
};

const handleNavigation = (path: string) => {
  router.push(path);
  if (window.innerWidth < 1024) {
    emit("toggle");
  }
};
</script>

<template>
  <aside
    :class="[
      'fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-sm flex flex-col transition-transform duration-300 ease-in-out',
      'lg:transform-none',
      isOpen ? 'transform-none' : '-translate-x-full lg:translate-x-0',
    ]"
  >
    <!-- Close button for mobile -->
    <button
      @click="$emit('toggle')"
      class="lg:hidden absolute right-4 top-4 text-gray-500 hover:text-gray-700"
    >
      <XMarkIcon class="h-6 w-6" />
    </button>

    <!-- Logo/Header -->
    <div class="p-6 border-b border-gray-100">
      <h2 class="text-xl font-bold text-gray-900">Admin Panel</h2>
      <p class="text-sm text-gray-500 mt-1">User Management</p>
    </div>

    <!-- Navigation Menu -->
    <nav class="flex-1 pt-4 overflow-y-auto">
      <div
        v-for="item in menuItems"
        :key="item.name"
        @click="handleNavigation(item.path)"
        :class="[
          'flex items-center px-6 py-3 mx-3 rounded-lg cursor-pointer transition-all duration-200',
          currentPage === item.name
            ? 'bg-primary-50 text-primary-600'
            : 'text-gray-600 hover:bg-gray-50',
        ]"
      >
        <component
          :is="item.icon"
          :class="[
            'h-5 w-5 mr-3',
            currentPage === item.name ? 'text-primary-600' : 'text-gray-400',
          ]"
        />
        <span :class="{ 'font-medium': currentPage === item.name }">
          {{ item.name }}
        </span>
      </div>
    </nav>

    <!-- Logout Button -->
    <div class="p-6 border-t border-gray-100">
      <button
        @click="handleLogout"
        class="w-full bg-green-500 hover:bg-green-600 text-white py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 font-medium shadow-sm"
      >
        <ArrowRightOnRectangleIcon class="h-5 w-5" />
        Logout
      </button>
    </div>
  </aside>

  <!-- Backdrop for mobile -->
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
    @click="$emit('toggle')"
  ></div>
</template>
