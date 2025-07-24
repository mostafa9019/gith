import { Checkbox } from "@/components/ui/checkbox";
import { FormField } from "@/components/FormInput";
import { FormRadioGroup } from "@/components/FormRadioGroup";
import { FormSelectField } from "@/components/FormSelect";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SellerStoreFormData, SellerStoreSchema } from "../zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { SellerStoreInformation } from "../interfaces";
import Stepper from "@/components/Stepper";
import { ErrorResponse, ServerResponse } from "@/interfaces";
import { toast } from "@/hooks/use-toast";
import { useRefreshStore } from "@/stores/useRefreshStore";
import { useEffect } from "react";
import { getMainCategoryList, saveSellerStoreInformation } from "../services";

interface SellerStoreFormProps {
  initialData: SellerStoreInformation;
}

export default function SellerStoreForm({ initialData }: SellerStoreFormProps) {
  const { isRefreshing, setIsRefreshing } = useRefreshStore();
  const booleanOptions = [
    { value: "true", label: "Oui", booleanValue: true },
    { value: "false", label: "Non", booleanValue: false },
  ];
  const mainCategoryQuery = useQuery({
    queryKey: ["main-category"],
    queryFn: getMainCategoryList,
    retry: false,
  });
  const {
    register,
    formState: { isValid, errors },
    watch,
    reset,
    setValue,
    handleSubmit,
    control, // Add control to use with Controller
  } = useForm<SellerStoreFormData>({
    resolver: zodResolver(SellerStoreSchema),
    defaultValues: {
      name: "",
      numberProduct: "",
      refIdPrincipalCategorie: "",
    },
  });

  const storeInformationMutation = useMutation<
    ServerResponse,
    ErrorResponse,
    SellerStoreFormData
  >({
    mutationFn: (payload) => {
      return saveSellerStoreInformation({
        ...payload,
        sellerId: initialData.id_seller,
      });
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
        description: "Vos informations ont été enregistrées avec succès",
      });
    },
  });

  const onSubmit = handleSubmit(
    (data) => {
      storeInformationMutation.mutate(data);
    },
    (error) => {
      console.log("errors", error);
    }
  );

  useEffect(() => {
    if (initialData) {
      reset({
        ...(initialData.id_store
          ? { id: initialData.id_store.toString() }
          : {}),
        name: initialData.storeName || "",
        numberProduct: initialData.numberProduct?.toString() || "",
        refIdPrincipalCategorie:
          initialData.refIdPrincipalCategorie?.toString() || "",
        hasWebSite: initialData.hasWebSite || false,
        urlWebSite: initialData.urlWebSite || "",
        hasPhysicalStore: initialData.hasPhysicalStore || false,
        sellsBrandedProducts: initialData.sellsBrandedProducts || false,
        checkedCguOctopia: initialData.checkedCguOctopia || false,
        checkedAcceptRegistration:
          initialData.checkedAcceptRegistration || false,
        checkedCgm: initialData.checkedCgm || false,
      });
    }
  }, [initialData, setValue, reset]);

  return (
    <div className="flex flex-col items-start justify-center rounded-lg py-4 sm:px-4 px-0 gap-4">
      <div className="flex flex-col w-full items-start justify-center h-1/2 gap-2 bg-gray-50 rounded-lg p-4">
        <div className="flex flex-col items-start justify-start h-full px-4 gap-2">
          <p className="text-2xl font-bold text-left text-primary">
            Votre boutique Marjanemall
          </p>
        </div>
        <div className="flex flex-col w-full items-start justify-center rounded-lg p-4">
          <FormField
            label="Votre nom de boutique tel qu'il sera affiché sur le site
              Marjanemall"
            register={{ ...register("name") }}
            id="name"
            required
            error={errors.name}
            placeholder="Entrer l'url de votre site"
            helpText={
              'Ne peut contenir "", "www", "@", ".fr", ".com", ".net" et "discount"'
            }
          />
        </div>
      </div>
      <div className="flex flex-col w-full items-start justify-center h-1/2 gap-2 rounded-lg p-4">
        <div className="flex flex-col w-full items-start justify-center rounded-lg p-4 gap-2">
          <FormField
            label="Nombre de produits en catalogue"
            placeholder="Nombre de produits"
            register={{ ...register("numberProduct") }}
            id="numberProduct"
            error={errors.numberProduct}
            required
            type="number"
          />
          <FormSelectField
            required
            label="Catégorie principale"
            options={mainCategoryQuery.data ? mainCategoryQuery.data : []}
            name="refIdPrincipalCategorie"
            control={control}
            id="refIdPrincipalCategorie"
            error={errors.refIdPrincipalCategorie}
          />
          <FormRadioGroup
            label="Avez vous un site e-commerce ?"
            options={booleanOptions}
            name="hasWebSite"
            control={control}
            id="hasWebSite"
          />
          <FormField
            label=" Merci de preciser le lien url de votre site e-commerce"
            placeholder="Entrez le lien de votre site e-commerce"
            register={{ ...register("urlWebSite") }}
            id="urlWebSite"
            error={errors.urlWebSite}
          />
          <FormRadioGroup
            label="Avez vous une boutique physique ?"
            options={booleanOptions}
            name="hasPhysicalStore"
            control={control}
            id="hasPhysicalStore"
            required
            error={errors.hasPhysicalStore}
          />
          <FormRadioGroup
            label="Vendez-vous des produits de marque ?"
            options={booleanOptions}
            name="sellsBrandedProducts"
            control={control}
            id="sellsBrandedProducts"
          />
        </div>
      </div>
      <div className="flex flex-col w-full items-start justify-center h-1/2 gap-2  bg-gray-50 rounded-lg p-4 ">
        <div className="flex items-center space-x-2 mt-2">
          <Checkbox
            id="checkedCguOctopia"
            checked={watch("checkedCguOctopia")}
            onCheckedChange={(checked) => {
              setValue("checkedCguOctopia", checked === true, {
                shouldValidate: true,
              });
            }}
          />
          <label htmlFor="terms" className="text-xs text-primary">
            En cochant la case vous confirmez avoir lu et accepté les Conditions
            Générales d'utilisation d'Octopia{" "}
            <span className="text-red-500">*</span>
          </label>
        </div>
        <div className="flex items-center space-x-2 mt-2">
          <Checkbox
            id="checkedAcceptRegistration"
            checked={watch("checkedAcceptRegistration")}
            onCheckedChange={(checked) => {
              setValue("checkedAcceptRegistration", checked === true, {
                shouldValidate: true,
              });
            }}
          />
          <label htmlFor="terms" className="text-xs text-primary">
            En cochant la case vous acceptez de vous inscrire à Marjane Mall{" "}
            <span className="text-red-500">*</span>
            <span className="text-primary underline hover:cursor-pointer">
              Voir ici{" "}
            </span>
          </label>
        </div>
        <div className="flex items-center space-x-2 mt-2">
          <Checkbox
            id="checkedCgm"
            checked={watch("checkedCgm")}
            onCheckedChange={(checked) => {
              setValue("checkedCgm", checked === true, {
                shouldValidate: true,
              });
            }}
          />
          <label htmlFor="terms" className="text-xs text-primary">
            En cochant la case vous confirmez avoir lu et accepté les Conditions
            Générales de Mise à Disposition et la charte des bonnes pratiques de
            Marjane Mall <span className="text-red-500">*</span>{" "}
            <span className="text-primary underline hover:cursor-pointer">
              Voir ici{" "}
            </span>
          </label>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center rounded-lg p-4 gap-2 w-full">
        <Stepper
          handleSaveProgress={onSubmit}
          saveDisabled={!isValid}
          saveLoading={storeInformationMutation.isPending}
          handleFinalize={() => {}}
          finalizeDisabled={true}
          finalizeLoading={false}
        />
      </div>
    </div>
  );
}
