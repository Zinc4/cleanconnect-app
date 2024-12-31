import { ref } from "vue";
import { registerUser, loginUser } from "@/services/api";

export const useAuth = () => {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const token = ref<string | null>(null);

  const register = async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    nik: string;
    kategori: string;
  }) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await registerUser({
        first_name: userData.firstName,
        last_name: userData.lastName,
        email: userData.email,
        password: userData.password,
        nik: userData.nik,
      });
      return response;
    } catch (err: any) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const login = async (credentials: { email: string; password: string }) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await loginUser(credentials);
      if (response.status === "success") {
        token.value = response.data;
        localStorage.setItem("token", response.data);
        return response;
      }
      throw new Error(response.message || "Login failed");
    } catch (err: any) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const logout = () => {
    token.value = null;
    localStorage.removeItem("token");
  };

  return {
    loading,
    error,
    token,
    register,
    login,
    logout,
  };
};
