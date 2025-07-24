import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { apiClient as api } from "@/config/axios-config";
import APIEndpoints from "@/constants/ApiEndpoints";

export const GET_CHECK_STORE_NAME_KEY = "GET_CHECK_STORE_NAME_KEY";

export interface CheckStoreNameRequestBody {
  sellerId: number;
  name: string;
}

export type CheckStoreNameResponse = {
  success: boolean;
  message: string;
  errorDescription: string | null;
  statusCode: number;
};

type TUseCheckStoreNameParams = {
  config?: UseMutationOptions<
    CheckStoreNameResponse,
    Error,
    CheckStoreNameRequestBody
  >;
};

const CHECK_STORE_NAME_QUERY = "CHECK_STORE_NAME_QUERY";

export const checkStoreName = async (payload: {
  name: string;
  sellerId: number;
}) => {
  const response = await api.post(APIEndpoints.list().checkStoreName, payload);

  return response;
};

export const useGetCheckStoreName = ({
  config,
}: TUseCheckStoreNameParams = {}) => {
  const { mutate, data, error, isPending, isSuccess, isError, reset } =
    useMutation({
      mutationKey: [CHECK_STORE_NAME_QUERY],
      mutationFn: async (payload: CheckStoreNameRequestBody) => {
        const response = await checkStoreName(payload);

        return response.data;
      },
      onError: (error) => {
        console.error("Error fetching filtered products:", error);
      },
      ...config,
    });

  return {
    checkStoreName: mutate,
    resetCheckStoreName: reset,
    data,
    error,
    isPending,
    isSuccess,
    isError,
  };
};
