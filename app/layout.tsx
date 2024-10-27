import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "./providers/auth";

export const metadata: Metadata = {
  title: "Entity Locks"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
