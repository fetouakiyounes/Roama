"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from "next/link";

const MonCompte = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    if (status === "loading") {
        return <div className="text-center p-20">Loading...</div>;
    }

    if (status === "authenticated") {
        return (
            <>
                <Header />
                <div className="min-h-screen bg-gray-50 pt-32 pb-10 px-4">
                    <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
                        <h1 className="text-3xl font-bold mb-6 text-gray-800">Mon Compte</h1>
                        <div className="mb-6">
                            <p className="text-lg"><strong>Name:</strong> {session.user.name}</p>
                            <p className="text-lg"><strong>Email:</strong> {session.user.email}</p>
                            <p className="text-lg"><strong>Role:</strong> {session.user.role}</p>
                        </div>

                        {session.user.role === 'admin' && (
                            <Link href="/admin/reservations" className="block w-full text-center bg-blue-600 text-white font-bold py-3 rounded mb-4 hover:bg-blue-700 transition">
                                Go to Admin Dashboard
                            </Link>
                        )}

                        <button
                            onClick={() => signOut({ callbackUrl: '/' })}
                            className="w-full bg-red-500 text-white font-bold py-3 rounded hover:bg-red-600 transition"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return null;
};

export default MonCompte;
