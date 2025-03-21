import React from "react";

interface GenericButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger"; // Button types
  className?: string; // Extra styles
}

const GenericButton: React.FC<GenericButtonProps> = ({
  variant = "primary",
  className = "",
  children,
  ...props
}) => {
  // Tailwind button styles based on variant
  const baseStyles = "px-4 py-2 w-full font-medium transition duration-200";
  const variantStyles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    outline: "border border-gray-500 text-gray-700 hover:bg-gray-100",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default GenericButton;
