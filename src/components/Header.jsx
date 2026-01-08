import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={`container ${styles.container}`}>
                <div className={styles.logo}>
                    <Link href="/">
                        <span className={styles.logoText}>Roa</span>
                        <span className={styles.logoTextBold}>ma</span>
                    </Link>
                </div>

                <nav className={styles.nav}>
                    <ul className={styles.navList}>
                        <li className={styles.navItem}>
                            <Link href="/acheter">Acheter</Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link href="/location-sansfrais-entre-particuliers">Louer</Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link href="/avantages-vendeurs">Vendre</Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link href="/avantages-vendeurs">Estimation</Link>
                        </li>
                    </ul>
                </nav>

                <div className={styles.authButtons}>
                    <Link href="/login" className={styles.loginBtn}>S'identifier</Link>
                    <Link href="/register" className="btn btn-primary">S'inscrire</Link>
                </div>
            </div>
        </header>
    );
}
