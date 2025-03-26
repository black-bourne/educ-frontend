"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setToken } from "@/redux/slices/authSlice";

const dataUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";


export default function LoginPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const searchParams = useSearchParams();
    const resetSuccess = searchParams.get("reset") === "success";
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [tempToken, setTempToken] = useState<string | null>(null);
    const [showOtpField, setShowOtpField] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);



    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${dataUrl}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            if (!response.ok) {
                throw new Error("Login failed. Please check your credentials.");
            }
            const data = await response.json();
            setTempToken(data.token);
            setShowOtpField(true);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${dataUrl}/api/auth/verify-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: tempToken, otp }),
            });
            if (!response.ok) {
                throw new Error("Invalid or expired OTP.");
            }
            const data = await response.json();
            dispatch(setToken(data.token));
            const decoded = JSON.parse(atob(data.token.split(".")[1]));
            if (decoded.role === "teacher") {
                router.push("/teacher");
            } else if (decoded.role === "student") {
                router.push("/student");
            } else {
                throw new Error("Unknown role");
            }
        } catch (err: any) {
            setError(err.message);
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
                {!showOtpField && resetSuccess && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-green-600 text-center mb-4"
                    >
                        Password set successfully! Please log in.
                    </motion.p>
                )}
                {error && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-red-500 text-sm mb-4 text-center"
                    >
                        {error}
                    </motion.p>
                )}
                {!showOtpField ? (
                    <form onSubmit={handleLogin}>
                        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1, duration: 0.4 }}
                            className="mb-4"
                        >
                            <label htmlFor="email" className="block text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-indigo-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={loading}
                                required
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.4 }}
                            className="mb-6"
                        >
                            <label htmlFor="password" className="block text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-indigo-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={loading}
                                required
                            />
                        </motion.div>
                        <motion.button
                            type="submit"
                            disabled={loading}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </motion.button>
                    </form>
                ) : (
                    <form onSubmit={handleOtpSubmit}>
                        <h1 className="text-2xl font-bold mb-6 text-center">Verify OTP</h1>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1, duration: 0.4 }}
                            className="mb-6"
                        >
                            <label htmlFor="otp" className="block text-gray-700 mb-1">
                                Enter OTP
                            </label>
                            <input
                                id="otp"
                                type="text"
                                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-indigo-500"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                disabled={loading}
                                required
                            />
                        </motion.div>
                        <motion.button
                            type="submit"
                            disabled={loading}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
                        >
                            {loading ? "Verifying..." : "Verify OTP"}
                        </motion.button>
                    </form>
                )}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="mt-4 text-center"
                >
                    <a href="/auth/reset-email" className="text-indigo-600 hover:underline text-sm">
                        Forgot your password?
                    </a>
                </motion.div>
            </motion.div>
        </div>
    );
}