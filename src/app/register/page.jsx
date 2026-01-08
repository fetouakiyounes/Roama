"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
        <div className="flex flex-col min-h-screen bg-[#F9F9F9]">
            <Header />
            <div className="flex-grow flex items-center justify-center py-20 px-4">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-[#EAEAEA]">
                    <h1 className="text-3xl font-bold mb-8 text-center text-[#3C3C3B] font-[family-name:var(--font-heading)]">Créer un compte</h1>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <input
                            type="text"
                            placeholder="Nom d'utilisateur"
                            required
                            className="w-full border border-gray-300 px-4 py-3 rounded focus:outline-none focus:border-[#ED6C63] focus:ring-1 focus:ring-[#ED6C63] text-[#242429]"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            required
                            className="w-full border border-gray-300 px-4 py-3 rounded focus:outline-none focus:border-[#ED6C63] focus:ring-1 focus:ring-[#ED6C63] text-[#242429]"
                        />
                        <input
                            type="password"
                            placeholder="Mot de passe"
                            required
                            className="w-full border border-gray-300 px-4 py-3 rounded focus:outline-none focus:border-[#ED6C63] focus:ring-1 focus:ring-[#ED6C63] text-[#242429]"
                        />

                        {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}

                        <button
                            type="submit"
                            className="w-full bg-[#ED6C63] text-white font-bold py-3 rounded hover:bg-[#fa8e86] transition-colors duration-200 mt-2"
                        >
                            S'inscrire
                        </button>
                    </form>
                    <div className="text-center mt-6 text-[#7E7E7E] text-sm">
                        Vous avez déjà un compte ?{" "}
                        <Link href="/login" className="text-[#ED6C63] font-semibold hover:underline">
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
