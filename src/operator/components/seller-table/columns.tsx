import { Button } from "@/components/ui/button";
import { useSellerStore } from "@/operator/stores/useSellerStore";
import { DialogTypes } from "@/signup/enums/dialog";
import { SellerInformation } from "@/signup/interfaces";
import { useDialogStore } from "@/stores/useDialogStore";
import { ColumnDef } from "@tanstack/react-table";
import { Ban, Check, ChevronDown } from "lucide-react";

export const columns: ColumnDef<SellerInformation>[] = [
  {
    id: "ID",
    accessorKey: "id_seller",
    header: ({ column }) => {
      return (
        <p
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="cursor-pointer flex flex-row items-center"
        >
          ID
          <ChevronDown className="ml-2 h-4 w-4" />
        </p>
      );
    },
  },
  {
    id: "Nom",
    accessorKey: "firstName",
    header: ({ column }) => {
      return (
        <p
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="cursor-pointer flex flex-row items-center"
        >
          Nom
          <ChevronDown className="ml-2 h-4 w-4" />
        </p>
      );
    },
  },
  {
    id: "Prénom",
    accessorKey: "lastName",
    header: ({ column }) => {
      return (
        <p
          className="cursor-pointer flex flex-row items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Prénom
          <ChevronDown className="ml-2 h-4 w-4" />
        </p>
      );
    },
  },
  {
    id: "Email",
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <p
          className="cursor-pointer flex flex-row items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ChevronDown className="ml-2 h-4 w-4" />
        </p>
      );
    },
  },
  {
    id: "RIB",
    accessorKey: "rib",
    header: ({ column }) => {
      return (
        <p
          className="cursor-pointer flex flex-row items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          RIB
          <ChevronDown className="ml-2 h-4 w-4" />
        </p>
      );
    },
  },
  {
    id: "actions",
    header: () => {
      return <p className="cursor-pointer">Actions</p>;
    },
    cell: ({ cell }) => {
      const { setOpen, setType } = useDialogStore();
      const { setSeller } = useSellerStore();
      const handleValidateButtonClick = () => {
        setSeller(cell.row.original);
        setOpen(true);
        setType(DialogTypes.VALIDATE_SELLER);
      };
      const handleRejectButtonClick = () => {
        setSeller(cell.row.original);
        setOpen(true);
        setType(DialogTypes.REJECT_SELLER);
      };
      return (
        <div className="flex flex-row gap-2">
          <Button
            size="icon"
            variant="outline"
            className=" rounded-full"
            onClick={handleRejectButtonClick}
          >
            <Ban className="h-4 w-4 text-red-500" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className=" rounded-full"
            onClick={handleValidateButtonClick}
          >
            <Check className="h-4 w-4 text-green-500" />
          </Button>
        </div>
      );
    },
  },
];
