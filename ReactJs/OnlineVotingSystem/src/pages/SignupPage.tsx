import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import { ElectionCommission } from "../lib/img";

export function SignupPage() {
    const [name, setName] = useState("");
    const [aadharCard, setAadharCard] = useState("");
    const [voterId, setVoterId] = useState("");
    const [place, setPlace] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        if (aadharCard.replace(/\s/g, "").length !== 12) {
            setError("Aadhar card number must be 12 digits.");
            return;
        }
        if (!voterId.trim()) {
            setError("Voter ID is required.");
            return;
        }

        setLoading(true);
        try {
            const email = `${voterId.replace(/\s/g, "")}@voter.votingsystem.in`;
            const userCred = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db, "users", userCred.user.uid), {
                uid: userCred.user.uid,
                role: "voter",
                name: name.trim(),
                aadharCard: aadharCard.replace(/\s/g, ""),
                voterId: voterId.trim(),
                place: place.trim().toLowerCase(),
                createdAt: Date.now(),
            });
            navigate("/dashboard/voter");
        } catch (err: any) {
            console.error("Signup error:", err);
            if (err.code === "auth/email-already-in-use") {
                setError("An account with this Voter ID already exists.");
            } else if (err.code === "auth/weak-password") {
                setError("Password must be at least 6 characters.");
            } else {
                setError("Failed to create account. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-130px)] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <img
                        src={ElectionCommission}
                        alt="ECI"
                        className="h-16 w-auto mx-auto mb-4"
                    />
                    <h1 className="text-2xl font-bold text-gray-900">
                        Create Voter Account
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Register to participate in elections
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your full name"
                                required
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Aadhar Card Number
                            </label>
                            <input
                                type="text"
                                value={aadharCard}
                                onChange={(e) => setAadharCard(e.target.value)}
                                placeholder="XXXX XXXX XXXX"
                                required
                                maxLength={14}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Voter ID
                            </label>
                            <input
                                type="text"
                                value={voterId}
                                onChange={(e) => setVoterId(e.target.value)}
                                placeholder="Enter your Voter ID"
                                required
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Place / Location
                            </label>
                            <input
                                type="text"
                                value={place}
                                onChange={(e) => setPlace(e.target.value)}
                                placeholder="Enter your city / constituency"
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
                                placeholder="At least 6 characters"
                                required
                                minLength={6}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Re-enter your password"
                                required
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-sm"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 cursor-pointer"
                        >
                            {loading ? "Creating Account..." : "Create Account"}
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-500 mt-4">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-indigo-600 hover:text-indigo-700 font-medium"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
