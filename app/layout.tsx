import type { Metadata, Viewport } from "next"
import { Archivo, Inter } from "next/font/google"
import ChatWidget from "@/components/ChatWidget"
import Script from "next/script"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Providers from "@/components/Providers"
import JsonLd from "@/components/JsonLd"
import { organizationJsonLd, websiteJsonLd } from "@/lib/jsonld"
import { site } from "@/lib/site"
import "./globals.css"

const display = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
})

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const title = `${site.name} — ${site.tagline}`

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    title,
    description: site.description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: "#0d0d0d",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
}

/** Pixel is opt-in per deployment; the Canadian sibling's pixel must not follow this code to the US site. */
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-US" className={`${display.variable} ${sans.variable}`}>
      <body>
        <JsonLd data={[organizationJsonLd, websiteJsonLd]} />
        {/* Scroll reveals start hidden; without JS, show everything. */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>

        {META_PIXEL_ID && (
          <>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
          </>
        )}

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-crimson-500 focus:px-4 focus:py-2 focus:font-display focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>

        <Providers>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <ChatWidget />
        </Providers>
      </body>
    </html>
  )
}