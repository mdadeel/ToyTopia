import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Heart } from 'lucide-react';
import { Stars } from '../Brand';
import { CATEGORIES } from '../../data/toys';

const tileFor = (cat) => (CATEGORIES.find((c) => c.slug === cat) || {}).tile || 'tile-butter';

const tagTone = {
  'Best Seller': 'bg-coral',
  'Top Rated': 'bg-grape',
  New: 'bg-sky',
};

export default function ToyCard({ toy, onAdd, onFav, favourite }) {
  const tile = tileFor(toy.category);

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="group relative flex flex-col overflow-hidden rounded-[28px] bg-white border border-line shadow-card hover:shadow-pop"
    >
      {/* Image */}
      <Link to={`/toy/${toy.id}`} className="relative block">
        <div className={`relative aspect-[4/3] ${tile} flex items-center justify-center overflow-hidden`}>
          <img
            src={toy.image}
            alt={toy.name}
            loading="lazy"
            className="h-[88%] w-[88%] object-contain drop-shadow-[0_12px_18px_rgba(44,30,20,0.16)] transition-transform duration-500 group-hover:scale-105"
          />
          {toy.tag && (
            <span className={`absolute top-3 left-3 inline-flex items-center rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-white ${tagTone[toy.tag] || 'bg-sun'} shadow`}>
              {toy.tag}
            </span>
          )}
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); onFav && onFav(toy); }}
            className={`absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 backdrop-blur shadow-sm transition hover:scale-110 ${favourite ? 'text-coral' : 'text-ink/70'}`}
            aria-label="Save to favourites"
          >
            <Heart className="h-4 w-4" fill={favourite ? 'currentColor' : 'none'} />
          </button>
        </div>
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-ink/70">{toy.categoryLabel}</span>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-ink/70">
            <Stars value={toy.rating} size={13} />
            <span className="text-ink/70">({toy.reviews})</span>
          </span>
        </div>

        <Link to={`/toy/${toy.id}`} className="mt-0.5">
          <h3 className="text-lg font-extrabold leading-snug text-ink transition-colors group-hover:text-coral">
            {toy.name}
          </h3>
        </Link>
        <p className="mt-1.5 line-clamp-2 text-sm text-ink/70">{toy.description}</p>

        <div className="mt-4 flex items-center justify-between pt-1">
          <div>
            <span className="text-2xl font-extrabold text-ink">{toy.priceLabel}</span>
            <span className="ml-1 text-xs font-semibold text-ink/70">/ toy</span>
          </div>
          <button
            type="button"
            onClick={() => onAdd && onAdd(toy)}
            className="inline-flex items-center gap-1.5 rounded-full bg-coral px-4 py-2.5 text-sm font-extrabold text-white shadow-[0_6px_0_-1px_#d63d33] transition-all hover:bg-coral-dark hover:translate-y-[2px] hover:shadow-[0_4px_0_-1px_#d63d33] active:translate-y-1"
          >
            <Plus className="h-4 w-4" strokeWidth={3} /> Add
          </button>
        </div>
      </div>
    </motion.article>
  );
}
