import { Link } from 'react-router-dom';
import { Heart, Blocks, Volleyball, Puzzle, Palette, Rocket } from 'lucide-react';

/* Brand mark: a refined coral tile with a white "block T" — reads as a toy brick. */
export function Mark({ className = 'w-10 h-10', rounded = 'rounded-2xl' }) {
  return (
    <svg viewBox="0 0 48 48" className={`${className} ${rounded} shadow-pop`} aria-hidden="true">
      <rect x="2" y="2" width="44" height="44" rx="13" fill="#E2553F" />
      <rect x="13" y="14" width="22" height="6" rx="3" fill="#fff" />
      <rect x="21" y="14" width="6" height="22" rx="3" fill="#fff" />
      <circle cx="24" cy="30" r="3.4" fill="#E2553F" />
    </svg>
  );
}

export function Logo({ className = '', textClass = 'text-2xl', onClick, to = '/' }) {
  return (
    <Link to={to} onClick={onClick} className={`flex items-center gap-2.5 group ${className}`}>
      <Mark className="w-10 h-10 group-hover:-rotate-6 transition-transform" />
      <span className={`font-display font-extrabold tracking-tight ${textClass} text-ink`}>
        Toy<span className="text-coral">Topia</span>
      </span>
    </Link>
  );
}

/* Category slugs → lucide icons (no emoji). */
export const CATEGORY_ICON = {
  'stuffed-animals': Heart,
  'building-blocks': Blocks,
  outdoor: Volleyball,
  puzzles: Puzzle,
  'arts-crafts': Palette,
  stem: Rocket,
};

/* Payment methods row — pure SVG/HTML, no external images */
export function PaymentRow({ className = '' }) {
  const items = [
    { label: 'VISA', bg: '#1A1F71', fg: '#fff' },
    { label: 'Master', bg: '#EB001B', fg: '#fff' },
    { label: 'bKash', bg: '#E2136E', fg: '#fff' },
    { label: 'Nagad', bg: '#F05321', fg: '#fff' },
    { label: 'COD', bg: '#211C18', fg: '#F0B23C' },
  ];
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {items.map((i) => (
        <span
          key={i.label}
          className="rounded-lg px-2.5 py-1 text-[11px] font-extrabold tracking-wide"
          style={{ background: i.bg, color: i.fg }}
        >
          {i.label}
        </span>
      ))}
    </div>
  );
}

/* Empty-state illustration for wishlists / search with no results */
export function EmptyToys({ className = 'w-40 h-40' }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <ellipse cx="100" cy="168" rx="70" ry="10" fill="#000" opacity="0.06" />
      <rect x="48" y="70" width="104" height="80" rx="14" fill="#F7E4E1" />
      <rect x="48" y="70" width="104" height="22" rx="11" fill="#E2553F" />
      <path d="M64 92h72l-8 50H72z" fill="#fff" opacity="0.7" />
      <circle cx="100" cy="120" r="14" fill="#F0B23C" />
      <path d="M92 120h16M100 112v16" stroke="#211C18" strokeWidth="3" strokeLinecap="round" />
      <circle cx="150" cy="56" r="9" fill="#2FA0CE" />
      <circle cx="166" cy="74" r="5" fill="#46B98F" />
      <circle cx="36" cy="60" r="6" fill="#F0B23C" />
    </svg>
  );
}

/* Simple star used by ratings */
export function Stars({ value = 5, size = 14, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} aria-label={`${value} out of 5`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        return (
          <svg key={i} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
            <defs>
              <linearGradient id={`s${i}`} x1="0" x2="1">
                <stop offset={`${fill * 100}%`} stopColor="#F0B23C" />
                <stop offset={`${fill * 100}%`} stopColor="#E4D6C0" />
              </linearGradient>
            </defs>
            <path
              d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 18.9 6.1 21l1.2-6.5L2.5 9.4l6.6-.9z"
              fill={`url(#s${i})`}
            />
          </svg>
        );
      })}
    </span>
  );
}
