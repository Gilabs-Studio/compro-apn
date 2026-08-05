"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import {
  getLandingImage,
  getLandingWhatsAppLink,
  type ProductItem,
} from "../content";

type ProductCardProps = {
  product: ProductItem;
  index?: number;
  locale: string;
};

export function ProductCard({
  product,
  index = 0,
  locale,
}: Readonly<ProductCardProps>) {
  const whatsappLink = getLandingWhatsAppLink(locale, product);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: "easeOut" }}
      className="group relative flex h-full flex-col overflow-hidden bg-white text-left"
    >
      <Link
        href={`/product/${product.slug}`}
        locale={locale}
        className="relative block aspect-4/3 shrink-0 overflow-hidden bg-white"
        aria-label={locale === "id" ? `Lihat detail ${product.name}` : `View details for ${product.name}`}
      >
        <Image
          src={getLandingImage(product.image)}
          alt={product.name}
          fill
          sizes="(min-width: 1280px) 580px, (min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw"
          className="object-contain p-6"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/55 via-black/20 to-transparent" />
        <div className="absolute left-5 top-5 bg-amber-400 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-950">
          {product.category}
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <Link href={`/product/${product.slug}`} locale={locale}>
          <h3 className="text-2xl font-semibold tracking-tight transition-colors hover:text-amber-600">
            {product.name}
          </h3>
        </Link>
        <p className="mt-4 text-sm leading-7 text-neutral-600">
          {product.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {product.specs.map((spec) => (
            <span
              key={spec}
              className="border border-neutral-200 px-3 py-1 text-xs font-medium text-neutral-500"
            >
              {spec}
            </span>
          ))}
        </div>
        <div className="mt-auto grid gap-3 pt-6 sm:grid-cols-2">
          <Link
            href={`/product/${product.slug}`}
            locale={locale}
            className="inline-flex h-12 items-center justify-center gap-2 border border-neutral-200 bg-neutral-50 px-4 text-sm font-semibold text-neutral-950 transition-colors hover:border-neutral-950 hover:bg-white"
          >
            {locale === "id" ? "Lihat detail" : "View detail"}
            <ArrowRight className="size-4" />
          </Link>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={locale === "id" ? `Minta penawaran untuk ${product.name}` : `Request a quote for ${product.name}`}
            className="inline-flex h-12 items-center justify-center gap-2 bg-neutral-950 px-4 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            {locale === "id" ? "Penawaran" : "Quote"}
            <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}
