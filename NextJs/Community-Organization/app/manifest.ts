import { COLORS } from "@/libs/colors";
import { VALUES } from "@/libs/variables";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: VALUES.appName,
    short_name: VALUES.appShortName,
    description: VALUES.appDescription,
    start_url: "/",
    display: "standalone",
    background_color: COLORS.bg,
    theme_color: COLORS.primary,
    icons: [
      {
        src: "assets/icons/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/assets/icons/android-icon-36x36.png",
        sizes: "36x36",
        type: "image/png"
      },
      {
        src: "/assets/icons/android-icon-48x48.png",
        sizes: "48x48",
        type: "image/png"
      },
      {
        src: "/assets/icons/android-icon-72x72.png",
        sizes: "72x72",
        type: "image/png"
      },
      {
        src: "/assets/icons/android-icon-96x96.png",
        sizes: "96x96",
        type: "image/png"
      },
      {
        src: "/assets/icons/android-icon-144x144.png",
        sizes: "144x144",
        type: "image/png"
      },
      {
        src: "/assets/icons/android-icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      }
    ],
  };
}
