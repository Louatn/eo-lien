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
				<h1>Conférence Citoyenne sur la Transition Énergétique</h1>
				<p className="summary-subtitle">Rapport Final de Synthèse et Recommandations</p>
				<div className="summary-meta">
					<p><strong>Date de remise :</strong> 12 Décembre 2024</p>
					<p><strong>Objet :</strong> Conclusions des travaux sur l'acceptabilité et le déploiement de l'éolien terrestre.</p>
					<p><strong>Destinataire :</strong> Ministère de la Transition Écologique / Pouvoirs Publics.</p>
				</div>
			</header>

			<section className="summary-content">
				<article className="summary-section">
					<h2>1. Synthèse Exécutive</h2>
					<p>
						Réunie durant douze semaines, la Conférence de Consensus a rassemblé un panel hétérogène composé de citoyens, d'élus locaux, d'ingénieurs et d'experts environnementaux. L'objectif initial était de dépasser la polarisation du débat public autour de l'énergie éolienne.
					</p>
					<p>
						Il ressort de ces travaux que le blocage actuel n'est pas d'ordre technologique, mais démocratique. Si la nécessité de l'éolien est désormais admise par la majorité du panel comme complément indispensable au nucléaire, son mode de déploiement "descendant" est rejeté.
					</p>
					<p>
						Le présent rapport préconise une refonte complète de la gouvernance des projets via quatre leviers majeurs : la fin de l'opposition stérile entre les énergies, la sanctuarisation stricte de la biodiversité, l'instauration d'un pouvoir de contrôle citoyen contraignant (Étude d'Acceptabilité Sociale) et l'obligation de retombées économiques locales directes.
					</p>
				</article>

				<article className="summary-section">
					<h2>2. Dynamique des Débats et Évolution du Panel</h2>
					<p>
						L'analyse des échanges démontre une maturation significative des positions individuelles au fil des sessions, passant de la défiance à la co-construction.
					</p>
					
					<h3>2.1. De la défiance technique à la validation factuelle</h3>
					<p>
						En début de cycle, le panel était marqué par des clivages forts, certains participants qualifiant l'éolien de « gadget » inutile ou percevant son développement comme une menace idéologique pour la filière nucléaire. L'intervention des experts techniques a permis de lever ces préjugés en démontrant la réalité des volumes de production et la complémentarité technique nécessaire entre la base nucléaire pilotable et l'appoint éolien. Ce consensus technique a constitué le socle nécessaire à la poursuite des débats.
					</p>

					<h3>2.2. La prise de conscience de la fracture territoriale</h3>
					<p>
						La présentation des retombées fiscales pour les communes a provoqué une seconde rupture dans les débats. Si certains participants ont vu dans l'apport financier un motif légitime d'acceptation, d'autres ont vivement dénoncé une logique de "compensation" jugée insuffisante face à la perte de qualité de vie et au sentiment d'impuissance des riverains. Le groupe a alors convenu que l'acceptabilité ne pouvait s'acheter, mais devait se construire par le partage du pouvoir décisionnel.
					</p>

					<h3>2.3. Vers une posture de "Vigilance Constructive"</h3>
					<p>
						En phase finale, les postures d'opposition systématique ont laissé place à une volonté de régulation. Des participants initialement hostiles ont déclaré être prêts à accepter le déploiement de la filière, sous réserve de l'application stricte des mécanismes de contrôle proposés ci-après.
					</p>
				</article>

				<article className="summary-section">
					<h2>3. Recommandations Opérationnelles : Le "Nouveau Pacte"</h2>
					<p>
						Le panel soumet aux autorités quatre recommandations structurantes, désignées comme les "Piliers du Consensus".
					</p>

					<div className="recommendation">
						<h3>Recommandation N°1 : Consolidation d'un Mix Énergétique Hybride</h3>
						<p>
							Le rapport appelle à cesser d'opposer les filières de production décarbonées. La stratégie nationale doit explicitement reconnaître la nécessité conjointe du maintien du parc nucléaire pour la stabilité du réseau et du développement massif des énergies renouvelables pour la diversification et l'économie des ressources.
						</p>
					</div>

					<div className="recommendation">
						<h3>Recommandation N°2 : Sanctuarisation des Espaces Naturels (Zones d'Exclusion Absolue)</h3>
						<p>
							Afin de garantir que la transition énergétique ne se fasse pas au détriment de la biodiversité, il est demandé d'inscrire dans la loi des Zones d'Exclusion Absolue (ZEA). Ces zones, incluant les parcs naturels et les couloirs de migration avérés, doivent être juridiquement inconstructibles, sans possibilité de dérogation préfectorale ou de compensation financière.
						</p>
					</div>

					<div className="recommendation">
						<h3>Recommandation N°3 : Instauration d'un Mécanisme de Régulation Sociale (EAS)</h3>
						<p>
							Pour répondre à la demande de démocratie locale, le panel recommande de rendre obligatoire, en amont de tout dépôt de permis, une Étude d'Acceptabilité Sociale (EAS).
						</p>
						<ul>
							<li><strong>Modalités :</strong> Cette étude doit être financée par l'opérateur mais pilotée par un tiers indépendant choisi par la collectivité.</li>
							<li><strong>Contrainte :</strong> Elle doit inclure un seuil de rejet rédhibitoire. Si l'étude démontre une opposition massive et argumentée, le projet doit être suspendu pour révision.</li>
							<li><strong>Contre-expertise :</strong> Un droit à la contre-expertise technique (acoustique, paysagère) citoyenne doit être garanti.</li>
						</ul>
					</div>

					<div className="recommendation">
						<h3>Recommandation N°4 : Actionnariat Local et Redistribution Territoriale</h3>
						<p>
							Afin de transformer les riverains en partenaires, le rapport préconise la mise en place d'une Participation Locale Minimale (PLM). Tout projet industriel éolien devra proposer l'ouverture d'au moins 25% de son capital aux collectivités et aux citoyens résidents. Par ailleurs, la fiscalité générée devra être répartie équitablement entre la commune d'implantation et les communes limitrophes impactées visuellement.
						</p>
					</div>
				</article>

				<article className="summary-section">
					<h2>4. Points de Divergence et Réserves</h2>
					<p>
						Le présent rapport tient à souligner qu'un arbitrage n'a pu être tranché de manière unanime concernant la hiérarchisation entre performance énergétique et impact paysager.
					</p>
					<p>
						Une partie du panel (experts, opérateurs) suggère que des dérogations aux critères esthétiques puissent être accordées pour des sites présentant un gisement éolien exceptionnel, au nom de l'intérêt supérieur du réseau. Cette position fait l'objet d'une réserve formelle de la part des représentants des riverains, qui estiment que le rendement ne saurait justifier une atteinte irréversible au cadre de vie des habitations situées à moins de 1000 mètres.
					</p>
				</article>

				<article className="summary-section">
					<h2>5. Conclusion</h2>
					<p>
						Les travaux de cette conférence démontrent que la population est prête à soutenir une accélération de la transition énergétique, à la condition expresse que celle-ci ne soit pas imposée verticalement. Le "Pacte" proposé ici substitue à la logique du conflit celle du contrat : un contrat de confiance, de protection de la nature et de partage équitable de la valeur.
					</p>
				</article>

				<article className="summary-section vote-section">
					<h2>6. Arbitrage et Vote de Clôture</h2>
					<p>
						Afin de sceller la position du groupe sur la question centrale ayant animé les débats, il a été procédé à un vote final portant sur la stratégie de complémentarité énergétique. L'objectif était de valider formellement l'abandon de l'opposition binaire entre les deux filières.
					</p>

					<div className="vote-question">
						<h3>La Question Soumise au Vote :</h3>
						<p>
							« Approuvez-vous la définition d'un mix énergétique national fondé sur la coexistence pérenne du nucléaire (socle pilotable) et de l'éolien (développement complémentaire), telle que définie dans la Recommandation n°1 ? »
						</p>
					</div>

					<div className="vote-details">
						<h4>Détail du scrutin (à main levée) :</h4>
						<ul>
							<li>Membres présents : <strong>9</strong></li>
							<li>Abstentions : <strong>0</strong></li>
							<li>Suffrages exprimés : <strong>9</strong></li>
						</ul>
					</div>

					<div className="vote-results">
						<h4>Résultat final :</h4>
						<div className="vote-result-item vote-pour">
							<span className="vote-label">POUR la coexistence (Adoption du modèle hybride) :</span>
							<span className="vote-count">7 voix</span>
						</div>
						<div className="vote-result-item vote-contre">
							<span className="vote-label">CONTRE la coexistence :</span>
							<span className="vote-count">2 voix</span>
						</div>
					</div>

					<div className="vote-analysis">
						<h4>Analyse et proclamation :</h4>
						<p className="vote-proclamation">
							La motion est <strong>ADOPTÉE</strong> à la majorité absolue (78 % des voix).
						</p>
						<p>
							Le modèle de la coexistence l'emporte. L'analyse des deux votes "Contre" révèle qu'ils émanent de positions divergentes : un membre privilégiant une sortie accélérée du nucléaire, et un autre estimant que l'éolien reste trop impactant pour les paysages ruraux. Néanmoins, avec 7 voix favorables sur 9, le groupe envoie un signal fort : le consensus sur la nécessité d'allier les deux énergies est désormais majoritaire et solide.
						</p>
					</div>
				</article>

				<footer className="summary-footer">
					<p><em>Document validé par l'ensemble des parties prenantes.</em></p>
					<p><em>Fait à Rosporden, le 24/08</em></p>
				</footer>
			</section>
		</main>
	);
}
