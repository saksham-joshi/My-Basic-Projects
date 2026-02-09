import { VALUES, SEO } from "@/libs/allLib";
import { Metadata } from "next";
import JoiningInterface from "@/components/JoinInterface/JoiningInterface";
import HeroSection from "@/components/Home/HeroSection";
import PodcastSection from "@/components/Podcasts";
import { SuccessStories } from "@/libs/successStories";
import SuccesStoriesSection from "@/components/Home/SuccessStoriesSection";
import { RouteInfo } from "@/libs/routeInfo";
import CommunityInfoSection from "@/components/Community";
import GenSheSection from "@/components/Home/GenSheSection";

export const metadata: Metadata = {
  title: `${VALUES.appName}`,
  description: `This is Landing page of ${VALUES.appName}. ${VALUES.appDescription}`,
  authors: SEO.author,
  publisher: VALUES.appName,
  robots: SEO.robots,
  category: SEO.category,
  formatDetection: SEO.formatDetection,
  referrer: SEO.referrer,
  keywords: SEO.keywords,
  creator: SEO.author.name,
  openGraph: SEO.openGraph,
  abstract: VALUES.appDescription,
  classification: SEO.classification,
  appleWebApp: SEO.appleWebApp,
  assets: SEO.assets,
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <div className="w-full">
        <HeroSection />

        {/* {FeatureSection("Why Join TechbyHimalayas?","Discover the benefits of being part of our growing tech community", FEATURES.basicFeatures)}

{FeatureSection("What We Offer?", "Explore our comprehensive range of services and resources", FEATURES.workFeatures )} */}

        <CommunityInfoSection />

        <GenSheSection/>

        <PodcastSection />

        {SuccesStoriesSection(
          "Success Stories",
          "Inspiring journeys of our community members",
          SuccessStories
        )}

        {JoiningInterface(
          "Ready to Start Your Tech Journey?",
          "Join our community and take the first step towards your tech career in the Himalayas.",
          "Get Started Now",
          RouteInfo.routes.Register
        )}
      </div>
    </div>
  );
}
