'use client';

import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      className="back-btn"
      onClick={() => router.push('/main')}
      aria-label="Retour aux discussions"
    >
      ← Retour
    </button>
  );
}
