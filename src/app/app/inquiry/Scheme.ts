import { InferType, number, object, string } from "yup";

export const Schema = object().shape({
  inquiryType: number().required(),
  email: string().email().required(),
  title: string()
    .transform((value) => value.trim())
    .required()
    .min(1),
  inquiry: string()
    .transform((value) => value.trim())
    .required()
    .min(1)
    .max(800),
});

export type TScheme = InferType<typeof Schema>;

export const InquiryType = {
  Inquiry: 1,
  Inform: 2,
};
