'use client';

import { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';

export default function SummaryPage() {
	const [semaine, setSemaine] = useState('1');

	useEffect(() => {
		const savedWeek = localStorage.getItem('semaineId');
		if (savedWeek) {
			setSemaine(savedWeek);
		}
	}, []);

	return (
<main className="summary">
			<header className="summary-header">
				<BackButton />
				<h1>Résumé de semaine {semaine}</h1>
				<p className="summary-description">
					<em>
						Cette page présente un résumé des échanges de la semaine {semaine}.
					</em>
				</p>
			</header>

			<section className="summary-content">
				<p>
					Contenu du résumé. Ajoutez ici les points clés, les décisions, les
					divergences d'opinion et toute information pertinente synthétisant la
discussion de la semaine.
</p>
</section>
</main>
);
}
