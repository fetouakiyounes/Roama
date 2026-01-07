import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={`container ${styles.container}`}>
                <div className={styles.logo}>
                    <Link href="/">
                        <span className={styles.logoText}>self</span>
                        <span className={styles.logoTextBold}>home.lu</span>
                    </Link>
                </div>

                <nav className={styles.nav}>
                    <ul className={styles.navList}>
                        <li className={styles.navItem}>
                            <Link href="#">Acheter</Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link href="#">Louer</Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link href="#">Vendre</Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link href="#">Estimation</Link>
                        </li>
                    </ul>
                </nav>

                <div className={styles.authButtons}>
                    <button className={styles.loginBtn}>S'identifier</button>
                    <button className="btn btn-primary">S'inscrire</button>
                </div>
            </div>
        </header>
    );
}
