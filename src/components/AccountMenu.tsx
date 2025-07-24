import { formatString, getInitials } from "@/lib/utils";
import { useAuthStore } from "@/stores/useAuthStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { ChevronDown, RefreshCcw, LogOut } from "lucide-react";
import { useRefreshStore } from "@/stores/useRefreshStore";

export default function AccountMenu() {
  const { authData, unauthenticate } = useAuthStore();
  const { setIsRefreshing, isRefreshing } = useRefreshStore();
  return (
    <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
      <Button
        variant="ghost"
        size={"icon"}
        onClick={() => setIsRefreshing(!isRefreshing)}
        className="w-8 h-8 sm:w-9 sm:h-9"
      >
        <RefreshCcw className="text-primary h-4 w-4 sm:h-5 sm:w-5" />
      </Button>

      {/* Only show name on medium screens and larger */}
      <span className="hidden md:inline text-xs sm:text-sm text-primary font-medium truncate max-w-[100px] lg:max-w-full">
        {formatString(authData?.fullName)}
      </span>

      <div className="items-center justify-center rounded-full bg-slate-100 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex">
        <span className="text-xs sm:text-sm text-primary font-medium">
          {getInitials(authData?.fullName)}
        </span>
      </div>

      {/* Standard dropdown on larger screens */}
      <div className="hidden sm:block">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size={"icon"}
              className="w-8 h-8 sm:w-9 sm:h-9"
            >
              <ChevronDown className="text-primary h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem onClick={() => unauthenticate()}>
              Se déconnecter
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Direct logout button on small screens */}
      <div className="sm:hidden">
        <Button
          variant="ghost"
          size={"icon"}
          className="w-8 h-8"
          onClick={() => unauthenticate()}
        >
          <LogOut className="text-primary h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
