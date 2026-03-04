import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    collection,
    getDocs,
    query,
    where,
    orderBy,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../lib/auth";
import type { Election, Vote } from "../lib/types";

export function VoterDashboard() {
    const { user, profile } = useAuth();
    const [elections, setElections] = useState<Election[]>([]);
    const [votes, setVotes] = useState<Vote[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user || !profile || !db) return;
        async function fetchData() {
            try {
                // Fetch elections for voter's place
                const eq = query(
                    collection(db!, "elections"),
                    where("place", "==", profile!.place.toLowerCase()),
                    orderBy("startTime", "desc")
                );
                const eSnap = await getDocs(eq);
                const elecs = eSnap.docs.map(
                    (d) => {
                        const data = d.data() as Omit<Election, "id">;
                        const now = Date.now();
                        let status = data.status;
                        if (status !== "completed") {
                            if (now < data.startTime) status = "upcoming";
                            else if (now <= data.endTime) status = "active";
                            else status = "completed";
                        }
                        return { ...data, id: d.id, status } as Election;
                    }
                );
                setElections(elecs);

                // Fetch voter's votes
                const vq = query(
                    collection(db!, "votes"),
                    where("voterId", "==", user!.uid)
                );
                const vSnap = await getDocs(vq);
                setVotes(
                    vSnap.docs.map((d) => ({ id: d.id, ...d.data() } as Vote))
                );
            } catch (err) {
                console.error("Error fetching voter data:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [user, profile]);

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-16 text-center text-gray-400">
                Loading voter dashboard...
            </div>
        );
    }

    const votedElectionIds = new Set(votes.map((v) => v.electionId));
    const activeElections = elections.filter((e) => e.status === "active");
    const pastElections = elections.filter(
        (e) => e.status === "completed"
    );
    const upcomingElections = elections.filter(
        (e) => e.status === "upcoming"
    );

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Voter Dashboard</h1>
                <p className="text-gray-500 text-sm">
                    Welcome, {profile?.name}. Location: {profile?.place}
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                    {
                        label: "Elections Participated",
                        value: votes.length,
                        color: "bg-indigo-50 text-indigo-700",
                    },
                    {
                        label: "Active Elections",
                        value: activeElections.length,
                        color: "bg-green-50 text-green-700",
                    },
                    {
                        label: "Upcoming Elections",
                        value: upcomingElections.length,
                        color: "bg-amber-50 text-amber-700",
                    },
                    {
                        label: "Past Elections",
                        value: pastElections.length,
                        color: "bg-gray-50 text-gray-700",
                    },
                ].map((s) => (
                    <div
                        key={s.label}
                        className={`rounded-2xl p-4 ${s.color} border`}
                    >
                        <p className="text-2xl font-bold">{s.value}</p>
                        <p className="text-xs font-medium mt-1">{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Active Elections */}
            {activeElections.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-lg font-bold text-gray-900 mb-3">
                        🗳️ Active Elections — Cast Your Vote
                    </h2>
                    <div className="space-y-3">
                        {activeElections.map((e) => (
                            <div
                                key={e.id}
                                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex justify-between items-center"
                            >
                                <div>
                                    <p className="font-bold text-gray-900">{e.title}</p>
                                    <p className="text-sm text-gray-500">
                                        {e.position} • Ends: {new Date(e.endTime).toLocaleString()}
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    {votedElectionIds.has(e.id) ? (
                                        <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1.5 rounded-full border border-green-200">
                                            ✓ Voted
                                        </span>
                                    ) : (
                                        <Link
                                            to={`/elections/${e.id}`}
                                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
                                        >
                                            Vote Now →
                                        </Link>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Voting History */}
            <section className="mb-8">
                <h2 className="text-lg font-bold text-gray-900 mb-3">
                    Voting History
                </h2>
                {votes.length === 0 ? (
                    <div className="text-center py-8 text-gray-400 bg-white rounded-2xl border border-gray-100">
                        You haven't voted in any elections yet.
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="text-left px-5 py-3 font-medium text-gray-500">
                                        Election
                                    </th>
                                    <th className="text-left px-5 py-3 font-medium text-gray-500">
                                        Status
                                    </th>
                                    <th className="text-left px-5 py-3 font-medium text-gray-500">
                                        Voted On
                                    </th>
                                    <th className="px-5 py-3"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {votes.map((v) => {
                                    const elec = elections.find(
                                        (e) => e.id === v.electionId
                                    );
                                    return (
                                        <tr key={v.id} className="hover:bg-gray-50">
                                            <td className="px-5 py-3 font-medium text-gray-900">
                                                {elec?.title ?? v.electionId}
                                            </td>
                                            <td className="px-5 py-3">
                                                <span className="text-xs font-semibold bg-green-50 text-green-600 px-2 py-0.5 rounded-full">
                                                    ✓ Voted
                                                </span>
                                            </td>
                                            <td className="px-5 py-3 text-gray-500">
                                                {new Date(v.votedAt).toLocaleString()}
                                            </td>
                                            <td className="px-5 py-3">
                                                <Link
                                                    to={`/elections/${v.electionId}`}
                                                    className="text-indigo-600 hover:underline text-xs"
                                                >
                                                    View Results
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>

            {/* All Elections */}
            <section>
                <h2 className="text-lg font-bold text-gray-900 mb-3">
                    All Elections in {profile?.place}
                </h2>
                {elections.length === 0 ? (
                    <div className="text-center py-8 text-gray-400 bg-white rounded-2xl border border-gray-100">
                        No elections available for your location.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {elections.map((e) => {
                            const statusStyles: Record<string, string> = {
                                upcoming: "bg-amber-100 text-amber-700",
                                active: "bg-green-100 text-green-700",
                                completed: "bg-gray-100 text-gray-600",
                            };
                            return (
                                <Link
                                    key={e.id}
                                    to={`/elections/${e.id}`}
                                    className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all"
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-semibold text-gray-900">
                                                {e.title}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {e.position}
                                            </p>
                                        </div>
                                        <span
                                            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusStyles[e.status] ?? ""
                                                }`}
                                        >
                                            {e.status}
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </section>
        </div>
    );
}
