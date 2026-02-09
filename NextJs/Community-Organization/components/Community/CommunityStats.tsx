
import { NUMERICS } from "@/libs/numerics";
import StatCard from "@/components/Cards/StatCard";
import SectionHeading from "@/components/Headings/SectionHeading";

export default function CommunityStats() {
  return (
    <section className="relative">
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {SectionHeading(
          "Join Our Community",
          "Connect with tech enthusiasts, share knowledge, and grow together in the Himalayan tech ecosystem"
        )}

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {NUMERICS.communityStats.map((__stat, __index) => {
            return StatCard(__stat, __index);
          })}
        </div>
      </div>
    </section>
  );
}
