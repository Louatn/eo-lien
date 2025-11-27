"use client";

import { useEffect, useMemo, useState } from "react";

type Ad = {
  id: string;
  nom: string;
  image: string;
};

export default function AdBanners() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;

    fetch("/data/ad.json")
      .then((res) => res.json())
      .then((data: Ad[]) => {
        if (!isMounted || !data?.length) return;
        setAds(data);
        setCurrentIndex(Math.floor(Math.random() * data.length));
      })
      .catch((err) => console.error("Erreur de chargement des annonces :", err));

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (ads.length < 2) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        let next = prev;
        while (next === prev) {
          next = Math.floor(Math.random() * ads.length);
        }
        return next;
      });
    }, Math.random() * 10000 + 15000);

    return () => clearInterval(interval);
  }, [ads]);

  const currentAd = useMemo(() => ads[currentIndex], [ads, currentIndex]);

  if (!currentAd) return null;

  return (
    <aside className="ad-banner" aria-label="Zone publicitaire dynamique">
      <div className="ad-banner__label">Annonce sponsorisée</div>
      <h3 className="ad-banner__title">{currentAd.nom}</h3>
      <img
        src={currentAd.image}
        alt={currentAd.nom}
        className="ad-banner__image"
      />
    </aside>
  );
    
}
