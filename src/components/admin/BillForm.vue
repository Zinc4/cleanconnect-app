```vue

<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  getUsers,
  getAdditionalBills,
  createBill,
  User,
  BillRequest,
  AdditionalBill,
  createMassBill,
} from "@/services/billService";
import { formatCurrency } from "@/utils/formatters";
import Papa from "papaparse";
import Swal from "sweetalert2";

const emit = defineEmits(["success"]);

const loading = ref(false);
const error = ref<string | null>(null);
const users = ref<User[]>([]);
const additionalBills = ref<AdditionalBill[]>([]);

const formData = ref<BillRequest>({
  customer_id: 0,
  additional_bill_id: 0,
  description: "",
  amount: 0,
  bill_date: new Date().toISOString().split("T")[0],
  bill_due: new Date().toISOString().split("T")[0],
});

// Fungsi untuk memproses file CSV
const formatDateToISO = (date: string): string => {
  return new Date(date).toISOString();
};

// Fungsi untuk memproses file CSV
const handleFileUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  Papa.parse(file, {
    header: true, // Menggunakan header CSV
    skipEmptyLines: true,
    complete: async (results) => {
      const rawData = results.data as any[];

      // Map data dari CSV dan ubah format tanggal
      const formattedData = rawData.map((bill) => ({
        ...bill,
        customer_id: Number(bill.customer_id),
        additional_bill_id: Number(bill.additional_bill_id),
        amount: Number(bill.amount),
        bill_date: formatDateToISO(bill.bill_date),
        bill_due: formatDateToISO(bill.bill_due),
      }));

      try {
        loading.value = true;
        await Promise.all(formattedData.map((bill) => createBill(bill)));
        Swal.fire({
          title: "Success!",
          text: "Bill has been successfully created.",
          icon: "success",
          confirmButtonText: "OK",
        });
        emit("success");
      } catch (err: any) {
        error.value = err.message;
      } finally {
        loading.value = false;
      }
    },
  });
};

onMounted(async () => {
  try {
    loading.value = true;
    const [usersResponse, billsResponse] = await Promise.all([
      getUsers(),
      getAdditionalBills(),
    ]);
    users.value = usersResponse.filter(
      (user: { role: string }) => user.role === "customer"
    );
    additionalBills.value = billsResponse;
  } catch (err: any) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});

const handleSubmit = async () => {
  try {
    loading.value = true;
    error.value = null;

    const payload = {
      ...formData.value,
      customer_id: Number(formData.value.customer_id),
      additional_bill_id: Number(formData.value.additional_bill_id),
      amount: Number(formData.value.amount),
      bill_date: new Date(formData.value.bill_date).toISOString(),
      bill_due: new Date(formData.value.bill_due).toISOString(),
    };

    if (payload.customer_id === 0) {
      await createMassBill(payload);
    } else {
      await createBill(payload);
    }
    Swal.fire({
      title: "Success!",
      text: "Bill has been successfully created.",
      icon: "success",
      confirmButtonText: "OK",
    });

    emit("success");
    resetForm();
  } catch (err: any) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

const resetForm = () => {
  formData.value = {
    customer_id: 0,
    additional_bill_id: 0,
    description: "",
    amount: 0,
    bill_date: new Date().toISOString().split("T")[0],
    bill_due: new Date().toISOString().split("T")[0],
  };
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Error Message -->
    <div
      v-if="error"
      class="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
    >
      {{ error }}
    </div>

    <!-- Import CSV Button -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Import Bills from CSV
      </label>
      <input
        type="file"
        accept=".csv"
        @change="handleFileUpload"
        class="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-200"
      />
    </div>

    <!-- Customer Selection -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Customer
      </label>
      <select
        v-model="formData.customer_id"
        required
        class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-100 focus:border-green-300"
      >
        <option value="0" disabled>Select a customer</option>
        <option value="0">All Customers</option>
        <option v-for="user in users" :key="user.id" :value="user.id">
          {{ user.name }} - {{ user.kategori }}
        </option>
        <option v-if="users.length === 0" disabled>No customers found</option>
        <!-- Fallback -->
      </select>
    </div>

    <!-- Additional Bill Selection -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Additional Bill Type
      </label>
      <select
        v-model="formData.additional_bill_id"
        required
        class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-100 focus:border-green-300"
      >
        <option value="0" disabled>Select additional bill type</option>
        <option v-for="bill in additionalBills" :key="bill.id" :value="bill.id">
          {{ bill.name }} - {{ formatCurrency(bill.price) }}
        </option>
        <!-- <option v-if="additionalBills.length === 0" disabled>
          No Additional Bills found
        </option> -->
      </select>
    </div>

    <!-- Description -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Description
      </label>
      <textarea
        v-model="formData.description"
        required
        rows="3"
        class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-100 focus:border-green-300"
      ></textarea>
    </div>

    <!-- Amount -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Amount
      </label>
      <input
        type="number"
        v-model="formData.amount"
        required
        min="0"
        class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-100 focus:border-green-300"
      />
    </div>

    <!-- Bill Date -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Bill Date
      </label>
      <input
        type="date"
        v-model="formData.bill_date"
        required
        class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-100 focus:border-green-300"
      />
    </div>

    <!-- Due Date -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Due Date
      </label>
      <input
        type="date"
        v-model="formData.bill_due"
        required
        class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-100 focus:border-green-300"
      />
    </div>

    <!-- Submit Button -->
    <div class="flex justify-end">
      <button
        type="submit"
        :disabled="loading"
        class="px-6 py-2.5 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        <span v-if="loading">Generating Bill...</span>
        <span v-else>Generate Bill</span>
      </button>
    </div>
  </form>
</template>
```
