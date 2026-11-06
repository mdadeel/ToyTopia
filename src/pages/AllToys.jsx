import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, ArrowRight } from 'lucide-react';
import ToyCard from '../components/Shared/ToyCard';
import { Link } from 'react-router-dom';
import { CATEGORIES, toys } from '../data/toys';
import { addToCart } from '../lib/cart';
import { EmptyToys, CATEGORY_ICON } from '../components/Brand';
import { AnimatePresence, motion } from 'framer-motion';

const sortOptions = [
  { id: 'popular', label: 'Most popular' },
  { id: 'price-asc', label: 'Price: low to high' },
  { id: 'price-desc', label: 'Price: high to low' },
  { id: 'rating', label: 'Top rated' },
];

export default function AllToys() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('popular');
  const [toast, setToast] = useState(null);

  const activeCat = params.get('category') || 'all';
  const activeAge = params.get('age') || '';

  const setCat = (slug) => {
    const next = new URLSearchParams(params);
    if (slug === 'all') next.delete('category');
    else next.set('category', slug);
    setParams(next, { replace: true });
  };

  const filtered = useMemo(() => {
    let list = toys.filter((t) => {
      const catOk = activeCat === 'all' || t.category === activeCat;
      const qOk = !query || t.name.toLowerCase().includes(query.toLowerCase()) || t.description.toLowerCase().includes(query.toLowerCase());
      return catOk && qOk;
    });
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [activeCat, query, sort]);

  const handleAdd = (toy) => {
    addToCart(toy);
    setToast(`${toy.name} added to your bag`);
    setTimeout(() => setToast(null), 2200);
  };

  return (
    <div className="pt-28">
      {/* Header */}
      <section className="shell">
        <span className="eyebrow mb-3">{toys.length} toys and counting</span>
        <h1 className="text-4xl font-extrabold sm:text-5xl">
          Our <span className="text-coral">Toy Universe</span>
        </h1>
        <p className="mt-3 max-w-xl text-lg text-ink/75">
          Every toy is picked for fun, safety and that little spark of wonder. Dive in and find the one.
        </p>
      </section>

      {/* Filter bar */}
      <section className="shell mt-8">
        <div className="panel flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 flex-wrap items-center gap-2">
            <button
              onClick={() => setCat('all')}
              className={`rounded-full px-4 py-2 text-sm font-extrabold transition ${
                activeCat === 'all' ? 'bg-coral text-white shadow-[0_5px_0_-1px_#d63d33]' : 'bg-white text-ink/70 hover:text-coral'
              }`}
            >
              All
            </button>
            {CATEGORIES.map((c) => {
              const Icon = CATEGORY_ICON[c.slug];
              return (
                <button
                  key={c.slug}
                  onClick={() => setCat(c.slug)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-extrabold transition ${
                    activeCat === c.slug ? 'bg-coral text-white shadow-[0_5px_0_-1px_#d63d33]' : 'bg-white text-ink/70 hover:text-coral'
                  }`}
                >
                  {Icon && <Icon className="h-4 w-4" strokeWidth={2} />} {c.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 shadow-card">
              <Search className="h-4 w-4 text-ink/70" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search toys…"
                className="w-36 bg-transparent text-sm outline-none placeholder:text-ink/70 sm:w-44"
              />
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white px-3 py-2.5 shadow-card">
              <SlidersHorizontal className="h-4 w-4 text-ink/70" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-transparent text-sm font-extrabold text-ink outline-none"
              >
                {sortOptions.map((o) => (
                  <option key={o.id} value={o.id}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <p className="mt-4 text-sm font-extrabold text-ink/70">
          Showing <span className="text-coral">{filtered.length}</span> {filtered.length === 1 ? 'toy' : 'toys'}
          {activeAge && ` · age ${activeAge}`}
        </p>
      </section>

      {/* Grid */}
      <section className="shell py-8">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-[40px] bg-cream py-20 text-center">
            <EmptyToys className="w-44 h-44" />
            <h3 className="mt-6 text-2xl font-extrabold">No toys found here… yet!</h3>
            <p className="mt-2 max-w-sm text-ink/70">Try a different category or clear your search.</p>
            <Link to="/all-toys" className="btn-outline-toy mt-6">Back to all toys</Link>
          </div>
        ) : (
          <div className="cv-auto grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((t) => (
              <ToyCard key={t.id} toy={t} onAdd={handleAdd} />
            ))}
          </div>
        )}
      </section>

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
