import { z } from "zod";

export const sellerSignupSchema = z.object({
  refIdSource: z.string(),
  phone: z
    .string()
    .min(1, { message: "Ce champ est obligatoire" })
    .regex(/^(0|212|\+212)?(6|7)[0-9]{8}$/, "Numéro de téléphone invalide"),
  email: z
    .string()
    .min(1, { message: "Ce champ est obligatoire" })
    .email({ message: "Adresse e-mail invalide" }),
});

export type sellerSignUpFormData = z.infer<typeof sellerSignupSchema>;
