import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
    doc,
    getDoc,
    collection,
    getDocs,
    query,
    where,
    addDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../lib/auth";
import type { Election, Candidate, Vote } from "../lib/types";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";

const COLORS = [
    "#6366f1",
    "#f59e0b",
    "#10b981",
    "#ef4444",
    "#8b5cf6",
    "#ec4899",
    "#14b8a6",
    "#f97316",
];

export function ElectionDetailPage() {
    const { id } = useParams<{ id: string }>();
    const { user, profile } = useAuth();
    const [election, setElection] = useState<Election | null>(null);
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [hasVoted, setHasVoted] = useState(false);
    const [voting, setVoting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [voteSuccess, setVoteSuccess] = useState("");

    useEffect(() => {
        if (!id) return;
        async function fetchData() {
            try {
                const electionDoc = await getDoc(doc(db, "elections", id!));
                if (!electionDoc.exists()) {
                    setLoading(false);
                    return;
                }
                const electionData = {
                    id: electionDoc.id,
                    ...electionDoc.data(),
                } as Election;

                // Compute live status
                const now = Date.now();
                if (electionData.status !== "completed") {
                    if (now < electionData.startTime) electionData.status = "upcoming";
                    else if (now >= electionData.startTime && now <= electionData.endTime)
                        electionData.status = "active";
                    else electionData.status = "completed";
                }

                setElection(electionData);

                // Fetch approved candidates
                const cq = query(
                    collection(db, "candidates"),
                    where("electionId", "==", id),
                    where("status", "==", "approved")
                );
                const cSnap = await getDocs(cq);
                setCandidates(
                    cSnap.docs.map(
                        (d) => ({ id: d.id, ...d.data() } as Candidate)
                    )
                );

                // Check if current user has already voted
                if (user) {
                    const vq = query(
                        collection(db, "votes"),
                        where("electionId", "==", id),
                        where("voterId", "==", user.uid)
                    );
                    const vSnap = await getDocs(vq);
                    setHasVoted(!vSnap.empty);
                }
            } catch (err) {
                console.error("Error fetching election details:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id, user]);

    const handleVote = async (candidateId: string) => {
        if (!user || !election || hasVoted || voting) return;
        setVoting(true);
        try {
            await addDoc(collection(db, "votes"), {
                electionId: election.id,
                voterId: user.uid,
                candidateId,
                votedAt: Date.now(),
            } satisfies Omit<Vote, "id">);
            setHasVoted(true);
            setVoteSuccess("Your vote has been cast successfully!");
            // Refresh candidate vote counts
            const cq = query(
                collection(db, "candidates"),
                where("electionId", "==", id),
                where("status", "==", "approved")
            );
            const cSnap = await getDocs(cq);
            setCandidates(
                cSnap.docs.map(
                    (d) => ({ id: d.id, ...d.data() } as Candidate)
                )
            );
        } catch (err) {
            console.error("Error casting vote:", err);
        } finally {
            setVoting(false);
        }
    };

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-16 text-center text-gray-400">
                Loading election details...
            </div>
        );
    }

    if (!election) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                    Election Not Found
                </h2>
                <Link to="/elections" className="text-indigo-600 hover:underline">
                    ← Back to Elections
                </Link>
            </div>
        );
    }

    const statusStyles: Record<string, string> = {
        upcoming: "bg-amber-100 text-amber-700",
        active: "bg-green-100 text-green-700",
        completed: "bg-gray-100 text-gray-600",
    };

    const chartData = candidates
        .map((c) => ({
            name: c.name,
            votes: c.voteCount,
            party: c.party,
        }))
        .sort((a, b) => b.votes - a.votes);

    const canVote =
        profile?.role === "voter" &&
        election.status === "active" &&
        !hasVoted &&
        profile.place === election.place;

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <Link
                to="/elections"
                className="text-sm text-indigo-600 hover:text-indigo-700 mb-4 inline-block"
            >
                ← Back to Elections
            </Link>

            {/* Election Header */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">
                            {election.title}
                        </h1>
                        <p className="text-gray-500 text-sm">
                            Election ID:{" "}
                            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">
                                {election.id}
                            </code>
                        </p>
                    </div>
                    <span
                        className={`text-sm font-semibold px-3 py-1.5 rounded-full self-start ${statusStyles[election.status] ?? ""
                            }`}
                    >
                        {election.status.charAt(0).toUpperCase() +
                            election.status.slice(1)}
                    </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider">
                            Position
                        </p>
                        <p className="font-medium text-gray-900">{election.position}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider">
                            Location
                        </p>
                        <p className="font-medium text-gray-900">{election.place}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider">
                            Start
                        </p>
                        <p className="font-medium text-gray-900 text-sm">
                            {new Date(election.startTime).toLocaleString()}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider">
                            End
                        </p>
                        <p className="font-medium text-gray-900 text-sm">
                            {new Date(election.endTime).toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>

            {/* Vote Success */}
            {voteSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm font-medium">
                    ✅ {voteSuccess}
                </div>
            )}

            {/* Results Chart */}
            {chartData.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">
                        Results
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis type="number" allowDecimals={false} />
                            <YAxis
                                type="category"
                                dataKey="name"
                                width={120}
                                tick={{ fontSize: 12 }}
                            />
                            <Tooltip
                                content={({ payload }) => {
                                    const d = payload?.[0]?.payload;
                                    if (!d) return null;
                                    return (
                                        <div className="bg-white shadow-lg rounded-lg p-3 border text-sm">
                                            <p className="font-bold">{d.name}</p>
                                            <p className="text-gray-500">{d.party}</p>
                                            <p className="text-indigo-600 font-semibold">
                                                {d.votes} votes
                                            </p>
                                        </div>
                                    );
                                }}
                            />
                            <Bar dataKey="votes" radius={[0, 6, 6, 0]}>
                                {chartData.map((_, i) => (
                                    <Cell
                                        key={i}
                                        fill={COLORS[i % COLORS.length]}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}

            {/* Candidates List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                    Candidates ({candidates.length})
                </h2>
                {candidates.length === 0 ? (
                    <p className="text-gray-400 text-sm">
                        No approved candidates yet.
                    </p>
                ) : (
                    <div className="space-y-3">
                        {candidates.map((c, i) => (
                            <div
                                key={c.id}
                                className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                                        style={{
                                            backgroundColor:
                                                COLORS[i % COLORS.length],
                                        }}
                                    >
                                        {c.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">
                                            {c.name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {c.party}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-sm font-medium text-gray-600">
                                        {c.voteCount} votes
                                    </span>
                                    {canVote && (
                                        <button
                                            onClick={() => handleVote(c.id)}
                                            disabled={voting}
                                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                                        >
                                            {voting ? "..." : "Vote"}
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {election.status === "active" && !user && (
                    <div className="mt-4 p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-sm text-indigo-600">
                        <Link to="/login" className="font-medium hover:underline">
                            Login as a Voter
                        </Link>{" "}
                        to cast your vote.
                    </div>
                )}

                {hasVoted && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-xl text-sm text-green-600">
                        You have already cast your vote in this election.
                    </div>
                )}
            </div>
        </div>
    );
}
