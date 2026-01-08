import styles from './Guides.module.css';

const GUIDES = [
    {
        title: "Guide du vendeur",
        color: "pink",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop" // Placeholder
    },
    {
        title: "Guide de l'acheteur",
        color: "teal",
        image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Guide de location",
        color: "pink",
        image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=800&auto=format&fit=crop"
    }
];

export default function Guides() {
    return (
        <section className={`section ${styles.section}`}>
            <div className="container">
                <div className={styles.header}>
                    <span className={styles.subTitle}>DÉCOUVREZ</span>
                    <h2 className={styles.title}>NOS GUIDES</h2>
                </div>

                <div className={styles.grid}>
                    {GUIDES.map((guide, index) => (
                        <div key={index} className={`${styles.card} ${styles[guide.color]}`}>
                            <div className={styles.cardContent}>
                                <h3 className={styles.cardTitle}>{guide.title.replace('Guide ', 'Guide \n')}</h3>
                                <button className={styles.button}>En savoir plus</button>
                            </div>
                            {/* Decorative shapes to mimic clouds/hills if no image, using simple overlay for now */}
                            <div className={styles.decoration}></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
