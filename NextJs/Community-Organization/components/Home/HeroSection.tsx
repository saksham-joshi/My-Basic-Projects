import Link from "next/link";
import { NUMERICS } from "@/libs/numerics";
import { RouteInfo } from "@/libs/routeInfo";

export default function HeroSection() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#1E3A8A] via-[#2563EB] to-[#60A5FA]">
      <div className="absolute inset-0 overflow-hidden">
        
        {/* Mountain Silhouettes */}
        <div className="absolute bottom-0 left-0 right-0 h-[70vh] z-0">
          <svg
            viewBox="0 0 1920 1080"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            {/* Back Mountains */}
            <path
              d="M0 1080 L960 400 L1920 1080 Z"
              fill="#4B5563"
              opacity="0.3"
            />
            <path
              d="M480 1080 L960 300 L1440 1080 Z"
              fill="#374151"
              opacity="0.4"
            />
            {/* Middle Mountains */}
            <path
              d="M-100 1080 L600 500 L1300 1080 Z"
              fill="#F97316"
              opacity="0.6"
            />
            <path
              d="M800 1080 L1400 450 L2000 1080 Z"
              fill="#FB923C"
              opacity="0.5"
            />
            {/* Front Mountains */}
            <path
              d="M-200 1080 L400 600 L1000 1080 Z"
              fill="#EA580C"
              opacity="0.8"
            />
            <path
              d="M900 1080 L1500 550 L2100 1080 Z"
              fill="#F97316"
              opacity="0.7"
            />
          </svg>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="min-h-[90vh] flex items-center justify-center py-16 mt-0">
            {/* Main Content */}
            <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
              <div
                // initial={{ opacity: 0, y: 20 }}
                // animate={{ opacity: 1, y: 0 }}
                // transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-block mb-6">
                <span className="bg-white/10 backdrop-blur-md text-white text-sm font-medium px-6 py-2 rounded-full border border-white/20">
                  Not just a Community, but an Emotion
                </span>
              </div>

              <h1
                // initial={{ opacity: 0, y: 20 }}
                // animate={{ opacity: 1, y: 0 }}
                // transition={{ duration: 0.8, delay: 0.4 }}
                className="text-5xl md:text-7xl font-display font-bold mb-6"
              >
                <span className="text-white">
                  Empowering <span className="text-orange-400">Tech</span>{" "}
                  Innovation in the{" "}
                  <span className="text-orange-400">Himalayas</span>
                </span>
              </h1>

              <p
                // initial={{ opacity: 0, y: 20 }}
                // animate={{ opacity: 1, y: 0 }}
                // transition={{ duration: 0.8, delay: 0.6 }}
                className="text-xl text-white/80 max-w-2xl mx-auto mb-10"
              >
                Join TechbyHimalayas and become a part of a new wave of
                innovation rising from Dehradun and beyond.
              </p>

              {/* Stats Cards */}
              <div
                // initial={{ opacity: 0, y: 20 }}
                // animate={{ opacity: 1, y: 0 }}
                // transition={{ duration: 0.8, delay: 1 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
              >
                {NUMERICS.stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all"
                  >
                    <div className="text-4xl font-bold text-white mb-1">
                      {stat.number}
                    </div>
                    <div className="text-white/80">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div
                // initial={{ opacity: 0, y: 20 }}
                // animate={{ opacity: 1, y: 0 }}
                // transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-6 justify-center mt-10"
              >
                <Link
                  href={RouteInfo.routes.Register}
                  className="group relative overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-medium transition-all shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/30 hover:scale-105 inline-flex items-center justify-center"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                  <span>Join Community</span>
                </Link>
                <Link href={RouteInfo.routes.Contact} className="group relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 px-8 py-4 rounded-xl font-medium transition-all hover:scale-105 inline-flex items-center justify-center">
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Learn More</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
