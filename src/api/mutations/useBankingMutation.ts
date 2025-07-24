import { useMutation } from "@tanstack/react-query"
import { toast } from "@/hooks/use-toast"
import { useRefreshStore } from "@/stores/useRefreshStore"
    import type { SellerBankingInformationFormData } from "@/signup/zod"
import type { SellerBankingInformation } from "@/signup/interfaces"
import type { ServerResponse, ErrorResponse } from "@/interfaces"
import { saveSellerBankingInformation } from "@/signup/services"

interface UseBankingMutationProps {
  initialData: SellerBankingInformation
}

export function useBankingMutation({ initialData }: UseBankingMutationProps) {
  const { isRefreshing, setIsRefreshing } = useRefreshStore()

  return useMutation<ServerResponse, ErrorResponse, SellerBankingInformationFormData>({
    mutationFn: (payload) => {
      const transformedPayload = transformPayloadForAPI(payload, initialData)
      return saveSellerBankingInformation(transformedPayload)
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

function transformPayloadForAPI(payload: SellerBankingInformationFormData, initialData: SellerBankingInformation) {
  const fixedDocs = payload.docs.map((doc) => ({
    ...doc,
    idSeller: initialData?.id_seller ? Number.parseInt(initialData.id_seller) : null,
  }))

  return {
    ...payload,
    docs: fixedDocs,
    sellerId: initialData?.id_seller || "",
    bi: initialData?.id_bank || "",
  }
}
