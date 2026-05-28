export type LandingLocale = "id" | "en";

export type LandingImageKey =
  | "hero"
  | "productHero"
  | "aboutHero"
  | "precisionGrinder"
  | "machiningCenter"
  | "surfaceGrinder"
  | "boringMill"
  | "lathe";

export type ProductItem = {
  name: string;
  category: string;
  description: string;
  image: LandingImageKey;
  specs: string[];
};

const images: Record<LandingImageKey, string> = {
  hero: "/landing/hero-machine.svg",
  productHero: "/landing/product-hero-machine.svg",
  aboutHero: "/landing/about-machine.svg",
  precisionGrinder: "/landing/precision-grinder.svg",
  machiningCenter: "/landing/machining-center.svg",
  surfaceGrinder: "/landing/surface-grinder.svg",
  boringMill: "/landing/boring-mill.svg",
  lathe: "/landing/cnc-lathe.svg",
};

const imagePrompts: Record<LandingImageKey, string> = {
  hero:
    "Hyperrealistic 8k studio photograph of one premium CNC manufacturing machine as the only main object, white and dark graphite body, soft directional light, clean industrial background, shallow depth of field, luxury company profile mood, no text, no people, no logo.",
  productHero:
    "Hyperrealistic 8k product photograph of one large precision machining center, isolated as the main object in a minimal industrial studio, graphite wall, clean floor reflection, premium catalog lighting, no text, no people, no logo.",
  aboutHero:
    "Hyperrealistic 8k editorial photograph of one precision manufacturing machine in a clean workshop, machine is the only dominant object, elegant white space, natural industrial light, premium company profile tone, no text, no people, no logo.",
  precisionGrinder:
    "Hyperrealistic 8k product photograph of one horizontal precision grinder machine, white body with black base, centered object, clean graphite studio background, premium machinery catalog lighting, no text, no logo.",
  machiningCenter:
    "Hyperrealistic 8k product photograph of one vertical CNC machining center, white and black enclosure, single object focus, subtle yellow studio accent, high detail metal texture, no text, no logo.",
  surfaceGrinder:
    "Hyperrealistic 8k product photograph of one surface grinding machine, white industrial body, isolated object focus, modern dark manufacturing backdrop, soft shadow, no text, no logo.",
  boringMill:
    "Hyperrealistic 8k product photograph of one horizontal boring mill machine, white and graphite industrial body, single object focus, clean studio lighting, no text, no logo.",
  lathe:
    "Hyperrealistic 8k product photograph of one CNC lathe machine, white enclosure with dark glass door, single object focus, minimal industrial studio, premium reflection, no text, no logo.",
};

export function getLandingImage(key: LandingImageKey) {
  return images[key];
}

export function getLandingImagePrompt(key: LandingImageKey) {
  return imagePrompts[key];
}

