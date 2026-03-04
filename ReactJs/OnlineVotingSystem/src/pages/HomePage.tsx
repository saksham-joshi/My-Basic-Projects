import { Link } from "react-router-dom";
import { useAuth } from "../lib/auth";
import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../lib/firebase";
import type { Election } from "../lib/types";
import { AshokaEmblemBlack, ElectionCommission } from "../lib/img";

function StatusBadge({ status }: { status: Election["status"] }) {
    const styles = {
        upcoming: "bg-amber-100 text-amber-700",
        active: "bg-green-100 text-green-700",
        completed: "bg-gray-100 text-gray-600",
    };
    return (
        <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${styles[status]}`}
        >
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
}

export function HomePage() {
    const { user, profile } = useAuth();
    const [elections, setElections] = useState<Election[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchElections() {
            try {
                const q = query(
                    collection(db, "elections"),
                    orderBy("createdAt", "desc"),
                    limit(6)
                );
                const snap = await getDocs(q);
                setElections(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Election)));
            } catch (err) {
                console.error("Error fetching elections:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchElections();
    }, []);

    return (
        <div>
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[#FF9933] to-[#128807] text-white">
                <div className="absolute inset-0 ">
                    <img
                        src={AshokaEmblemBlack}
                        alt="Ashoka Emblem"
                        className="absolute right-[-5%] top-[-10%] w-[500px] opacity-40 rotate-12"
                    />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-6">
                            <img
                                src={ElectionCommission}
                                alt="ECI Logo"
                                className="h-14 w-auto bg-white rounded-lg p-1.5"
                            />
                            <span className="text-cyan-600 text-sm font-medium">
                                Election Commission of India
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
                            Online Voting
                            <br />
                            <span className="text-cyan-200">System</span>
                        </h1>
                        <p className="text-lg text-indigo-100 mb-8 max-w-lg">
                            A transparent, secure, and accessible digital platform for
                            conducting free and fair elections across India.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {user && profile ? (
                                <Link
                                    to={`/dashboard/${profile.role}`}
                                    className="inline-flex items-center px-6 py-3 bg-white text-indigo-700 font-semibold rounded-xl hover:bg-indigo-50 transition-colors shadow-lg"
                                >
                                    Go to Dashboard →
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="inline-flex items-center px-6 py-3 bg-white text-cyan-600 font-semibold rounded-xl hover:bg-indigo-50 transition-colors shadow-lg"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="inline-flex items-center px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
                                    >
                                        Create Voter Account
                                    </Link>
                                </>
                            )}
                            <Link
                                to="/elections"
                                className="inline-flex items-center px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
                            >
                                View All Elections
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                    How It Works
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {
                            icon: "🗳️",
                            title: "Voters",
                            desc: "Register with your Aadhar & Voter ID, cast your vote securely in any eligible election.",
                        },
                        {
                            icon: "🏛️",
                            title: "Candidates",
                            desc: "Apply to participate in elections with verified credentials. Track your candidature status.",
                        },
                        {
                            icon: "⚙️",
                            title: "Administrators",
                            desc: "Create & manage elections, verify candidates, control election lifecycle.",
                        },
                    ].map((f) => (
                        <div
                            key={f.title}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                        >
                            <span className="text-3xl mb-3 block">{f.icon}</span>
                            <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                            <p className="text-sm text-gray-500">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Recent Elections */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-20">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Recent Elections
                    </h2>
                    <Link
                        to="/elections"
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                    >
                        View all →
                    </Link>
                </div>
                {loading ? (
                    <div className="text-center py-12 text-gray-400">
                        Loading elections...
                    </div>
                ) : elections.length === 0 ? (
                    <div className="text-center py-12 text-gray-400 bg-white rounded-2xl border border-gray-100">
                        No elections found. Check back later.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {elections.map((e) => (
                            <Link
                                key={e.id}
                                to={`/elections/${e.id}`}
                                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                        {e.title}
                                    </h3>
                                    <StatusBadge status={e.status} />
                                </div>
                                <p className="text-sm text-gray-500 mb-2">
                                    <span className="font-medium">Position:</span> {e.position}
                                </p>
                                <p className="text-sm text-gray-500 mb-2">
                                    <span className="font-medium">Location:</span> {e.place}
                                </p>
                                <p className="text-xs text-gray-400">
                                    {new Date(e.startTime).toLocaleDateString()} –{" "}
                                    {new Date(e.endTime).toLocaleDateString()}
                                </p>
                            </Link>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
