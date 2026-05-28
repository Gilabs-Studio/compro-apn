"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
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
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden bg-white"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
        <Image
          src={getLandingImage(product.image)}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-80" />
        <div className="absolute left-5 top-5 bg-amber-400 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-950">
          {product.category}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-2xl font-semibold tracking-tight">
            {product.name}
          </h3>
          <span className="grid size-10 shrink-0 place-items-center border border-neutral-200 transition-colors group-hover:border-neutral-950 group-hover:bg-neutral-950 group-hover:text-white">
            <ArrowUpRight className="size-4" />
          </span>
        </div>
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