export function getLandingCopy(locale: string) {
  const isId = locale === "id";

  return {
    locale: isId ? "id" : "en",
    company: "PT Adiguna Presisi Nusantara",
    shortName: "Adiguna Presisi",
    tagline: isId ? "Make your dream come true" : "Make your dream come true",
    nav: [
      { label: isId ? "Beranda" : "Home", href: "/" },
      { label: isId ? "Produk" : "Product", href: "/product" },
      { label: isId ? "Tentang Kami" : "About", href: "/about" },
      { label: isId ? "Blog" : "Blog", href: "/blog" },
      { label: isId ? "Kontak" : "Contact", href: "/contact" },
    ],
    hero: {
      eyebrow: isId ? "Precision Machinery" : "Precision Machinery",
      title: isId
        ? "Solusi mesin industri untuk produksi yang presisi."
        : "Industrial machinery solutions for precise production.",
      description: isId
        ? "Penyedia mesin CNC, mesin perkakas workshop, tooling machining, instalasi, konsultasi, dan engineering support untuk kebutuhan manufaktur Indonesia."
        : "Provider of CNC machines, workshop machine tools, machining tooling, installation, consultation, and engineering support for Indonesian manufacturing.",
      primaryCta: isId ? "Lihat Produk" : "View Products",
      secondaryCta: isId ? "Konsultasi Mesin" : "Machine Consultation",
    },
    stats: [
      {
        value: "CNC",
        label: isId ? "Mesin dan perkakas workshop" : "Machines and workshop tools",
      },
      {
        value: "360",
        label: isId ? "Dukungan teknis dari awal sampai akhir" : "Technical support from start to finish",
      },
      {
        value: "7+",
        label: isId ? "Sektor industri yang dilayani" : "Industrial sectors served",
      },
    ],
    services: [
      {
        title: isId ? "Konsultasi Pemilihan Mesin" : "Machine Selection Consultation",
        description: isId
          ? "Membantu pelanggan menentukan mesin yang sesuai dengan kapasitas, material, dan target produksi."
          : "Helping customers choose machines that match capacity, material, and production goals.",
      },
      {
        title: isId ? "Instalasi Mesin" : "Machine Installation",
        description: isId
          ? "Pemasangan dan pengaturan mesin di lokasi pelanggan dengan proses kerja yang rapi."
          : "Machine setup and commissioning at customer sites with a clean working process.",
      },
      {
        title: isId ? "After Sales Support" : "After Sales Support",
        description: isId
          ? "Dukungan teknis untuk penggunaan mesin dan optimalisasi proses produksi."
          : "Technical support for machine operation and production process optimization.",
      },
    ],
    advantages: [
      isId
        ? "Solusi lengkap untuk kebutuhan mesin dan peralatan workshop industri."
        : "Complete solutions for industrial machines and workshop equipment.",
      isId
        ? "Produk berkualitas yang disesuaikan dengan kebutuhan pelanggan."
        : "Quality products tailored to customer needs.",
      isId
        ? "Dukungan teknis dan engineering yang profesional."
        : "Professional technical and engineering support.",
      isId
        ? "Komitmen terhadap pelayanan dan kepuasan pelanggan."
        : "Committed to service quality and customer satisfaction.",
    ],
    vision: isId
      ? "Menjadi perusahaan penyedia mesin industri dan solusi manufaktur yang terpercaya, profesional, dan berdaya saing tinggi di Indonesia."
      : "To become a trusted, professional, and highly competitive provider of industrial machines and manufacturing solutions in Indonesia.",
    mission: [
      isId
        ? "Menyediakan mesin industri dan peralatan manufaktur yang berkualitas dan andal."
        : "Provide quality and reliable industrial machinery and manufacturing equipment.",
      isId
        ? "Memberikan pelayanan profesional serta dukungan teknis terbaik kepada pelanggan."
        : "Deliver professional service and best-in-class technical support.",
      isId
        ? "Membantu meningkatkan efisiensi dan produktivitas industri melalui solusi teknologi yang tepat."
        : "Improve industrial efficiency and productivity through the right technology solutions.",
      isId
        ? "Membangun kerja sama jangka panjang dengan pelanggan dan mitra bisnis."
        : "Build long-term cooperation with customers and business partners.",
      isId
        ? "Terus berkembang melalui inovasi dan peningkatan kualitas layanan."
        : "Grow through innovation and continuous service improvement.",
    ],
    values: [
      ["A", "Accountability"],
      ["D", "Dedication"],
      ["I", "Integrity"],
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
        name: "HF-60200 Precision Grinder",
        category: isId ? "Grinding Machine" : "Grinding Machine",
        description: isId
          ? "Mesin gerinda presisi untuk kebutuhan workshop industri dengan area kerja panjang dan stabil."
          : "Precision grinding machine for industrial workshop needs with long and stable working area.",
        image: "precisionGrinder",
        specs: ["Heavy-duty bed", "Long travel", "Stable finishing"],
      },
      {
        name: "DX-870 Machining Center",
        category: isId ? "CNC Machining" : "CNC Machining",
        description: isId
          ? "Vertical machining center untuk proses produksi komponen yang membutuhkan akurasi berulang."
          : "Vertical machining center for component production that requires repeatable accuracy.",
        image: "machiningCenter",
        specs: ["VMC enclosure", "Digital control", "Production ready"],
      },
      {
        name: "HF-4080 Surface Grinder",
        category: isId ? "Surface Grinding" : "Surface Grinding",
        description: isId
          ? "Solusi grinding permukaan untuk hasil akhir presisi pada material logam."
          : "Surface grinding solution for precise finishing on metal materials.",
        image: "surfaceGrinder",
        specs: ["Fine tolerance", "Workshop fit", "Clean surface"],
      },
      {
        name: "Horizontal Boring Mill",
        category: isId ? "Heavy Machining" : "Heavy Machining",
        description: isId
          ? "Mesin untuk pekerjaan boring dan milling pada komponen berukuran besar."
          : "Machine for boring and milling jobs on large-sized components.",
        image: "boringMill",
        specs: ["Large component", "Rigid table", "Industrial scale"],
      },
      {
        name: "CNC Lathe System",
        category: isId ? "Turning Center" : "Turning Center",
        description: isId
          ? "Sistem turning untuk produksi komponen silindris dengan efisiensi tinggi."
          : "Turning system for efficient production of cylindrical components.",
        image: "lathe",
        specs: ["Turning center", "High repeatability", "Operator friendly"],
      },
    ] satisfies ProductItem[],
    blogPosts: [
      {
        title: isId
          ? "Cara memilih mesin CNC untuk workshop baru"
          : "How to choose a CNC machine for a new workshop",
        excerpt: isId
          ? "Mulai dari jenis material, volume produksi, area kerja, hingga kebutuhan after sales."
          : "From material type and production volume to working area and after sales needs.",
        category: isId ? "Panduan" : "Guide",
      },
      {
        title: isId
          ? "Mengapa dukungan teknis penting setelah pembelian mesin"
          : "Why technical support matters after machine purchase",
        excerpt: isId
          ? "Mesin yang tepat perlu diikuti instalasi, setting, dan pendampingan penggunaan."
          : "The right machine should be followed by installation, setup, and operational assistance.",
        category: isId ? "Engineering" : "Engineering",
      },
      {
        title: isId
          ? "Meningkatkan produktivitas fabrikasi logam"
          : "Improving metal fabrication productivity",
        excerpt: isId
          ? "Efisiensi lahir dari kombinasi tooling, operator, mesin, dan proses yang tepat."
          : "Efficiency comes from the right combination of tooling, operators, machines, and process.",
        category: isId ? "Industri" : "Industry",
      },
    ],
  };
}
