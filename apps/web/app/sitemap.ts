import { MetadataRoute } from "next";
import { getLandingCopy } from "@/features/landing/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://adigunapresisi.co.id";
  const locales = ["id", "en"] as const;
  const paths = ["", "/product", "/about", "/contact", "/blog"];
  const productPaths = locales.flatMap((locale) =>
    getLandingCopy(locale).products.map((product) => `/${locale}/product/${product.slug}`),
  );

  return [
    ...locales.flatMap((locale) =>
      paths.map((path) => ({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: path === "" ? 1 : 0.8,
      })),
    ),
    ...productPaths.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
