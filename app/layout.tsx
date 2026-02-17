import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'WBMOSINT 2.0',
  description: 'OSINT tool using Wayback Machine API',
};

export default function RootLayout({ children, }: { children: React.ReactNode; }) {
  return (
    <html lang="es">
      <body className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen">
        {children}
      </body>
    </html>
  );
}