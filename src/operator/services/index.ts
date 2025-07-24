import { ErrorResponse, ListOption, TypedServerResponse } from "@/interfaces";
import axios, { AxiosResponse } from "axios";
import { SellerProcessPayload } from "../interfaces";
import APIEndpoints from "@/constants/ApiEndpoints";
import { apiClient as api } from "@/config/axios-config";

export const processSellerByCommercialAgent = async (
  payload: SellerProcessPayload
) => {
  try {
    const response = await api.post(
      APIEndpoints.list().processSellerByCommercialAgent,
      payload
    );
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      const errorData = error.response.data as ErrorResponse;
      throw errorData;
    }
    throw error;
  }
};

export const processSellerByFinanceAgent = async (
  payload: SellerProcessPayload
) => {
  try {
    const response = await api.post(
      APIEndpoints.list().processSellerByFinanceAgent,
      payload
    );
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      const errorData = error.response.data as ErrorResponse;
      throw errorData;
    }
    throw error;
  }
};

export const getSellerList = async (payload: {
  page_number: number;
  page_size: number;
  statusId: number;
}) => {
  try {
    const response = await api.post(APIEndpoints.list().getSellerList, {
      ...payload,
      statusId: payload.statusId === 0 ? null : payload.statusId,
    });

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      const errorData = error.response.data as ErrorResponse;
      throw errorData;
    }
    throw error;
  }
};

export const getSellerStatusList = async () => {
  const response: AxiosResponse<TypedServerResponse<ListOption[]>> =
    await api.get(APIEndpoints.list().getSellerStatusList);
  return response.data.data;
};

export const getCitiesList = async () => {
  const response: AxiosResponse<TypedServerResponse<ListOption[]>> =
    await api.get(APIEndpoints.list().getCitiesList);
  return response.data.data;
};
