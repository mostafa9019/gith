import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();
  const handleNavigateHome = () => {
    navigate(-1);
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center text-primary-foreground p-4">
        <h1 className="text-6xl font-bold mb-4 text-primary">404</h1>
        <h2 className="text-2xl font-semibold mb-6 text-primary">
          Page non trouvée
        </h2>
        <p className="text-lg mb-8 text-primary font-medium">
          La page que vous cherchez n'existe pas
        </p>
        <Button className="px-6 py-3 rounded-md" onClick={handleNavigateHome}>
          Retourner en arrière
        </Button>
      </div>
    </div>
  );
}
