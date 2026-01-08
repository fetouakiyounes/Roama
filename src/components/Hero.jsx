"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Hero.module.css';

export default function Hero() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('vente'); // 'vente' or 'location'
    const [filters, setFilters] = useState({
        type: 'Appartement',
        city: '',
        maxPrice: ''
    });

    const handleSearch = () => {
        const params = new URLSearchParams();
        // Map 'vente'/'location' to 'sale'/'rent'
        params.append('type', activeTab === 'vente' ? 'sale' : 'rent');
        if (filters.city) params.append('city', filters.city);
        if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);

        router.push(`/properties?${params.toString()}`);
    };

    const handleLocationClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                // In a real app, reverse geocode. For now, just alert or fill placeholder
                alert("Position trouvée (Simulation)");
                setFilters({ ...filters, city: 'Casablanca' }); // Simulation
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
                            <select
                                className={styles.select}
                                value={filters.type}
                                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                            >
                                <option value="Appartement">Appartement</option>
                                <option value="Villa">Villa</option>
                                <option value="Maison">Maison</option>
                                <option value="Terrain">Terrain</option>
                                <option value="Bureau">Bureau</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Localité</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="text"
                                    placeholder="Localité"
                                    className={styles.input}
                                    value={filters.city}
                                    onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                                />
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
                            <label>Prix Max</label>
                            <div className={styles.rangeInput}>
                                <input
                                    type="number"
                                    placeholder="Budget Max"
                                    className={styles.input}
                                    value={filters.maxPrice}
                                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                                />
                            </div>
                        </div>

                        <button onClick={handleSearch} className={`btn btn-primary ${styles.searchBtn}`}>
                            Chercher
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
