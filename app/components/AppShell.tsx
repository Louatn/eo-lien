"use client";

import { ReactNode } from "react";
import Header from "./Header";
import { useTheme } from "../context/ThemeContext";

export default function AppShell({ children }: { children: ReactNode }) {
  const { theme } = useTheme();
  return (
    <>
      <Header />
      <div className="site-frame" data-theme={theme}>
        <div className="site-content" role="main">
          <div className="content-inner">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
