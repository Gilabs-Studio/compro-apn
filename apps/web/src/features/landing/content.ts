import { formatWhatsAppLink } from "@/lib/utils";

export type LandingLocale = "id" | "en";

export type LandingProductSlug =
  | "vertical-machining-center"
  | "engraving-milling"
  | "precision-lathe"
  | "horizontal-machining-center"
  | "five-axis-machining"
  | "drilling-tapping"
  | "gh-series"
  | "gx-series"
  | "c-series";

export type LandingImageKey =
  | "hero"
  | "productHero"
  | "aboutHero"
  | "layananNoBg"
  | "product1"
  | "product2"
  | "product3"
  | "product4"
  | "product5"
  | "product6"
  | "ghNoBg"
  | "ghSeries"
  | "gxSeries"
  | "cSeries";

export type ProductItem = {
  slug: LandingProductSlug;
  name: string;
  category: string;
  description: string;
  image: LandingImageKey;
  specs: string[];
};

const landingWhatsAppPhone = "081291572817";

const inquiryFields = {
  id: [
    "Nama lengkap",
    "Perusahaan",
    "Nomor WhatsApp",
    "Produk yang diminati",
    "Kebutuhan / aplikasi",
    "Material kerja",
    "Ukuran kerja / kapasitas",
    "Lokasi proyek",
    "Catatan tambahan",
  ],
  en: [
    "Full name",
    "Company",
    "WhatsApp number",
    "Product of interest",
    "Application / need",
    "Work material",
    "Work size / capacity",
    "Project location",
    "Additional notes",
  ],
} as const;

const productSlugs: LandingProductSlug[] = [
  "vertical-machining-center",
  "engraving-milling",
  "precision-lathe",
  "horizontal-machining-center",
  "five-axis-machining",
  "drilling-tapping",
];

const images: Record<LandingImageKey, string> = {
  hero: "/landing/hero.webp",
  productHero: "/landing/product-hero-machine3.webp",
  aboutHero: "/landing/about-machine.webp",
  layananNoBg: "/landing/layanan-nobg.png",
  product1: "/landing/product/1.jpeg",
  product2: "/landing/product/2.jpeg",
  product3: "/landing/product/3.jpeg",
  product4: "/landing/product/4.jpeg",
  product5: "/landing/product/5.jpeg",
  product6: "/landing/product/6.jpeg",
  ghNoBg: "/landing/gh-nobg.png",
  ghSeries: "/landing/gh-series.jpg",
  gxSeries: "/landing/gx-series.jpg",
  cSeries: "/landing/c-series.jpg",
};

export function getLandingImage(key: LandingImageKey) {
  return images[key];
}

export function getLandingWhatsAppMessage(locale: string, product?: ProductItem) {
  const isId = locale === "id";
  const fields = isId ? inquiryFields.id : inquiryFields.en;
  const lines = [
    isId
      ? "Halo PT Adiguna Presisi Nusantara,"
      : "Hello PT Adiguna Presisi Nusantara,",
    "",
    product
      ? isId
        ? "Saya tertarik dengan produk berikut:"
        : "I am interested in the following product:"
      : isId
        ? "Saya ingin konsultasi kebutuhan mesin:"
        : "I would like to consult on a machine requirement:",
  ];

  if (product) {
    lines.push(
      `- ${isId ? "Produk" : "Product"}: ${product.name}`,
      `- ${isId ? "Kategori" : "Category"}: ${product.category}`,
    );
    if (product.specs && product.specs.length > 0) {
      lines.push(`- ${isId ? "Spesifikasi" : "Specification"}: ${product.specs.join(", ")}`);
    }
    lines.push("");
  }

  lines.push(isId ? "Form kebutuhan:" : "Inquiry form:");

  fields.forEach((field) => {
    lines.push(`- ${field}:`);
  });

  lines.push(
    "",
    isId
      ? "Mohon bantuannya untuk rekomendasi mesin, konfigurasi, dan estimasi kebutuhan."
      : "Please help me with the machine recommendation, configuration, and requirement estimate.",
  );

  return lines.join("\n");
}

