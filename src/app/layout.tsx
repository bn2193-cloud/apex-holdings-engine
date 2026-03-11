import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apex Holdings",
  description: "Institutional Finance & Technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}