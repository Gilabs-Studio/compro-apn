"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
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
    <motion.a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: "easeOut" }}
      aria-label={locale === "id" ? `Minta penawaran untuk ${product.name}` : `Request a quote for ${product.name}`}
      className="group relative flex h-full flex-col overflow-hidden bg-white text-left"
    >
      <div className="relative aspect-4/3 shrink-0 overflow-hidden bg-white">
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
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-2xl font-semibold tracking-tight">
          {product.name}
        </h3>
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
        <div className="mt-auto flex items-center justify-between gap-4 border border-neutral-200 bg-neutral-50 px-4 py-4 transition-colors duration-300 group-hover:border-neutral-950 group-hover:bg-white">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-neutral-950">
              {locale === "id" ? "Minta penawaran" : "Request a quote"}
            </p>
            <p className="mt-1 text-xs leading-5 text-neutral-500">
              {locale === "id"
                ? "Pesan masuk dengan form kebutuhan yang sudah terisi"
                : "Open a prefilled inquiry message for this product"}
            </p>
          </div>
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-neutral-950 text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
            <ArrowRight className="size-4" />
          </span>
        </div>
      </div>
    </motion.a>
  );
}
