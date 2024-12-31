import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:3000/api/user";

interface UserProfile {
  id: number;
  name: string;
  email: string;
  address: string;
  no_hp: string;
  kategori: string;
  nik: string;
}

export const getUserProfile = async (): Promise<UserProfile> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Authentication token not found");
    }

    const response = await axios.get(`${API_BASE_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch user profile"
    );
  }
};
