import type { NextConfig } from "next";
import type { RemotePattern } from "next/dist/shared/lib/image-config";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const isDevelopment = process.env.NODE_ENV === "development";

// ─── URL Helpers ─────────────────────────────────────────────────────────────

function parseOrigin(url: string | undefined): string | null {
  if (!url) return null;
  try {
    return new URL(url.trim()).origin;
  } catch {
    return null;
  }
}

function toRemotePattern(url: string | undefined): RemotePattern | null {
  if (!url) return null;
  try {
    const { protocol, hostname, port } = new URL(url.trim());
    return {
      protocol: protocol.replace(":", "") as "http" | "https",
      hostname,
      ...(port ? { port } : {}),
      pathname: "/**",
    };
  } catch {
    return null;
  }
}

function isLocalhost(url: string | undefined): boolean {
  if (!url) return false;
  try {
    const { hostname } = new URL(url.trim());
    return (
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname.startsWith("127.")
    );
  } catch {
    return false;
  }
}

// ─── Env ─────────────────────────────────────────────────────────────────────

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL?.trim();
const r2PublicUrl =
  process.env.NEXT_PUBLIC_R2_PUBLIC_URL?.trim() ??
  process.env.R2_PUBLIC_URL?.trim() ??
  "https://pub-d746125bb1b6423491682404faec8132.r2.dev";

const apiProxyDestination = parseOrigin(apiBaseUrl);
const isApiLocalhost = isLocalhost(apiBaseUrl);
const allowLocalNetwork = isDevelopment || isApiLocalhost;

// ─── Remote Image Patterns ───────────────────────────────────────────────────

const remoteImagePatterns: RemotePattern[] = [
  // Dev / local API
  { protocol: "http", hostname: "localhost", pathname: "/uploads/**" },
  { protocol: "http", hostname: "127.0.0.1", pathname: "/uploads/**" },
  // Unsplash
  { protocol: "https", hostname: "source.unsplash.com", pathname: "/**" },
  { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
  // API origin & R2 CDN
  ...[apiBaseUrl, r2PublicUrl]
    .map(toRemotePattern)
    .filter(Boolean) as RemotePattern[],
];

// ─── Bundle Analyzer (only when ANALYZE=true) ────────────────────────────────

let withBundleAnalyzer = (config: NextConfig) => config;
if (process.env.ANALYZE === "true") {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  withBundleAnalyzer = require("@next/bundle-analyzer")({ enabled: true });
}

// ─── CSP ─────────────────────────────────────────────────────────────────────
// Build once at startup (not per-request) — avoids repeated string joins.
// For company profiles (mostly static), this policy is intentionally strict.

const csp = [
  "default-src 'self'",
  allowLocalNetwork
    ? "img-src 'self' https: data: blob: http://localhost:* http://127.0.0.1:*"
    : "img-src 'self' https: data: blob:",
  // NOTE: 'unsafe-inline'+'unsafe-eval' required for Next.js hydration.
  // Migrate to nonce-based CSP if a stricter policy is needed.
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "script-src-elem 'self' 'unsafe-inline'",
  "worker-src 'self' blob:",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  allowLocalNetwork
    ? "connect-src 'self' https: wss: ws: http://localhost:* http://127.0.0.1:*"
    : "connect-src 'self' https: wss: ws:",
  "frame-src 'self' https://www.openstreetmap.org/ https://*.openstreetmap.org/ https://carto.com/",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  ...(!isDevelopment ? ["upgrade-insecure-requests"] : []),
].join("; ");

// ─── Config ──────────────────────────────────────────────────────────────────

const nextConfig: NextConfig = {
  poweredByHeader: false,

  // ── Proxy rewrites ─────────────────────────────────────────────────────────
  // Skipped entirely when no API URL is configured, saving a middleware hop.
  ...(apiProxyDestination
    ? {
        async rewrites() {
          return [
            { source: "/api/v1/:path*", destination: `${apiProxyDestination}/api/v1/:path*` },
            { source: "/internal/:path*", destination: `${apiProxyDestination}/internal/:path*` },
            { source: "/uploads/:path*", destination: `${apiProxyDestination}/uploads/:path*` },
          ];
        },
      }
    : {}),

  // ── Headers ────────────────────────────────────────────────────────────────
  async headers() {
    return [
      // ── Security headers (all routes) ──────────────────────────────────────
      {
        source: "/:path*",
        headers: [
          // HSTS — production only
          ...(!isDevelopment
            ? [{ key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" }]
            : []),

          // Standard hardening
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(self), microphone=(), geolocation=(self), fullscreen=(self), payment=(), usb=()",
          },

          // Cross-origin protections (production only — breaks HMR in dev)
          ...(!isDevelopment
            ? [
                { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
                { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
              ]
            : []),
        ],
      },

      ...(isDevelopment
        ? []
        : [
            // ── Static assets — immutable, 1 year ──────────────────────────────
            // Matches hashed filenames produced by Next.js build.
            {
              source: "/_next/static/:path*",
              headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
            },

            // ── Public media assets (images, fonts, icons) ─────────────────────
            {
              source: "/:path*.(ico|png|jpg|jpeg|svg|gif|webp|avif|woff|woff2|ttf|eot)",
              headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
            },

            // ── HTML pages — company profiles change rarely, cache longer ──────
            // FIX: was 1 h (max-age=3600). For mostly-static content, 24 h is fine.
            // CDNs revalidate in the background (stale-while-revalidate).
            // Force-revalidate after a deploy with `next.config` `generateBuildId`.
            {
              source: "/:path((?!_next|api).*)?",
              headers: [
                {
                  key: "Cache-Control",
                  value: "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
                },
              ],
            },
          ]),
    ];
  },

  // ── Images ─────────────────────────────────────────────────────────────────
  images: {
    remotePatterns: remoteImagePatterns,

    // AVIF is great but encoding is slow on first request.
    // For a company profile with a small image set, this is acceptable.
    // Remove "image/avif" and keep only "image/webp" if the server feels slow
    // on first paint (avif can take 2-5× longer to encode than webp).
    formats: ["image/avif", "image/webp"],

    // 1 year TTL for hashed images (unchanged from original)
    minimumCacheTTL: 60 * 60 * 24 * 365,

    // Limit resize variants to reduce on-demand processing.
    // Pick sizes that match your actual <Image> usage in the company profile.
    deviceSizes: [640, 768, 1024, 1280, 1920],
    imageSizes: [64, 128, 256, 384],
  },
};

export default withNextIntl(withBundleAnalyzer(nextConfig));
