import { useQuery } from "@tanstack/react-query";
import { getMainCategoryList, getHubList } from "@/signup/services";

export function useStoreQueries() {
  const mainCategoryQuery = useQuery({
    queryKey: ["main-category"],
    queryFn: getMainCategoryList,
    retry: false,
  });

  const hubQuery = useQuery({
    queryKey: ["hub"],
    queryFn: getHubList,
    retry: false,
  });

  return {
    categoryOptions: mainCategoryQuery.data || [],
    isLoadingCategories: mainCategoryQuery.isLoading,
    hubOptions: hubQuery.data || [],
    isLoadingHubs: hubQuery.isLoading,
  };
}
