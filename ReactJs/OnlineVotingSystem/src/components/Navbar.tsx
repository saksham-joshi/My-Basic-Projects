import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../lib/auth";
import { ElectionCommission } from "@/lib/img";

export function Navbar() {
    const { user, profile, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    return (
        <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center gap-3 group">
                        <img
                            src={ElectionCommission}
                            alt="Election Commission of India"
                            className="h-10 w-auto"
                        />
                        <div className="hidden sm:block">
                            <h1 className="text-md font-bold text-cyan-500 leading-tight">
                                Online Voting System
                            </h1>
                        </div>
                    </Link>

                    <div className="flex items-center gap-2 sm:gap-4">
                        <Link
                            to="/elections"
                            className="text-sm font-medium text-cyan-600 hover:text-blue-900 transition-colors px-3 py-2 rounded-lg hover:bg-indigo-50"
                        >
                            Elections
                        </Link>

                        {user && profile ? (
                            <>
                                <Link
                                    to={`/dashboard/${profile.role}`}
                                    className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors px-3 py-2 rounded-lg hover:bg-indigo-50"
                                >
                                    Dashboard
                                </Link>
                                <div className="flex items-center gap-3 ml-2">
                                    <span className="hidden md:inline text-xs font-medium bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full capitalize">
                                        {profile.role}
                                    </span>
                                    <button
                                        onClick={handleLogout}
                                        className="text-sm font-medium text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition-colors cursor-pointer"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex gap-2">
                                <Link
                                    to="/login"
                                    className="text-sm font-medium text-cyan-500 hover:text-cyan-700 border border-indigo-200 hover:border-blue-300 px-4 py-2 rounded-lg transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="text-sm font-medium text-white bg-cyan-500 hover:bg-cyan-800 px-4 py-2 rounded-lg transition-colors"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
