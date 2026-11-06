import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star, Heart, Truck, ShieldCheck, RotateCcw, Plus, Check, ArrowLeft, Sparkles,
} from 'lucide-react';
import { toys, CATEGORIES } from '../data/toys';
import { Stars } from '../components/Brand';
import { addToCart } from '../lib/cart';

export default function ToyDetails() {
  const { id } = useParams();
  const toy = toys.find((t) => t.id === id);
  const [fav, setFav] = useState(false);
  const [toast, setToast] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    setQty(1);
  }, [id]);

  if (!toy) {
    return (
      <div className="shell flex min-h-[60vh] flex-col items-center justify-center text-center pt-28">
        <p className="text-2xl font-extrabold">Oops! We couldn't find that toy.</p>
        <Link to="/all-toys" className="btn-coral mt-6">Back to the toys</Link>
      </div>
    );
  }

  const cat = CATEGORIES.find((c) => c.slug === toy.category);
  const related = toys.filter((t) => t.category === toy.category && t.id !== toy.id).slice(0, 4);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(toy);
    setToast(`${qty} × ${toy.name} added to your bag`);
    setTimeout(() => setToast(null), 2200);
  };

  const perks = [
    { icon: Truck, label: 'Free shipping over $50' },
    { icon: ShieldCheck, label: 'Safety tested & non-toxic' },
    { icon: RotateCcw, label: '30-day easy returns' },
  ];

  return (
    <div className="pt-28">
      <div className="shell">
        <Link to="/all-toys" className="link-arrow mb-6 inline-flex"><ArrowLeft className="h-4 w-4" /> All toys</Link>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Image */}
          <div className={`${cat?.tile || 'tile-butter'} relative flex items-center justify-center overflow-hidden rounded-[40px] border border-line shadow-card p-8`}>
            <img
              src={toy.image}
              alt={toy.name}
              className="h-[340px] w-[340px] object-contain drop-shadow-[0_18px_24px_rgba(44,30,20,0.18)] sm:h-[420px] sm:w-[420px]"
            />
            {toy.tag && (
              <span className="absolute left-5 top-5 rounded-full bg-coral px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide text-white shadow">
                {toy.tag}
              </span>
            )}
            <button
              onClick={() => setFav((v) => !v)}
              className={`absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white/90 shadow transition hover:scale-110 ${fav ? 'text-coral' : 'text-ink/70'}`}
              aria-label="Save"
            >
              <Heart className="h-5 w-5" fill={fav ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Info */}
          <div>
            <span className="text-sm font-extrabold uppercase tracking-[0.12em] text-ink/70">{toy.categoryLabel}</span>
            <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">{toy.name}</h1>

            <div className="mt-3 flex items-center gap-3">
              <Stars value={toy.rating} size={18} />
              <span className="font-extrabold">{toy.rating}</span>
              <span className="text-sm font-semibold text-ink/70">({toy.reviews} happy reviews)</span>
            </div>

            <p className="mt-5 text-lg text-ink/65">{toy.description}</p>

            <div className="mt-6 flex items-end gap-3">
              <span className="text-4xl font-extrabold text-ink">{toy.priceLabel}</span>
              <span className="mb-1 text-sm font-semibold text-ink/70">/ toy · tax included</span>
            </div>

            {/* Quantity + Add */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1 rounded-full bg-white p-1 shadow-card">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-10 w-10 place-items-center rounded-full font-extrabold text-ink/70 hover:bg-cream">−</button>
                <span className="w-8 text-center font-extrabold">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="grid h-10 w-10 place-items-center rounded-full font-extrabold text-ink/70 hover:bg-cream">+</button>
              </div>
              <button onClick={handleAdd} className="btn-coral px-8 py-3.5">
                <Plus className="h-5 w-5" strokeWidth={3} /> Add to bag
              </button>
            </div>

            {/* Perks */}
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {perks.map((p) => (
                <div key={p.label} className="rounded-2xl bg-white p-4 text-center shadow-card">
                  <span className="mx-auto grid h-9 w-9 place-items-center rounded-full bg-sun/20 text-sun">
                    <p.icon className="h-4 w-4" />
                  </span>
                  <p className="mt-2 text-xs font-extrabold leading-tight text-ink/70">{p.label}</p>
                </div>
              ))}
            </div>

            {/* Quick specs */}
            <div className="mt-7 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-cream p-4">
                <p className="text-xs font-extrabold uppercase tracking-wide text-ink/70">Age</p>
                <p className="mt-1 font-extrabold">{toy.age}</p>
              </div>
              <div className="rounded-2xl bg-cream p-4">
                <p className="text-xs font-extrabold uppercase tracking-wide text-ink/70">Material</p>
                <p className="mt-1 font-extrabold">{toy.material}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Why kids love it */}
        <div className="mt-14 panel p-8 sm:p-10">
          <h2 className="text-2xl font-extrabold">Why little ones love it <Sparkles className="inline h-5 w-5 text-sun" /></h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-3">
            <li className="flex gap-3"><Check className="mt-0.5 h-5 w-5 shrink-0 text-mint" /><span className="text-ink/70">Bright, friendly colours that spark curiosity.</span></li>
            <li className="flex gap-3"><Check className="mt-0.5 h-5 w-5 shrink-0 text-mint" /><span className="text-ink/70">Built tough for everyday play (and the occasional drop).</span></li>
            <li className="flex gap-3"><Check className="mt-0.5 h-5 w-5 shrink-0 text-mint" /><span className="text-ink/70">Perfect size for small hands to grab and explore.</span></li>
          </ul>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-14 mb-6">
            <h2 className="mb-6 text-2xl font-extrabold">More from {toy.categoryLabel}</h2>
            <div className="cv-auto grid grid-cols-2 gap-6 lg:grid-cols-4">
              {related.map((r) => (
                <Link key={r.id} to={`/toy/${r.id}`} className="group panel overflow-hidden transition-transform hover:-translate-y-1">
                  <div className={`${cat?.tile} flex h-40 items-center justify-center`}>
                    <img src={r.image} alt={r.name} className="h-[80%] w-[80%] object-contain transition-transform group-hover:scale-105" />
                  </div>
                  <div className="p-4">
                    <p className="font-extrabold leading-snug">{r.name}</p>
                    <p className="mt-1 font-extrabold text-coral">{r.priceLabel}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-full bg-ink px-6 py-3 text-sm font-extrabold text-cream shadow-pop"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
