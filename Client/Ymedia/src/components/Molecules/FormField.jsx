import { TextInput } from "flowbite-react";
import Label from "../Atoms/Label";
// import Input from "postcss/lib/input";

const FormField = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  className = "",
}) => {
  return (
    <div className={`form-field ${className}`}>
      <Label htmlFor={label.toLowerCase()}>{label}</Label>
      <TextInput
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default FormField;
