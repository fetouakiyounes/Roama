import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.container}`}>
                <div className={styles.column}>
                    <h3 className={styles.heading}>Selfhome.lu</h3>
                    <p>Le premier site immobilier sans commission au Luxembourg. Connectez-vous directement avec les propriétaires.</p>
                </div>

                <div className={styles.column}>
                    <h4 className={styles.subHeading}>Liens Rapides</h4>
                    <ul className={styles.list}>
                        <li><a href="#">À propos</a></li>
                        <li><a href="#">Conditions Générales</a></li>
                        <li><a href="#">Politique de Confidentialité</a></li>
                        <li><a href="#">FAQ</a></li>
                    </ul>
                </div>

                <div className={styles.column}>
                    <h4 className={styles.subHeading}>Suivez-nous</h4>
                    <div className={styles.socials}>
                        <a href="#" className={styles.socialLink}>Facebook</a>
                        <a href="#" className={styles.socialLink}>Instagram</a>
                        <a href="#" className={styles.socialLink}>LinkedIn</a>
                    </div>
                </div>
            </div>
            <div className={styles.copyright}>
                <div className="container">
                    &copy; {new Date().getFullYear()} Selfhome.lu - Tous droits réservés.
                </div>
            </div>
        </footer>
    );
}
