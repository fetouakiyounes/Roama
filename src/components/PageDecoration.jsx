"use client";
import styles from './PageDecoration.module.css';

export default function PageDecoration() {
    return (
        <div className={styles.decorationContainer}>
            <img
                src="/images/page_decoration.png"
                alt="Illustration"
                className={styles.illustration}
            />
        </div>
    );
}
