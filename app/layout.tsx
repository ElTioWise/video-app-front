import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VideoStream - Tu plataforma de streaming",
  description: "Disfruta de los mejores videos y contenido multimedia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
