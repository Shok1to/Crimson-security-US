import type { ReactNode } from "react"
import { addressCityLine, site } from "@/lib/site"
import ContactForm from "./ContactForm"
import Reveal from "./Reveal"
import SectionHeading from "./SectionHeading"

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-1.5 border-b border-edge/10 py-5 sm:grid-cols-[6.5rem_1fr] sm:gap-4">
      <dt className="pt-1 font-display text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-silver-500">
        {label}
      </dt>
      <dd className="min-w-0 text-base text-silver-200 [overflow-wrap:anywhere]">
        {children}
      </dd>
    </div>
  )
}

export default function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden bg-ink-950 py-20 lg:py-28"
    >
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[5fr_6fr] lg:gap-20">
        <div>
          <SectionHeading
            stacked
            n="05"
            label="Get in touch"
            title={
              <span id="contact-heading">
                Let&apos;s talk about{" "}
                <span className="text-crimson-gradient">your security.</span>
              </span>
            }
            description="Tell us about your environment and what you need assessed. We'll follow up by email."
          />

          <Reveal delay={0.15}>
            <dl className="mt-10 border-t border-edge/10">
              <Row label="Email">
                <ul className="space-y-1.5">
                  {Object.values(site.emails).map((email) => (
                    <li key={email}>
                      <a
                        href={`mailto:${email}`}
                        className="underline-offset-4 transition-colors hover:text-crimson-300 hover:underline"
                      >
                        {email}
                      </a>
                    </li>
                  ))}
                </ul>
              </Row>
              <Row label="Phone">
                <a
                  href={`tel:${site.phone.e164}`}
                  className="underline-offset-4 transition-colors hover:text-crimson-300 hover:underline"
                >
                  {site.phone.display}
                </a>
              </Row>
              <Row label="Address">
                <address className="not-italic leading-relaxed">
                  {site.address.street}
                  <br />
                  {addressCityLine}
                </address>
              </Row>
              <Row label="Offices">
                <ul className="accent-list space-y-1.5">
                  {site.locations.map((place) => (
                    <li key={place}>{place}</li>
                  ))}
                </ul>
              </Row>
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="border-t-[3px] border-crimson-400 bg-ink-800 p-6 sm:p-9">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
