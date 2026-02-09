import CommunityFeatures from "@/components/Community/CommunityFeatures";
import CommunityStats from "@/components/Community/CommunityStats";

export default function CommunityInfoSection() {
  return (
    <>
      <div className="mb-8">
        <CommunityStats />
        <CommunityFeatures />
      </div>
    </>
  );
}
