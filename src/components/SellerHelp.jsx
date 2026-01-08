import styles from './SellerHelp.module.css';

export default function SellerHelp() {
    return (
        <section className={styles.section}>
            <div className={`container ${styles.container}`}>
                <div className={styles.imageCol}>
                    <img
                        src="/images/seller_help.png"
                        alt="Besoin d'aide"
                        className={styles.image}
                    />
                </div>
                <div className={styles.contentCol}>
                    <h2 className={styles.title}>BESOIN D'AIDE ?</h2>
                    <div className={styles.buttons}>
                        <button className={styles.faqBtn}>
                            <span className={styles.icon}>?</span> Consultez notre FAQ
                        </button>
                        <button className={styles.contactBtn}>
                            <span className={styles.icon}>✉</span> Contactez nous directement
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
