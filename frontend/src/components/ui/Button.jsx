import React from "react";

const Button = ({
  children,
  variant = "primary",
  onClick,
  className = "",
  ...rest
}) => {
  const base =
    "inline-flex items-center justify-center rounded-md font-medium transition-shadow duration-200";

  const variants = {
    primary: "bg-primary text-white shadow-sm hover:shadow-md px-4 py-2",
    ghost: "bg-transparent border border-primary text-primary px-3 py-1.5",
    danger: "bg-danger text-white px-3 py-1.5",
  };

  return (
    <button
      onClick={onClick}
      className={`${base} ${
        variants[variant] || variants.primary
      } ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
