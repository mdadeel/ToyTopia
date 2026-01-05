import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import ToyCard from '../components/Shared/ToyCard';
import toysData from '../data/toys.json';
import { Section, Badge, Button } from '../components/ui';
import { Heart, Sparkles, ArrowRight, LogIn, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const Favourites = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [favouriteToys, setFavouriteToys] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "ToyTopia || My Wishlist";
  }, [location]);

  useEffect(() => {
    if (!loading && !user) {
      setDataLoading(false);
    }
  }, [loading, user]);

  useEffect(() => {
    if (user) {
      const favs = JSON.parse(localStorage.getItem('favourites') || '[]');
      const toys = toysData.toys.filter(toy => favs.includes(toy.id));
      setFavouriteToys(toys);
      setDataLoading(false);
    }
  }, [user]);

  if (loading || dataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-16 h-16 bg-primary rounded-full blur-xl"
        />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-8 pb-8 bg-muted/20">
        <Section containerClassName="max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass p-16 rounded-[4rem] premium-shadow border-white/20"
          >
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <Heart className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Your <span className="text-secondary italic">Vault</span> is Locked</h1>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed font-medium">
              Wishlists are saved to your personal portal. Log in or create an account to start curating your dream toy collection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2 px-10" onClick={() => navigate('/auth')}>
                <LogIn className="w-5 h-5" /> Sign In Now
              </Button>
              <Button size="lg" variant="ghost" className="font-black px-10" onClick={() => navigate('/register')}>
                Join ToyTopia
              </Button>
            </div>
          </motion.div>
        </Section>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-8 pb-20 bg-muted/20">
      <Section className="pb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Curated Selection</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4">My <span className="text-destructive italic">Wishlist</span></h1>
            <p className="text-muted-foreground text-xl font-medium">Your personal collection of magical toys waiting to be yours.</p>
          </div>
          {favouriteToys.length > 0 && (
            <Badge variant="outline" className="px-6 py-3 text-lg font-black">{favouriteToys.length} Items Saved</Badge>
          )}
        </div>

        {favouriteToys.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-card border border-dashed border-border rounded-xl p-24 text-center"
          >
            <div className="w-28 h-28 bg-muted rounded-full flex items-center justify-center mx-auto mb-8">
              <Heart className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-4xl font-black mb-4 tracking-tight">Your wishlist is lonely</h3>
            <p className="text-muted-foreground text-xl mb-12 max-w-md mx-auto leading-relaxed">
              Explore our magical collection and tap the heart to save your favorite toys here!
            </p>
            <Link to="/all-toys">
              <Button size="lg" className="px-12 py-6 text-xl rounded-[2rem] gap-3">
                Start Exploring <ArrowRight className="w-6 h-6" />
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {favouriteToys.map((toy, idx) => (
              <motion.div
                key={toy.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <ToyCard toy={toy} />
              </motion.div>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
};



export default Favourites;
