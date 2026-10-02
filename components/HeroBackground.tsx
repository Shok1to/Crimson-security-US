/**
 * Flat black with a fine ruled grid, fading out toward the bottom. No glows or animated light:
 * the Canadian hero is a moving crimson wash; this one is a drafting sheet.
 */
export default function HeroBackground() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden bg-ink-950">
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(#fefdfd 1px, transparent 1px), linear-gradient(90deg, #fefdfd 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'linear-gradient(to bottom, #000 0%, #000 55%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, #000 0%, #000 55%, transparent 100%)',
        }}
      />
    </div>
  );
}
