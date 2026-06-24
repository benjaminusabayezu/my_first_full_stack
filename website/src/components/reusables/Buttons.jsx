import React from "react";

const variants = {
  primary: "bg-lime-500 hover:bg-lime-600 text-black",
  secondary: "bg-zinc-800 hover:bg-zinc-700 text-white",
  danger: "bg-red-500 hover:bg-red-600 text-white",
  success: "bg-green-500 hover:bg-green-600 text-white",
  warning: "bg-yellow-500 hover:bg-yellow-600 text-black",
  ghost: "hover:bg-zinc-800 text-zinc-300",
};

const Button = ({
  children,
  variant = "primary",
  type = "button",
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`
        px-4 py-2 rounded-lg
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
