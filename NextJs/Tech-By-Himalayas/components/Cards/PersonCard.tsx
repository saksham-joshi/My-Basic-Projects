import { COLORS } from "@/libs/colors";
import { PersonData } from "@/libs/utils";
import Image from "next/image";

export default function PersonCard(__data: PersonData, __key: number = 0) {
  return (
    <div
      key={__key}
      className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
    >
      {/* Profile Image Circle */}
      <div className="w-32 h-32 rounded-full bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] mx-auto mb-4 relative overflow-hidden">
        <Image
          src={__data.img}
          alt={__data.name}
          fill
          className="object-cover"
          sizes="128px"
        />
      </div>

      {/* Name */}
      <h3 className="text-lg font-display font-bold text-gray-900 mb-2 text-center">
        {__data.name}
      </h3>

      {/* Role */}
      <p className="text-blue-600 font-medium mb-3 text-center text-sm">
        {__data.role}
      </p>

      {/* Social Links */}
      <div className="w-full px-3.5 pt-2 pb-3.5 rounded flex items-center justify-center gap-3">
        {/* LinkedIn Icon */}
        <a
          href={__data.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={`group inline-grid min-h-[34px] min-w-[34px] place-items-center rounded-md border border-transparent bg-transparent text-center transition-all duration-300 ease-in hover:border-[${COLORS.secondary}]/20 hover:bg-[${COLORS.secondary}]/10`}
          aria-label="LinkedIn Profile"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill={COLORS.secondary}>
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>

        {/* Email Icon */}
        <a
          href={`mailto:${__data.email}`}
          className={`group inline-grid min-h-[34px] min-w-[34px] place-items-center rounded-md border border-transparent bg-transparent text-center transition-all duration-300 ease-in hover:border-[${COLORS.secondary}]/20 hover:bg-[${COLORS.secondary}/10`}
          aria-label="Send Email"
        >
          <svg className="h-9 w-7" viewBox="0 0 24 24" fill={COLORS.secondary}>
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
          </svg>
        </a>

      </div>
    </div>
  );
}
