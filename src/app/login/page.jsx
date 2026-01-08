"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./login.module.css";

const LoginPage = () => {
    const [error, setError] = useState("");
    const router = useRouter();
    const { status: sessionStatus } = useSession();

    if (sessionStatus === "authenticated") {
        router.replace("/");
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (res?.error) {
            setError("Identifiants incorrects");
            if (res?.url) router.replace("/");
        } else {
            router.replace("/");
        }
    };

    return (
        <div className={styles.pageWrapper}>
            <Header />
            <div className={styles.mainContent}>
                <div className={styles.card}>
                    <h1 className={styles.title}>Se Connecter</h1>
                    <form onSubmit={handleSubmit} className={styles.form}>
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
                            S'identifier
                        </button>
                    </form>
                    <div className={styles.footerText}>
                        Vous n'avez pas de compte ?{" "}
                        <Link href="/register" className={styles.link}>
                            S'inscrire
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default LoginPage;
