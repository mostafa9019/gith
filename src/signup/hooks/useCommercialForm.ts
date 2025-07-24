"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import {
  type SellerCommercialInformationFormData,
  SellerCommercialInformationSchema,
} from "../zod";
import type { SellerCommercialInformation } from "../interfaces";
import { useStepperStore } from "@/stores/useStepperStore";

interface UseCommercialFormProps {
  initialData?: SellerCommercialInformation;
  stepIndex: number;
}

export function useCommercialForm({
  initialData,
  stepIndex,
}: UseCommercialFormProps) {
  const { setStepValidation, getStepFormData, setStepFormData } =
    useStepperStore();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const form = useForm<SellerCommercialInformationFormData>({
    resolver: zodResolver(SellerCommercialInformationSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {},
  });

  const {
    reset,
    getValues,
    setValue,
    formState: { isValid },
  } = form;

  useEffect(() => {
    if (selectedDate) {
      setValue("companyCreationDate", selectedDate.toISOString(), {
        shouldValidate: true,
      });
    }
  }, [selectedDate, setValue]);

  useEffect(() => {
    return () => {
      const currentFormValues = getValues();
      if (currentFormValues && Object.keys(currentFormValues).length > 0) {
        setStepFormData(stepIndex, currentFormValues);
      }
    };
  }, [getValues, setStepFormData, stepIndex]);

  useEffect(() => {
    setStepValidation(stepIndex, isValid);
  }, [isValid, setStepValidation, stepIndex]);

  useEffect(() => {
    if (initialData) {
      const defaultData = prepareInitialData(initialData);
      reset(defaultData);
      setStepFormData(stepIndex, defaultData);

      if (initialData.companyCreationDate) {
        setSelectedDate(new Date(initialData.companyCreationDate));
      }
    } else {
      const storedData = getStepFormData(
        stepIndex
      ) as SellerCommercialInformationFormData | null;
      if (storedData && Object.keys(storedData).length > 0) {
        reset(storedData);
        if (storedData.companyCreationDate) {
          setSelectedDate(new Date(storedData.companyCreationDate));
        }
      }
    }
  }, [
    initialData,
    setValue,
    reset,
    getStepFormData,
    setStepFormData,
    stepIndex,
  ]);

  return {
    ...form,
    isValid,
    selectedDate,
    setSelectedDate,
  };
}

function prepareInitialData(initialData: SellerCommercialInformation) {
  return {
    ...(initialData.id_company
      ? { id: initialData.id_company.toString() }
      : {}),
    socialRaison: initialData.socialRaison || "",
    refIdCitySiege: initialData.refIdCitySiege || "",
    codePostalSiege: initialData.codePostalSiege || "",
    isSelfEmployed: initialData.isSelfEmployed || false,
    companyCreationDate: initialData.companyCreationDate || "",
    ice: initialData.ice || "",
    rc: initialData.rc || "",
    nameRepresentantFiscal: initialData.nameRepresentantFiscal || "",
    adressRepresentantFiscal: initialData.adressRepresentantFiscal || "",
    capital: initialData.capitalCompany?.toString() || "",
    // refIdCurrency: initialData.refIdCurrency?.toString() || "",
    docs: initialData.docs || [],
  };
}
