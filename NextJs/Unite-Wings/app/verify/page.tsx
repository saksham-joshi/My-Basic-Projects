import VerifyBox from "@/components/Verify";
import { Metadata } from "next";
import { VALUES } from "@/lib/variables";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: `Verify | ${VALUES.APP_SHORT_NAME}`,
  description: `This Page can be used to verify Certificates/Offer Letters issued by ${VALUES.APP_FULL_NAME}`,
  authors: VALUES.DEV_SAKSHAM_JOSHI,
  publisher: VALUES.APP_FULL_NAME,
  robots: VALUES.SEO.robots,
  category: VALUES.SEO.category,
  formatDetection: VALUES.SEO.formatDetection,
  referrer: VALUES.SEO.referrer,
  keywords: VALUES.SEO.keywords
};

const VerifyPage = () => {
  return (
    <>
      <Suspense
        fallback={
          <div className="container py-16 md:py-20 lg:py-28">
            <div className="flex items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              <span className="ml-3 text-base">Loading...</span>
            </div>
          </div>
        }>
        <VerifyBox />
      </Suspense>
    </>
  );
};

export default VerifyPage;
