import GridBackground from "@/components/Background/GridBackground";
import PageHeading from "@/components/Headings/PageHeading";
import JoiningInterface from "@/components/JoinInterface/JoiningInterface";
import { VALUES, SEO, PEOPLE } from "@/libs/allLib";
import { Metadata } from "next";
import SubHeading from "@/components/Headings/SubHeading";
import PersonCard from "@/components/Cards/PersonCard";
import { RouteInfo } from "@/libs/routeInfo";
import { TeamPageData } from "@/libs/utils";

export const metadata: Metadata = {
  title: `Team | ${VALUES.appShortName}`,
  description: `This is team page of ${VALUES.appName}. It consists of images, names, email and linkedin profile link of all team members of TBH`,
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

export default function Team() {
  const renderBlock = (__block_data: TeamPageData, __index: number) => {
    if (__block_data.data.length > 0) {
      return (
        <div key={__index} className="mb-12">
          {SubHeading(__block_data.title)}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {__block_data.data.map((__member, __key) =>
              PersonCard(__member, __key)
            )}
          </div>
        </div>
      );
    }
    return <span key={__index}></span>; {/* To eliminate unique-key prop warning */}
  };

  return (
    <div className="min-h-screen">
      <div className="w-full">
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50">
            <GridBackground />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
            {PageHeading(
              "Meet Our Team",
              "The passionate individuals behind TechByHimalayas"
            )}

            {PEOPLE.map((__block_data, __index) =>
              renderBlock(__block_data, __index)
            )}
          </div>
        </section>

        <section className="relative">
          {JoiningInterface(
            "Ready to Start Your Tech Journey?",
            "Join our community and take the first step towards your tech career in the Himalayas.",
            "Get Started Now",
            RouteInfo.routes.Register
          )}
        </section>
      </div>
    </div>
  );
}