export function getLandingWhatsAppLink(locale: string, product?: ProductItem) {
  return formatWhatsAppLink(
    landingWhatsAppPhone,
    getLandingWhatsAppMessage(locale, product),
  );
}

export function getLandingProductSlugs() {
  return productSlugs;
}

export function getLandingProduct(locale: string, slug: LandingProductSlug) {
  return getLandingCopy(locale).products.find((product) => product.slug === slug);
}

export function getLandingCopy(locale: string) {
  const isId = locale === "id";

  return {
    locale: isId ? "id" : "en",
    company: "Adiguna Presisi Nusantara",
    shortName: "Adiguna Presisi",
    tagline: "Make Your Dream\nCome True",
    nav: [
      { label: isId ? "Beranda" : "Home", href: "/" },
      { label: isId ? "Produk" : "Product", href: "/product" },
      { label: isId ? "Tentang Kami" : "About", href: "/about" },
      { label: isId ? "Blog" : "Blog", href: "/blog" },
      { label: isId ? "Kontak" : "Contact", href: "/contact" },
    ],
    hero: {
      title: "Precision Machinery & Manufacturing Solutions",
      description: isId
        ? "PT Adiguna Presisi Nusantara adalah penjual mesin CNC premium dan penyedia perkakas presisi di Tangerang / Tangerang Selatan dengan jaminan instalasi serta dukungan teknik ahli."
        : "PT Adiguna Presisi Nusantara is a premium CNC machine supplier and precision tooling provider in Tangerang / South Tangerang with guaranteed installation and expert engineering support.",
      primaryCta: isId ? "Lihat Produk" : "View Products",
      secondaryCta: isId ? "Konsultasi Teknis" : "Technical Consultation",
    },
    stats: [
      {
        value: "CNC",
        label: isId ? "Mesin & Perkakas Bengkel" : "Machines & Workshop Tools",
      },
      {
        value: "OEM",
        label: isId ? "Solusi Industri Presisi" : "Precision Industrial Solutions",
      },
      {
        value: "Ready",
        label: isId ? "Instalasi & Dukungan Teknis" : "Installation & Technical Support",
      },
    ],
    services: [
      {
        title: isId ? "Konsultasi & Pemilihan" : "Consultation & Selection",
        description: isId
          ? "Rekomendasi konfigurasi mesin perkakas dan CNC yang disesuaikan secara presisi dengan kebutuhan kapasitas serta spesifikasi material produksi Anda."
          : "Tailored machine tool and CNC configuration recommendations, precisely optimized for your capacity and material specifications.",
      },
      {
        title: isId ? "Instalasi & Kalibrasi" : "Installation & Calibration",
        description: isId
          ? "Pemasangan presisi, kalibrasi tingkat tinggi, serta pengujian performa mesin secara langsung di lokasi oleh tim engineer berpengalaman."
          : "Precision installation, high-grade calibration, and live performance testing conducted on-site by experienced engineers.",
      },
      {
        title: isId ? "Dukungan & Suku Cadang" : "After-Sales & Spare Parts",
        description: isId
          ? "Pemeliharaan preventif secara berkala, penyelesaian kendala teknis cepat, dan jaminan ketersediaan suku cadang asli untuk kelancaran operasional."
          : "Scheduled preventive maintenance, rapid technical troubleshooting, and guaranteed genuine parts supply to keep production running.",
      },
      {
        title: isId ? "Optimasi & Pelatihan" : "Optimization & Training",
        description: isId
          ? "Pelatihan operator dan konsultasi proses manufaktur untuk memaksimalkan efisiensi produksi, mempercepat cycle time, dan meningkatkan akurasi."
          : "Operator training and manufacturing process consulting to maximize efficiency, accelerate cycle times, and improve precision.",
      },
    ],
    advantages: [
      isId
        ? "Solusi lengkap untuk mesin dan peralatan workshop"
        : "Complete industrial machinery and workshop solutions",
      isId
        ? "Produk premium yang dikustomisasi sesuai target"
        : "Customized premium systems for your targets",
      isId
        ? "Dukungan insinyur ahli dan responsif"
        : "Expert engineering and rapid support",
      isId
        ? "Layanan andal untuk kepuasan jangka panjang"
        : "Reliable service for long-term satisfaction",
    ],
    vision: isId
      ? "Menjadi penyedia mesin industri presisi terdepan dan terpercaya di Indonesia"
      : "To be the leading and most trusted precision industrial machinery provider in Indonesia",
    mission: [
      isId
        ? "Menyediakan mesin manufaktur berkualitas tinggi"
        : "Provide high-quality manufacturing machinery",
      isId
        ? "Memberikan pelayanan profesional dan dukungan teknis cepat"
        : "Deliver professional service and rapid technical support",
      isId
        ? "Meningkatkan efisiensi produksi lewat solusi cerdas"
        : "Boost production efficiency through smart solutions",
      isId
        ? "Membangun kemitraan kokoh jangka panjang"
        : "Build strong, long-term partnerships",
      isId
        ? "Terus berinovasi meningkatkan mutu layanan"
        : "Innovate continuously to raise service quality",
    ],
    values: [
      ["A", "Accountability"],
      ["D", "Dedication"],
      ["I", "Integrity"],
      ["", ""],
      ["G", "Growth"],
      ["U", "Unity"],
      ["N", "Novelty"],
      ["A", "Accuracy"],
    ],
    industries: [
      isId ? "Manufaktur" : "Manufacturing",
      isId ? "Fabrikasi logam" : "Metal fabrication",
      isId ? "Otomotif" : "Automotive",
      isId ? "Workshop engineering" : "Engineering workshop",
      isId ? "Komponen mesin" : "Machine components",
      isId ? "Peralatan industri" : "Industrial equipment",
    ],
    address: [
      "Grand Cendrawasih Asri",
      "Jl. Cendrawasih Kav.5",
      "Desa/Kelurahan Cipayung, Kec. Ciputat",
      "Kota Tangerang Selatan, Banten 15411",
    ],
    products: [
      {
        slug: "vertical-machining-center",
        name: "High Rigidity Vertical Machining Center Series",
        category: "CNC Milling",
        description: isId
          ? "High Rigidity Vertical Machining Center (VMC) Series adalah seri mesin CNC milling vertikal yang dirancang dengan struktur mesin yang sangat kaku dan kokoh sehingga mampu melakukan pemotongan berat, presisi tinggi, dan minim getaran."
          : "High Rigidity Vertical Machining Center (VMC) Series is a vertical CNC milling machine series designed with an extremely rigid and robust structure, capable of heavy cutting, high precision, and minimal vibration.",
        image: "product1",
        specs: [],
      },
      {
        slug: "engraving-milling",
        name: "High Speed Engraving and Milling Machine Series",
        category: "CNC Milling",
        description: isId
          ? "High Speed Engraving and Milling Machine Series adalah seri mesin CNC milling berkecepatan tinggi yang dioptimalkan untuk pekerjaan ukiran, detail halus, dan finishing presisi."
          : "High Speed Engraving and Milling Machine Series is a high-speed CNC milling machine series optimized for engraving, fine detailing, and precision finishing.",
        image: "product2",
        specs: [],
      },
      {
        slug: "precision-lathe",
        name: "Precision Lathe Series",
        category: "CNC Turning",
        description: isId
          ? "CNC Turning Precision Lathe Series adalah seri mesin bubut CNC presisi tinggi yang digunakan untuk memproduksi komponen silinder dengan toleransi ketat dan kualitas permukaan yang baik."
          : "CNC Turning Precision Lathe Series is a high-precision CNC lathe series used to produce cylindrical components with tight tolerances and excellent surface quality.",
        image: "product3",
        specs: [],
      },
      {
        slug: "horizontal-machining-center",
        name: "Horizontal Machining Center Series",
        category: "CNC Milling",
        description: isId
          ? "Horizontal Machining Center (HMC) Series adalah seri mesin CNC machining center dengan spindle horizontal yang dirancang untuk produktivitas tinggi, pemesinan multi-sisi, dan produksi massal."
          : "Horizontal Machining Center (HMC) Series is a CNC machining center series with a horizontal spindle designed for high productivity, multi-sided machining, and mass production.",
        image: "product4",
        specs: [],
      },
      {
        slug: "five-axis-machining",
        name: "Five Axis Machining Center Series",
        category: "CNC Milling",
        description: isId
          ? "Five Axis Machining Center (5-Axis Machining Center) Series adalah seri mesin CNC yang dapat menggerakkan pahat atau benda kerja pada 5 sumbu secara bersamaan,"
          : "Five Axis Machining Center (5-Axis Machining Center) Series is a CNC machine series capable of moving the tool or workpiece along 5 axes simultaneously,",
        image: "product5",
        specs: [],
      },
      {
        slug: "drilling-tapping",
        name: "High Speed Drilling and Tapping Center",
        category: "CNC Milling",
        description: isId
          ? "High Speed Drilling and Tapping Center Series adalah seri mesin CNC yang dioptimalkan untuk proses pengeboran, pembuatan ulir, dan milling ringan dengan kecepatan tinggi serta waktu pergantian tool yang sangat cepat."
          : "High Speed Drilling and Tapping Center Series is a CNC machine series optimized for high-speed drilling, tapping, and light milling with rapid tool change times.",
        image: "product6",
        specs: [],
      },
      {
        slug: "gh-series",
        name: "GH Series",
        category: isId ? "Laser Cutting" : "Laser Cutting",
        description: isId
          ? "Mesin laser cutting berperforma tinggi yang mengutamakan efisiensi, presisi, dan keandalan operasional. Konstruksi kokoh, presisi tinggi, produktivitas optimal, dan biaya operasional efisien."
          : "High-performance laser cutting machine prioritizing efficiency, precision, and operational reliability. Robust construction, high precision, optimal productivity, and efficient operating costs.",
        image: "ghSeries",
        specs: []
      },
      {
        slug: "gx-series",
        name: "GX Series",
        category: isId ? "Laser Cutting" : "Laser Cutting",
        description: isId
          ? "Solusi laser cutting berdaya tinggi untuk pemotongan plat logam tebal dan berukuran besar. Mendukung daya laser tinggi, stabilitas pemotongan maksimal, produktivitas tinggi, dan cocok untuk industri berat."
          : "High-power laser cutting solution for cutting thick and large metal plates. Supports high laser power, maximum cutting stability, high productivity, and is suitable for heavy industry.",
        image: "gxSeries",
        specs: []
      },
      {
        slug: "c-series",
        name: "C Series",
        category: isId ? "Laser Cutting" : "Laser Cutting",
        description: isId
          ? "Mesin fiber laser ekonomis dengan performa andal untuk kebutuhan produksi sehari-hari. Investasi terjangkau, mudah dioperasikan, perawatan sederhana, dan kualitas potong konsisten."
          : "Economical fiber laser machine with reliable performance for daily production needs. Affordable investment, easy to operate, simple maintenance, and consistent cutting quality.",
        image: "cSeries",
        specs: []
      },
    ] satisfies ProductItem[],
    blogPosts: [
      {
        title: isId
          ? "Cara memilih mesin CNC untuk workshop baru"
          : "How to choose a CNC machine for a new workshop",
        excerpt: isId
          ? "Panduan memilih mesin CNC berdasarkan material dan target kapasitas"
          : "Guide to choosing the right CNC machine by material and capacity",
        category: isId ? "Panduan" : "Guide",
      },
      {
        title: isId
          ? "Mengapa dukungan teknis penting setelah pembelian mesin"
          : "Why technical support matters after machine purchase",
        excerpt: isId
          ? "Pentingnya kalibrasi, pengujian, dan pelatihan operator setelah pembelian"
          : "Why calibration, testing, and operator training matter post-purchase",
        category: isId ? "Engineering" : "Engineering",
      },
      {
        title: isId
          ? "Meningkatkan produktivitas fabrikasi logam"
          : "Improving metal fabrication productivity",
        excerpt: isId
          ? "Langkah praktis meningkatkan hasil produksi lewat alur kerja efisien"
          : "Practical steps to boost fabrication output through efficient workflows",
        category: isId ? "Industri" : "Industry",
      },
    ],
  };
}
