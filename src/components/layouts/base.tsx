"use client";

import { HTMLAttributes, ReactNode } from "react";
import { Container } from "../container";
import { Header } from "./header";
import { Footer } from "../footer";

interface LayoutProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  containerVariant?:
    | "constrainedPadded"
    | "narrowConstrainedPadded"
    | "fullMobileConstrainedPadded"
    | "breakpointPadded"
    | "fullMobileBreakpointPadded";
}

export const Layout = ({
  children,
  className: classname,
  containerVariant = "constrainedPadded",
  ...props
}: LayoutProps) => {
  return (
    <div {...props}>
      <Header />
      <main className={`my-20 overflow-hidden ${classname || ""} `}>
        <Container variant={containerVariant}>{children}</Container>
      </main>
      <Container variant={containerVariant}>
        <Footer />
      </Container>
    </div>
  );
};
