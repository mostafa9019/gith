import { useMutation } from "@tanstack/react-query"
import { toast } from "@/hooks/use-toast"
import { useRefreshStore } from "@/stores/useRefreshStore"
import type { SellerCommercialInformationFormData } from "@/signup/zod"
import type { SellerCommercialInformation } from "@/signup/interfaces"
import type { ServerResponse, ErrorResponse } from "@/interfaces"
import { saveSellerCommercialInformation } from "@/signup/services"

interface UseCommercialMutationProps {
  initialData?: SellerCommercialInformation
}

function transformPayloadForAPI(payload: SellerCommercialInformationFormData, initialData?: SellerCommercialInformation) {
    const fixedDocs = payload.docs.map((doc) => ({
      ...doc,
      idSeller: initialData?.id_seller ? Number.parseInt(initialData.id_seller) : null,
    }))

    return {
      ...payload,
      docs: fixedDocs,
      sellerId: initialData?.id_seller || "",
      ci: initialData?.id_company || "",
    }
  } 

export function useCommercialMutation({ initialData }: UseCommercialMutationProps) {
  const { isRefreshing, setIsRefreshing } = useRefreshStore()

  return useMutation<ServerResponse, ErrorResponse, SellerCommercialInformationFormData>({
    mutationFn: (payload) => {
      const transformedPayload = transformPayloadForAPI(payload, initialData)
      return saveSellerCommercialInformation(transformedPayload)
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

