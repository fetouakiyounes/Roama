import styles from './EngagementSection.module.css';

const ITEMS = [
    {
        title: "Publicités sur mesure",
        text: "Nous créons des campagnes ciblées sur les réseaux sociaux pour toucher les acheteurs là où ils se trouvent."
    },
    {
        title: "Contrôle total",
        text: "Suivez les performances de votre annonce en temps réel depuis votre tableau de bord personnel."
    },
    {
        title: "100% Entre particuliers",
        text: "Une expérience humaine et directe. Négociez sans intermédiaire et en toute transparence."
    },
    {
        title: "Simplicité d’usage",
        text: "Une interface pensée pour vous faciliter la vie. Tout est géré en ligne, de la mise en vente à la signature."
    }
];

export default function EngagementSection() {
    return (
        <section className={styles.section}>
            <div className="container">
                <h2 className={styles.heading}>Nos Engagements</h2>
                <div className={styles.grid}>
                    {ITEMS.map((item, idx) => (
                        <div key={idx} className={styles.item}>
                            <div className={styles.bullet}>✓</div>
                            <div>
                                <h4 className={styles.title}>{item.title}</h4>
                                <p className={styles.text}>{item.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
