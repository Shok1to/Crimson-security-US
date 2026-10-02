import Image from 'next/image';

/**
 * Official Crimson Security (US) logo, supplied by the client.
 *
 * The master is maroon on white. `dark` is the same artwork recoloured for black backgrounds
 * (wordmark in the brand crimson, tagline in silver) with the white ground removed; `light`
 * keeps the original maroon and grey on a transparent ground for white sections.
 */
export function Wordmark({
  tone = 'dark',
  className = '',
  priority = false,
  sizes,
}: {
  tone?: 'dark' | 'light';
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <Image
      src={tone === 'dark' ? '/crimson-security-logo-dark.png' : '/crimson-security-logo.png'}
      alt="Crimson Security — Practical Information Security"
      width={1720}
      height={558}
      priority={priority}
      sizes={sizes}
      className={`h-auto w-auto ${className}`}
    />
  );
}

/** The wordmark's "C" on its own, for places too small or too square for the full logo. */
export function CMark({ className = '' }: { className?: string }) {
  return (
    <Image
      src="/crimson-security-c.png"
      alt=""
      width={118}
      height={350}
      className={`w-auto object-contain ${className}`}
    />
  );
}
