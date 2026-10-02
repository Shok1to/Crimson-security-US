import { company, story } from '@/lib/content';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

/**
 * Three ruled columns, numbered. (The Canadian site alternates two-column rows with an
 * illustration card beside each point; here the policies read as a single spread.)
 */
export default function StorySection() {
  return (
    <section
      id="story"
      aria-labelledby="story-heading"
      className="theme-light relative bg-ink-900 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          n="01"
          label="The approach"
          title={
            <span id="story-heading">
              Thorough by policy, <span className="text-crimson-gradient">practical by design.</span>
            </span>
          }
          description={company.intro}
        />

        <div className="mt-14 grid gap-px bg-edge/15 md:grid-cols-3">
          {story.map((item, i) => (
            <Reveal as="article" key={item.n} delay={i * 0.08} className="bg-ink-900 p-0 md:px-8 md:first:pl-0 md:last:pr-0">
              <div className="h-full bg-ink-900 pb-10 pt-8 md:py-4">
                <p className="font-display text-6xl font-extrabold leading-none tabular-nums text-crimson-300">
                  {item.n}
                </p>
                <p className="mt-6 font-display text-xs font-bold uppercase tracking-[0.2em] text-silver-400">
                  {item.eyebrow}
                </p>
                <h3 className="mt-3 font-display text-2xl font-extrabold leading-tight text-silver-50">
                  {item.title}
                </h3>
                <ul className="accent-list mt-6 space-y-3 text-base text-silver-200">
                  {item.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
