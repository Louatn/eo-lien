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

export default function HomePage() {
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

        const citizensData: Person[] = await citizensResp.json();
        const expertsData: Person[] = await expertsResp.json();

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
    <main className="homepage">
      {/* Background Video */}
      <div className="bg-video-wrapper">
        <video autoPlay loop muted playsInline className="bg-video">
          <source src="/data/video/eoliene.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <h1>Bienvenue sur EO-LIEN</h1>
        <p className="hero-description">
          <strong>Entre l'urgence climatique et la protection des paysages,</strong> l'éolien divise profondément la France. Comment l'articuler avec le nucléaire ? Faut-il sacrifier nos horizons pour le climat ?
          <br /><br />
          Pour répondre à ce défi complexe, une simple consultation ne suffisait pas. Nous avons organisé une <strong>Conférence de Consensus</strong> : 12 semaines d'immersion où citoyens et experts ont disséqué la technique et l'humain.
          <br /><br />
          Ce site vous raconte comment, face à la réalité des chiffres et du terrain, ils sont passés de l'affrontement à la construction d'un nouveau modèle énergétique accepté par tous.
        </p>
        <Link href="/main" className="cta-button">
          Accéder aux discussions
        </Link>
      </section>

      {/* Participants Section */}
      <section className="people-section">
        <h2>Les Participants</h2>
        <div className="people-grid">
          {citizens.map((person, idx) => (
            <div key={idx} className="person-card">
              <div className="person-image-wrapper">
                {person.image ? (
                  <img 
                    src={person.image} 
                    alt={`${person.prenom} ${person.nom}`}
                    className="person-image"
                  />
                ) : (
                  <div className="person-placeholder">
                    {person.prenom[0]}{person.nom[0]}
                  </div>
                )}
                <div className="person-hover-card">
                  <h3>{person.prenom} {person.nom}</h3>
                  <p className="person-profession">{person.profession}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="section-description">
          <strong>Ils ont été choisis au hasard.</strong> Ce ne sont pas des spécialistes, juste des gens comme vous et moi.
          <br /><br />
          Certains habitent à côté d'éoliennes, d'autres sont contre, ou simplement curieux. Ils ont accepté de passer trois mois à étudier le sujet à fond pour se faire leur propre avis.
        </p>
      </section>

      {/* Professionals Section */}
      <section className="people-section">
        <h2>Les Professionnels</h2>
        <div className="people-grid">
          {experts.map((person, idx) => (
            <div key={idx} className="person-card">
              <div className="person-image-wrapper">
                {person.image ? (
                  <img 
                    src={person.image} 
                    alt={`${person.prenom} ${person.nom}`}
                    className="person-image"
                  />
                ) : (
                  <div className="person-placeholder">
                    {person.prenom[0]}{person.nom[0]}
                  </div>
                )}
                <div className="person-hover-card expert-card">
                  <h3>{person.prenom} {person.nom}</h3>
                  <p className="person-profession">{person.profession}</p>
                  <p className="person-comment">{person.commentaire}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="section-description">
          <strong>Ingénieurs, biologistes ou maires,</strong> ils ne sont pas là pour défendre un camp, mais pour apporter des faits.
          <br /><br />
          Ils expliquent la technique et la réalité du terrain sans rien cacher. Grâce à eux, les citoyens ont toutes les cartes en main pour décider.
        </p>
      </section>
    </main>
  );
}
