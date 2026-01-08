import styles from './SellerHero.module.css';

export default function SellerHero() {
    return (
        <section className={styles.hero}>
            <div className={`container ${styles.container}`}>
                <div className={styles.content}>
                    <h1 className={styles.title}>
                        Maximisez votre annonce<br />
                        et gardez <span className={styles.highlight}>100% du prix de vente</span>
                    </h1>
                    <p className={styles.subtitle}>
                        Simple, sécurisé et sans frais mensuels. Publiez votre annonce en quelques clics et touchez des milliers d’acheteurs sans commission d’agence.
                    </p>
                    <button className="btn btn-primary" style={{ padding: '15px 30px', fontSize: '1.1rem' }}>
                        PUBLIER MON ANNONCE
                    </button>
                </div>
                <div className={styles.imageWrapper}>
                    <img
                        src="/images/seller_hero.png"
                        alt="Vendre sans commission"
                        className={styles.heroImage}
                    />
                </div>
            </div>
        </section>
    );
}
