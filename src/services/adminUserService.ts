import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:3000/api/admin";

export interface User {
  id: number;
  name: string;
  email: string;
  address: string;
  nik: string;
}

export const getAdminUsers = async (): Promise<User[]> => {
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
