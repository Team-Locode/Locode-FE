import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  buttonClassName?: string;
  variant?: "blue" | "white";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};

const Button = ({
  children,
  buttonClassName,
  variant = "blue",
  onClick,
  disabled,
  ...props
}: ButtonProps) => {
  const baseStyles = "rounded-lg font-medium transition-colors disabled:cursor-not-allowed w-full px-6 py-3 text-medium-24";
  
  const variantStyles = {
    blue: "bg-primary text-white hover:bg-primary-6 disabled:bg-gray-7 disabled:text-gray-5",
    white: "bg-white text-primary hover:bg-primary-6 disabled:bg-gray-7 disabled:text-gray-5",
  };

  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        buttonClassName,
      )}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

