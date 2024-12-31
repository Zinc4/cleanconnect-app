<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Sidebar from './components/Sidebar.vue';

const route = useRoute();
const currentPage = ref(route.name as string);
const showSidebar = ref(true);
const isSidebarOpen = ref(false);

watch(() => route.name, (newName) => {
  if (newName) {
    currentPage.value = newName;
    showSidebar.value = newName !== 'Login' && newName !== 'Register' && newName !== 'EmailVerification';
  }
});

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>

<template>
  <div class="flex min-h-screen bg-primary-50">
    <Sidebar 
      v-if="showSidebar" 
      :currentPage="currentPage"
      :isOpen="isSidebarOpen"
      @toggle="toggleSidebar" 
    />
    <main :class="[
      showSidebar ? 'lg:ml-64' : '', 
      'flex-1 w-full transition-all duration-200'
    ]">
      <div class="max-w-6xl mx-auto">
        <template v-if="showSidebar">
          <div class="mb-6 p-4 lg:p-8">
            <div class="flex items-center justify-between">
              <div>
                <h1 class="text-xl lg:text-2xl font-bold text-gray-900">{{ currentPage }}</h1>
                <p class="text-sm text-gray-600 mt-1">CleanConnect</p>
              </div>
              <!-- Mobile menu button -->
              <button 
                @click="toggleSidebar"
                class="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                <svg 
                  class="w-6 h-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </template>
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<style>
@media (max-width: 1024px) {
  .sidebar-open {
    transform: translateX(0);
  }
  
  .sidebar-closed {
    transform: translateX(-100%);
  }
}
</style>