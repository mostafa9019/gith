import { getOperatorHeaderTitle } from "@/signup/lib";
import AccountMenu from "./AccountMenu";
import { Separator } from "./ui/separator";

export default function OperatorHeader() {
  const { pathname } = window.location;

  return (
    <header className="shadow-md bg-primary">
      <div className="flex justify-between flex-col px-2 sm:px-4 bg-white rounded-tl-2xl gap-2">
        <div className="flex items-center justify-between pt-3 sm:pt-4 pb-2">
          <div className="flex flex-col items-start justify-center h-10 sm:h-12 px-2 sm:px-4">
            <span className="text-lg sm:text-xl md:text-2xl font-bold text-primary truncate max-w-[200px] sm:max-w-xs md:max-w-md">
              {getOperatorHeaderTitle(pathname)}
            </span>
            <span className="text-[10px] sm:text-xs text-primary hidden sm:block">
              {getOperatorHeaderTitle(pathname)}
            </span>
          </div>

          <AccountMenu />
        </div>
        <Separator className="w-full mb-1 sm:mb-2" />
      </div>
    </header>
  );
}
