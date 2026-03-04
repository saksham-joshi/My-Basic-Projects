import { AshokaChakra } from "@/lib/img";

export function Footer() {
    return (
        <footer className="bg-cyan-600 text-gray-900 border-t border-gray-800 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-3">
                        <img
                            src={AshokaChakra}
                            alt="Ashoka Chakra"
                            className="h-8 w-8 opacity-60"
                        />
                        <div>
                            <p className="text-sm font-medium text-white-900">
                                Election Commission of India
                            </p>
                            <p className="text-xs text-white-900">
                                Online Voting System &copy; {new Date().getFullYear()}
                            </p>
                        </div>
                    </div>
                    <p className="text-xs text-white-900">
                        Designed for transparent and secure elections.
                    </p>
                </div>
            </div>
        </footer>
    );
}
