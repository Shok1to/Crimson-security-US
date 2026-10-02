import { services } from '@/lib/content';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

/**
 * A ruled index of the eight services. (The Canadian site presents them as an illustrated bento
 * grid of cards.) Each row: number, name and discipline, summary, then the specifics.
 */
export default function ServicesGrid() {
  return (
    <section id="services" aria-labelledby="services-heading" className="relative bg-ink-900 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          n="02"
          label="What we do"
          title={
            <span id="services-heading">
              Assess, test, monitor <span className="text-crimson-gradient">and respond.</span>
            </span>
          }
          description="Eight services covering compliance, testing, monitoring and incident response — delivered by certified technicians."
        />

        <ul className="mt-14 border-b border-edge/15">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal as="li" key={service.id} delay={0.03} className="border-t border-edge/15">
                <article className="group relative grid gap-x-10 gap-y-4 py-8 transition-colors hover:bg-edge/[0.04] lg:grid-cols-[3.5rem_minmax(0,1.1fr)_minmax(0,1.3fr)_minmax(0,1fr)] lg:px-4 lg:py-9">
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-crimson-400 transition-transform duration-300 group-hover:scale-y-100"
                  />
                  <p className="font-display text-sm font-bold tabular-nums text-silver-500">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <div>
                    <p className="font-display text-[0.7rem] font-bold uppercase tracking-[0.2em] text-crimson-300">
                      {service.category}
                    </p>
                    <h3 className="mt-2 flex items-start gap-3 font-display text-2xl font-extrabold leading-tight text-silver-50">
                      <Icon className="mt-1 h-6 w-6 shrink-0 text-silver-400" strokeWidth={1.5} aria-hidden="true" />
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-base leading-relaxed text-silver-300">{service.summary}</p>
                  <ul className="flex flex-wrap content-start gap-2">
                    {service.points.map((p) => (
                      <li key={p} className="border border-edge/20 px-2.5 py-1 text-xs font-medium text-silver-200">
                        {p}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
