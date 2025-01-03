<script setup lang="ts">
import { ArrowDownTrayIcon } from "@heroicons/vue/24/outline";
import * as XLSX from "xlsx-js-style";

const props = defineProps<{
  bills: any[];
}>();

const handleDownload = () => {
  if (!props.bills || props.bills.length === 0) {
    alert("No billing data available to download.");
    return;
  }

  // 1. Data Preparation
  const worksheetData = [
    [
      {
        v: "ID",
        s: { font: { bold: true }, fill: { fgColor: { rgb: "D9EAD3" } } },
      },
      {
        v: "Nama",
        s: { font: { bold: true }, fill: { fgColor: { rgb: "D9EAD3" } } },
      },
      {
        v: "Jumlah",
        s: { font: { bold: true }, fill: { fgColor: { rgb: "D9EAD3" } } },
      },
      {
        v: "Status Pembayaran",
        s: { font: { bold: true }, fill: { fgColor: { rgb: "D9EAD3" } } },
      },
      {
        v: "Tanggal Jatuh Tempo",
        s: { font: { bold: true }, fill: { fgColor: { rgb: "D9EAD3" } } },
      },
      {
        v: "Tanggal Pembayaran",
        s: { font: { bold: true }, fill: { fgColor: { rgb: "D9EAD3" } } },
      },
    ],
    ...props.bills.map((bill) => [
      { v: bill.bill_no },
      { v: bill.username },
      {
        v: `Rp. ${bill.amount}`,
      },
      {
        v: bill.status,
        s: {
          fill: {
            fgColor: {
              rgb:
                bill.status === "pending"
                  ? "FFFF00" // kuning
                  : bill.status === "Terlambat"
                  ? "FF0000" // merah
                  : bill.status === "Dibayar"
                  ? "00FF00" // hijau
                  : "FFFFFF", // default putih
            },
          },
          font: {
            color: {
              rgb: bill.status === "pending" ? "9C0006" : "006100",
            },
            bold: true,
          },
        },
      },
      { v: new Date(bill.due_date).toLocaleDateString() },
      { v: new Date(bill.date).toLocaleDateString() },
    ]),
  ];

  // 2. Convert to Worksheet
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

  // 3. Adjust Column Widths
  worksheet["!cols"] = [
    { wpx: 50 }, // ID
    { wpx: 150 }, // User Name
    { wpx: 100 }, // Amount
    { wpx: 120 }, // Payment Status
    { wpx: 120 }, // Due Date
    { wpx: 150 }, // Created At
  ];

  worksheet["!autofilter"] = { ref: "A1:F1" };

  // 4. Freeze Header Row
  worksheet["!freeze"] = { xSplit: 0, ySplit: 1 };

  // 4. Create Workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Billing Report");

  // 5. Export Workbook
  XLSX.writeFile(workbook, "BillingReport.xlsx");
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
</template> -->
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
