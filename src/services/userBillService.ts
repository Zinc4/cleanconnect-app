import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:3000/api/user";

interface BillDetail {
  id: number;
  customer_name: string;
  description: string;
  amount: number;
  bill_date: string;
  bill_due: string;
  status: string;
  category: string;
  additional_bill_name: string;
  additional_amount: number;
  qr_url: string;
}

export interface Bills {
  bill_no: number;
  name: string;
  amount: number;
  due_date: string;
  status: string;
}

export const getBills = async (): Promise<Bills[]> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Authentication token not found");
    }

    const response = await axios.get(`${API_BASE_URL}/bills`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("API Response for Bills:", response.data.data);
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch bills");
  }
};

export const getBillDetail = async (billId: string): Promise<BillDetail> => {
  try {
    console.log("Bill ID for API Request:", billId);
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Authentication token not found");
    }

    const response = await axios.get(`${API_BASE_URL}/bill/${billId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("API Response for Bill Detail:", response.data);
    return response.data.data;
  } catch (error: any) {
    console.error("API Error:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "Failed to fetch bill details"
    );
  }
};

export const payBill = async (billId: string, imageFile: File) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Authentication token not found");
    }

    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await axios.post(
      `${API_BASE_URL}/bill/${billId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to process payment"
    );
  }
};
