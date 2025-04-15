import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const containerVariants = cva("mx-auto", {
  variants: {
    variant: {
      fullMobileConstrainedPadded: "max-w-7xl sm:px-6 lg:px-8",
      constrainedPadded: "max-w-7xl px-4 sm:px-6 lg:px-8",
      fullMobileBreakpointPadded: "container mx-auto sm:px-6 lg:px-8",
      breakpointPadded: "container mx-auto px-4 sm:px-6 lg:px-8",
      narrowConstrainedPadded: "max-w-7xl px-4 sm:px-6 lg:px-8",
    },
  },
  defaultVariants: {
    variant: "constrainedPadded",
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  asChild?: boolean;
}

const Container: React.FC<ContainerProps> = ({
  className,
  children,
  variant,
  asChild,
  ...props
}) => {
  const Comp = asChild ? React.Fragment : "div";

  if (variant === "narrowConstrainedPadded") {
    return (
      <Comp
        className={cn(containerVariants({ variant }), className)}
        {...props}
      >
        <div className="mx-auto max-w-3xl">{children}</div>
      </Comp>
    );
  }

  return (
    <Comp className={cn(containerVariants({ variant }), className)} {...props}>
      {children}
    </Comp>
  );
};

export { Container, containerVariants };
