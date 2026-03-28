import { AshokaEmblemWhite } from "@/lib/img";
import { Link } from "react-router-dom";

export function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer
            className="mt-auto border-t border-white/20 text-white"
            style={{
                background:
                    "linear-gradient(135deg, var(--brand-primary-deep) 0%, var(--brand-primary-dark) 40%, var(--brand-primary) 100%)",
            }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid gap-8 md:grid-cols-3">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                                <img
                                    src={AshokaEmblemWhite}
                                    alt="Ashoka Emblem"
                                    className="h-8 w-8"
                                />
                            </div>
                            <div>
                                <p className="text-sm font-semibold tracking-wide uppercase text-white/85">
                                    Election Commission of India
                                </p>
                                <p className="text-xs text-white/70">
                                    Trusted Digital Democracy Platform
                                </p>
                            </div>
                        </div>
                        <p className="text-sm text-white/80 leading-relaxed max-w-xs">
                            Secure, transparent and inclusive online elections for institutions and organizations.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-white/90 mb-3">
                            Quick Access
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            <Link
                                to="/"
                                className="text-xs px-3 py-1.5 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-colors"
                            >
                                Home
                            </Link>
                            <Link
                                to="/elections"
                                className="text-xs px-3 py-1.5 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-colors"
                            >
                                Elections
                            </Link>
                            <Link
                                to="/login"
                                className="text-xs px-3 py-1.5 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-colors"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="text-xs px-3 py-1.5 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-colors"
                            >
                                Register
                            </Link>
                        </div>
                    </div>

                    <div className="rounded-2xl bg-white/10 border border-white/20 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-white/85 mb-2">
                            Our Promise
                        </p>
                        <p className="text-sm text-white/90 leading-relaxed">
                            Designed for transparent and secure elections with integrity and accountability at every step.
                        </p>
                    </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/20 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
                    <p className="text-xs text-white/75">
                        Online Voting System &copy; {year}. All rights reserved.
                    </p>
                    <p className="text-xs text-white/70">
                        Built with public trust as the first priority.
                    </p>
                </div>
            </div>
        </footer>
    );
}
