import { z } from "zod";
import { DocType } from "../enums";
import { useStepperStore } from "@/stores/useStepperStore";

export const customFileSchema = z.union([
  z.instanceof(File),
  z.object({
    id: z.number().optional(),
    refIdDocType: z.nativeEnum(DocType),
    idSeller: z.union([z.string(), z.number(), z.null()]).optional(),
    name: z.string(),
    content: z.string(),
    contentType: z.string(),
  }),
]);

export const sellerCredentialsSchema = z
  .object({
    id: z.string().optional().default(""),
    firstName: z.string().min(1, { message: "Ce champ est obligatoire" }),
    lastName: z.string().min(1, { message: "Ce champ est obligatoire" }),
    refIdGender: z.string().min(1, { message: "Ce champ est obligatoire" }),
    hasPower: z.boolean().optional(),
    refIdFunctionInCompany: z
      .string()
      .min(1, { message: "Ce champ est obligatoire" }),

    email: z
      .string()
      .min(1, { message: "Ce champ est obligatoire" })
      .email({ message: "Adresse e-mail invalide" }),
    docs: z
      .array(customFileSchema)
      .min(1, { message: "Au moins un document est requis" }),
    co: z.string().optional(),
    IsDirector: z.boolean().optional(),
    refIdFunctionIfNotDirector: z.string().optional(),
    emailIfNotDirector: z
      .string()
      .optional()
      .transform((val) => val || ""),
    PhoneIfNotDirector: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.IsDirector !== true) {
      if (!data.refIdFunctionIfNotDirector) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Ce champ est obligatoire si vous n'êtes pas directeur",
          path: ["refIdFunctionIfNotDirector"],
        });
      }
      if (!data.emailIfNotDirector) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Ce champ est obligatoire si vous n'êtes pas directeur",
          path: ["emailIfNotDirector"],
        });
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
          data.emailIfNotDirector
        )
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Adresse e-mail invalide",
          path: ["emailIfNotDirector"],
        });
      }
      if (!data.PhoneIfNotDirector) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Ce champ est obligatoire si vous n'êtes pas directeur",
          path: ["PhoneIfNotDirector"],
        });
      }
    }
  });

export type sellerCredentialsFormData = z.infer<typeof sellerCredentialsSchema>;

export const SellerCommercialInformationSchema = z.object({
  id: z.string().optional(),
  sellerId: z.string().optional().default(""),
  socialRaison: z.string().min(1, { message: "Ce champ est obligatoire" }),
  codePostalSiege: z.string().min(1, { message: "Ce champ est obligatoire" }),
  refIdCitySiege: z.string().min(1, { message: "Ce champ est obligatoire" }),
  isSelfEmployed: z.boolean().optional().default(false),
  ice: z
    .string()
    .min(15, { message: "L'ICE doit contenir exactement 15 chiffres" })
    .max(15, { message: "L'ICE doit contenir exactement 15 chiffres" })
    .regex(/^\d{15}$/, {
      message: "L'ICE doit contenir exactement 15 chiffres",
    }),
  rc: z
    .string()
    .min(10, { message: "Le RC doit contenir exactement 10 chiffres" })
    .max(10, { message: "Le RC doit contenir exactement 10 chiffres" })
    .regex(/^\d{10}$/, {
      message: "Le RC doit contenir exactement 10 chiffres",
    }),
  nameRepresentantFiscal: z.string().optional(),
  adressRepresentantFiscal: z.string().optional(),
  capital: z.string().min(1, { message: "Ce champ est obligatoire" }),
  // refIdCurrency: z.string().min(1, { message: "Ce champ est obligatoire" }),
  companyCreationDate: z
    .string()
    .min(1, { message: "Ce champ est obligatoire" }),
  docs: z
    .array(customFileSchema)
    .min(1, { message: "Au moins un document est requis" }),
  ci: z.string().optional(),
});

export type SellerCommercialInformationFormData = z.infer<
  typeof SellerCommercialInformationSchema
>;

export const SellerBankingInformationSchema = z
  .object({
    id: z.string().optional(),
    sellerId: z.string().optional().default(""),
    refIdBank: z.string().min(1, { message: "Ce champ est obligatoire" }),
    nameAccountHolder: z
      .string()
      .min(1, { message: "Ce champ est obligatoire" }),
    rib: z
      .string()
      .min(24, { message: "Le RIB doit contenir exactement 24 caractères" })
      .max(24, { message: "Le RIB doit contenir exactement 24 caractères" })
      .regex(/^[0-9]{24}$/, {
        message: "Le RIB doit contenir uniquement des chiffres",
      }),
    docs: z
      .array(customFileSchema)
      .min(1, { message: "Au moins un document est requis" }),
    bi: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // Get commercial info from stepper store
    const stepFormData = useStepperStore.getState().stepFormData;
    const commercialInfo =
      stepFormData[2] as SellerCommercialInformationFormData;
    const credentialsInfo = stepFormData[1] as sellerCredentialsFormData;

    if (commercialInfo) {
      if (!commercialInfo.isSelfEmployed) {
        // For SA, nameAccountHolder must match socialRaison
        if (data.nameAccountHolder !== commercialInfo.socialRaison) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
              "Le titulaire du compte doit être identique à la raison sociale de l'entreprise",
            path: ["nameAccountHolder"],
          });
        }
      } else {
        // For auto-entrepreneur, nameAccountHolder must match firstName + lastName from credentials
        if (credentialsInfo) {
          const fullName =
            `${credentialsInfo.firstName} ${credentialsInfo.lastName}`.trim();
          if (data.nameAccountHolder !== fullName) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message:
                "Le titulaire du compte doit être identique à votre nom complet",
              path: ["nameAccountHolder"],
            });
          }
        }
      }
    }
  });

export type SellerBankingInformationFormData = z.infer<
  typeof SellerBankingInformationSchema
>;

export const SellerStoreSchema = z.object({
  id: z.string().optional(),
  sellerId: z.string().optional().default(""),
  name: z.string().min(1, { message: "Ce champ est obligatoire" }),
  numberProduct: z.string().min(1, { message: "Ce champ est obligatoire" }),
  refIdHub: z.string().min(1, { message: "Ce champ est obligatoire" }),
  refIdPrincipalCategorie: z
    .string()
    .min(1, { message: "Ce champ est obligatoire" }),
  hasWebSite: z.boolean().optional().default(false),
  urlWebSite: z.string().optional(),
  hasPhysicalStore: z.boolean(),
  sellsBrandedProducts: z.boolean().optional().default(false),
  checkedCguOctopia: z.boolean().refine((val) => val === true, {
    message: "Vous devez accepter les CGU d'Octopia",
  }),
  checkedAcceptRegistration: z.boolean().refine((val) => val === true, {
    message: "Vous devez accepter les conditions d'inscription",
  }),
  checkedCgm: z.boolean().refine((val) => val === true, {
    message: "Vous devez accepter les CGM",
  }),
  isSubmited: z.boolean().optional().default(false),
  docs: z.array(customFileSchema).optional().default([]),
});

export type SellerStoreFormData = z.infer<typeof SellerStoreSchema>;

export const OtpSchema = z.object({
  OTP: z.string().min(6, {
    message: "Le code doit contenir 4 chiffres",
  }),
});

export type OtpFormData = z.infer<typeof OtpSchema>;
