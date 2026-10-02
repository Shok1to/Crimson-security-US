import type { Config } from 'tailwindcss';

/**
 * Palette is sampled directly from crimson-security-logo.png:
 *  - crimson: wordmark gradient (#570000 -> #a10005) up to the maple-leaf highlight (#e3220f)
 *  - silver:  the shield's "C" (#c6c6c5 -> #fefdfd)
 *  - ink:     near-black site base (#0d0d0d)
 */
const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Theme-aware (dark by default, flipped inside `.theme-light` — see globals.css).
        ink: {
          DEFAULT: v('ink-900'),
          950: v('ink-950'),
          900: v('ink-900'),
          800: v('ink-800'),
          700: v('ink-700'),
          600: v('ink-600'),
          500: v('ink-500'),
        },
        silver: {
          50: v('silver-50'),
          100: v('silver-100'),
          200: v('silver-200'),
          300: v('silver-300'),
          400: v('silver-400'),
          500: v('silver-500'),
          600: v('silver-600'),
        },
        /** Hairlines / faint fills: white on dark sections, near-black on light ones. */
        edge: v('edge'),
        crimson: {
          950: '#2a0000',
          900: '#3d0000',
          800: '#570000',
          700: '#750001',
          600: '#a10005',
          500: '#c4100f',
          400: '#e3220f',
          // text-accent shade: bright on dark, deepened on light for contrast
          300: v('crimson-300'),
        },
      },
      /**
       * US edition: squared-off corners everywhere (the Canadian site is soft and rounded).
       * Overriding the scale here changes every component at once; rounded-full is untouched.
       */
      borderRadius: {
        none: '0',
        sm: '0',
        DEFAULT: '0',
        md: '0',
        lg: '2px',
        xl: '2px',
        '2xl': '3px',
        '3xl': '4px',
      },
      fontFamily: {
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        // Flat fills: the US edition drops the Canadian site's gradient buttons.
        'crimson-gradient': 'linear-gradient(#c4100f, #c4100f)',
        'crimson-button': 'linear-gradient(#c4100f, #c4100f)',
        'crimson-button-hover': 'linear-gradient(#e3220f, #e3220f)',
        'silver-line':
          'linear-gradient(90deg, transparent, rgba(198,198,197,0.55) 50%, transparent)',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        'card-sm': 'var(--shadow-sm)',
        'crimson-glow': 'var(--shadow-glow)',
        // Hard offset instead of a soft glow.
        'crimson-cta': '4px 4px 0 0 rgba(254,253,253,0.16)',
        'crimson-cta-hover': '6px 6px 0 0 rgba(254,253,253,0.28)',
      },
      keyframes: {
        'glow-a': {
          '0%, 100%': { transform: 'translate3d(-4%, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(4%, 5%, 0) scale(1.12)' },
        },
        'glow-b': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1.05)' },
          '50%': { transform: 'translate3d(-6%, -4%, 0) scale(0.92)' },
        },
        float: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -8px, 0)' },
        },
        pixel: {
          '0%, 100%': { opacity: '0.15' },
          '50%': { opacity: '0.9' },
        },
        sweep: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'dash-flow': {
          to: { strokeDashoffset: '-24' },
        },
        'ping-soft': {
          '0%': { transform: 'scale(1)', opacity: '0.6' },
          '80%, 100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        rise: {
          from: { opacity: '0', transform: 'translate3d(0, 24px, 0)' },
          to: { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
      },
      animation: {
        'glow-a': 'glow-a 16s ease-in-out infinite',
        'glow-b': 'glow-b 20s ease-in-out infinite',
        float: 'float 7s ease-in-out infinite',
        pixel: 'pixel 3.6s ease-in-out infinite',
        sweep: 'sweep 5s linear infinite',
        'dash-flow': 'dash-flow 1.6s linear infinite',
        'ping-soft': 'ping-soft 2.4s cubic-bezier(0, 0, 0.2, 1) infinite',
        rise: 'rise 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
};

export default config;
