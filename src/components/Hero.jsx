"use client";
import { useState } from 'react';
import styles from './Hero.module.css';

export default function Hero() {
    const [activeTab, setActiveTab] = useState('vente'); // 'vente' or 'location'

    const handleLocationClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                alert(`Position trouvée: ${position.coords.latitude}, ${position.coords.longitude}`);
                // In a real app, we'd reverse geocode this to a city name
            }, () => {
                alert("Impossible de récupérer votre position.");
            });
        } else {
            alert("La géolocalisation n'est pas supportée par votre navigateur.");
        }
    };

    return (
        <section className={styles.hero}>
            <div className={`container ${styles.container}`}>
                <h1 className={styles.title}>
                    Le portail n°1 de l’immobilier<br />au Maroc
                </h1>
                <div className={styles.subtitle}>
                    ENTRE PARTICULIERS
                </div>

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
                            <label>Type de biens</label>
                            <select className={styles.select}>
                                <option>Appartement</option>
                                <option>Maison / villa</option>
                                <option>Terrain</option>
                                <option>Garage</option>
                                <option>Bureau</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Localité</label>
                            <div style={{ position: 'relative' }}>
                                <input type="text" placeholder="Localité" className={styles.input} />
                                <button
                                    onClick={handleLocationClick}
                                    style={{
                                        position: 'absolute',
                                        right: '10px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        border: 'none',
                                        background: 'none',
                                        cursor: 'pointer',
                                        fontSize: '1.2rem',
                                        color: '#666'
                                    }}
                                    title="Ma position"
                                >
                                    📍
                                </button>
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Proximité 2km</label>
                            {/* Simulating slider */}
                            <input type="range" className={styles.input} />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Prix</label>
                            <div className={styles.rangeInput}>
                                <input type="text" placeholder="0€ - 2,350,000€" className={styles.input} />
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
