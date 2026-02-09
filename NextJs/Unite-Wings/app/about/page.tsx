import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";
import { VALUES } from "@/lib/variables";

export const metadata: Metadata = {
  title: `About Page | ${VALUES.APP_SHORT_NAME}`,
  description: `This is About Page for ${VALUES.APP_FULL_NAME}`,
  authors: VALUES.DEV_SAKSHAM_JOSHI,
  publisher: VALUES.APP_FULL_NAME,
  robots: VALUES.SEO.robots,
  category: VALUES.SEO.category,
  formatDetection: VALUES.SEO.formatDetection,
  referrer: VALUES.SEO.referrer,
  keywords: VALUES.SEO.keywords
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="About Us"
        description="Learn more about who we are, our mission, and the values that drive us. Get to know our team and how we aim to make a difference."
      />
      <AboutSectionOne />
      <AboutSectionTwo />
    </>
  );
};

export default AboutPage;
