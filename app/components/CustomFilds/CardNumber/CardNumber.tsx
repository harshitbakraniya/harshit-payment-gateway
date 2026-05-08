import { ControllerRenderProps } from "react-hook-form";
import { PaymentSchemaType } from "@/app/validation/schema";

const CardNumber = ({
  field,
}: {
  field: ControllerRenderProps<PaymentSchemaType, "cardNumber">;
}) => {
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length > 19) {
      return;
    }
    const formattedValue = value
      .replace(/\s/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim();

    field.onChange(formattedValue);
  };
  return (
    <input
      type="text"
      {...field}
      onChange={handleCardNumberChange}
      className="border border-b-2 border-color-gray-400 focus:border-color-primary focus:border-b-2 focus:outline-none p-2"
    />
  );
};

export default CardNumber;
