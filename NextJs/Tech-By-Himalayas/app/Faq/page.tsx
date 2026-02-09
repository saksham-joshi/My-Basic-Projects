import { Metadata } from "next";
import { FAQ, VALUES, SEO } from "@/libs/allLib";
import GridBackground from "@/components/Background/GridBackground";
import PageHeading from "@/components/Headings/PageHeading";
import JoiningInterface from "@/components/JoinInterface/JoiningInterface";
import FaqSection from "@/components/Faq/FaqSection";
import { RouteInfo } from "@/libs/routeInfo";

export const metadata: Metadata = {
  title: `FAQ | ${VALUES.appShortName}`,
  description: `This is FAQ page of ${VALUES.appName}`,
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

export default function Faq() {
  return (
    <div className="min-h-screen">
      <div className="w-full">
        <section className="relative">
          <GridBackground />
          <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
            {PageHeading(
              "Frequently Asked Questions",
              "Find answers to common questions about TechbyHimalayas and our community"
            )}
            <div className="mb-16">
              {FAQ.map((faqSection, index) => (
                <FaqSection
                  key={`section-${index}`}
                  title={faqSection.title}
                  faqs={faqSection.faqs}
                  sectionIndex={index}
                />
              ))}
            </div>
          </div>

          {JoiningInterface(
            "Still Have Questions?",
            "Can't find what you're looking for? Reach out to our team and we'll get back to you as soon as possible.",
            "Contact Us",
            RouteInfo.routes.Contact
          )}
        </section>
      </div>
    </div>
  );
}
