import { Metadata } from "next";
import { VALUES, SEO } from "@/libs/allLib";
import JoiningInterface from "@/components/JoinInterface/JoiningInterface";
import PageHeading from "@/components/Headings/PageHeading";
import GridBackground from "@/components/Background/GridBackground";

export const metadata: Metadata = {
  title: `Collaborate | ${VALUES.appShortName}`,
  description: `This is Collaboration page of ${VALUES.appName}`,
  authors: SEO.author,
  publisher: VALUES.appName,
  robots: SEO.robots,
  category: SEO.category,
  formatDetection: SEO.formatDetection,
  referrer: SEO.referrer,
  keywords: SEO.keywords,
  creator: SEO.author.name,
  openGraph: SEO.openGraph,
  abstract: VALUES.appDescription,
  classification: SEO.classification,
  appleWebApp: SEO.appleWebApp,
  assets: SEO.assets,
};

export default function Collab() {
  return (
    <div className="min-h-screen">
      <div className="w-full">
      
        <section className="relative">
          <GridBackground/>
          <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
            
            {PageHeading("Collaborate With Us", "Partner with us to empower the next wave of tech creators innovators, and changemakers.")}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-12">
              
              <div
                // initial={{ opacity: 0, x: 20 }}
                // animate={{ opacity: 1, x: 0 }}
                // transition={{ duration: 0.6 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <h2 className="text-2xl font-display font-bold mb-6">
                  <span className="bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-transparent bg-clip-text">
                    Get In Touch
                  </span>
                </h2>

                {/* HANDLE FORM SUBMISSION */}
                <form className="space-y-6">
                  <div className="relative">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          className="h-5 w-5 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="name"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                        placeholder="Your name"
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          className="h-5 w-5 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <input
                        type="email"
                        id="email"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <label
                      htmlFor="organization"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Organization
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          className="h-5 w-5 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="organization"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                        placeholder="Your organization"
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Message
                    </label>
                    <div className="relative">
                      <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                        <svg
                          className="h-5 w-5 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                          />
                        </svg>
                      </div>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                        placeholder="How would you like to collaborate?"
                      ></textarea>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] hover:from-[#1E3A8A]/90 hover:to-[#2563EB]/90 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl hover:scale-105 inline-flex items-center justify-center"
                  >
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
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                    <span>Send Message</span>
                  </button>
                </form>
              </div>

              <div
                // initial={{ opacity: 0, x: -20 }}
                // animate={{ opacity: 1, x: 0 }}
                // transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <h2 className="text-3xl font-display font-bold">
                  <span className="bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-transparent bg-clip-text">
                    Why Partner With Us?
                  </span>
                </h2>
                <p className="text-gray-600">
                  TechbyHimalayas is building a vibrant tech community in the
                  Himalayan region. By partnering with us, you can:
                </p>
                <ul className="space-y-4">
                  {[
                    "Access a pool of talented tech professionals",
                    "Support local tech education and development",
                    "Gain visibility in the Himalayan tech ecosystem",
                    "Contribute to building a sustainable tech industry",
                    "Connect with other like-minded organizations",
                  ].map((item, index) => (
                    <li
                      key={index}
                      // initial={{ opacity: 0, x: -20 }}
                      // animate={{ opacity: 1, x: 0 }}
                      // transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex items-start gap-3 group"
                    >
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
