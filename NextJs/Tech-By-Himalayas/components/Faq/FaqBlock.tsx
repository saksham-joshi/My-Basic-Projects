'use client';

import { FaqBlockData } from "@/libs/utils";

interface FaqBlockProps extends FaqBlockData {
  isOpen: boolean;
  onToggle: () => void;
}

export default function FaqBlock({ question, answer, isOpen, onToggle }: FaqBlockProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
      <button
        onClick={onToggle}
        className="flex justify-between items-center w-full text-left"
      >
        <h3 className="text-lg font-display font-bold text-gray-800">
          {question}
        </h3>
        <svg
          className={`w-6 h-6 text-[#1E3A8A] transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 mt-4 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="text-gray-600">
          {answer}
        </div>
      </div>
    </div>
  );
}