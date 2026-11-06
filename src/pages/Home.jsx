import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Truck, ShieldCheck, RotateCcw, Smile, ArrowRight, Sparkles } from 'lucide-react';
import ToyCard from '../components/Shared/ToyCard';
import { Button } from '../components/ui';
import { CATEGORIES, toys } from '../data/toys';
import { CATEGORY_ICON } from '../components/Brand';
import { addToCart } from '../lib/cart';
import hero from '../assets/hero.jpg';

const trust = [
  { icon: Truck, title: 'Free shipping', sub: 'On orders over $50' },
  { icon: ShieldCheck, title: 'Safety tested', sub: 'Non-toxic & certified' },
  { icon: RotateCcw, title: 'Easy returns', sub: '30-day happiness guarantee' },
  { icon: Smile, title: 'Happy kids', sub: 'Loved by 50k+ families' },
];

const ages = [
  { label: '0–2 yrs', tone: 'tile-blush', blurb: 'Soft, safe first toys' },
  { label: '3–5 yrs', tone: 'tile-butter', blurb: 'Imaginative play' },
  { label: '6+ yrs', tone: 'tile-sky', blurb: 'STEM & big challenges' },
];

export default function Home() {
  const [toast, setToast] = useState(null);

  const handleAdd = (toy) => {
    addToCart(toy);
    setToast(`${toy.name} added to your bag`);
    setTimeout(() => setToast(null), 2200);
  };

  return (
    <div className="pt-20">
      {/* Announcement bar */}
      <div className="bg-coral text-white">
        <div className="shell flex items-center justify-center gap-2 py-2.5 text-center text-sm font-extrabold">
          <Sparkles className="h-4 w-4" />
          Free delivery on orders over $50 — this week only!
        </div>
      </div>

      {/* Hero */}
      <section className="shell pt-8">
        <div className="relative overflow-hidden rounded-[40px] bg-cream shadow-card">
          <img
            src={hero}
            alt=""
            aria-hidden="true"
            className="absolute inset-y-0 right-0 h-full w-[62%] object-cover object-right sm:w-[58%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/90 to-transparent" />
          <div className="relative grid min-h-[520px] items-center py-12">
            <div className="max-w-xl px-6 sm:px-12">
              <motion.span
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                className="eyebrow mb-5"
              >
                Toys for happy little humans
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
                className="text-4xl font-extrabold leading-[1.05] text-balance sm:text-6xl"
              >
                Toys that make little <span className="text-coral">eyes go wide</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="mt-5 max-w-md text-lg text-ink/75"
              >
                A playful world of cuddly friends, brain-boosting blocks and gifts that spark big imaginations.
              </motion.p>

              <motion.form
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                onSubmit={(e) => e.preventDefault()}
                className="mt-7 flex max-w-md items-center gap-2 rounded-full bg-white p-2 pl-5 shadow-card"
              >
                <Search className="h-5 w-5 text-ink/70" />
                <input
                  type="text"
                  placeholder="Search teddy, blocks, puzzles…"
                  className="w-full bg-transparent text-ink outline-none placeholder:text-ink/70"
                />
                <button type="submit" className="btn-coral px-5 py-2.5">Find</button>
              </motion.form>

              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="mt-7 flex flex-wrap items-center gap-3"
              >
                <Link to="/all-toys" className="btn-coral">
                  Shop all toys <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/all-toys" className="btn-outline-toy">New arrivals</Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="shell py-10">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {trust.map((t) => (
            <div key={t.title} className="panel flex items-center gap-3 p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-sun/20 text-sun">
                <t.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-extrabold">{t.title}</p>
                <p className="text-sm text-ink/70">{t.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="shell py-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <span className="eyebrow mb-3">Browse the shelves</span>
            <h2 className="text-3xl font-extrabold sm:text-4xl">Shop by category</h2>
          </div>
          <Link to="/all-toys" className="link-arrow hidden sm:inline-flex">See all <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((c) => {
            const Icon = CATEGORY_ICON[c.slug];
            return (
              <Link key={c.slug} to={`/all-toys?category=${c.slug}`} className="group">
                <div className={`${c.tile} flex aspect-square flex-col items-center justify-center rounded-[28px] border border-line shadow-card transition-transform duration-300 group-hover:-translate-y-1`}>
                  {Icon && <Icon className="h-9 w-9 text-ink/80 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.8} />}
                  <span className="mt-3 px-2 text-center text-sm font-extrabold leading-tight">{c.label}</span>
                </div>
                <p className="mt-2 text-center text-xs font-bold text-ink/70">{c.hint}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Trending */}
      <section className="shell py-10">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <span className="eyebrow mb-3">Loved right now</span>
            <h2 className="text-3xl font-extrabold sm:text-4xl">Trending this week</h2>
          </div>
          <Link to="/all-toys" className="link-arrow">View all <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="cv-auto grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {toys.slice(0, 8).map((t) => (
            <ToyCard key={t.id} toy={t} onAdd={handleAdd} />
          ))}
        </div>
      </section>

      {/* Promo banner */}
      <section className="shell py-8">
        <div className="relative overflow-hidden rounded-[40px] bg-coral px-8 py-12 sm:px-14 sm:py-16">
          <div className="relative max-w-lg">
            <span className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-white">Limited time</span>
            <h3 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">Up to 30% off bundles</h3>
            <p className="mt-3 max-w-md text-white/85">Mix and match a teddy, blocks and a puzzle into one cosy gift box. Perfect for birthdays.</p>
            <Link to="/all-toys" className="btn-sun mt-6">Shop the sale <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      {/* Shop by age */}
      <section className="shell py-10">
        <div className="mb-8">
          <span className="eyebrow mb-3">Pick the perfect match</span>
          <h2 className="text-3xl font-extrabold sm:text-4xl">Shop by age</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          {ages.map((a) => (
            <Link key={a.label} to={`/all-toys?age=${encodeURIComponent(a.label)}`}>
              <div className={`${a.tone} group flex items-center gap-5 rounded-[28px] border border-line p-7 shadow-card transition-transform hover:-translate-y-1`}>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/70 text-sm font-extrabold text-ink/80">
                  {a.label.split('–')[0]}
                </div>
                <div>
                  <p className="text-xl font-extrabold">{a.label}</p>
                  <p className="text-sm text-ink/70">{a.blurb}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="shell pb-16 pt-6">
        <div className="relative overflow-hidden rounded-[40px] bg-ink px-8 py-14 text-center sm:px-14">
          <h3 className="mx-auto max-w-2xl text-3xl font-extrabold text-cream sm:text-4xl">Ready to make someone's day?</h3>
          <p className="mx-auto mt-3 max-w-md text-cream/75">Join the ToyTopia fam for new drops, playful ideas and the odd discount.</p>
          <Link to="/all-toys" className="btn-coral mt-7">Start exploring <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>

      {/* Toast */}
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
