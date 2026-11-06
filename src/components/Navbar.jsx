import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { ShoppingBag, Heart, User, LogOut, Menu, X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Brand';

const links = [
  { name: 'Home', path: '/' },
  { name: 'All Toys', path: '/all-toys' },
];

export default function Navbar() {
  const { user, signOut } = useContext(AuthContext);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 12);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sync = () => setCart(JSON.parse(localStorage.getItem('toytopia_cart') || '[]').reduce((n, t) => n + (t.qty || 1), 0));
    sync();
    window.addEventListener('toytopia:cart', sync);
    return () => window.removeEventListener('toytopia:cart', sync);
  }, []);

  const handleLogout = () => {
    signOut().catch(() => {});
    setOpen(false);
    navigate('/');
  };

  const linkClass = ({ isActive }) =>
    `relative font-extrabold text-sm transition-colors ${
      isActive ? 'text-coral' : 'text-ink/70 hover:text-ink'
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
        scrolled ? 'bg-cream shadow-[0_1px_0_#ECE0D0]' : 'bg-transparent'
      }`}
    >
      <div className="shell flex h-20 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <NavLink key={l.path} to={l.path} end={l.path === '/'} className={linkClass}>
              {l.name}
            </NavLink>
          ))}
          {user && (
            <>
              <NavLink to="/favourites" className={linkClass}>Favourites</NavLink>
              <NavLink to="/profile" className={linkClass}>My Profile</NavLink>
            </>
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/all-toys" className="hidden h-10 w-10 place-items-center rounded-full bg-white text-ink/75 shadow-card hover:text-coral sm:grid" aria-label="Search">
            <Search className="h-5 w-5" />
          </Link>
          <Link to={user ? '/favourites' : '/auth'} className="relative grid h-10 w-10 place-items-center rounded-full bg-white text-ink/70 shadow-card hover:text-coral" aria-label="Cart">
            <ShoppingBag className="h-5 w-5" />
            {cart > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-coral px-1 text-[10px] font-extrabold text-white">
                {cart}
              </span>
            )}
          </Link>

          {user ? (
            <button onClick={handleLogout} className="hidden items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-extrabold text-ink/70 shadow-card hover:text-coral md:inline-flex">
              <LogOut className="h-4 w-4" /> Log out
            </button>
          ) : (
            <Link to="/auth" className="hidden rounded-full bg-coral px-5 py-2.5 text-sm font-extrabold text-white shadow-[0_5px_0_-1px_#d63d33] transition-all hover:translate-y-[2px] hover:shadow-[0_3px_0_-1px_#d63d33] md:inline-flex">
              Sign in
            </Link>
          )}

          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full bg-white text-ink shadow-card md:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden border-t border-line bg-cream/95 backdrop-blur-md"
          >
            <div className="shell flex flex-col gap-1 py-4">
              {[...links, ...(user ? [{ name: 'Favourites', path: '/favourites' }, { name: 'My Profile', path: '/profile' }] : [])].map((l) => (
                <NavLink key={l.path} to={l.path} end={l.path === '/'} onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 font-extrabold text-ink/80 hover:bg-white">
                  {l.name}
                </NavLink>
              ))}
              {user ? (
                <button onClick={handleLogout} className="rounded-2xl px-4 py-3 text-left font-extrabold text-ink/80 hover:bg-white">Log out</button>
              ) : (
                <Link to="/auth" onClick={() => setOpen(false)} className="mt-1 rounded-full bg-coral px-4 py-3 text-center font-extrabold text-white">Sign in</Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
