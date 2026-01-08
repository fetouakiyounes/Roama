import styles from './SeekerCTA.module.css';

export default function SeekerCTA() {
    return (
        <section className={styles.section}>
            <div className={`container ${styles.container}`}>
                <div className={styles.content}>
                    <h2 className={styles.title}>À LA RECHERCHE D'UN LOGEMENT ?</h2>
                    <p className={styles.subtitle}>En s'inscrivant sur Roama, vous pouvez :</p>
                    <ul className={styles.list}>
                        <li><strong>Contacter</strong> directement le propriétaire via notre messagerie sécurisée.</li>
                        <li><strong>Sauvegarder</strong> vos annonces préférées.</li>
                        <li><strong>Suivre</strong> les mises à jour des annonces.</li>
                    </ul>
                </div>
                <div className={styles.action}>
                    <button className={styles.button}>
                        <span className={styles.icon}>≡</span> S'inscrire gratuitement
                    </button>
                </div>
            </div>
        </section>
    );
}
