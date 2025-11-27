"use client";

import { ReactNode } from "react";
import Header from "./Header";
import AdBanners from "./AdBanners";
import { useTheme } from "../context/ThemeContext";

export default function AppShell({ children }: { children: ReactNode }) {
  const { showAds } = useTheme();
  return (
    <>
      <Header />
      <div className="site-frame">
        {showAds && (
          <aside className="site-aside left sticky-ad" aria-label="Publicité gauche">
            <AdBanners />
          </aside>
        )}
        <div className="site-content" role="main">
          <div className="content-inner">
            {children}
          </div>
        </div>
        {showAds && (
          <aside className="site-aside right sticky-ad" aria-label="Publicité droite">
            <AdBanners />
          </aside>
        )}
      </div>
    </>
  );
}
