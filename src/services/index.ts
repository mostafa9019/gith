import { apiClient as api } from "@/config/axios-config";
import APIEndpoints from "@/constants/ApiEndpoints";
import { ErrorResponse } from "@/interfaces";
import axios from "axios";

export const authenticateUser = async (payload: {
  username: string;
  password: string;
}) => {
  try {
    const response = await api.post(
      APIEndpoints.list().authenticateUser,
      payload
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      const errorData = error.response.data as ErrorResponse;
      throw errorData;
    }
    throw error;
  }
};
