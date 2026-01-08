import styles from './OwnerCTA.module.css';

export default function OwnerCTA() {
    return (
        <section className={styles.section}>
            <div className={`container ${styles.container}`}>
                <div className={styles.content}>
                    <h2 className={styles.title}>PRÊT À VENDRE OU À LOUER VOTRE BIEN?</h2>
                    <p className={styles.text}>
                        Publiez votre annonce en quelques clics et touchez des milliers d'acheteurs ou locataires sans commission d'agence.
                    </p>
                    <p className={styles.highlight}>
                        Simple, sécurisé et sans frais mensuels.
                    </p>
                </div>
                <div className={styles.action}>
                    <button className={styles.button}>
                        <span className={styles.plus}>+</span> Publier maintenant
                    </button>
                </div>
            </div>
        </section>
    );
}
