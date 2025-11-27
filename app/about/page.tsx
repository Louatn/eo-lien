'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Person {
  id?: number;
  nom: string;
  prenom: string;
  profession: string;
  image: string | null;
  age: number;
  diplome: string;
  commentaire: string;
}

function PersonCard({ person }: { person: Person }) {
  const initials = ((person.prenom?.[0] || '') + (person.nom?.[0] || '')).toUpperCase();
  
  return (
    <article className="card">
      <div className="card-header">
        <div className="profile-pic">
          {person.image ? (
            <img src={person.image} alt={`${person.prenom} ${person.nom}`} />
          ) : (
            initials
          )}
        </div>
        <div className="card-title">
          <h3>{person.prenom} {person.nom}</h3>
          <div className="meta">{person.profession}</div>
        </div>
      </div>
      <div className="card-body">
        <div className="label">Diplôme</div>
        <div>{person.diplome || '—'}</div>
        <div className="label">À propos</div>
        <div>{person.commentaire || '—'}</div>
      </div>
    </article>
  );
}

export default function About() {
  const [citizens, setCitizens] = useState<Person[]>([]);
  const [experts, setExperts] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [citizensResp, expertsResp] = await Promise.all([
          fetch('/data/citizens.json'),
          fetch('/data/experts.json'),
        ]);

        const citizensData = await citizensResp.json();
        const expertsData = await expertsResp.json();

        setCitizens(citizensData);
        setExperts(expertsData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <main>
        <div style={{ color: 'var(--muted)' }}>Chargement...</div>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: '1100px' }}>
      <div className="intro">
        <h1>À propos d'ÉO-LIEN</h1>
        <p>
          ÉolienHub est une plateforme collaborative dédiée aux discussions hebdomadaires sur les enjeux de société,
          la transition écologique et le développement durable. Chaque semaine, citoyens et experts échangent sur des thématiques variées
          — santé publique, mobilité, éducation, agroécologie, économie circulaire — afin de co-construire des solutions adaptées aux territoires.
          Notre objectif est de favoriser le dialogue, de croiser les expertises et de rendre visibles les initiatives locales porteuses d'avenir.
        </p>
      </div>

      <section>
        <h2>Les Citoyens</h2>
        <div className="grid">
          {citizens.map((citizen, idx) => (
            <PersonCard key={citizen.id || idx} person={citizen} />
          ))}
        </div>
      </section>

      <section>
        <h2>Les Experts</h2>
        <div className="grid">
          {experts.map((expert, idx) => (
            <PersonCard key={idx} person={expert} />
          ))}
        </div>
      </section>
    </main>
  );
}
