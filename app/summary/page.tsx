export default function SummaryPage({
	searchParams,
}: {
	searchParams?: Record<string, string | string[] | undefined>;
}) {
	const semaineParam = Array.isArray(searchParams?.semaine)
		? searchParams?.semaine[0]
		: searchParams?.semaine;
	const dateParam = Array.isArray(searchParams?.date)
		? searchParams?.date[0]
		: searchParams?.date;

	const semaine = semaineParam || '1';

	return (
		<main className="summary">
			<header className="summary-header">
				<h1>Résumé de semaine {semaine}</h1>
				<p className="summary-description">
					<em>
						{dateParam
							? `Cette page présente un résumé des échanges du ${dateParam}.`
							: `Cette page présente un résumé des échanges de la semaine ${semaine}.`}
					</em>
				</p>
			</header>

			<section className="summary-content">
				<p>
					Contenu du résumé. Ajoutez ici les points clés, les décisions, les
					divergences d’opinion et toute information pertinente synthétisant la
					discussion de la semaine.
				</p>
			</section>
		</main>
	);
}

