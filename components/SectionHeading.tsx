import Reveal from './Reveal';

interface SectionHeadingProps {
  /** Section number, shown as "01". */
  n?: string;
  label: string;
  title: React.ReactNode;
  description?: string;
  /** Narrow columns: put the label above the headline instead of beside it. */
  stacked?: boolean;
  className?: string;
}

/**
 * Editorial heading: a heavy rule, a numbered label in a narrow left column and the headline
 * beside it. (The Canadian site stacks a centred-feel label over the headline.)
 */
export default function SectionHeading({ n, label, title, description, stacked = false, className = '' }: SectionHeadingProps) {
  return (
    <div className={`border-t-[3px] border-silver-50 pt-5 ${className}`}>
      <div className={`grid gap-6 ${stacked ? '' : 'lg:grid-cols-[13rem_1fr] lg:gap-10'}`}>
        <Reveal>
          <p className="section-label">
            {n && <span className="tabular-nums text-silver-50">{n}</span>}
            <span aria-hidden="true" className="h-px w-6 bg-crimson-300" />
            {label}
          </p>
        </Reveal>
        <div>
          <Reveal delay={0.05}>
            <h2 className="max-w-3xl font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-silver-50 text-balance sm:text-4xl lg:text-5xl">
              {title}
            </h2>
          </Reveal>
          {description && (
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-silver-300 sm:text-lg">{description}</p>
            </Reveal>
          )}
        </div>
      </div>
    </div>
  );
}
