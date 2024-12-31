<script setup lang="ts">
import { ArrowDownTrayIcon } from "@heroicons/vue/24/outline";
import exportFromJSON from "export-from-json";

const props = defineProps<{
  bills: any;
}>();

const handleDownload = () => {
  // Here you would implement the actual download logic
  // console.log(`Downloading bills for ${formatMonth(props.month + "-01")}`);
  const data = props.bills;
  const fileName = "npp-billing-report";
  const exportType = exportFromJSON.types.xls;

  console.log(data);

  if (data) {
    exportFromJSON({ data, fileName, exportType });
  }
};
</script>

<template>
  <button
    @click="handleDownload"
    class="inline-flex items-center px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
  >
    <ArrowDownTrayIcon class="h-5 w-5 mr-2" />
    Download Report
  </button>
</template>
<!-- <script setup lang="ts">
import { ArrowDownTrayIcon } from "@heroicons/vue/24/outline";
import { formatMonth } from "@/utils/dateUtils";

const props = defineProps<{
  month: string;
}>();
</script>

<template>
  <div class="inline-flex items-center">
    <ArrowDownTrayIcon class="h-5 w-5 mr-2 text-white" />
    <slot></slot>
  </div>
</template> -->
