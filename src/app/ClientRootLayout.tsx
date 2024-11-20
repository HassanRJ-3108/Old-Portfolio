// src/app/clientRootLayout.tsx

'use client';

import { SessionProvider } from "next-auth/react";
import "./globals.css";

export default function ClientRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <main className="flex-grow">{children}</main>
    </SessionProvider>
  );
}
