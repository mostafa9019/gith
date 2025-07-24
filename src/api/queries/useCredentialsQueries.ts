import { useQuery } from "@tanstack/react-query"
import { getFunctionList, getGenderList } from "@/signup/services"

export function useCredentialsQueries() {
  const genderQuery = useQuery({
    queryKey: ["gender"],
    queryFn: getGenderList,
    retry: false,
  })

  const functionQuery = useQuery({
    queryKey: ["function"],
    queryFn: getFunctionList,
    retry: false,
  })

  return {
    genderOptions: genderQuery.data || [],
    functionOptions: functionQuery.data || [],
    isLoadingGender: genderQuery.isLoading,
    isLoadingFunction: functionQuery.isLoading,
  }
}
