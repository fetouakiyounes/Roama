"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Optimized images
import styles from './NewListings.module.css';

export default function NewListings() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch('/api/properties');
        if (res.ok) {
          const data = await res.json();
          // Take first 3 or 6 items
          setProperties(data.slice(0, 6));
        }
      } catch (error) {
        console.error("Failed to fetch listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return (
      <section className={`section ${styles.listingsSection}`}>
        <div className="container">
          <div className={styles.header}>
            <span className={styles.subTitle}>VENTES / LOCATIONS</span>
            <h2 className={styles.title}>CHARGEMENT...</h2>
          </div>
          <div className={styles.grid}>
            {[1, 2, 3].map(i => (
              <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-lg"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`section ${styles.listingsSection}`}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.subTitle}>VENTES / LOCATIONS</span>
          <h2 className={styles.title}>NOUVEAUTÉS</h2>
        </div>

        <div className={styles.grid}>
          {properties.map((property) => (
            <div key={property._id} className={styles.card}>
              <Link href={`/properties/${property._id}`} className={styles.imageWrapper}>
                {property.isFeatured && <div className={styles.badge}>⚡</div>}
                <div className={styles.price}>{property.price.toLocaleString()} MAD</div>

                {/* Use Image component or fallback suitable for CSS modules if needed. 
                    Standard img for simplicity with existing CSS, or Next/Image with fill.
                */}
                <div className="relative w-full h-full">
                  <img
                    src={property.images[0] || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"}
                    alt={property.title}
                    className={styles.image}
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                </div>

                <div className={styles.cardOverlay}>
                  <div className={styles.typeIcon}>🏠</div>
                  <div className={styles.overlayInfo}>
                    <h3>{property.type === 'sale' ? 'Vente' : 'Location'} {property.propertyType}</h3>
                    <p>📍 {property.location.city}</p>
                  </div>
                </div>
              </Link>

              <div className={styles.details}>
                <div className={styles.detailItem}>
                  <span>📏</span>
                  <span>{property.area} m²</span>
                </div>
                <div className={styles.detailItem}>
                  <span>🛏️</span>
                  <span>{property.bedrooms}</span>
                </div>
                <div className={styles.detailItem}>
                  <span>🛁</span>
                  <span>{property.bathrooms}</span>
                </div>
              </div>

              <div className={styles.actions}>
                <Link href={`/properties/${property._id}`} className={styles.actionBtn}>🔍</Link>
                <button className={styles.actionBtn}>❤️</button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.loadMore}>
          <Link href="/properties" className={styles.loadMoreBtn}>Charger plus d'annonces</Link>
        </div>

        <div className={styles.categoryButtons}>
          <Link href="/properties?type=sale" className={styles.catBtn}>🔍 Voir les biens en vente</Link>
          <Link href="/properties?type=rent" className={styles.catBtn}>🔍 Voir les biens en location</Link>
        </div>
      </div>
    </section>
  );
}
