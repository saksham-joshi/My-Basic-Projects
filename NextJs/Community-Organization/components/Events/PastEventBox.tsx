import Link from "next/link";
import { PastEventData } from "@/libs/utils";

export default function PastEventBox(__event: PastEventData, __index: number) {
  return (
    <div
    key={__index}
    //   initial={{ opacity: 0, y: 20 }}
    //   animate={{ opacity: 1, y: 0 }}
    //   transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-full">
          {__event.category}
        </span>
      </div>
      <h3 className="text-xl font-display font-bold text-gray-900 mb-2">
        {__event.title}
      </h3>
      <p className="text-gray-600 mb-4 flex-grow">{__event.description}</p>
      <div className="space-y-2 text-sm text-gray-500 mb-6">
        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          {__event.date}
        </div>
        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {__event.time}
        </div>
        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          {__event.location}
        </div>
      </div>
      <Link
        // TODO: add separate pages for this
        href=""
        className="w-full bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] hover:from-[#1E3A8A]/90 hover:to-[#2563EB]/90 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl inline-block text-center"
      >
        View more
      </Link>
    </div>
  );
}
