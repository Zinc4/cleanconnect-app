<script setup lang="ts">
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { EllipsisHorizontalIcon } from '@heroicons/vue/24/outline';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const chartData = {
  labels: ['17', '18', '19', '20', '21', '22', '23'],
  datasets: [
    {
      label: 'Regular Payments',
      data: [4500, 3200, 5100, 4200, 3800, 4900, 5500],
      backgroundColor: 'rgba(14, 165, 233, 0.5)',
      borderColor: 'rgb(14, 165, 233)',
      borderWidth: 1
    },
    {
      label: 'Late Payments',
      data: [1200, 1500, 800, 1300, 1100, 900, 700],
      backgroundColor: 'rgba(2, 132, 199, 0.5)',
      borderColor: 'rgb(2, 132, 199)',
      borderWidth: 1
    }
  ]
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        display: true,
        color: 'rgba(0, 0, 0, 0.05)'
      }
    },
    x: {
      grid: {
        display: false
      }
    }
  },
  plugins: {
    legend: {
      position: 'top' as const
    }
  }
};
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-100">
    <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
      <div>
        <h2 class="text-lg font-semibold text-gray-900">Weekly Payments</h2>
        <p class="text-sm text-gray-500 mt-1">Payment trends for the last 7 days</p>
      </div>
      <button class="text-gray-400 hover:text-gray-500">
        <EllipsisHorizontalIcon class="h-6 w-6" />
      </button>
    </div>
    <div class="p-6">
      <div class="h-80">
        <Bar :data="chartData" :options="chartOptions" />
      </div>
    </div>
  </div>
</template>