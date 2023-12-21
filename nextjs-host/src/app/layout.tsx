import type { Metadata } from "next";
import type { FC, PropsWithChildren } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js Host App",
  description: "Host application for the microfrontend",
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
