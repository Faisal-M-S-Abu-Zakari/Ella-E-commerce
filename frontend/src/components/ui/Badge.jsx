import React from "react";

const Badge = ({ children, className = "" }) => (
  <span
    className={`inline-block px-2 py-0.5 rounded-full text-xs bg-primary text-white ${className}`}
  >
    {children}
  </span>
);

export default Badge;
