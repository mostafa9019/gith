import { useState } from "react";
import { cn, formatString } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { getSellerStatusList } from "../services";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SellerStatusFilterProps {
  onStatusChange?: (statusId: number) => void;
}

export default function SellerStatusFilter({
  onStatusChange,
}: SellerStatusFilterProps) {
  const [activeTab, setActiveTab] = useState<number>(0);

  const statusQuery = useQuery({
    queryKey: ["status"],
    queryFn: getSellerStatusList,
    retry: false,
  });

  const handleTabChange = (tabId: number) => {
    setActiveTab(tabId);
    if (onStatusChange) {
      onStatusChange(tabId);
    }
  };

  const tabs = statusQuery.data
    ? [{ id: 0, name: "Tous" }, ...statusQuery.data]
    : [];

  if (statusQuery.isPending) {
    return (
      <Skeleton className="flex gap-2 p-1 bg-slate-100 w-full sm:w-fit rounded-full border border-gray-200" />
    );
  }

  return (
    <>
      <div className="block sm:hidden w-full">
        <Select
          onValueChange={(value) => handleTabChange(Number(value))}
          value={activeTab.toString()}
        >
          <SelectTrigger className="w-full rounded-full text-primary">
            <SelectValue placeholder="Sélectionner un statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {tabs.map((tab) => (
                <SelectItem key={tab.id} value={tab.id.toString()}>
                  <span className="capitalize">{formatString(tab.name)}</span>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="hidden sm:flex flex-wrap gap-2 p-1 bg-slate-100 w-fit rounded-full border border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={cn(
              "flex items-center gap-1 rounded-full px-2 sm:px-3 md:px-4 py-1 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap",
              activeTab === tab.id
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
          >
            {formatString(tab.name)}
          </button>
        ))}
      </div>
    </>
  );
}
