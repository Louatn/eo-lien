'use client';

import Link from "next/link";
import { useTheme } from "../context/ThemeContext";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header>
      <div className="brand">
        <Link href="/" className="logo" aria-label="Retour à l’accueil">
          <div className="mark">ÉH</div>
          <div className="title">ÉolienHub</div>
        </Link>
      </div>
      <nav style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          aria-label="Changer de thème"
        >
          <span className="theme-badge">{theme}</span>
          {theme === 'BB' ? '→ Mode Noir' : '→ Mode Blanc'}
        </button>
        <Link href="/about">qui‑sommes‑nous ?</Link>
      </nav>
    </header>
  );
}
