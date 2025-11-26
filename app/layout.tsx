import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import { ThemeProvider } from "./context/ThemeContext";

export const metadata: Metadata = {
  title: "ÉolienHub — Discussions hebdomadaires",
  description: "Plateforme collaborative dédiée aux discussions hebdomadaires sur les enjeux de société",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <ThemeProvider>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
