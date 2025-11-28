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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
          irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
          deserunt mollit anim id est laborum.
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel risus nec 
          turpis consectetur euismod. Vivamus facilisis justo vel augue blandit, at 
          scelerisque nulla fringilla. Pellentesque habitant morbi tristique senectus et 
          netus et malesuada fames ac turpis egestas.
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae nunc 
          sed libero venenatis dignissim. Proin in velit ac tortor hendrerit vehicula. 
          Suspendisse potenti. Integer euismod dui eu lorem tincidunt, vel convallis 
          mauris feugiat. Nullam ac sapien nec magna vestibulum fringilla.
        </p>
      </section>
    </main>
  );
}
