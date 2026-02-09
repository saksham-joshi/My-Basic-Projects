import SubHeading from "@/components/Headings/SubHeading";
import { VALUES } from "@/libs/variables";

export default function GenSheSection() {
  return (
    <section className="relative mb-12 px-4">
      {SubHeading("Empowering Female Founders")}
      
      <div className="max-w-4xl mx-auto">
        <div
          className="overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-300"
        >
          {/* Image Section - Top with white background */}
          <div className="relative w-full bg-white p-6 sm:p-8 flex items-center justify-center">
            <img
              className="w-full h-auto max-w-full object-contain"
              src={VALUES.genShe.icon}
              alt="GenShe-Icon"
              style={{ maxHeight: '200px' }}
            />
          </div>

          {/* Content Section - Bottom */}
          <div className="p-6 sm:p-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
              GenSHE
            </h3>
            
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
              GenSHE is a community-driven initiative by TechByHimalayas focused
              on empowering women in technology, entrepreneurship, and innovation.
              We spotlight female founders, share practical insights, and build
              inclusive ecosystems that enable women to lead, build, and scale
              with confidence.
            </p>

            <div className="flex items-center justify-start">
              <a
                href={VALUES.genShe.url.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 font-semibold rounded-full px-6 py-3 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Learn More
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5l7 7-7 7" 
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}