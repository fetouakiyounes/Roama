"use client";
import { useState } from 'react';
import styles from './Hero.module.css';

export default function Hero() {
    const [activeTab, setActiveTab] = useState('vente'); // 'vente' or 'location'

    return (
        <section className={styles.hero}>
            <div className={`container ${styles.container}`}>
                <h1 className={styles.title}>
                    Le n°1 de l’immobilier entre particuliers au Luxembourg
                </h1>
                <p className={styles.subtitle}>
                    Achetez, Vendez, Louez sans commission.
                </p>

                <div className={styles.searchWidget}>
                    <div className={styles.tabs}>
                        <button
                            className={`${styles.tab} ${activeTab === 'vente' ? styles.activeTab : ''}`}
                            onClick={() => setActiveTab('vente')}
                        >
                            À vendre
                        </button>
                        <button
                            className={`${styles.tab} ${activeTab === 'location' ? styles.activeTab : ''}`}
                            onClick={() => setActiveTab('location')}
                        >
                            À louer
                        </button>
                    </div>

                    <div className={styles.searchForm}>
                        <div className={styles.formGroup}>
                            <label>Type de bien</label>
                            <select className={styles.select}>
                                <option>Maison, Appartement...</option>
                                <option>Maison</option>
                                <option>Appartement</option>
                                <option>Terrain</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Localité</label>
                            <input type="text" placeholder="Entrez une localité" className={styles.input} />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Rayon</label>
                            <select className={styles.select}>
                                <option>+ 0 km</option>
                                <option>+ 5 km</option>
                                <option>+ 10 km</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Budget</label>
                            <div className={styles.rangeInput}>
                                <input type="number" placeholder="Min" className={styles.input} />
                                <span>-</span>
                                <input type="number" placeholder="Max" className={styles.input} />
                            </div>
                        </div>

                        <button className={`btn btn-primary ${styles.searchBtn}`}>
                            Chercher
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
