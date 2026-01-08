"use client";

import { useState } from "react"; // Removed useEffect import
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginPage = () => {
    const [error, setError] = useState("");
    const router = useRouter();
    const { status: sessionStatus } = useSession(); // Corrected sessionStatus usage

    // Handled in middleware but safe to keep for client-side
    if (sessionStatus === "authenticated") {
        router.replace("/");
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
            setError("Invalid email or password");
            if (res?.url) router.replace("/");
        } else {
            router.replace("/");
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="bg-[#212121] p-8 rounded shadow-md w-96">
                <h1 className="text-4xl text-center font-semibold mb-8 text-white">Login</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        className="w-full border border-gray-300 text-black bg-white px-4 py-2 rounded focus:outline-none focus:border-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        className="w-full border border-gray-300 text-black bg-white px-4 py-2 rounded focus:outline-none focus:border-blue-500"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition"
                    >
                        Sign In
                    </button>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </form>
                <div className="text-center mt-4 text-gray-400 text-sm">
                    - OR - {" "}
                    <Link href="/register" className="text-blue-500 hover:underline">
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
