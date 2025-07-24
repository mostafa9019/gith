import { ErrorResponse, ListOption, TypedServerResponse } from "@/interfaces";
import { apiClient as api } from "@/config/axios-config";
import axios, { AxiosResponse } from "axios";
import APIEndpoints from "@/constants/ApiEndpoints";
import { OtpPayload, OtpVerificationPayload } from "@/signup/interfaces";

export const getSourceList = async () => {
  const response: AxiosResponse<TypedServerResponse<ListOption[]>> =
    await api.get(APIEndpoints.list().getSourceList);
  return response.data.data;
};

export const sendOtpCode = async (payload: OtpPayload) => {
  try {
    const response = await api.post(APIEndpoints.list().sendOtp, payload);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      const errorData = error.response.data as ErrorResponse;
      throw errorData;
    }
    throw error;
  }
};

export const verifyOtpCode = async (payload: OtpVerificationPayload) => {
  try {
    const response = await api.post(APIEndpoints.list().verifyOtp, payload);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      const errorData = error.response.data as ErrorResponse;
      throw errorData;
    }
    throw error;
  }
};
