import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import logo from "../assets/marjanemall-logo.svg";
import { Button } from "./ui/button";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { OperatorRoutes } from "@/operator/enums";
interface SidebarProps {}

const handleLogoClick = () => {};

export function SideBar({}: SidebarProps) {
  const navigate = useNavigate();
  const tabs = [
    { name: "Vendeurs", icon: <User />, path: OperatorRoutes.OPERATOR },
  ];
  return (
    <Sidebar className="bg-primary-800 text-primary-100 border-primary">
      <SidebarHeader className="p-4 bg-primary">
        <div className="flex justify-center ">
          <img
            src={logo || "/placeholder.svg"}
            alt="Logo"
            className="h-8 w-auto hover:cursor-pointer"
            onClick={handleLogoClick}
          />
        </div>
      </SidebarHeader>
      <SidebarContent className=" bg-primary px-4 py-4">
        <div className="flex flex-col gap-2">
          {tabs.map((tab) => (
            <Button
              className="rounded-full w-full shadow-md border-gray-100"
              variant={"outline"}
              onClick={() => navigate(tab.path)}
            >
              <User />
              Vendeurs
            </Button>
          ))}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
