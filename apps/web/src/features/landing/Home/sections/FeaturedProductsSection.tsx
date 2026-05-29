import { Reveal } from "../../Reveal";
import { LandingEyebrow } from "../../LandingEyebrow";
import { ProductCard } from "../../Product/ProductCard";

type FeaturedProductsSectionProps = {
  locale: string;
  copy: any;
};

export default function FeaturedProductsSection({ locale, copy }: Readonly<FeaturedProductsSectionProps>) {
  return (
    <section
      data-nav-theme="light"
      className="px-6 py-20 sm:px-8 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <LandingEyebrow className="text-neutral-500">
              {locale === "id" ? "Produk Utama" : "Featured Products"}
            </LandingEyebrow>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">
              {locale === "id"
                ? "Portofolio Mesin Presisi"
                : "Precision Machinery Portfolio"}
            </h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-neutral-600 lg:ml-auto">
            {locale === "id"
              ? "Katalog sistem mesin perkakas berstandar tinggi yang dirancang untuk performa maksimal dan akurasi mutlak."
              : "High-standard machine tool systems engineered for maximum performance and absolute accuracy."}
          </p>
        </Reveal>
        <div className="mt-14 grid gap-6 lg:grid-cols-3 items-stretch">
          {copy.products.slice(0, 3).map((product: any, index: number) => (
            <ProductCard key={product.name} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
