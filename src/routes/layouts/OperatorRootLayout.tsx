import OperatorHeader from "@/components/OperatorHeader";
import { SideBar } from "@/components/SideBar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";

import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <SidebarProvider>
      <SideBar />
      <SidebarInset className="bg-blue-600 text-white">
        <OperatorHeader />
        <main className="flex-1 bg-primary">
          <Outlet />
          <Toaster />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
