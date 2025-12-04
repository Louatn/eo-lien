'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Message {
  auteur_id: number;
  type: 'citizen' | 'expert' | 'master';
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
  type: 'citizen' | 'expert';
  id: number;
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
  const [citizens, setCitizens] = useState<Map<number, Person>>(new Map());
  const [experts, setExperts] = useState<Map<number, Person>>(new Map());
  const [currentAct, setCurrentAct] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [citizensResp, expertsResp, discussionsResp] = await Promise.all([
          fetch('/data/citizens.json'),
          fetch('/data/experts.json'),
          fetch('/data/discussion.json'),
        ]);

        const citizensData: Person[] = await citizensResp.json();
        const expertsData: Person[] = await expertsResp.json();
        const discussionsData: Discussion[] = await discussionsResp.json();

        // Build citizens map
        const citizensMap = new Map<number, Person>();
        for (const c of citizensData) {
          if (c.id) citizensMap.set(c.id, { ...c, type: 'citizen' });
        }

        // Build experts map
        const expertsMap = new Map<number, Person>();
        for (const e of expertsData) {
          if (e.id) expertsMap.set(e.id, { ...e, type: 'expert' });
        }

        setCitizens(citizensMap);
        setExperts(expertsMap);
        setDiscussions(discussionsData);
        
        // Load current week from localStorage
        const savedWeek = localStorage.getItem('semaineId');
        if (savedWeek) {
          const weekNum = parseInt(savedWeek, 10);
          if (weekNum >= 1 && weekNum <= 12) {
            setCurrentAct(weekNum);
          }
        }
        
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
      if (e.key === 'ArrowLeft' && currentAct > 1) {
        setCurrentAct(currentAct - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      if (e.key === 'ArrowRight' && currentAct < 12) {
        setCurrentAct(currentAct + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentAct]);

  // Save current week to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('semaineId', String(currentAct));
  }, [currentAct]);

  if (loading) {
    return (
      <main>
        <div style={{ color: 'var(--muted)' }}>Chargement...</div>
      </main>
    );
  }

  const act = discussions[currentAct - 1] || discussions.find(d => String(d.semaine) === String(currentAct));

  return (<>    
      <main>
        <div className="topo">
          <div className="week-title">
            <h2>Acte {act?.semaine || currentAct}</h2>
            <div className="topo-date">{act?.date || ''}</div>
          </div>
          <p className="topo-content">{act?.topo || 'Aucune discussion trouvée pour cette semaine.'}</p>
        </div>

        <section className="messages">
          {act?.messages.map((msg, idx) => {
            const author = msg.type === 'master'
              ? experts.get(8) || experts.get(msg.auteur_id)
              : msg.type === 'expert'
              ? experts.get(msg.auteur_id)
              : citizens.get(msg.auteur_id);
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
                    {msg.type === 'expert' && (
                      <span className="expert-badge">Expert</span>
                    )}
                    {msg.type === 'master' && (
                      <span className="master-badge">maitre de conference</span>
                    )}
                    <span className="time">{msg.heure}</span>
                  </div>
                  <div className="text">{msg.message}</div>
                </div>
              </article>
            );
          })}
        </section>
      </main>

        <div className="weekbar" aria-label="Sélection de l'acte">
          {[
            { label: '1-4', act: 1 },
            { label: '5-8', act: 2 },
            { label: '9-12', act: 3 },
          ].map((group) => (
            <button
              key={group.label}
              className={`weekbtn ${group.act === currentAct ? 'active' : ''}`}
              onClick={() => {
          setCurrentAct(group.act);
          window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              {group.label}
            </button>
          ))}
          <Link href="/summary">
          <button className="weekbtn">Summary</button>
        </Link>
        </div>
        

      <footer />
    </>
  );
}
