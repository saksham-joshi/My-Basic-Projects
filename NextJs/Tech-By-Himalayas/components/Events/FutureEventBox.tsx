import Link from "next/link";
import { FutureEventData } from "@/libs/utils";

export default function FutureEventBox(__events: FutureEventData, __index: number) {
  return (
    <div
    key={__index}
    //   initial={{ opacity: 0, y: 20 }}
    //   animate={{ opacity: 1, y: 0 }}
    //   transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden group hover:scale-105 border border-gray-100"
    >
      <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-[#1E3A8A] to-[#2563EB] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-orange-500"></div>
          <div className="text-sm text-orange-500 font-medium">
            {__events.date}
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {__events.title}
        </h3>
        <p className="text-gray-600 mb-4">
          {__events.description}
        </p>
        <div className="flex justify-between items-center">
          <Link
            // TODO: prepare register page for this
            href=""
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl text-sm inline-flex items-center"
          >
            <svg
              className="w-4 h-4 mr-1"
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
            <span>Register Now</span>
          </Link>
          {/* <Link
            href={RouteInfo.routes.Events}
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 group text-sm"
          >
            Learn more
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M5 12h14M12 5l7 7-7 7"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link> */}
        </div>
      </div>
    </div>
  );
}
