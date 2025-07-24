import { columns } from "@/operator/components/seller-table/columns";
import { DataTable } from "@/operator/components/seller-table/data-table";
import ConfirmationDialog from "../dialogs/ConfirmationDialog";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { ServerResponse } from "@/interfaces";
import { ErrorResponse } from "react-router-dom";
import { SellerProcessPayload } from "../interfaces";
import { useRefreshStore } from "@/stores/useRefreshStore";
import { useSellerStore } from "../stores/useSellerStore";
import { useDialogStore } from "@/stores/useDialogStore";
import { DialogTypes } from "@/signup/enums/dialog";
import {
  getSellerList,
  processSellerByCommercialAgent,
  processSellerByFinanceAgent,
} from "../services";
import { useAuthStore } from "@/stores/useAuthStore";
import { AuthRoles } from "@/signup/enums";

export default function SellerPage() {
  const { seller } = useSellerStore();
  const { authData } = useAuthStore();
  const { open, setOpen, type } = useDialogStore();
  const { isRefreshing, setIsRefreshing } = useRefreshStore();
  const sellerMutation = useMutation<
    ServerResponse,
    ErrorResponse,
    SellerProcessPayload
  >({
    mutationFn: (payload) => {
      if (authData?.roles?.includes(AuthRoles.COMMERCIAL)) {
        return processSellerByCommercialAgent(payload);
      } else if (authData?.roles?.includes(AuthRoles.FINANCE)) {
        return processSellerByFinanceAgent(payload);
      } else {
        throw new Error("Invalid role");
      }
    },
    onError: (_error) => {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'enregistrement",
      });
    },
    onSuccess: () => {
      setIsRefreshing(!isRefreshing);
      toast({
        title: "Succès",
        description: "Vendeur traité avec succès",
      });
      setOpen(false);
    },
  });

  const handleValidateSeller = () => {
    sellerMutation.mutate({
      idSeller: seller?.id_seller.toString() || "",
      refIdStatut: "2",
    });
  };
  const handleRejectSeller = () => {
    sellerMutation.mutate({
      idSeller: seller?.id_seller.toString() || "",
      refIdStatut: "3",
    });
  };

  return (
    <div className="w-full h-full bg-white py-3 px-2">
      <DataTable
        columns={columns}
        fetchDataFn={getSellerList}
        queryKey="sellers"
      />
      <ConfirmationDialog
        setOpen={setOpen}
        open={open && type === DialogTypes.REJECT_SELLER}
        confirmationMessage="Êtes-vous sûr de vouloir rejeter ce vendeur ?"
        handleValidate={handleRejectSeller}
        loading={sellerMutation.isPending}
      />
      <ConfirmationDialog
        setOpen={setOpen}
        open={open && type === DialogTypes.VALIDATE_SELLER}
        confirmationMessage="Êtes-vous sûr de vouloir valider ce vendeur ?"
        handleValidate={handleValidateSeller}
        loading={sellerMutation.isPending}
      />
    </div>
  );
}
