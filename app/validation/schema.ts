import * as yup from "yup";

export type PaymentSchemaType = {
  cardHolderName: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  amount: number;
};

export const PaymentSchema = yup.object().shape({
  cardHolderName: yup.string().required("Card holder name is required"),
  cardNumber: yup.string().required("Card number is required"),
  expirationDate: yup.string().required("Expiration date is required"),
  cvv: yup
    .string()
    .required("CVV is required")
    .min(3, "CVV must be 3 digits")
    .max(4, "CVV must be 4 digits"),
  amount: yup.number().required("Amount is required"),
});
