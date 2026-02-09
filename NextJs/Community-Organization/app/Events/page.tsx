import FutureEventBox from "@/components/Events/FutureEventBox";
import PageHeading from "@/components/Headings/PageHeading";
import { VALUES, SEO } from "@/libs/allLib";
import { EVENTS } from "@/libs/events";
import { Metadata } from "next";
import GridBackground from "@/components/Background/GridBackground";
import PastEventBox from "@/components/Events/PastEventBox";
import JoiningInterface from "@/components/JoinInterface/JoiningInterface";
import { RouteInfo } from "@/libs/routeInfo";
import SubHeading from "@/components/Headings/SubHeading";

export const metadata: Metadata = {
  title: `Events | ${VALUES.appShortName}`,
  description: `This is Events page of ${VALUES.appName}`,
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

export default function Events() {
  const renderFutureEvents = () => {
    if(EVENTS.futureEvents.length > 0)
    {
      return <>
        {PageHeading(
            "Upcoming Events",
            "Join our upcoming events and workshops to learn, network, and grow with the tech community"
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {EVENTS.futureEvents.map((__event, __index) => FutureEventBox(__event, __index))}
          </div>
      </>
    }
    else
    {
      return SubHeading("We are planning some new events. Stay Tuned!")
    }
  }
  return (
    <div className="min-h-screen">
      <section className="relative">
        <GridBackground />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
          {renderFutureEvents()}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
          {PageHeading(
            "Past Events",
            "See how we organized our last events to create and contribute a good impact"
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {EVENTS.pastEvents.map((__event, __index) => PastEventBox(__event, __index))}
          </div>
        </div>

        {JoiningInterface(
          "Ready to Start Your Tech Journey?",
          "Join our community and take the first step towards your tech career in the Himalayas.",
          "Get Started Now",
          RouteInfo.routes.Register
        )}
      </section>
    </div>
  );
}
