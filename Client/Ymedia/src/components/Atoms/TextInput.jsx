const TextInput = ({
  type = "text",
  className = "",
  placeholder = "",
  value,
  onChange,
}) => {
  return (
    <input
      type={type}
      className={`input ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default TextInput;
