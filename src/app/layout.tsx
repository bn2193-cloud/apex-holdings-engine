export const metadata = { title: "Iron Summit", description: "Wealth Defense" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-slate-950 text-slate-100">{children}</body>
    </html>
  );
}
