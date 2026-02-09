'use client';

import { useState } from "react";
import { FaqSectionData } from "@/libs/utils";
import FaqBlock from "./FaqBlock";

interface FaqSectionProps extends FaqSectionData {
  sectionIndex: number;
}

export default function FaqSection({ title, faqs, sectionIndex }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mb-16">
      <div className="mb-12">
        <h2 className="text-2xl font-display font-bold mb-6">
          <span className="bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-transparent bg-clip-text">
            {title}
          </span>
        </h2>
        <div className="space-y-4">
          {faqs.map((qna, index) => (
            <FaqBlock
              key={`faq-${sectionIndex}-${index}`}
              question={qna.question}
              answer={qna.answer}
              isOpen={openIndex === index}
              onToggle={() => toggleFAQ(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}