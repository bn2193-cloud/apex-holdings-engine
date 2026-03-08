import './globals.css';

export const metadata = {
  title: 'Apex Holdings',
  description: 'Strategic Infrastructure & Wealth Defense',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
