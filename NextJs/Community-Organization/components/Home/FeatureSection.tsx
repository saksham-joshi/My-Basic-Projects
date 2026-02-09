import { FeatureData } from "@/libs/utils";
import SectionHeading from "../Headings/SectionHeading";

export default function FeatureSection(
  __heading: string,
  __subHeading: string,
  __feature: Array<FeatureData>
) {
  return (
    <div className="w-full">
      <section className="relative mt-20">
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
          {SectionHeading(__heading, __subHeading)}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {__feature.map((feature, index) => (
              <div
                key={index}
                //whileHover={{ y: -10 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 text-white text-3xl`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
