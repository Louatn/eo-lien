import type { Metadata } from "next";
import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/Header";
import AdBanners from "./components/AdBanners";
import AppShell from "./components/AppShell";
import "./globals.css";

export const metadata: Metadata = {
  title: "EO-LIEN",
  description: "Plateforme collaborative de discussion citoyenne",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <ThemeProvider>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
