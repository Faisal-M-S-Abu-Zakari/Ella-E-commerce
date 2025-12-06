import React from "react";

const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-surface rounded-xl overflow-hidden shadow-sm border border-border ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
