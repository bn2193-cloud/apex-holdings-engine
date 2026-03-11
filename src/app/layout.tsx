export const metadata = {
  title: "Apex Holdings",
  description: "Institutional Finance",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ 
        margin: 0, 
        padding: 0, 
        backgroundColor: '#060D09', 
        color: 'white',
        minHeight: '100vh',
        fontFamily: 'sans-serif'
      }}>
        {children}
      </body>
    </html>
  );
}