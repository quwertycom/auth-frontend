'use client';

import './globals.scss';
import { Providers } from './providers';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-w-screen max-w-screen max-h-screen min-h-screen overflow-hidden antialiased dark">
        <main>
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
