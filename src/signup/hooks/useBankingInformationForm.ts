"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { type SellerBankingInformationFormData, SellerBankingInformationSchema } from "../zod"
import type { SellerBankingInformation } from "../interfaces"
import { useStepperStore } from "@/stores/useStepperStore"

interface UseBankingFormProps {
  initialData: SellerBankingInformation
  stepIndex: number
}

export function useBankingForm({ initialData, stepIndex }: UseBankingFormProps) {
  const { setStepValidation, getStepFormData, setStepFormData } = useStepperStore()

  const form = useForm<SellerBankingInformationFormData>({
    resolver: zodResolver(SellerBankingInformationSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {},
  })

  const {
    reset,
    getValues,
    formState: { isValid },
  } = form

  useEffect(() => {
    return () => {
      const currentFormValues = getValues()
      if (currentFormValues && Object.keys(currentFormValues).length > 0) {
        setStepFormData(stepIndex, currentFormValues)
      }
    }
  }, [getValues, setStepFormData, stepIndex])

  useEffect(() => {
    setStepValidation(stepIndex, isValid)
  }, [isValid, setStepValidation, stepIndex])
  
  useEffect(() => {
    if (initialData) {
      const defaultData = prepareInitialData(initialData)
      reset(defaultData)
      setStepFormData(stepIndex, defaultData)
    } else {
      const storedData = getStepFormData(stepIndex)
      if (storedData && Object.keys(storedData).length > 0) {
        reset(storedData)
      }
    }
  }, [initialData, reset, getStepFormData, setStepFormData, stepIndex])

  return {
    ...form,
    isValid,
  }
}

function prepareInitialData(initialData: SellerBankingInformation) {
  return {
    ...(initialData?.id_bank ? { id: initialData.id_bank.toString() } : {}),
    sellerId: initialData?.id_seller || "",
    nameAccountHolder: initialData?.nameAccountHolder || "",
    refIdBank: initialData?.refIdBank?.toString() || "",
    rib: initialData?.rib || "",
    docs: initialData?.docs || [],
  }
}
