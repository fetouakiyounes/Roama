"use client";

import Link from 'next/link';
import { useSession, signOut } from "next-auth/react";
import styles from './Header.module.css';

export default function Header() {
    const { data: session } = useSession();

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
                    {session ? (
                        <>
                            <Link href="/mon-compte" className={styles.loginBtn}>Mon Compte</Link>
                            <button onClick={() => signOut()} className="btn btn-primary">Déconnexion</button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className={styles.loginBtn}>S'identifier</Link>
                            <Link href="/register" className="btn btn-primary">S'inscrire</Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
