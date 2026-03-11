import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apex Holdings",
  description: "Institutional Finance",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#060D09' }}>{children}</body>
    </html>
  );
}