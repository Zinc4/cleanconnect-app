<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  PencilSquareIcon,
  TrashIcon,
  ChevronUpDownIcon,
} from "@heroicons/vue/24/outline";
import { getAdminUsers, type User } from "@/services/adminUserService";

// interface User {
//   uid: string;
//   name: string;
//   address: string;
//   scno: string;
//   amount: number;
// }

// const users = ref<User[]>([
//   {
//     uid: "UID001",
//     name: "John Smith",
//     address: "123 Main St, City",
//     scno: "SC001",
//     amount: 1250.0,
//   },
//   {
//     uid: "UID002",
//     name: "Emma Wilson",
//     address: "456 Oak Ave, Town",
//     scno: "SC002",
//     amount: 890.5,
//   },
//   {
//     uid: "UID003",
//     name: "Michael Brown",
//     address: "789 Pine Rd, Village",
//     scno: "SC003",
//     amount: 2100.75,
//   },
//   {
//     uid: "UID004",
//     name: "Sarah Davis",
//     address: "321 Elm St, County",
//     scno: "SC004",
//     amount: 1575.25,
//   },
//   {
//     uid: "UID005",
//     name: "James Johnson",
//     address: "654 Maple Dr, District",
//     scno: "SC005",
//     amount: 945.0,
//   },
// ]);
const loading = ref(false);
const error = ref<string | null>(null);
const users = ref<User[]>([]);

const sortField = ref<keyof User | null>(null);
const sortDirection = ref<"asc" | "desc">("asc");

onMounted(async () => {
  try {
    loading.value = true;
    users.value = await getAdminUsers();
  } catch (err: any) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});

const sortBy = (field: keyof User) => {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    sortField.value = field;
    sortDirection.value = "asc";
  }

  users.value.sort((a, b) => {
    const modifier = sortDirection.value === "asc" ? 1 : -1;
    if (a[field] < b[field]) return -1 * modifier;
    if (a[field] > b[field]) return 1 * modifier;
    return 0;
  });
};
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-100">
    <div class="px-6 py-4 border-b border-gray-100">
      <h2 class="text-lg font-semibold text-gray-900">User Details</h2>
      <p class="text-sm text-gray-500 mt-1">
        Manage and view all user information
      </p>
    </div>
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-primary-50">
          <tr>
            <th
              v-for="field in ['id', 'nama', 'email', 'alamat', 'nik']"
              :key="field"
              class="px-6 py-3 text-left"
            >
              <button
                @click="sortBy(field as keyof User)"
                class="group flex items-center text-xs font-medium text-gray-700 uppercase tracking-wider"
              >
                {{ field.toUpperCase() }}
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
            v-for="user in users"
            :key="user.id"
            class="hover:bg-primary-50/50 transition-colors duration-150"
          >
            <td
              class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
            >
              {{ user.id }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ user.name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
              {{ user.email }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ user.address }}
            </td>
            <td
              class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
            >
              <!-- ${{ user.amount.toFixed(2) }} -->
              {{ user.nik }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <div class="flex space-x-3">
                <button
                  class="text-primary-600 hover:text-primary-700 transition-colors duration-150"
                >
                  <PencilSquareIcon class="h-5 w-5" />
                </button>
                <button
                  class="text-red-600 hover:text-red-700 transition-colors duration-150"
                >
                  <TrashIcon class="h-5 w-5" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
