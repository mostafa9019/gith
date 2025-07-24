import { ErrorResponse, ListOption, TypedServerResponse } from "@/interfaces";
import axios, { AxiosResponse } from "axios";
import { apiClient as api } from "@/config/axios-config";
import APIEndpoints from "@/constants/ApiEndpoints";
import { SellerInformation } from "../interfaces";
import {
  SellerBankingInformationFormData,
  SellerCommercialInformationFormData,
  sellerCredentialsFormData,
  SellerStoreFormData,
} from "../zod";

export const getGenderList = async () => {
  const response: AxiosResponse<TypedServerResponse<ListOption[]>> =
    await api.get(APIEndpoints.list().getGenderList);
  return response.data.data;
};
export const getFunctionList = async () => {
  const response: AxiosResponse<TypedServerResponse<ListOption[]>> =
    await api.get(APIEndpoints.list().getSellerFunctionList);
  return response.data.data;
};

export const getCurrencyList = async () => {
  const response: AxiosResponse<TypedServerResponse<ListOption[]>> =
    await api.get(APIEndpoints.list().getCurrencyList);
  return response.data.data;
};

export const getBankList = async () => {
  const response: AxiosResponse<TypedServerResponse<ListOption[]>> =
    await api.get(APIEndpoints.list().getBankList);
  return response.data.data;
};

export const getMainCategoryList = async () => {
  const response: AxiosResponse<TypedServerResponse<ListOption[]>> =
    await api.get(APIEndpoints.list().getMainCategoryList);
  return response.data.data;
};

export const getInitialFormData = async (transactionId: string) => {
  const response: AxiosResponse<TypedServerResponse<SellerInformation>> =
    await api.get(APIEndpoints.list().getInitialFormData(transactionId));
  return response.data.data;
};

export const saveSellerCredentials = async (
  payload: sellerCredentialsFormData
) => {
  try {
    const response = await api.post(
      APIEndpoints.list().saveSellerCredentials,
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

export const saveSellerCommercialInformation = async (
  payload: SellerCommercialInformationFormData
) => {
  try {
    const response = await api.post(
      APIEndpoints.list().saveSellerCommercialInformation,
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

export const saveSellerBankingInformation = async (
  payload: SellerBankingInformationFormData
) => {
  try {
    const response = await api.post(
      APIEndpoints.list().saveSellerBankingInformation,
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

export const saveSellerStoreInformation = async (
  payload: SellerStoreFormData
) => {
  try {
    const response = await api.post(
      APIEndpoints.list().saveSellerStoreInformation,
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
