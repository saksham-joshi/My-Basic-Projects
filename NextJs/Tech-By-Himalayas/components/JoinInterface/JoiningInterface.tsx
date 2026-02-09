import Link from "next/link";

export default function JoiningInterface(
    __heading : string,
    __subHeading : string,
    __btnText : string,
    __btnUrl : string) 
    {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A] to-[#2563EB]">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-white opacity-10 mix-blend-overlay"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white opacity-10 rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white opacity-10 rounded-full"></div>
        </div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white">
            {__heading}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {__subHeading}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={__btnUrl}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl hover:scale-105 inline-flex items-center"
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
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
              <span>{__btnText}</span>
            </Link>
            <a
              href="https://discord.gg/techbyhimalayas"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange-500 text-white hover:bg-orange-600 px-8 py-4 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl hover:scale-105 inline-flex items-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              <span>Join Discord</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
