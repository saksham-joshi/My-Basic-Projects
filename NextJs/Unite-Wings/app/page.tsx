// import AboutSectionOne from "@/components/About/AboutSectionOne";
// import AboutSectionTwo from "@/components/About/AboutSectionTwo";
// import Blog from "@/components/Blog";
// import Brands from "@/components/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
// import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
// import Pricing from "@/components/Pricing";
// import Testimonials from "@/components/Testimonials";
// import Video from "@/components/Video";
import { Metadata } from "next";
import { VALUES } from "@/lib/variables";

export const metadata: Metadata = {
  title: VALUES.APP_FULL_NAME,
  description: VALUES.APP_DESCRIPTION,
  authors: VALUES.DEV_SAKSHAM_JOSHI,
  publisher: VALUES.APP_FULL_NAME,
  robots: VALUES.SEO.robots,
  category: VALUES.SEO.category,
  formatDetection: VALUES.SEO.formatDetection,
  referrer: VALUES.SEO.referrer,
  keywords: VALUES.SEO.keywords
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <Features />
      {/* <Video />
      <Brands />
      <AboutSectionOne />
      <AboutSectionTwo />
      <Testimonials />
      <Pricing />
      <Blog /> 
      <Contact />*/}
    </>
  );
}
