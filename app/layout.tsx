import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FHNW Raumsuche",
  description: "Raum eingeben und den passenden Plan anzeigen."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
