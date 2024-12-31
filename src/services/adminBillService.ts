import axios from "axios";

const API_BASE_URL =
  "https://sensible-annabal-cleanconnect-170c1a9e.koyeb.app/api/admin";

export interface AdminBill {
  bill_no: number;
  username: string;
  date: string;
  due_date: string;
  amount: number;
  status: string;
}

export const getAdminBills = async (): Promise<AdminBill[]> => {
  const token = localStorage.getItem("token"); // Ambil token dari localStorage
  if (!token) {
    throw new Error("No token found. Please log in.");
  }
  try {
    const response = await axios.get(`${API_BASE_URL}/bills`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch bills");
  }
};
