import axios from "axios";

const API_BASE_URL =
  "https://sensible-annabal-cleanconnect-170c1a9e.koyeb.app/api/admin";

export interface Payment {
  id: number;
  username: string;
  address: string;
  date: string;
  amount: number;
}

export interface PendingPayment {
  id: number;
  username: string;
  image: string;
  amount: number;
}

export const getSuccessfulPayments = async (): Promise<Payment[]> => {
  try {
    const token = localStorage.getItem("token"); // Ambil token dari localStorage
    if (!token) {
      throw new Error("No token found. Please log in.");
    }
    const response = await axios.get(`${API_BASE_URL}/payments/success`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch payments"
    );
  }
};

export const getPendingPayments = async (): Promise<PendingPayment[]> => {
  try {
    const token = localStorage.getItem("token"); // Ambil token dari localStorage
    if (!token) {
      throw new Error("No token found. Please log in.");
    }
    const response = await axios.get(`${API_BASE_URL}/payments/pending`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch pending payments"
    );
  }
};
