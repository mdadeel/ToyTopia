import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import ToyCard from '../components/Shared/ToyCard';
import { toys } from '../data/toys';
import { Button } from '../components/ui';
import { Heart, Sparkles, ArrowRight, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';
import { EmptyToys } from '../components/Brand';

const SEED = ['toy-1', 'toy-2', 'toy-5'];

const Favourites = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [favIds, setFavIds] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'ToyTopia || Wishlist';
  }, [location]);

  useEffect(() => {
    if (user) {
      let saved = JSON.parse(localStorage.getItem('favourites') || 'null');
      if (!saved) {
        saved = SEED;
        localStorage.setItem('favourites', JSON.stringify(saved));
      }
      setFavIds(saved);
      setReady(true);
    } else if (!loading) {
      setReady(true);
    }
  }, [user, loading]);

  const toggleFav = (toy) => {
    const next = favIds.includes(toy.id) ? favIds.filter((id) => id !== toy.id) : [...favIds, toy.id];
    setFavIds(next);
    localStorage.setItem('favourites', JSON.stringify(next));
  };

  if (loading || !ready) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}
          className="w-16 h-16 bg-coral rounded-full blur-xl" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-cream pt-20">
        <div className="w-full max-w-md rounded-[36px] bg-white border border-line p-10 text-center shadow-card">
          <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-coral/10 text-coral"><Heart className="h-10 w-10" /></span>
          <h1 className="mt-6 text-3xl font-extrabold">Your wishlist is locked</h1>
          <p className="mt-2 text-ink/75">Log in to save and revisit your favourite toys anytime.</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button onClick={() => navigate('/auth')} className="btn-coral px-8 py-3.5"><LogIn className="h-5 w-5" /> Sign in</button>
            <button onClick={() => navigate('/register')} className="btn-outline-toy px-8 py-3.5">Join ToyTopia</button>
          </div>
        </div>
      </div>
    );
  }

  const favToys = toys.filter((t) => favIds.includes(t.id));

  return (
    <div className="pt-28 bg-cream">
      <div className="shell pb-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="eyebrow mb-3"><Sparkles className="h-3.5 w-3.5" /> Curated selection</span>
            <h1 className="text-4xl font-extrabold sm:text-5xl">My <span className="text-coral italic">Wishlist</span></h1>
            <p className="mt-2 text-ink/75">Your little collection of magical toys, waiting to come home.</p>
          </div>
          {favToys.length > 0 && <span className="chip text-sm">{favToys.length} saved</span>}
        </div>

        {favToys.length === 0 ? (
          <div className="flex flex-col items-center rounded-[40px] bg-white border border-line py-20 text-center shadow-card">
            <EmptyToys className="w-44 h-44" />
            <h3 className="mt-6 text-2xl font-extrabold">Your wishlist is lonely</h3>
            <p className="mt-2 max-w-sm text-ink/70">Tap the heart on any toy to save it here.</p>
            <Link to="/all-toys" className="btn-coral mt-6 px-8 py-3.5">Start exploring <ArrowRight className="h-5 w-5" /></Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {favToys.map((toy, i) => (
              <motion.div key={toy.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <ToyCard toy={toy} onFav={toggleFav} favourite={favIds.includes(toy.id)} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favourites;
