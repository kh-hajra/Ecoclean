import React, { useState } from "react";
import { forgotPassword } from "../services/auth.service";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");
        try {
            const response = await forgotPassword({ email });
            setMessage(response.message);
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
                <h1 className="text-2xl font-bold text-gray-700 text-center mb-4">
                    Forgot Password
                </h1>
                <p className="text-gray-500 text-center mb-6">
                    Enter your email to receive a reset link.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Send Reset Link
                    </button>
                </form>
                {message && (
                    <p className="text-green-500 text-center mt-4">{message}</p>
                )}
                {error && (
                    <p className="text-red-500 text-center mt-4">{error}</p>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
