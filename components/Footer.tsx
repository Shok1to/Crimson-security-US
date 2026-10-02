import { Wordmark } from "./Logo"
import Link from "next/link"
import { services } from "@/lib/content"
import { addressCityLine, site } from "@/lib/site"
import AccentMark from "./AccentMark"

const company = [
  { label: "Capabilities", href: "/#capabilities" },
  { label: "Why Crimson", href: "/#why-crimson" },
  { label: "Contact", href: "/#contact" },
  { label: "Privacy Policy", href: "/privacy" },
]

export default function Footer() {
  const year = new Date().getFullYear()
  const linkClass = "text-sm text-silver-400 transition-colors hover:text-white"

  return (
    <footer className="relative border-t-[3px] border-crimson-400 bg-ink-950">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1.2fr_1fr_1fr]">
          <div>
            <Link href="/" aria-label="Crimson Security — home" className="inline-block">
              <Wordmark className="h-12" sizes="150px" />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-silver-400">
              {site.tagline}. US information security assessment and consulting.
            </p>

            <h2 className="mt-8 font-display text-xs font-bold uppercase tracking-[0.2em] text-silver-50">
              Headquarters &amp; offices
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm text-silver-400">
              {[`${site.address.locality}, ${site.address.region} (HQ)`, ...site.locations].map((place) => (
                <li key={place} className="flex items-center gap-2.5">
                  <AccentMark className="h-3 w-3 shrink-0 text-crimson-400" />
                  {place}
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Services">
            <h2 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-silver-50">
              Services
            </h2>
            <ul className="mt-5 space-y-3">
              {services.map((s) => (
                <li key={s.id}>
                  <Link href="/#services" className={linkClass}>
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h2 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-silver-50">
              Company
            </h2>
            <ul className="mt-5 space-y-3">
              {company.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-silver-50">
              Contact
            </h2>
            <div className="mt-5 space-y-5 text-sm text-silver-400">
              <ul className="space-y-2">
                {Object.values(site.emails).map((email) => (
                  <li key={email}>
                    <a
                      href={`mailto:${email}`}
                      className="break-all transition-colors hover:text-white"
                    >
                      {email}
                    </a>
                  </li>
                ))}
              </ul>
              <p>
                <a
                  href={`tel:${site.phone.e164}`}
                  className="transition-colors hover:text-white"
                >
                  {site.phone.display}
                </a>
              </p>
              <address className="not-italic leading-relaxed">
                {site.address.street}
                <br />
                {addressCityLine}
              </address>
              <Link
                href="/#contact"
                className="inline-block font-semibold text-crimson-300 transition-colors hover:text-white"
              >
                Send us a message →
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-edge/10 pt-8 sm:flex-row sm:items-center">
          <p className="flex items-center gap-2.5 text-sm text-silver-500">
            <AccentMark className="h-3.5 w-3.5 shrink-0 text-crimson-400" />
            <span>© {year} Crimson Security. All rights reserved.</span>
          </p>
          <Link
            href="/privacy"
            className="text-sm text-silver-500 transition-colors hover:text-white"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  )
}
