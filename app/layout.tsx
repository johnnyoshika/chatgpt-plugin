import './globals.css';

export const metadata = {
  title: 'ChatGPT TODO Plugin',
  description: 'ChatGPT TODO Plugin',
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
