"use client";
import { useState } from 'react';
import styles from './NewListings.module.css';

const MOCK_PROPERTIES = [
  {
    id: 1,
    type: 'Appartement',
    location: 'Casablanca',
    address: 'Racine, Triangle d\'Or',
    price: '6 590 000 MAD',
    area: '175 m²',
    beds: 3,
    baths: 2,
    parking: 2,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop', // Placeholder
    isNew: true
  },
  {
    id: 2,
    type: 'Appartement',
    location: 'Tanger',
    address: 'Vielle Montagne',
    price: '3 670 000 MAD',
    area: '150 m²',
    beds: 2,
    baths: 2,
    parking: 1,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop',
    isNew: true
  },
  {
    id: 3,
    type: 'Villa',
    location: 'Marrakech',
    address: 'Palmeraie',
    price: '12 700 000 MAD',
    area: '670 m²',
    beds: 5,
    baths: 4,
    parking: 4,
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=800&auto=format&fit=crop',
    isNew: true
  },
  {
    id: 4,
    type: 'Appartement',
    location: 'Rabat',
    address: 'Agdal',
    price: '2 850 000 MAD',
    area: '115 m²',
    beds: 2,
    baths: 2,
    parking: 1,
    image: 'https://images.unsplash.com/photo-1502005229766-3c8ef564eeee?q=80&w=800&auto=format&fit=crop',
    isNew: true
  },
  {
    id: 5,
    type: 'Appartement',
    location: 'Fès',
    address: 'Route d\'Immouzer',
    price: '1 490 000 MAD',
    area: '140 m²',
    beds: 3,
    baths: 2,
    parking: 1,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop',
    isNew: true
  },
  {
    id: 6,
    type: 'Villa',
    location: 'Agadir',
    address: 'Haut Founty',
    price: '4 450 000 MAD',
    area: '340 m²',
    beds: 4,
    baths: 3,
    parking: 2,
    image: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?q=80&w=800&auto=format&fit=crop',
    isNew: true
  }
];

export default function NewListings() {
  return (
    <section className={`section ${styles.listingsSection}`}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.subTitle}>VENTES / LOCATIONS</span>
          <h2 className={styles.title}>NOUVEAUTÉS</h2>
        </div>

        <div className={styles.grid}>
          {MOCK_PROPERTIES.map((property) => (
            <div key={property.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <div className={styles.badge}>⚡</div>
                <div className={styles.price}>{property.price}</div>
                <img src={property.image} alt={property.type} className={styles.image} />
                <div className={styles.cardOverlay}>
                  <div className={styles.typeIcon}>🏠</div>
                  <div className={styles.overlayInfo}>
                    <h3>{property.type} à {property.location}</h3>
                    <p>📍 {property.address}</p>
                  </div>
                </div>
              </div>

              <div className={styles.details}>
                <div className={styles.detailItem}>
                  <span>📏</span>
                  <span>{property.area}</span>
                </div>
                <div className={styles.detailItem}>
                  <span>🛏️</span>
                  <span>{property.beds}</span>
                </div>
                <div className={styles.detailItem}>
                  <span>🛁</span>
                  <span>{property.baths}</span>
                </div>
                <div className={styles.detailItem}>
                  <span>🚗</span>
                  <span>{property.parking}</span>
                </div>
              </div>

              <div className={styles.actions}>
                <button className={styles.actionBtn}>🔍</button>
                <button className={styles.actionBtn}>❤️</button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.loadMore}>
          <button className={styles.loadMoreBtn}>Charger plus d'annonces</button>
        </div>

        <div className={styles.categoryButtons}>
          <button className={styles.catBtn}>🔍 Voir les biens en vente</button>
          <button className={styles.catBtn}>🔍 Voir les biens en location</button>
        </div>
      </div>
    </section>
  );
}
