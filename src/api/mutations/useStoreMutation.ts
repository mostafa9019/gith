import { useMutation } from "@tanstack/react-query"
import { toast } from "@/hooks/use-toast"
import { useRefreshStore } from "@/stores/useRefreshStore"
import type { SellerStoreFormData } from "@/signup/zod"
import type { SellerStoreInformation } from "@/signup/interfaces"
import type { ServerResponse, ErrorResponse } from "@/interfaces"
import { saveSellerStoreInformation } from "@/signup/services"

interface UseStoreMutationProps {
  initialData?: SellerStoreInformation
}

export function useStoreMutation({ initialData }: UseStoreMutationProps) {
  const { isRefreshing, setIsRefreshing } = useRefreshStore()

  return useMutation<ServerResponse, ErrorResponse, SellerStoreFormData>({
    mutationFn: (payload) => {
      const transformedPayload = transformPayloadForAPI(payload, initialData)
      return saveSellerStoreInformation(transformedPayload)
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'enregistrement",
      })
    },
    onSuccess: () => {
      setIsRefreshing(!isRefreshing)
      toast({
        title: "Succès",
        description: "Vos informations ont été enregistrées avec succès",
      })
    },
  })
}

function transformPayloadForAPI(payload: SellerStoreFormData, initialData?: SellerStoreInformation) {
  return {
    ...payload,
    sellerId: initialData?.id_seller || "",
  }
} 