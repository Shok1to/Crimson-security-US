import type { SVGProps } from 'react';

/** Path shared with /public/accent-mark.svg (used as a CSS mask for list bullets). */
export const ACCENT_MARK_PATH = 'M50 4 L96 50 L50 96 L4 50 Z';

/** Small diamond glyph used as the section-label, divider and list marker. Decorative by default. */
export default function AccentMark({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...props}
    >
      <path d={ACCENT_MARK_PATH} />
    </svg>
  );
}
