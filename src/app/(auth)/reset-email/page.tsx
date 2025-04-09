"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import api from "@/api/axios"; // your configured axios instance

export default function ResetEmailPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setMessage("");
        try {
            await api.post("/api/auth/reset-email", { email });
            setMessage("A reset link has been sent to your email.");
            setTimeout(() => router.push("/login"), 3000);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err: any) {
            setError("Failed to send reset email. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md p-8 bg-white shadow rounded"
            >
                <h1 className="text-2xl font-bold mb-6 text-center">Reset Your Password</h1>
                {error && (
                    <p className="text-red-500 text-center mb-4">{error}</p>
                )}
                {message && (
                    <p className="text-green-600 text-center mb-4">{message}</p>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-indigo-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>
                    <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
                    >
                        {loading ? "Sending..." : "Send Reset Link"}
                    </motion.button>
                </form>
                <div className="mt-4 text-center">
                    <a href="/login" className="text-indigo-600 hover:underline text-sm">
                        Back to Login
                    </a>
                </div>
            </motion.div>
        </div>
    );
}
