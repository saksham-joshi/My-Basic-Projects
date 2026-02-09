import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

import { Metadata } from "next";
import { VALUES } from "@/lib/variables";

export const metadata: Metadata = {
  title: `Contact Page | ${VALUES.APP_SHORT_NAME}`,
  description: `This is Contact Page for ${VALUES.APP_FULL_NAME}`,
  authors: VALUES.DEV_SAKSHAM_JOSHI,
  publisher: VALUES.APP_FULL_NAME,
  robots: VALUES.SEO.robots,
  category: VALUES.SEO.category,
  formatDetection: VALUES.SEO.formatDetection,
  referrer: VALUES.SEO.referrer,
  keywords: VALUES.SEO.keywords
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Contact Us"
        description="Get in touch with us for any questions, feedback, or inquiries. We're here to assist you with anything you need and ensure a seamless experience."
      />
      <Contact />
    </>
  );
};

export default ContactPage;
