import { VALUES } from "./variables";

export const SEO = {
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  
    category: 'Community',

    referrer: 'origin-when-cross-origin',
    
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },

    author : {
        name: "Saksham Joshi",
        url: "https://www.linkedin.com/in/sakshamjoshi27"
    },

    keywords: 'tech by himalayas, techbyhimalayas, techbyhimalaya, tbh, tbi, geu, gehu, graphic era, graphic era startups, community, empowerment, technology, tech startup, youth, leadership, programs, career, bootcamps, non-profit, education, student, development, leadership',

    openGraph : {
      type : "website",
      url : VALUES.url.website,
      title : VALUES.appName,
      description : VALUES.appDescription,
      siteName: VALUES.appName,
      images: VALUES.url.website + "/og.png"
    },

    classification: "community",

    appleWebApp: {
      capable: true,
      title: VALUES.appName,
      statusBarStyle: "default"
    },

    assets : VALUES.url.website + "/assets"
  
} as const;