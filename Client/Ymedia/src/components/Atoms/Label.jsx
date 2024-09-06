const Label = ({ className = "", children, htmlFor }) => {
  return (
    <label className={`label ${className}`} htmlFor={htmlFor}>
      {children}
    </label>
  );
};

export default Label;
