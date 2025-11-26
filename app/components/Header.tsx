import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div className="brand">
        <div className="logo">
          <div className="mark">ÉH</div>
          <div className="title">ÉolienHub</div>
        </div>
      </div>
      <nav>
        <Link href="/about">qui‑sommes‑nous ?</Link>
      </nav>
    </header>
  );
}
