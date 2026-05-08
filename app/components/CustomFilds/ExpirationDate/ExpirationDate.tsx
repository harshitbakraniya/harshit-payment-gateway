import { ControllerRenderProps } from "react-hook-form";

const ExpirationDate = ({
  field,
}: {
  field: ControllerRenderProps<any, "expirationDate">;
}) => {
  const handleExpirationDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;
    if (value.length > 5) {
      return;
    }
    const formattedValue = value.replace(/^(\d{2})(\d{2})$/, "$1/$2");
    field.onChange(formattedValue);
  };
  return (
    <input
      type="text"
      {...field}
      onChange={handleExpirationDateChange}
      className="border border-b-2 border-color-gray-400 focus:border-color-primary focus:border-b-2 focus:outline-none p-2"
    />
  );
};

ExpirationDate.displayName = "ExpirationDate";

export default ExpirationDate;
