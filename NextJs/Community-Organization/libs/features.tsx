import { FeatureData } from "./utils";

const basicFeatures : Array<FeatureData> = [
    {
      title: "Networking",
      description:
        "Connect with like-minded tech enthusiasts and industry professionals",
      icon: "🤝",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      title: "Learning",
      description: "Access to workshops, webinars, and learning resources",
      icon: "📚",
      gradient: "from-orange-500 to-orange-600",
    },
    {
      title: "Opportunities",
      description: "Find job opportunities and collaborate on projects",
      icon: "💼",
      gradient: "from-purple-500 to-purple-600",
    },
  ];

const workFeatures : Array<FeatureData> = [
    {
      title: "Tech Workshops",
      description: "Hands-on workshops on cutting-edge technologies",
      icon: "🎓",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      title: "Mentorship",
      description:
        "Guidance from industry experts and experienced professionals",
      icon: "👨‍🏫",
      gradient: "from-orange-500 to-orange-600",
    },
    {
      title: "Community Support",
      description: "24/7 support from our vibrant tech community",
      icon: "👥",
      gradient: "from-purple-500 to-purple-600",
    },
  ];

export const FEATURES = {
  
  basicFeatures : basicFeatures ,

  workFeatures: workFeatures,

  communityFeatures: [
    {
      title: "Tech Meetups",
      description:
        "Regular in-person and virtual meetups to connect with fellow tech enthusiasts, share knowledge, and build relationships.",
      icon: (
        <svg
          className="w-12 h-12 text-orange-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
    {
      title: "Learning Resources",
      description:
        "Access to curated learning materials, tutorials, and workshops to help you grow your tech skills and stay updated with industry trends.",
      icon: (
        <svg
          className="w-12 h-12 text-orange-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
    },
    {
      title: "Project Collaboration",
      description:
        "Find teammates for your projects or join existing ones to gain practical experience and build your portfolio.",
      icon: (
        <svg
          className="w-12 h-12 text-orange-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
        </svg>
      ),
    },
    {
      title: "Career Support",
      description:
        "Get guidance on career development, resume reviews, interview preparation, and job opportunities in the tech industry.",
      icon: (
        <svg
          className="w-12 h-12 text-orange-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  ],
} as const;
