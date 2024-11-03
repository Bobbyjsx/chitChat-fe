
import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cva, VariantProps } from "class-variance-authority";
import classNames from "classnames";

// Define your base styles and variants with CVA
const buttonStyles = cva(
  "relative overflow-hidden w-32 p-2 h-12 rounded-md font-bold cursor-pointer group transition-all duration-300 ease-in-out",
  {
    variants: {
      intent: {
        filled: "text-white",
        outlined: "bg-transparent border-2",
        subtle: "bg-transparent text-current",
      },
      variant: {
        primary: "bg-primary-500 border-primary-500 text-white",
        secondary: "bg-secondary-500 border-secondary-500 text-white",
        success: "bg-green-600 border-green-600 text-white",
        danger: "bg-red-600 border-red-600 text-white",
      },
      size: {
        sm: "h-8 w-24 text-sm",
        md: "h-12 w-32 text-xl",
        lg: "h-16 w-48 text-2xl",
      },
    },
    compoundVariants: [
      {
        intent: "outlined",
        variant: "primary",
        class: "text-primary-500",
      },
      {
        intent: "outlined",
        variant: "secondary",
        class: "text-secondary-500",
      },
      {
        intent: "outlined",
        variant: "success",
        class: "text-green-600",
      },
      {
        intent: "outlined",
        variant: "danger",
        class: "text-red-600",
      },
      {
        intent: "subtle",
        variant: "primary",
        class: "text-primary-500",
      },
      {
        intent: "subtle",
        variant: "secondary",
        class: "text-secondary-500",
      },
      {
        intent: "subtle",
        variant: "success",
        class: "text-green-600",
      },
      {
        intent: "subtle",
        variant: "danger",
        class: "text-red-600",
      },
    ],
    defaultVariants: {
      intent: "filled",
      variant: "primary",
      size: "md",
    },
  }
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonStyles> & {
    as?: "button" | "anchor";
    href?: string;
    children: ReactNode;
  };

const AnimatedButton = ({
  intent,
  variant,
  size,
  as = "button",
  href,
  children,
  className,
  ...props
}: ButtonProps) => {
  const combinedClasses = classNames(buttonStyles({ intent, variant, size }), className);

  // Set animation background colors based on variant
  const animationColor1 =
    variant === "primary"
      ? "bg-primary-500"
      : variant === "secondary"
      ? "bg-secondary-500"
      : variant === "success"
      ? "bg-green-600"
      : "bg-red-600";
  const animationColor2 =
    variant === "primary"
      ? "bg-indigo-400"
      : variant === "secondary"
      ? "bg-yellow-400"
      : variant === "success"
      ? "bg-green-400"
      : "bg-red-400";
  const animationColor3 =
    variant === "primary"
      ? "bg-indigo-600"
      : variant === "secondary"
      ? "bg-yellow-600"
      : variant === "success"
      ? "bg-green-800"
      : "bg-red-800";

  const buttonContent = (
    <>
      {children}
      <span
        className={`absolute w-36 h-32 -top-8 -left-2 ${animationColor1} rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-left`}
      ></span>
      <span
        className={`absolute w-36 h-32 -top-8 -left-2 ${animationColor2} rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-left`}
      ></span>
      <span
        className={`absolute w-36 h-32 -top-8 -left-2 ${animationColor3} rotate-12 transform scale-x-0 group-hover:scale-x-50 transition-transform group-hover:duration-1000 duration-500 origin-left`}
      ></span>
      <span className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-6 z-10">
        {children}
      </span>
    </>
  );

  return (
    <button className={combinedClasses} {...props}>
      {buttonContent}
    </button>
  );
};

export default AnimatedButton;
