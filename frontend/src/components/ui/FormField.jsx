import React from "react";

const FormField = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  name,
}) => {
  return (
    <label className="block">
      {label && <span className="block mb-1 text-muted text-sm">{label}</span>}
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-secondary p-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary w-full text-white"
      />
    </label>
  );
};

export default FormField;
