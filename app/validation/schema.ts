import * as yup from "yup";

export type PaymentSchemaType = {
  cardHolderName: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  amount: number;
};

const isCurrentOrFutureExpiry = (value?: string) => {
  if (!value) {
    return false;
  }

  const match = value.match(/^(\d{2})\/(\d{2})$/);
  if (!match) {
    return false;
  }

  const month = Number(match[1]);
  const year = 2000 + Number(match[2]);

  if (month < 1 || month > 12) {
    return false;
  }

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  return year > currentYear || (year === currentYear && month >= currentMonth);
};

export const PaymentSchema = yup.object().shape({
  cardHolderName: yup.string().required("Card holder name is required"),
  cardNumber: yup.string().required("Card number is required"),
  expirationDate: yup
    .string()
    .required("Expiration date is required")
    .matches(/^\d{2}\/\d{2}$/, "Expiration date must be in MM/YY format")
    .test(
      "not-in-past",
      "Card expiration date cannot be in the past",
      isCurrentOrFutureExpiry,
    ),
  cvv: yup
    .string()
    .required("CVV is required")
    .min(3, "CVV must be 3 digits")
    .max(4, "CVV must be 4 digits"),
  amount: yup
    .number()
    .typeError("Amount must be a valid number")
    .required("Amount is required")
    .moreThan(0, "Amount must be greater than 0"),
});
