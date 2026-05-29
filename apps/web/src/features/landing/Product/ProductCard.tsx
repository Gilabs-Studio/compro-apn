"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { getLandingImage, type ProductItem } from "../content";

type ProductCardProps = {
  product: ProductItem;
  index?: number;
};

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: "easeOut" }}
      className="relative flex h-full flex-col overflow-hidden bg-white cursor-default"
    >
      <div className="relative aspect-4/3 shrink-0 overflow-hidden bg-white">
        <Image
          src={getLandingImage(product.image)}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
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
      </div>
    </motion.article>
  );
}
