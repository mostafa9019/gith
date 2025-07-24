import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { useRefreshStore } from "@/stores/useRefreshStore";
import type { sellerCredentialsFormData } from "@/signup/zod";
import type { SellerCredentials } from "@/signup/interfaces";
import type { ServerResponse, ErrorResponse } from "@/interfaces";
import { saveSellerCredentials } from "@/signup/services";

interface UseCredentialsMutationProps {
  initialData?: SellerCredentials;
}

const transformPayloadForAPI = (
    payload: sellerCredentialsFormData,
    initialData?: SellerCredentials
  ) => {
    const fixedDocs = payload.docs.map((doc) => ({
      ...doc,
      idSeller: initialData?.id_seller
        ? Number.parseInt(initialData.id_seller)
        : null,
    }));
  
    return {
      ...payload,
      docs: fixedDocs,
      id: initialData?.id_seller || "",
    co: initialData?.id_seller || "",
  };
};

export function useCredentialsMutation({
  initialData,
}: UseCredentialsMutationProps) {
  const { isRefreshing, setIsRefreshing } = useRefreshStore();

  return useMutation<ServerResponse, ErrorResponse, sellerCredentialsFormData>({
    mutationFn: (payload) => {
      const transformedPayload = transformPayloadForAPI(payload, initialData);
      return saveSellerCredentials(transformedPayload);
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'enregistrement",
      });
    },
    onSuccess: () => {
      setIsRefreshing(!isRefreshing);
      toast({
        title: "Succès",
        description: "Vos informations ont été enregistrées avec succès",
      });
    },
  });
}
