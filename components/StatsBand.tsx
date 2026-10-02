import { stats } from '@/lib/content';
import CountUp from './CountUp';
import Reveal from './Reveal';

/**
 * Four ruled cells between two heavy crimson rules, numbers left-aligned. (The Canadian site is a
 * full-bleed crimson band with centred figures and leaf dividers.)
 */
export default function StatsBand() {
  return (
    <section aria-label="Crimson Security by the numbers" className="bg-ink-950">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <dl className="grid grid-cols-2 border-y-[3px] border-crimson-400 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.05}
              className="border-edge/15 px-0 py-10 odd:border-r lg:border-r lg:px-8 lg:py-12 lg:first:pl-0 lg:last:border-r-0"
            >
              <div className="flex flex-col-reverse">
                <dt className="mt-3 max-w-[14rem] font-display text-xs font-bold uppercase leading-relaxed tracking-[0.18em] text-silver-400">
                  {stat.label}
                </dt>
                <dd className="pl-0 font-display text-5xl font-extrabold leading-none tabular-nums text-silver-50 sm:text-6xl max-sm:pl-0">
                  <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} tail={stat.tail} />
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
