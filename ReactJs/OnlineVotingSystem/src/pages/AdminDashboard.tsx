import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
    query,
    where,
    orderBy,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../lib/auth";
import type { Election, Candidate } from "../lib/types";

export function AdminDashboard() {
    const { user } = useAuth();
    const [elections, setElections] = useState<Election[]>([]);
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [loading, setLoading] = useState(true);
    const [tab, setTab] = useState<"elections" | "candidates" | "create">(
        "elections"
    );
    const [form, setForm] = useState({
        title: "",
        position: "",
        place: "",
        electionId: "",
        startTime: "",
        endTime: "",
    });
    const [creating, setCreating] = useState(false);
    const [message, setMessage] = useState("");

    const fetchData = async () => {
        if (!user) return;
        try {
            // Fetch elections created by this admin
            const eq = query(
                collection(db!, "elections"),
                where("createdBy", "==", user.uid),
                orderBy("createdAt", "desc")
            );
            const eSnap = await getDocs(eq);
            const elecs = eSnap.docs.map(
                (d) => ({ id: d.id, ...d.data() } as Election)
            );
            setElections(elecs);

            // Fetch pending candidates for these elections
            if (elecs.length > 0) {
                const electionIds = elecs.map((e) => e.id);
                // Firestore 'in' query supports max 30 values
                const batch = electionIds.slice(0, 30);
                const cq = query(
                    collection(db!, "candidates"),
                    where("electionId", "in", batch)
                );
                const cSnap = await getDocs(cq);
                setCandidates(
                    cSnap.docs.map(
                        (d) => ({ id: d.id, ...d.data() } as Candidate)
                    )
                );
            }
        } catch (err) {
            console.error("Error fetching admin data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [user]);

    const handleCreateElection = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        setCreating(true);
        setMessage("");
        try {
            const startTime = new Date(form.startTime).getTime();
            const endTime = new Date(form.endTime).getTime();
            if (endTime <= startTime) {
                setMessage("End time must be after start time.");
                setCreating(false);
                return;
            }
            await addDoc(collection(db!, "elections"), {
                title: form.title.trim(),
                position: form.position.trim(),
                place: form.place.trim().toLowerCase(),
                startTime,
                endTime,
                status: "upcoming",
                createdBy: user.uid,
                createdAt: Date.now(),
            });
            setForm({
                title: "",
                position: "",
                place: "",
                electionId: "",
                startTime: "",
                endTime: "",
            });
            setMessage("Election created successfully!");
            setTab("elections");
            fetchData();
        } catch (err) {
            console.error("Error creating election:", err);
            setMessage("Failed to create election.");
        } finally {
            setCreating(false);
        }
    };

    const handleToggleElection = async (
        electionId: string,
        newStatus: "active" | "completed"
    ) => {
        try {
            await updateDoc(doc(db!, "elections", electionId), {
                status: newStatus,
            });
            setMessage(
                `Election ${newStatus === "active" ? "started" : "stopped"} successfully.`
            );
            fetchData();
        } catch (err) {
            console.error("Error updating election:", err);
        }
    };

    const handleApproveCandidate = async (candidateId: string) => {
        try {
            await updateDoc(doc(db!, "candidates", candidateId), {
                status: "approved",
            });
            setMessage("Candidate approved!");
            fetchData();
        } catch (err) {
            console.error("Error approving candidate:", err);
        }
    };

    const handleRejectCandidate = async (candidateId: string) => {
        try {
            await updateDoc(doc(db!, "candidates", candidateId), {
                status: "rejected",
            });
            setMessage("Candidate rejected.");
            fetchData();
        } catch (err) {
            console.error("Error rejecting candidate:", err);
        }
    };

    const handleDeleteCandidate = async (candidateId: string) => {
        try {
            await deleteDoc(doc(db!, "candidates", candidateId));
            setMessage("Candidate removed.");
            fetchData();
        } catch (err) {
            console.error("Error deleting candidate:", err);
        }
    };

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-16 text-center text-gray-400">
                Loading admin dashboard...
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-500 text-sm">Manage elections and candidates</p>
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
                        ["elections", "My Elections"],
                        ["candidates", "Candidate Requests"],
                        ["create", "Create Election"],
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
                        {key === "candidates" && (
                            <span className="ml-1.5 bg-white/20 text-xs px-1.5 py-0.5 rounded-full">
                                {candidates.filter((c) => c.status === "pending").length}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {/* Elections Tab */}
            {tab === "elections" && (
                <div className="space-y-3">
                    {elections.length === 0 ? (
                        <div className="text-center py-12 text-gray-400 bg-white rounded-2xl border border-gray-100">
                            No elections created yet.{" "}
                            <button
                                onClick={() => setTab("create")}
                                className="text-indigo-600 hover:underline cursor-pointer"
                            >
                                Create one
                            </button>
                        </div>
                    ) : (
                        elections.map((e) => {
                            const statusStyles: Record<string, string> = {
                                upcoming: "bg-amber-100 text-amber-700",
                                active: "bg-green-100 text-green-700",
                                completed: "bg-gray-100 text-gray-600",
                            };
                            const electionCandidates = candidates.filter(
                                (c) => c.electionId === e.id && c.status === "approved"
                            );
                            return (
                                <div
                                    key={e.id}
                                    className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <Link
                                                to={`/elections/${e.id}`}
                                                className="font-bold text-gray-900 hover:text-indigo-600 transition-colors"
                                            >
                                                {e.title}
                                            </Link>
                                            <p className="text-sm text-gray-500">
                                                {e.position} • {e.place}
                                            </p>
                                        </div>
                                        <span
                                            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyles[e.status] ?? ""
                                                }`}
                                        >
                                            {e.status}
                                        </span>
                                    </div>
                                    <div className="flex gap-2 flex-wrap mt-3">
                                        {e.status === "upcoming" && (
                                            <button
                                                onClick={() => handleToggleElection(e.id, "active")}
                                                className="px-3 py-1.5 text-xs font-medium bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors cursor-pointer"
                                            >
                                                ▶ Start Election
                                            </button>
                                        )}
                                        {e.status === "active" && (
                                            <button
                                                onClick={() =>
                                                    handleToggleElection(e.id, "completed")
                                                }
                                                className="px-3 py-1.5 text-xs font-medium bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors cursor-pointer"
                                            >
                                                ⏹ Stop Election
                                            </button>
                                        )}
                                        <Link
                                            to={`/elections/${e.id}`}
                                            className="px-3 py-1.5 text-xs font-medium text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50"
                                        >
                                            View Results ({electionCandidates.length} candidates)
                                        </Link>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            )}

            {/* Candidates Tab */}
            {tab === "candidates" && (
                <div className="space-y-3">
                    {candidates.length === 0 ? (
                        <div className="text-center py-12 text-gray-400 bg-white rounded-2xl border border-gray-100">
                            No candidate applications yet.
                        </div>
                    ) : (
                        candidates.map((c) => {
                            const statusStyles: Record<string, string> = {
                                pending: "bg-amber-100 text-amber-700",
                                approved: "bg-green-100 text-green-700",
                                rejected: "bg-red-100 text-red-600",
                            };
                            const elec = elections.find((e) => e.id === c.electionId);
                            return (
                                <div
                                    key={c.id}
                                    className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-bold text-gray-900">{c.name}</p>
                                            <p className="text-sm text-gray-500">
                                                Party: {c.party} • Election: {elec?.title ?? c.electionId}
                                            </p>
                                            <div className="mt-2 flex gap-4 text-xs text-gray-400">
                                                <span>Aadhar: {c.aadharCard}</span>
                                                <span>PAN: {c.panCard}</span>
                                                <span>VoterID: {c.voterId}</span>
                                            </div>
                                        </div>
                                        <span
                                            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyles[c.status] ?? ""
                                                }`}
                                        >
                                            {c.status}
                                        </span>
                                    </div>
                                    {c.status === "pending" && (
                                        <div className="flex gap-2 mt-3">
                                            <button
                                                onClick={() => handleApproveCandidate(c.id)}
                                                className="px-3 py-1.5 text-xs font-medium bg-green-600 hover:bg-green-700 text-white rounded-lg cursor-pointer"
                                            >
                                                ✓ Approve
                                            </button>
                                            <button
                                                onClick={() => handleRejectCandidate(c.id)}
                                                className="px-3 py-1.5 text-xs font-medium bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg cursor-pointer"
                                            >
                                                ✗ Reject
                                            </button>
                                            <button
                                                onClick={() => handleDeleteCandidate(c.id)}
                                                className="px-3 py-1.5 text-xs font-medium bg-red-600 hover:bg-red-700 text-white rounded-lg cursor-pointer"
                                            >
                                                🗑 Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            )}

            {/* Create Election Tab */}
            {tab === "create" && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 max-w-lg">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">
                        Create New Election
                    </h2>
                    <form onSubmit={handleCreateElection} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Election Title
                            </label>
                            <input
                                type="text"
                                value={form.title}
                                onChange={(e) =>
                                    setForm({ ...form, title: e.target.value })
                                }
                                placeholder="e.g., Municipal Corporation Election 2026"
                                required
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Position
                            </label>
                            <input
                                type="text"
                                value={form.position}
                                onChange={(e) =>
                                    setForm({ ...form, position: e.target.value })
                                }
                                placeholder="e.g., Mayor"
                                required
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Place / Location
                            </label>
                            <input
                                type="text"
                                value={form.place}
                                onChange={(e) =>
                                    setForm({ ...form, place: e.target.value })
                                }
                                placeholder="e.g., delhi"
                                required
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none text-sm"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Start Time
                                </label>
                                <input
                                    type="datetime-local"
                                    value={form.startTime}
                                    onChange={(e) =>
                                        setForm({ ...form, startTime: e.target.value })
                                    }
                                    required
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    End Time
                                </label>
                                <input
                                    type="datetime-local"
                                    value={form.endTime}
                                    onChange={(e) =>
                                        setForm({ ...form, endTime: e.target.value })
                                    }
                                    required
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none text-sm"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={creating}
                            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 cursor-pointer"
                        >
                            {creating ? "Creating..." : "Create Election"}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
