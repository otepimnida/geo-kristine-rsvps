import { Input } from "../../ui";

const RSVPInput = ({
  label,
  name,
  type = "text",
  value,
  placeholder,
  onChange,
  error,
  required = false,
}) => {
  return (
    <Input
      label={label}
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      error={error}
      required={required}
    />
  );
};

export default RSVPInput;