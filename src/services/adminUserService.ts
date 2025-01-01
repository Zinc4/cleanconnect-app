import axios from "axios";

const API_BASE_URL =
  "https://sensible-annabal-cleanconnect-170c1a9e.koyeb.app/api/admin";

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

export const deleteAdminUser = async (
  id: string
): Promise<{ status: boolean; message: string }> => {
  const response = await axios.delete(`${API_BASE_URL}/users/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};
