import { Input } from "@/components/ui/input";
import icon from "@/assets/morocco-icon.png";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  INVALID_INPUT,
  SellerSignupRequestTexts,
} from "@/signup-request/constants";
import { useForm } from "react-hook-form";
import { sellerSignUpFormData, sellerSignupSchema } from "@/signup-request/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FormSelectField } from "@/components/FormSelect";
import { FormField } from "@/components/FormInput";
import { OtpPayload } from "@/signup/interfaces";
import OtpDialog from "@/signup-request/dialogs/OtpDialog";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ErrorResponse, ServerResponse } from "@/interfaces";
import ActionButton from "@/components/ActionButton";
import { getSourceList, sendOtpCode } from "../services";

export default function SellerSignupRequestPage() {
  const { transactionId } = useParams();
  const [isOtpDialogOpen, setIsOtpDialogOpen] = useState(false);
  const [error, setError] = useState<string>("");
  const sourceQuery = useQuery({
    queryKey: ["source"],
    queryFn: getSourceList,
    retry: false,
  });
  const signUpMutation = useMutation<ServerResponse, ErrorResponse, OtpPayload>(
    {
      mutationFn: (payload) => {
        return sendOtpCode(payload);
      },
      onError: (error) => {
        error.errorDescription === INVALID_INPUT
          ? setError("Veuillez renseigner des informations valides.")
          : setError(
              error.errorDescription
                ? error.errorDescription
                : "Une erreur est survenue."
            );
      },
      onSuccess: () => {
        setIsOtpDialogOpen(true);
        setError("");
      },
    }
  );
  const {
    register,
    handleSubmit,
    getValues,
    control, // Add control to use with Controller
    formState: { errors, isValid },
  } = useForm<sellerSignUpFormData>({
    resolver: zodResolver(sellerSignupSchema),
    defaultValues: {
      email: "",
      phone: "",
      refIdSource: "", // Add default value for reason
    },
  });

  const onSubmit = handleSubmit((data) => {
    signUpMutation.mutate({
      email: data.email,
      phone: data.phone,
      transactionId: transactionId as string,
      refIdSource: "1",
    });
  });

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col h-full justify-center space-y-4 w-full">
        <div className="flex flex-row items-center justify-start h-full px-4 ">
          <p className="text-2xl font-bold text-left text-primary">
            {SellerSignupRequestTexts.TITLE}
          </p>
        </div>
        <div className="flex flex-col items-start justify-center h-1/2 gap-2 bg-gray-50 rounded-lg p-4">
          <p className="text-lg font-bold text-primary">
            {SellerSignupRequestTexts.SUBTITLE}
          </p>
          <p className="text-sm text-primary">
            {SellerSignupRequestTexts.DESCRIPTION}
          </p>
          <p className="text-sm text-primary">
            {SellerSignupRequestTexts.HELPER}{" "}
            <span className="underline hover:cursor-pointer">
              contactez-nous
            </span>
            .
          </p>
          <FormField
            label="Email"
            id="email"
            placeholder="Entrez le nom du titulaire du compte"
            register={{ ...register("email") }}
            required
            error={errors.email}
            className="sm:w-full"
          />
          <div className="flex flex-col sm:flex-row items-center w-full gap-4">
            <div className="grid grid-cols-1 sm:w-1/2 w-full gap-2">
              <label htmlFor="phone" className="text-sm font-bold text-primary">
                Téléphone <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-1">
                <div className="flex items-center space-x-2 justify-center px-5 border border-r-0  rounded-l-md bg-gray-50">
                  <img
                    src={icon}
                    alt="Morocco"
                    width={20}
                    height={20}
                    loading="lazy"
                  />
                  <span className="text-sm font-semibold">+212</span>
                </div>
                <Input
                  {...register("phone")}
                  type="tel"
                  className="rounded-l-none"
                  placeholder="Numéro de téléphone"
                />
              </div>
              {errors.phone && (
                <p className="text-xs ml-2 text-red-500">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <FormSelectField
              className="w-full"
              label=" Comment avez-vous connu notre marketplace ?"
              options={sourceQuery.data ? sourceQuery.data : []}
              name="refIdSource"
              control={control}
              id="refIdSource"
            />
          </div>
          <div className="flex flex-col items-center justify-center w-full">
            <ActionButton
              action={onSubmit}
              disabled={!isValid || signUpMutation.isPending}
              loading={signUpMutation.isPending}
              label="Valider"
            />
          </div>
          <div className="flex flex-col items-center justify-center w-full">
            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col items-start justify-center px-4">
          <p className="text-sm text-primary">
            En fournisant votre numéro de téléphone, vous acceptez d'être vous
            recontacté pour finaliser votre inscription.
          </p>
        </div>
      </div>
      <OtpDialog
        open={isOtpDialogOpen}
        setOpen={() => setIsOtpDialogOpen(false)}
        payload={{
          email: getValues("email"),
          phone: getValues("phone"),
          transactionId: transactionId as string,
          refIdSource: getValues("refIdSource"),
        }}
      />
    </div>
  );
}
