import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    collection,
    getDocs,
    addDoc,
    query,
    where,
    orderBy,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../lib/auth";
import type { Election, Candidate } from "../lib/types";

export function CandidateDashboard() {
    const { user, profile } = useAuth();
    const [candidatures, setCandidatures] = useState<Candidate[]>([]);
    const [elections, setElections] = useState<Election[]>([]);
    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState(false);
    const [message, setMessage] = useState("");
    const [tab, setTab] = useState<"status" | "apply">("status");
    const [form, setForm] = useState({
        electionId: "",
        party: "",
    });

    const fetchData = async () => {
        if (!user || !db) return;
        try {
            // Fetch candidate's applications
            const cq = query(
                collection(db!, "candidates"),
                where("userId", "==", user.uid)
            );
            const cSnap = await getDocs(cq);
            setCandidatures(
                cSnap.docs.map(
                    (d) => ({ id: d.id, ...d.data() } as Candidate)
                )
            );

            // Fetch upcoming/active elections for applying
            const eq = query(
                collection(db!, "elections"),
                where("status", "!=", "completed"),
                orderBy("status"),
                orderBy("startTime", "desc")
            );
            const eSnap = await getDocs(eq);
            setElections(
                eSnap.docs.map(
                    (d) => ({ id: d.id, ...d.data() } as Election)
                )
            );
        } catch (err) {
            console.error("Error fetching candidate data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [user, profile]);

    const handleApply = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !profile || !db) return;

        // Check if candidate already has an active candidature
        const hasActive = candidatures.some(
            (c) => c.status === "approved" || c.status === "pending"
        );
        if (hasActive) {
            setMessage(
                "You already have an active candidature. A candidate can participate in only one election."
            );
            return;
        }

        setApplying(true);
        setMessage("");
        try {
            await addDoc(collection(db!, "candidates"), {
                electionId: form.electionId,
                userId: user.uid,
                name: profile.name,
                aadharCard: profile.aadharCard,
                panCard: profile.panCard ?? "",
                voterId: profile.voterId ?? "",
                party: form.party.trim(),
                status: "pending",
                voteCount: 0,
                appliedAt: Date.now(),
            });
            setForm({ electionId: "", party: "" });
            setMessage("Application submitted! Waiting for admin approval.");
            setTab("status");
            fetchData();
        } catch (err) {
            console.error("Error applying:", err);
            setMessage("Failed to submit application.");
        } finally {
            setApplying(false);
        }
    };

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-16 text-center text-gray-400">
                Loading candidate dashboard...
            </div>
        );
    }

    const availableElections = elections.filter(
        (e) =>
            (e.status === "upcoming" || e.status === "active") &&
            !candidatures.some((c) => c.electionId === e.id)
    );

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                    Candidate Dashboard
                </h1>
                <p className="text-gray-500 text-sm">
                    Welcome, {profile?.name}
                </p>
            </div>

            {message && (
                <div className="mb-4 p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-sm text-indigo-700">
                    {message}
                </div>
            )}

            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b border-gray-200 pb-3">
                {(
                    [
                        ["status", "My Candidatures"],
                        ["apply", "Apply for Election"],
                    ] as [typeof tab, string][]
                ).map(([key, label]) => (
                    <button
                        key={key}
                        onClick={() => {
                            setTab(key);
                            setMessage("");
                        }}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer ${tab === key
                            ? "bg-indigo-600 text-white"
                            : "text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* Candidatures Tab */}
            {tab === "status" && (
                <div className="space-y-3">
                    {candidatures.length === 0 ? (
                        <div className="text-center py-12 text-gray-400 bg-white rounded-2xl border border-gray-100">
                            No candidatures yet.{" "}
                            <button
                                onClick={() => setTab("apply")}
                                className="text-indigo-600 hover:underline cursor-pointer"
                            >
                                Apply for an election
                            </button>
                        </div>
                    ) : (
                        candidatures.map((c) => {
                            const statusStyles: Record<string, string> = {
                                pending: "bg-amber-100 text-amber-700",
                                approved: "bg-green-100 text-green-700",
                                rejected: "bg-red-100 text-red-600",
                            };
                            const elec = elections.find(
                                (el) => el.id === c.electionId
                            );
                            return (
                                <div
                                    key={c.id}
                                    className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-bold text-gray-900">
                                                {elec?.title ?? c.electionId}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {elec?.position} • Party: {c.party}
                                            </p>
                                            {c.status === "approved" && (
                                                <p className="text-sm text-indigo-600 font-medium mt-1">
                                                    Votes received: {c.voteCount}
                                                </p>
                                            )}
                                        </div>
                                        <span
                                            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyles[c.status] ?? ""
                                                }`}
                                        >
                                            {c.status.charAt(0).toUpperCase() +
                                                c.status.slice(1)}
                                        </span>
                                    </div>
                                    {elec && (
                                        <div className="mt-3">
                                            <Link
                                                to={`/elections/${elec.id}`}
                                                className="text-sm text-indigo-600 hover:underline"
                                            >
                                                View Election Results →
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            )}

            {/* Apply Tab */}
            {tab === "apply" && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 max-w-lg">
                    <h2 className="text-lg font-bold text-gray-900 mb-2">
                        Apply for an Election
                    </h2>
                    <p className="text-xs text-gray-400 mb-4">
                        Your credentials (Aadhar: {profile?.aadharCard}, PAN:{" "}
                        {profile?.panCard}, VoterID: {profile?.voterId}) will be
                        sent to the admin for verification.
                    </p>

                    {availableElections.length === 0 ? (
                        <p className="text-gray-400 text-sm">
                            No elections available to apply for currently.
                        </p>
                    ) : (
                        <form onSubmit={handleApply} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Select Election
                                </label>
                                <select
                                    value={form.electionId}
                                    onChange={(e) =>
                                        setForm({ ...form, electionId: e.target.value })
                                    }
                                    required
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none text-sm bg-white"
                                >
                                    <option value="">Choose an election...</option>
                                    {availableElections.map((el) => (
                                        <option key={el.id} value={el.id}>
                                            {el.title} — {el.position} ({el.place})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Party / Affiliation
                                </label>
                                <input
                                    type="text"
                                    value={form.party}
                                    onChange={(e) =>
                                        setForm({ ...form, party: e.target.value })
                                    }
                                    placeholder="e.g., Independent"
                                    required
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none text-sm"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={applying}
                                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 cursor-pointer"
                            >
                                {applying ? "Submitting..." : "Submit Application"}
                            </button>
                        </form>
                    )}
                </div>
            )}
        </div>
    );
}
