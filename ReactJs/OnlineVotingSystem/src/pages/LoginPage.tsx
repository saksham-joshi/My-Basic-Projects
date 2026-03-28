import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { getFriendlyAuthError } from "../lib/firebase-errors";
import type { UserRole } from "../lib/types";
import { ElectionCommission } from "../lib/img";

export function LoginPage() {
    const [role, setRole] = useState<UserRole>("voter");
    const [identifier, setIdentifier] = useState(""); // voterId or aadhar
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            if (!auth) {
                setError(
                    "Firebase is not initialized. Please check your .env values and restart the app."
                );
                setLoading(false);
                return;
            }

            // We use identifier as email format: identifier@role.votingsystem.in
            const email = `${identifier.replace(/\s/g, "")}@${role}.votingsystem.in`;
            await signInWithEmailAndPassword(auth, email, password);
            navigate(`/dashboard/${role}`);
        } catch (err) {
            console.error("Login error:", err);
            setError(getFriendlyAuthError(err, "login"));
        } finally {
            setLoading(false);
        }
    };

    const roleConfig: Record<UserRole, { label: string; idLabel: string; idPlaceholder: string }> = {
        voter: {
            label: "Voter",
            idLabel: "Voter ID",
            idPlaceholder: "Enter your Voter ID",
        },
        admin: {
            label: "Admin",
            idLabel: "Aadhar Card Number",
            idPlaceholder: "Enter your Aadhar number",
        },
        candidate: {
            label: "Candidate",
            idLabel: "Aadhar Card Number",
            idPlaceholder: "Enter your Aadhar number",
        },
    };

    const config = roleConfig[role];

    return (
        <div className="min-h-[calc(100vh-130px)] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <img
                        src={ElectionCommission}
                        alt="ECI"
                        className="h-16 w-auto mx-auto mb-4"
                    />
                    <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Sign in to the Online Voting System
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    {/* Role Selector */}
                    <div className="flex rounded-xl bg-gray-100 p-1 mb-6">
                        {(["voter", "admin", "candidate"] as UserRole[]).map((r) => (
                            <button
                                key={r}
                                onClick={() => {
                                    setRole(r);
                                    setIdentifier("");
                                    setError("");
                                }}
                                className={`flex-1 text-sm font-medium py-2 rounded-lg transition-all capitalize cursor-pointer ${role === r
                                        ? "bg-white text-indigo-600 shadow-sm"
                                        : "text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                {r}
                            </button>
                        ))}
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                {config.idLabel}
                            </label>
                            <input
                                type="text"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                placeholder={config.idPlaceholder}
                                required
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-sm"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 cursor-pointer"
                        >
                            {loading ? "Signing in..." : `Sign in as ${config.label}`}
                        </button>
                    </form>

                    {role === "voter" && (
                        <p className="text-center text-sm text-gray-500 mt-4">
                            Don't have an account?{" "}
                            <Link
                                to="/signup"
                                className="text-indigo-600 hover:text-indigo-700 font-medium"
                            >
                                Create one
                            </Link>
                        </p>
                    )}

                    {role === "admin" && (
                        <p className="text-center text-xs text-gray-400 mt-4">
                            Admin accounts are created by the Election Commission.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
