import { formatWhatsAppLink } from "@/lib/utils";

export type LandingLocale = "id" | "en";

export type LandingProductSlug =
  | "hf-60200"
  | "dx-870"
  | "hf-4080"
  | "horizontal-boring-mill"
  | "cnc-lathe"
  | "gh-series"
  | "gx-series"
  | "c-series";

export type LandingImageKey =
  | "hero"
  | "productHero"
  | "aboutHero"
  | "precisionGrinder"
  | "machiningCenter"
  | "surfaceGrinder"
  | "boringMill"
  | "lathe"
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
  "hf-60200",
  "dx-870",
  "hf-4080",
  "horizontal-boring-mill",
  "cnc-lathe",
  "gh-series",
  "gx-series",
  "c-series",
];

const images: Record<LandingImageKey, string> = {
  hero: "/landing/hero.webp",
  productHero: "/landing/product-hero-machine3.webp",
  aboutHero: "/landing/about-machine.webp",
  precisionGrinder: "/landing/HF-60200.webp",
  machiningCenter: "/landing/DX-870.webp",
  surfaceGrinder: "/landing/HF-4080.webp",
  lathe: "/landing/GY-1390.webp",
  boringMill: "/landing/Gemini_Generated_Image_8gvhv18gvhv18gvh.webp",
  ghSeries: "/landing/GH series.jpg.jpeg",
  gxSeries: "/landing/GX Series.jpg.jpeg",
  cSeries: "/landing/C Series.jpg.jpeg",
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
      `- ${isId ? "Spesifikasi" : "Specification"}: ${product.specs.join(", ")}`,
      "",
    );
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
        ? "Mesin CNC premium, perkakas presisi, instalasi, dan dukungan teknik ahli untuk industri manufaktur Anda"
        : "Premium CNC machines, precision tooling, expert installation, and engineering support for your manufacturing needs",
      primaryCta: isId ? "Lihat Produk" : "View Products",
      secondaryCta: isId ? "Konsultasi Teknis" : "Technical Consultation",
    },
    stats: [
      {
        value: "CNC",
        label: isId ? "Mesin & Perkakas Bengkel" : "Machines & Workshop Tools",
      },
      {
        value: "-",
        label: isId ? "Dukungan Teknis Total" : "Total Technical Support",
      },
      {
        value: "-",
        label: isId ? "Sektor Industri Utama" : "Key Industrial Sectors",
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
        slug: "hf-60200",
        name: "HF-60200 Precision Grinder",
        category: isId ? "Grinding Machine" : "Grinding Machine",
        description: isId
          ? "Mesin gerinda presisi untuk pengerjaan permukaan material berukuran panjang"
          : "Precision surface grinder designed for long workpiece operations",
        image: "precisionGrinder",
        specs: ["Heavy-duty bed", "Long travel", "Stable finishing"],
      },
      {
        slug: "dx-870",
        name: "DX-870 Machining Center",
        category: isId ? "CNC Machining" : "CNC Machining",
        description: isId
          ? "Vertical machining center untuk komponen dengan akurasi berulang"
          : "High-speed vertical machining center for high-accuracy components",
        image: "machiningCenter",
        specs: ["VMC enclosure", "Digital control", "Production ready"],
      },
      {
        slug: "hf-4080",
        name: "HF-4080 Surface Grinder",
        category: isId ? "Surface Grinding" : "Surface Grinding",
        description: isId
          ? "Solusi gerinda datar otomatis untuk kerataan material yang sempurna"
          : "Automatic surface grinding solution for perfect material flatness",
        image: "surfaceGrinder",
        specs: ["Fine tolerance", "Workshop fit", "Clean surface"],
      },
      {
        slug: "horizontal-boring-mill",
        name: "Horizontal Boring Mill",
        category: isId ? "Heavy Machining" : "Heavy Machining",
        description: isId
          ? "Mesin boring dan milling berkapasitas besar untuk suku cadang raksasa"
          : "Heavy-duty boring and milling machine for extra-large workpieces",
        image: "boringMill",
        specs: ["Large component", "Rigid table", "Industrial scale"],
      },
      {
        slug: "cnc-lathe",
        name: "CNC Lathe System",
        category: isId ? "Turning Center" : "Turning Center",
        description: isId
          ? "Sistem mesin bubut CNC otomatis untuk fabrikasi silindris massal"
          : "High-speed automated CNC lathe for mass cylindrical production",
        image: "lathe",
        specs: ["Turning center", "High repeatability", "Operator friendly"],
      },
      {
        slug: "gh-series",
        name: "GH Series",
        category: isId ? "Laser Cutting" : "Laser Cutting",
        description: isId
          ? "Mesin laser cutting berperforma tinggi yang mengutamakan efisiensi, presisi, dan keandalan operasional."
          : "High-performance laser cutting machine prioritizing efficiency, precision, and operational reliability.",
        image: "ghSeries",
        specs: isId
          ? [
              "Konstruksi kokoh",
              "Presisi tinggi",
              "Produktivitas optimal",
              "Biaya operasional efisien",
            ]
          : [
              "Robust construction",
              "High precision",
              "Optimal productivity",
              "Efficient operating costs",
            ],
      },
      {
        slug: "gx-series",
        name: "GX Series",
        category: isId ? "Laser Cutting" : "Laser Cutting",
        description: isId
          ? "Solusi laser cutting berdaya tinggi untuk pemotongan plat logam tebal dan berukuran besar."
          : "High-power laser cutting solution for cutting thick and large metal plates.",
        image: "gxSeries",
        specs: isId
          ? [
              "Mendukung daya laser tinggi",
              "Stabilitas pemotongan maksimal",
              "Produktivitas tinggi",
              "Cocok untuk industri berat",
            ]
          : [
              "Supports high laser power",
              "Maximum cutting stability",
              "High productivity",
              "Suitable for heavy industry",
            ],
      },
      {
        slug: "c-series",
        name: "C Series",
        category: isId ? "Laser Cutting" : "Laser Cutting",
        description: isId
          ? "Mesin fiber laser ekonomis dengan performa andal untuk kebutuhan produksi sehari-hari."
          : "Economical fiber laser machine with reliable performance for daily production needs.",
        image: "cSeries",
        specs: isId
          ? [
              "Investasi terjangkau",
              "Mudah dioperasikan",
              "Perawatan sederhana",
              "Kualitas potong konsisten",
            ]
          : [
              "Affordable investment",
              "Easy to operate",
              "Simple maintenance",
              "Consistent cut quality",
            ],
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
