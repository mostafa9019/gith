import { z } from "zod";
import { DocType } from "../enums";

export const customFileSchema = z.union([
  z.instanceof(File),
  z.object({
    id: z.number().optional(),
    refIdDocType: z.nativeEnum(DocType),
    idSeller: z.string().optional(),
    name: z.string(),
    content: z.string(),
    contentType: z.string(),
  }),
]);

export const sellerCredentialsSchema = z.object({
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
    .min(1, { message: "Au moins 1 sdocument est requis" }),
});

export type sellerCredentialsFormData = z.infer<typeof sellerCredentialsSchema>;

export const SellerCommercialInformationSchema = z.object({
  id: z.string().optional(),
  sellerId: z.string().optional().default(""),
  socialRaison: z.string().min(1, { message: "Ce champ est obligatoire" }),
  codePostalSiege: z.string().min(1, { message: "Ce champ est obligatoire" }),
  citySiege: z.string().min(1, { message: "Ce champ est obligatoire" }),
  isSelfEmployed: z.boolean().optional().default(false),
  ice: z.string().min(1, { message: "Ce champ est obligatoire" }),
  rc: z.string().min(1, { message: "Ce champ est obligatoire" }),
  nameRepresentantFiscal: z.string().optional(),
  adressRepresentantFiscal: z.string().optional(),
  capital: z.string().min(1, { message: "Ce champ est obligatoire" }),
  refIdCurrency: z.string().min(1, { message: "Ce champ est obligatoire" }),
  companyCreationDate: z
    .string()
    .min(1, { message: "Ce champ est obligatoire" }),
  docs: z
    .array(customFileSchema)
    .min(1, { message: "Au moins 1 sdocument est requis" }),
});

export type SellerCommercialInformationFormData = z.infer<
  typeof SellerCommercialInformationSchema
>;

export const SellerBankingInformationSchema = z.object({
  id: z.string().optional(),
  sellerId: z.string().optional().default(""),
  refIdBank: z.string().min(1, { message: "Ce champ est obligatoire" }),
  nameAccountHolder: z.string().min(1, { message: "Ce champ est obligatoire" }),
  rib: z.string().min(1, { message: "Ce champ est obligatoire" }),
  docs: z
    .array(customFileSchema)
    .min(1, { message: "Au moins 1 sdocument est requis" }),
});

export type SellerBankingInformationFormData = z.infer<
  typeof SellerBankingInformationSchema
>;

export const SellerStoreSchema = z.object({
  id: z.string().optional(),
  sellerId: z.string().optional().default(""),
  name: z.string().min(1, { message: "Ce champ est obligatoire" }),
  numberProduct: z.string().min(1, { message: "Ce champ est obligatoire" }),
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
});

export type SellerStoreFormData = z.infer<typeof SellerStoreSchema>;

export const OtpSchema = z.object({
  OTP: z.string().min(6, {
    message: "Le code doit contenir 4 chiffres",
  }),
});

export type OtpFormData = z.infer<typeof OtpSchema>;
