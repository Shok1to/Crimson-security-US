"use client"

import Link from "next/link"
import { Menu, Phone, X } from "lucide-react"
import { useEffect, useState } from "react"
import { navLinks, site } from "@/lib/site"
import { Wordmark } from "./Logo"

/**
 * Two tiers on a solid black bar: a thin utility strip (phone and headquarters) above the main
 * bar. The Canadian site uses a single transparent bar that frosts on scroll.
 */
export default function Header() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <div className="fixed inset-x-0 top-0 z-50 bg-ink-950">
      <div className="border-b border-edge/10 text-[0.72rem] font-medium tracking-wide text-silver-400">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
          <p className="hidden sm:block">
            Headquartered in {site.address.locality}, {site.address.region}
            <span aria-hidden="true" className="mx-2 text-crimson-400">/</span>
            PCI QSA company since 2006
          </p>
          <a
            href={`tel:${site.phone.e164}`}
            className="ml-auto inline-flex items-center gap-2 font-semibold text-silver-100 transition-colors hover:text-crimson-300"
          >
            <Phone className="h-3.5 w-3.5 text-crimson-400" aria-hidden="true" />
            {site.phone.display}
          </a>
        </div>
      </div>

      <header className="relative border-b-2 border-crimson-400">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
          <Link
            href="/"
            aria-label="Crimson Security — home"
            onClick={() => setOpen(false)}
            className="shrink-0"
          >
            <Wordmark priority className="h-9 sm:h-11" sizes="150px" />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 font-display text-xs font-bold uppercase tracking-[0.16em] text-silver-300 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/#contact" className="btn btn-primary ml-3 !px-4 !py-2 !text-xs">
              Get in touch
            </Link>
          </nav>

          <button
            type="button"
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center text-silver-100 transition-colors hover:text-crimson-300 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {open && (
          <nav
            id="mobile-nav"
            aria-label="Mobile"
            className="border-t border-edge/10 bg-ink-950 px-5 pb-6 pt-2 md:hidden"
          >
            <ul className="flex flex-col">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-edge/10 py-4 font-display text-base font-bold uppercase tracking-[0.12em] text-silver-100"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>
    </div>
  )
}
