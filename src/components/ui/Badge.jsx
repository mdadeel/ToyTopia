const tones = {
  coral: 'bg-coral text-white',
  sun: 'bg-sun text-ink',
  sky: 'bg-skysoft text-sky',
  mint: 'bg-sage text-mint',
  grape: 'bg-lilac text-grape',
  ink: 'bg-ink text-white',
};

export default function Badge({ tone = 'sun', className = '', children }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide ${tones[tone] || tones.sun} ${className}`}>
      {children}
    </span>
  );
}
