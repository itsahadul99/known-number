import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { Noto_Sans_Bengali } from "next/font/google";
import { SettingsProvider } from "@/lib/settings-context";
import { SkipLink } from "@/components/layout/SkipLink";
import { SettingsModal } from "@/components/layout/SettingsModal";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/seo";

const bengaliFont = Noto_Sans_Bengali({
  subsets: ["bengali", "latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-bengali",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0A4F8A",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "scam drill",
    "scam rehearsal",
    "elder fraud prevention",
    "phone scam practice",
    "bKash fraud",
    "OTP scam",
    "প্রতারণা প্রতিরোধ",
    "বিকাশ প্রতারণা",
    "cybersecurity for seniors",
    "known number",
  ],
  authors: [{ name: "Known Number Team" }],
  creator: "Known Number Team",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    url: "/",
    locale: "en_US",
    alternateLocale: ["bn_BD"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: { telephone: false },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: ["en", "bn"],
    },
    {
      "@type": "WebApplication",
      "@id": `${SITE_URL}/#app`,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any (web browser)",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      inLanguage: ["en", "bn"],
      isAccessibleForFree: true,
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={bengaliFont.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <meta
          name="google-site-verification"
          content="mi80PnyMPzK68cv7mBrERzZwVldcMCqOwE6VDy-McKQ"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-paper text-ink selection:bg-signal-blue-light selection:text-ink">
        <SettingsProvider>
          <SkipLink />

          <div id="main-content" className="flex flex-col flex-1">
            {children}
          </div>

          <SettingsModal />
        </SettingsProvider>
      </body>
    </html>
  );
}
