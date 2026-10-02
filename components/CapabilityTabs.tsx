'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState, type KeyboardEvent } from 'react';
import { capabilityTabs, services, type CapabilityTab } from '@/lib/content';
import { AssessVisual, MonitorVisual, RespondVisual, TestVisual } from './CapabilityVisuals';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

const visuals: Record<CapabilityTab['id'], () => JSX.Element> = {
  assess: AssessVisual,
  test: TestVisual,
  monitor: MonitorVisual,
  respond: RespondVisual,
};

export default function CapabilityTabs() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = capabilityTabs[active];
  const Visual = visuals[current.id];

  const select = (index: number) => {
    const next = (index + capabilityTabs.length) % capabilityTabs.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        select(active + 1);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        select(active - 1);
        break;
      case 'Home':
        e.preventDefault();
        select(0);
        break;
      case 'End':
        e.preventDefault();
        select(capabilityTabs.length - 1);
        break;
    }
  };

  return (
    <section id="capabilities" aria-labelledby="capabilities-heading" className="relative overflow-hidden bg-ink-800 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          n="03"
          label="Capabilities"
          title={
            <span id="capabilities-heading">
              From first assessment to <span className="text-crimson-gradient">incident response.</span>
            </span>
          }
          description="Pick a discipline to see how we approach it."
        />

        <Reveal delay={0.1} className="mt-14">
          <div>
            {/* Tab bar: a ruled strip along the top of the panel (the Canadian site uses a side rail of boxed tabs). */}
            <div
              role="tablist"
              aria-label="Service categories"
              onKeyDown={onKeyDown}
              className="-mx-5 flex overflow-x-auto border-b border-edge/20 px-5 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
            >
              {capabilityTabs.map((tab, i) => {
                const selected = i === active;
                return (
                  <button
                    key={tab.id}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    role="tab"
                    id={`tab-${tab.id}`}
                    aria-selected={selected}
                    aria-controls={selected ? `panel-${tab.id}` : undefined}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(i)}
                    className={`relative flex shrink-0 items-center gap-3 px-5 py-4 text-left font-display transition-colors duration-200 lg:flex-1 ${
                      selected ? 'bg-silver-50 text-ink-950' : 'text-silver-400 hover:bg-edge/5 hover:text-silver-50'
                    }`}
                  >
                    <span className={`text-xs font-bold tabular-nums ${selected ? 'text-crimson-500' : 'text-silver-500'}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="whitespace-nowrap text-sm font-bold uppercase tracking-[0.1em]">{tab.label}</span>
                    {selected && (
                      <motion.span
                        layoutId="tab-indicator"
                        aria-hidden="true"
                        className="absolute inset-x-0 -bottom-px h-[3px] bg-crimson-400"
                        transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Panel */}
            <div className="relative min-h-[30rem] overflow-hidden border-x border-b border-edge/20 bg-ink-900">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.id}
                  role="tabpanel"
                  id={`panel-${current.id}`}
                  aria-labelledby={`tab-${current.id}`}
                  tabIndex={0}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="grid items-center gap-10 p-6 sm:p-10 lg:grid-cols-[1.1fr_0.9fr]"
                >
                  <div>
                    <h3 className="font-display text-2xl font-bold leading-snug text-silver-50 sm:text-3xl">
                      {current.headline}
                    </h3>
                    <p className="mt-4 leading-relaxed text-silver-300">{current.description}</p>

                    <ul className="accent-list mt-6 space-y-2 text-silver-200">
                      {current.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>

                    <div className="mt-8 space-y-3">
                      {current.services.map((id) => {
                        const svc = services.find((s) => s.id === id)!;
                        const Icon = svc.icon;
                        return (
                          <div
                            key={id}
                            className="flex items-start gap-4 border-l-[3px] border-crimson-400 bg-edge/[0.04] p-4"
                          >
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center text-silver-200">
                              <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                            </span>
                            <span>
                              <span className="block font-display text-sm font-semibold text-silver-50">
                                {svc.title}
                              </span>
                              <span className="mt-0.5 block text-sm text-silver-400">
                                {svc.points.join(' · ')}
                              </span>
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="relative">
                    <div className="relative">
                      <Visual />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
