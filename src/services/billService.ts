import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:3000/api/admin";

export interface User {
  ID: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  kategori: string;
}

export interface AdditionalBill {
  id: number;
  name: string;
  price: number;
}

export interface BillRequest {
  customer_id: number;
  additional_bill_id: number;
  description: string;
  amount: number;
  bill_date: string;
  bill_due: string;
}

export interface BillMassRequest {
  customer_id: number;
  additional_bill_id: number;
  description: string;
  amount: number;
  bill_date: string;
  bill_due: string;
}

export const getUsers = async () => {
  try {
    const token = localStorage.getItem("token"); // Ambil token dari localStorage
    if (!token) {
      throw new Error("No token found. Please log in.");
    }
    const response = await axios.get(`${API_BASE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch users");
  }
};

export const getAdditionalBills = async () => {
  try {
    const token = localStorage.getItem("token"); // Ambil token dari localStorage
    if (!token) {
      throw new Error("No token found. Please log in.");
    }
    const response = await axios.get(`${API_BASE_URL}/additionalbill`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch additional bills"
    );
  }
};

export const createBill = async (billData: BillRequest) => {
  try {
    const token = localStorage.getItem("token"); // Ambil token dari localStorage
    if (!token) {
      throw new Error("No token found. Please log in.");
    }
    const response = await axios.post(`${API_BASE_URL}/bills`, billData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to create bill");
  }
};

export const createAdditionalBill = async (data: {
  name: string;
  price: number;
}) => {
  try {
    const token = localStorage.getItem("token"); // Ambil token dari localStorage
    if (!token) {
      throw new Error("No token found. Please log in.");
    }
    const response = await axios.post(
      `${API_BASE_URL}/bills/additional`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to create additional bill"
    );
  }
};

export const createMassBill = async (billData: BillMassRequest) => {
  try {
    const token = localStorage.getItem("token"); // Ambil token dari localStorage
    if (!token) {
      throw new Error("No token found. Please log in.");
    }
    const response = await axios.post(`${API_BASE_URL}/bills-mass`, billData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to create bill");
  }
};
