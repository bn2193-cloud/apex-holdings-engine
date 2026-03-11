import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apex Holdings",
  description: "Institutional Finance",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ backgroundColor: '#060D09' }}>
      <body style={{ 
        margin: 0, 
        padding: 0, 
        backgroundColor: '#060D09', 
        color: 'white',
        minHeight: '100vh' 
      }}>
        {children}
      </body>
    </html>
  );
}