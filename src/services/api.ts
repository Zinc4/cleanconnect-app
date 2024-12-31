import axios from "axios";

const API_BASE_URL =
  "https://sensible-annabal-cleanconnect-170c1a9e.koyeb.app/api";

interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  nik: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  data: string;
  message: string;
  status: string;
}

export const registerUser = async (userData: RegisterData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/user/register`,
      userData
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

export const loginUser = async (
  credentials: LoginData
): Promise<LoginResponse> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/user/login`,
      credentials
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const verifyEmail = async (token: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/verify/${token}`);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Email verification failed"
    );
  }
};
