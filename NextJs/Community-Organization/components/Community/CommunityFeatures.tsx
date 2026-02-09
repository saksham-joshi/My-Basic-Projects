import { FEATURES } from "@/libs/features";
import FeatureCard from "@/components/Cards/FeatureCard";
import SectionHeading from "@/components/Headings/SectionHeading";

export default function CommunityFeatures() {
  return (
    <section className="relative">
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {SectionHeading("What Our Community Offers?", "")}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FEATURES.communityFeatures.map((__feature, __index) =>
            FeatureCard(__feature, __index)
          )}
        </div>
      </div>
    </section>
  );
}
