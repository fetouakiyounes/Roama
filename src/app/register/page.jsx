"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./register.module.css";

const RegisterPage = () => {
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });

            if (res.status === 400) {
                setError("Cet email est déjà enregistré");
            } else if (res.status === 200) {
                setError("");
                router.push("/login");
            } else {
                setError("Erreur, veuillez réessayer");
            }
        } catch (error) {
            setError("Erreur, veuillez réessayer");
            console.log(error);
        }
    };

    return (
        <div className={styles.pageWrapper}>
            <Header />
            <div className={styles.mainContent}>
                <div className={styles.card}>
                    <h1 className={styles.title}>Créer un compte</h1>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <input
                            type="text"
                            placeholder="Nom d'utilisateur"
                            required
                            className={styles.input}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            required
                            className={styles.input}
                        />
                        <input
                            type="password"
                            placeholder="Mot de passe"
                            required
                            className={styles.input}
                        />

                        {error && <p className={styles.error}>{error}</p>}

                        <button
                            type="submit"
                            className={styles.submitBtn}
                        >
                            S'inscrire
                        </button>
                    </form>
                    <div className={styles.footerText}>
                        Vous avez déjà un compte ?{" "}
                        <Link href="/login" className={styles.link}>
                            Se connecter
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default RegisterPage;
