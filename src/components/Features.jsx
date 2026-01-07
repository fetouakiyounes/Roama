import styles from './Features.module.css';

export default function Features() {
    const features = [
        {
            title: "0% Commission",
            desc: "Aucun frais d'agence. Vous traitez directement avec le propriétaire.",
            icon: "💸"
        },
        {
            title: "Exclusivité",
            desc: "Des annonces uniques que vous ne trouverez nulle part ailleurs.",
            icon: "💎"
        },
        {
            title: "ChatboxIA™",
            desc: "Communiquez facilement et en toute sécurité grâce à notre messagerie intelligente.",
            icon: "💬"
        },
        {
            title: "Communauté",
            desc: "Rejoignez plus de 35 000 utilisateurs actifs sur la plateforme.",
            icon: "👥"
        }
    ];

    return (
        <section className={`section ${styles.featuresSection}`}>
            <div className="container">
                <div className={styles.header}>
                    <h2>Pourquoi choisir Selfhome ?</h2>
                    <p>La solution la plus simple et économique pour votre projet immobilier.</p>
                </div>

                <div className={styles.grid}>
                    {features.map((feature, index) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.icon}>{feature.icon}</div>
                            <h3>{feature.title}</h3>
                            <p>{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
