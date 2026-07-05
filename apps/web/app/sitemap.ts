import type { MetadataRoute } from "next";
import { getLandingProductSlugs } from "@/features/landing/content";
import {
  LOCAL_CNC_PAGE_PATH,
  SEO_BASE_URL,
  SUPPORTED_SEO_LOCALES,
  getLocalizedPath,
} from "@/lib/seo";

const LANDING_PATHS = ["/", "/product", "/about", "/contact", "/blog"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const productPaths = getLandingProductSlugs().map((slug) => `/product/${slug}`);
  const paths = [...LANDING_PATHS, LOCAL_CNC_PAGE_PATH, ...productPaths];

  return SUPPORTED_SEO_LOCALES.flatMap((locale) =>
    paths.map((path) => {
      const localizedPath = getLocalizedPath(path, locale);
      const isHomePage = path === "/";
      const isProductDetail = path.startsWith("/product/");

      return {
        url: `${SEO_BASE_URL}${localizedPath}`,
        lastModified: new Date(),
        changeFrequency: (isHomePage || isProductDetail ? "monthly" : "weekly") as
          | "monthly"
          | "weekly",
        priority: isHomePage ? 1 : isProductDetail ? 0.8 : 0.9,
      };
    }),
  );
}
