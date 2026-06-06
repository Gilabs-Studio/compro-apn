import type { MetadataRoute } from "next";
import {
  SEO_BASE_URL,
  SUPPORTED_SEO_LOCALES,
  getLocalizedPath,
} from "@/lib/seo";

const LANDING_PATHS = ["/", "/product", "/about", "/contact", "/blog"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return SUPPORTED_SEO_LOCALES.flatMap((locale) =>
    LANDING_PATHS.map((path) => {
      const localizedPath = getLocalizedPath(path, locale);
      const isHomePage = path === "/";

      return {
        url: `${SEO_BASE_URL}${localizedPath}`,
        lastModified: new Date(),
        changeFrequency: (isHomePage ? "monthly" : "weekly") as
          | "monthly"
          | "weekly",
        priority: isHomePage ? 1 : 0.9,
      };
    }),
  );
}
