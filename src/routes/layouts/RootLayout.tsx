import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import { Toaster } from "@/components/ui/toaster";
import Header from "../../components/Header";

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col ">
      <Header />
      <main className="flex-1 px-4 ">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col w-full mx-auto overflow-hidden py-4">
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
