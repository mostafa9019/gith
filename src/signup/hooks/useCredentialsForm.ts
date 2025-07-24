"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { type sellerCredentialsFormData, sellerCredentialsSchema } from "@/signup/zod"
import type { SellerCredentials } from "@/signup/interfaces"
import { useStepperStore } from "@/stores/useStepperStore"

interface UseCredentialsFormProps {
  initialData?: SellerCredentials
  stepIndex: number
}

export function useCredentialsForm({ initialData, stepIndex }: UseCredentialsFormProps) {
  const { setStepValidation, getStepFormData, setStepFormData } = useStepperStore()

  const form = useForm<sellerCredentialsFormData>({
    resolver: zodResolver(sellerCredentialsSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  })

  const {
    reset,
    getValues,
    trigger,
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

    const timeoutId = setTimeout(() => {
      trigger()
    }, 100)

    return () => clearTimeout(timeoutId)
  }, [initialData, reset, trigger, getStepFormData, setStepFormData, stepIndex])

  return {
    ...form,
    isValid,
  }
}

function prepareInitialData(initialData: SellerCredentials) {
  return {
    ...(initialData.id_seller ? { id: initialData.id_seller.toString() } : {}),
    refIdGender: initialData.refIdGender?.toString() || "",
    firstName: initialData.firstName || "",
    lastName: initialData.lastName || "",
    email: initialData.email || "",
    refIdFunctionInCompany: initialData.refIdFunctionInCompany?.toString() || "",
    hasPower: initialData.hasPower === true,
    docs: initialData.docs || [],
  }
}
