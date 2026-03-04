import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    collection,
    getDocs,
    query,
    orderBy,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import type { Election } from "../lib/types";

type FilterTab = "all" | "upcoming" | "active" | "completed";

export function ElectionsPage() {
    const [elections, setElections] = useState<Election[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<FilterTab>("all");

    useEffect(() => {
        async function fetchElections() {
            try {
                const q = query(collection(db, "elections"), orderBy("startTime", "desc"));
                const snap = await getDocs(q);
                const now = Date.now();
                const all = snap.docs.map((d) => {
                    const data = d.data() as Omit<Election, "id">;
                    // Compute live status based on current time
                    let status: Election["status"] = data.status;
                    if (data.status !== "completed") {
                        if (now < data.startTime) status = "upcoming";
                        else if (now >= data.startTime && now <= data.endTime)
                            status = "active";
                        else status = "completed";
                    }
                    return { ...data, id: d.id, status } as Election;
                });
                setElections(all);
            } catch (err) {
                console.error("Error fetching elections:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchElections();
    }, []);

    const filtered =
        filter === "all" ? elections : elections.filter((e) => e.status === filter);

    const statusStyles: Record<string, string> = {
        upcoming: "bg-amber-100 text-amber-700",
        active: "bg-green-100 text-green-700",
        completed: "bg-gray-100 text-gray-600",
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Elections</h1>
                <p className="text-gray-500 mt-1">
                    Browse past, current, and upcoming elections across India.
                </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 mb-6 flex-wrap">
                {(["all", "upcoming", "active", "completed"] as FilterTab[]).map(
                    (tab) => (
                        <button
                            key={tab}
                            onClick={() => setFilter(tab)}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all capitalize cursor-pointer ${filter === tab
                                    ? "bg-indigo-600 text-white"
                                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                                }`}
                        >
                            {tab}
                        </button>
                    )
                )}
            </div>

            {loading ? (
                <div className="text-center py-16 text-gray-400">
                    Loading elections...
                </div>
            ) : filtered.length === 0 ? (
                <div className="text-center py-16 text-gray-400 bg-white rounded-2xl border border-gray-100">
                    No elections found for this filter.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map((e) => (
                        <Link
                            key={e.id}
                            to={`/elections/${e.id}`}
                            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all group"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                    {e.title}
                                </h3>
                                <span
                                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyles[e.status] ?? ""
                                        }`}
                                >
                                    {e.status.charAt(0).toUpperCase() + e.status.slice(1)}
                                </span>
                            </div>
                            <div className="space-y-1 text-sm text-gray-500">
                                <p>
                                    <span className="font-medium">Position:</span> {e.position}
                                </p>
                                <p>
                                    <span className="font-medium">Location:</span> {e.place}
                                </p>
                                <p>
                                    <span className="font-medium">ID:</span>{" "}
                                    <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">
                                        {e.id}
                                    </code>
                                </p>
                            </div>
                            <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-400 flex justify-between">
                                <span>
                                    Start: {new Date(e.startTime).toLocaleString()}
                                </span>
                                <span>
                                    End: {new Date(e.endTime).toLocaleString()}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
