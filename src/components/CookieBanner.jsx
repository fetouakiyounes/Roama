"use client";
import { useState, useEffect } from 'react';
import styles from './CookieBanner.module.css';

export default function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if previously accepted
        const accepted = localStorage.getItem('cookies-accepted');
        if (!accepted) {
            setIsVisible(true);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('cookies-accepted', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className={styles.banner}>
            <div className={styles.content}>
                <p>
                    Nous utilisons des cookies pour vous garantir la meilleure expérience sur notre site web.
                    Si vous continuez à utiliser ce site, nous supposerons que vous en êtes satisfait.
                </p>
                <div className={styles.actions}>
                    <button onClick={acceptCookies} className={styles.acceptBtn}>OK</button>
                    <button onClick={() => setIsVisible(false)} className={styles.closeBtn}>×</button>
                </div>
            </div>
        </div>
    );
}
