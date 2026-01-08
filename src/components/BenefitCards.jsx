"use client";
import styles from './BenefitCards.module.css';
import { MdVisibility, MdSmartToy, MdSavings, MdDescription } from 'react-icons/md';

const BENEFITS = [
    {
        icon: <MdVisibility />,
        title: "Visibilité assurée",
        desc: "Grâce à notre marketing et forte présence au Maroc, votre annonce atteint rapidement une large audience."
    },
    {
        icon: <MdSmartToy />,
        title: "ChatBoxIA™",
        desc: "Notre messagerie sécurisée détecte et bloque automatiquement les agents immobiliers et spams."
    },
    {
        icon: <MdSavings />,
        title: "0% Commission de vente",
        desc: "Dites adieu aux frais d'agence onéreux. Avec Roama, vendez votre bien et conservez 100% du prix."
    },
    {
        icon: <MdDescription />,
        title: "E-Compromis de vente",
        desc: "Nous mettons à disposition le compromis de vente (accompagné d'un guide) contrôlé par nos professionnels."
    }
];

export default function BenefitCards() {
    return (
        <section className={styles.section}>
            <div className="container">
                <h2 style={{ textAlign: 'center', color: '#ED6C63', marginBottom: '40px', fontSize: '2rem', fontFamily: 'var(--font-heading)' }}>
                    Maximisez votre annonce et gardez 100% du prix de vente
                </h2>
                <div className={styles.grid}>
                    {BENEFITS.map((item, idx) => (
                        <div key={idx} className={styles.card}>
                            <div className={styles.iconWrapper}>
                                {item.icon}
                            </div>
                            <h3 className={styles.title}>{item.title}</h3>
                            <p className={styles.desc}>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
