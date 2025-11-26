'use client';

import { useState, useEffect } from 'react';

interface Message {
  auteur_id: number;
  heure: string;
  message: string;
}

interface Discussion {
  semaine: string;
  date: string;
  topo: string;
  messages: Message[];
}

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

export default function Home() {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [authors, setAuthors] = useState<Map<number, Person>>(new Map());
  const [currentWeek, setCurrentWeek] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [citizensResp, expertsResp, discussionsResp] = await Promise.all([
          fetch('/data/citizens.json'),
          fetch('/data/experts.json'),
          fetch('/data/discussion.json'),
        ]);

        const citizens: Person[] = await citizensResp.json();
        const experts: Person[] = await expertsResp.json();
        const discussionsData: Discussion[] = await discussionsResp.json();

        // Build authors map
        const authorsMap = new Map<number, Person>();
        let maxId = 0;

        // Add citizens with their IDs
        for (const c of citizens) {
          if (typeof c.id === 'number' && c.id > maxId) maxId = c.id;
        }
        for (const c of citizens) {
          if (c.id) authorsMap.set(c.id, c);
        }

        // Assign expert ids starting at maxId + 1
        let nextExpertId = maxId + 1;
        for (const e of experts) {
          authorsMap.set(nextExpertId, { ...e, id: nextExpertId });
          nextExpertId++;
        }

        setAuthors(authorsMap);
        setDiscussions(discussionsData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setLoading(false);
      }
    }

    loadData();
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft' && currentWeek > 1) {
        setCurrentWeek(currentWeek - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      if (e.key === 'ArrowRight' && currentWeek < 12) {
        setCurrentWeek(currentWeek + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentWeek]);

  if (loading) {
    return (
      <main>
        <div style={{ color: 'var(--muted)' }}>Chargement...</div>
      </main>
    );
  }

  const week = discussions[currentWeek - 1] || discussions.find(d => String(d.semaine) === String(currentWeek));

  return (
    <>
      <main>
        <div className="topo">
          <div className="week-title">
            <h2>Semaine {week?.semaine || currentWeek}</h2>
            <div className="topo-date">{week?.date || ''}</div>
          </div>
          <p className="topo-content">{week?.topo || 'Aucune discussion trouvée pour cette semaine.'}</p>
        </div>

        <section className="messages">
          {week?.messages.map((msg, idx) => {
            const author = authors.get(msg.auteur_id);
            const initials = author
              ? ((author.prenom?.[0] || '') + (author.nom?.[0] || '')).toUpperCase()
              : 'U';
            const fullName = author
              ? `${author.prenom || ''} ${author.nom || ''}`.trim()
              : `Utilisateur #${msg.auteur_id}`;

            return (
              <article key={idx} className="msg">
                <div className="avatar">
                  {author?.image ? (
                    <img src={author.image} alt={fullName} />
                  ) : (
                    initials
                  )}
                </div>
                <div className="meta">
                  <div className="who">
                    {fullName}
                    <span className="time">{msg.heure}</span>
                  </div>
                  <div className="text">{msg.message}</div>
                </div>
              </article>
            );
          })}
        </section>
      </main>

      <div className="weekbar" aria-label="Sélection de la semaine">
        {Array.from({ length: 12 }, (_, i) => i + 1).map((week) => (
          <button
            key={week}
            className={`weekbtn ${week === currentWeek ? 'active' : ''}`}
            onClick={() => {
              setCurrentWeek(week);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            {week}
          </button>
        ))}
      </div>

      <footer />
    </>
  );
}
