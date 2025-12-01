'use client';

import Link from "next/link";
import { useTheme } from "../context/ThemeContext";

export default function Header() {
  const { theme, toggleTheme, showAds, toggleAds } = useTheme();

  return (
    <header>
      <div className="brand">
        <Link href="/" className="logo" aria-label="Retour à l’accueil">
          <div className="mark">EL</div>
          <div className="title">EO-LIEN</div>
        </Link>
      </div>
      <nav style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          aria-label="Changer de thème"
        >
          <span className="theme-badge">{theme}</span>
          {theme === 'light' ? '→ Mode sombre' : '→ Mode clair'}
        </button>
        <button
          className="theme-toggle"
          onClick={toggleAds}
          aria-label={showAds ? 'Masquer les publicités' : 'Afficher les publicités'}
        >
          {showAds ? '🛑 Masquer pubs' : '📢 Afficher pubs'}
        </button>
        <Link href="/about">qui‑sommes‑nous ?</Link>
      </nav>
    </header>
  );
}
