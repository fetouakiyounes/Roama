"use client";

import { useState } from "react"; // Removed useEffect import
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
        <div className="flex flex-col min-h-screen bg-[#F9F9F9]">
            <Header />
            <div className="flex-grow flex items-center justify-center py-20 px-4">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-[#EAEAEA]">
                    <h1 className="text-3xl font-bold mb-8 text-center text-[#3C3C3B] font-[family-name:var(--font-heading)]">Se Connecter</h1>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
                            S'identifier
                        </button>
                    </form>
                    <div className="text-center mt-6 text-[#7E7E7E] text-sm">
                        Vous n'avez pas de compte ?{" "}
                        <Link href="/register" className="text-[#ED6C63] font-semibold hover:underline">
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
