import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CogLab Catalog",
  description: "A friendlier, interactive catalog for the CogLab cognition labs."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
