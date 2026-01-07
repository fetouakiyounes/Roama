import styles from './Stats.module.css';

export default function Stats() {
    const stats = [
        { value: "+550 000", label: "Visiteurs uniques" },
        { value: "+2 000", label: "Annonces publiées" },
        { value: "+10 000", label: "Messages échangés" }
    ];

    return (
        <section className={styles.statsSection}>
            <div className="container">
                <div className={styles.grid}>
                    {stats.map((stat, index) => (
                        <div key={index} className={styles.item}>
                            <div className={styles.value}>{stat.value}</div>
                            <div className={styles.label}>{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
