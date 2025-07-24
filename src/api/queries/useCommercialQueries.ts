import { useQuery } from "@tanstack/react-query"
import { getCurrencyList } from "@/signup/services"

export function useCommercialQueries() {
  const currencyQuery = useQuery({
    queryKey: ["currency"],
    queryFn: getCurrencyList,
    retry: false,
  })

  return {
    currencyOptions: currencyQuery.data || [],
    isLoadingCurrency: currencyQuery.isLoading,
  }
} 