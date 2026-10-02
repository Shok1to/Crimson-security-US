import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { company, supportHours } from '@/lib/content';
import HeroBackground from './HeroBackground';

/** CSS-only entrance so the headline (LCP) never waits on hydration. */
const rise = (delay: number) => ({ animationDelay: `${delay}s` });

const frameworks = ['PCI DSS', 'ISO 27002', 'HIPAA', 'GLBA', 'NIST 800-53', 'FERC / NERC'];

/**
 * Left-aligned, two-column hero: headline and actions on the left, a "scope sheet" on the right.
 * (The Canadian hero is a centred stack under an animated glow.)
 */
export default function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden pb-20 pt-40 lg:pb-28 lg:pt-48"
    >
      <HeroBackground />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
        <div>
          <p className="animate-rise section-label" style={rise(0.05)}>
            <span aria-hidden="true" className="h-[3px] w-10 bg-crimson-400" />
            Information security assessments
          </p>

          <h1
            id="hero-heading"
            className="animate-rise mt-6 font-display text-[2.6rem] font-extrabold uppercase leading-[0.98] tracking-tight text-silver-50 text-balance sm:text-6xl lg:text-7xl"
            style={rise(0.15)}
          >
            Find the gaps <span className="text-crimson-gradient">before they find you.</span>
          </h1>

          <p
            className="animate-rise mt-7 max-w-xl text-base leading-relaxed text-silver-300 sm:text-lg"
            style={rise(0.3)}
          >
            US information security assessments and consulting — PCI and compliance, penetration testing,
            monitoring and incident response, delivered by CISSP- and GIAC-certified technicians.
          </p>

          <div className="animate-rise mt-9 flex flex-col gap-3 sm:flex-row" style={rise(0.45)}>
            <Link href="/#contact" className="btn btn-primary">
              Get in touch
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/#services" className="btn btn-ghost">
              See the services
            </Link>
          </div>

          <dl
            className="animate-rise mt-12 grid max-w-xl grid-cols-3 gap-6 border-t border-edge/15 pt-6"
            style={rise(0.6)}
          >
            {[
              ['Est.', String(company.established)],
              ['QSA since', String(company.qsaSince)],
              ['Support', supportHours.days.length === 5 ? 'Mon–Fri' : 'Daily'],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="font-display text-[0.65rem] font-bold uppercase tracking-[0.2em] text-silver-500">
                  {k}
                </dt>
                <dd className="mt-1 whitespace-nowrap font-display text-xl font-extrabold tabular-nums text-silver-50 sm:text-2xl">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <aside
          aria-label="Frameworks we assess against"
          className="animate-rise border-2 border-silver-50/80 bg-ink-900"
          style={rise(0.35)}
        >
          <div className="flex items-center justify-between bg-silver-50 px-5 py-3 text-ink-950">
            <p className="font-display text-xs font-extrabold uppercase tracking-[0.2em]">Assessment scope</p>
            <p className="font-display text-xs font-bold tabular-nums">{frameworks.length} frameworks</p>
          </div>
          <ul className="divide-y divide-edge/10">
            {frameworks.map((f) => (
              <li key={f} className="flex items-center justify-between px-5 py-4">
                <span className="font-display text-lg font-bold text-silver-50">{f}</span>
                <span className="inline-flex h-6 w-6 items-center justify-center bg-crimson-400 text-white">
                  <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
                </span>
              </li>
            ))}
          </ul>
          <p className="border-t-2 border-crimson-400 px-5 py-3 text-xs text-silver-400">
            Plus SOC audits through partner accounting firms.
          </p>
        </aside>
      </div>
    </section>
  );
}
