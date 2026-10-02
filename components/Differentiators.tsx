import { differentiators } from '@/lib/content';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

/**
 * A two-column numbered ledger on plain white. (The Canadian site shows nine icon-led items in a
 * three-column open grid on a tinted field.)
 */
export default function Differentiators() {
  return (
    <section
      id="why-crimson"
      aria-labelledby="why-heading"
      className="theme-light relative bg-ink-900 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          n="04"
          label="Why Crimson"
          title={
            <span id="why-heading">
              Nine commitments behind <span className="text-crimson-gradient">every engagement.</span>
            </span>
          }
        />

        <ol className="mt-14 grid md:grid-cols-2 md:gap-x-16">
          {differentiators.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal as="li" key={item.title} delay={0.02} className="border-t border-edge/20 py-7">
                <div className="grid grid-cols-[2.5rem_1fr_auto] items-start gap-4">
                  <span className="font-display text-sm font-bold tabular-nums text-crimson-300">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-extrabold leading-snug text-silver-50">{item.title}</h3>
                    <p className="mt-1.5 max-w-md text-sm leading-relaxed text-silver-400">{item.description}</p>
                  </div>
                  <Icon className="h-6 w-6 text-silver-500" strokeWidth={1.5} aria-hidden="true" />
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
