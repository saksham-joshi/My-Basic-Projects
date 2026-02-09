import { SucessStoryData } from "@/libs/utils";
import SectionHeading from "../Headings/SectionHeading";

export default function SuccesStoriesSection(
  __heading: string,
  __suHeading: string,
  __stories: Array<SucessStoryData>
) {
  return (
    <section className="relative">
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {SectionHeading(__heading, __suHeading)}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {__stories.map((story, index) => (
            <div
              key={index}
              //whileHover={{ y: -10 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div
                className={`w-16 h-16 rounded-xl bg-gradient-to-r ${story.gradient} flex items-center justify-center mb-6 text-white text-3xl`}
              >
                {story.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{story.name}</h3>
              <p className="text-orange-500 mb-2">{story.role}</p>
              <p className="text-gray-600">{story.story}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
