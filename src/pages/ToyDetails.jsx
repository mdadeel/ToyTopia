import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import toysData from '../data/toys.json';
import { Button, Section, Badge, Card } from '../components/ui';
import { Heart, Star, Truck, ShieldCheck, User, Mail, MapPin, Package, Clock, Box, CheckCircle2, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ToyDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [toy, setToy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!user) {
      navigate('/auth', { state: { from: location } });
      return;
    }

    const found = toysData.toys.find(t => t.id === id);
    if (!found) {
      navigate('/');
      return;
    }

    setToy(found);
    document.title = `${found.name} || ToyTopia`;
    setLoading(false);

    const favs = JSON.parse(localStorage.getItem('favourites') || '[]');
    setLiked(favs.includes(id));
  }, [id, user, navigate, location]);

  const handleLike = () => {
    let favs = JSON.parse(localStorage.getItem('favourites') || '[]');
    if (favs.includes(id)) {
      favs = favs.filter(f => f !== id);
    } else {
      favs.push(id);
    }
    localStorage.setItem('favourites', JSON.stringify(favs));
    setLiked(!liked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    setSubmitted(true);
    setName('');
    setEmail('');
  };

  if (loading || !toy) {
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

  return (
    <div className="pt-2 pb-20 min-h-screen bg-muted/20">
      <Section containerClassName="max-w-6xl">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary font-bold mb-8 transition-colors group"
        >
          <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" /> Back to Collection
        </button>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Media */}
          <div className="lg:col-span-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative aspect-square rounded-xl overflow-hidden shadow-sm border border-border/50 group bg-background"
            >
              {toy.image ? (
                <img src={toy.image} alt={toy.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <Package className="w-20 h-20 text-muted-foreground" />
                </div>
              )}
              {toy.availableQuantity < 5 && (
                <div className="absolute top-4 left-4 px-3 py-1 bg-destructive text-destructive-foreground rounded-full text-[10px] font-black animate-pulse uppercase tracking-wider">
                  Only {toy.availableQuantity} left!
                </div>
              )}

              <button
                onClick={handleLike}
                className={`absolute top-4 right-4 p-3 rounded-xl glass transition-all ${liked ? 'text-destructive bg-destructive/10' : 'text-foreground/70 hover:text-destructive'}`}
              >
                <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
              </button>
            </motion.div>

            {/* Request Demo Section */}
            <Card className="bg-primary text-primary-foreground p-8 rounded-xl premium-shadow overflow-hidden relative">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 blur-3xl rounded-full" />
              <div className="relative z-10">
                <h3 className="text-2xl font-black mb-3 flex items-center gap-3">
                  <Clock className="w-7 h-7" /> Request a Demo
                </h3>
                <p className="text-primary-foreground/80 mb-6 text-sm font-medium">Want to see it in action before buying? Our experts can show you via video call.</p>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center py-6"
                  >
                    <CheckCircle2 className="w-12 h-12 mb-3 text-accent" />
                    <p className="text-lg font-black">Request Sent Successfully!</p>
                    <p className="text-primary-foreground/70 text-sm">We'll reach out within 2-4 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm outline-none focus:bg-white/20 focus:border-white transition-all font-bold placeholder:text-white/40"
                        required
                      />
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm outline-none focus:bg-white/20 focus:border-white transition-all font-bold placeholder:text-white/40"
                        required
                      />
                    </div>
                    <Button variant="secondary" className="w-full py-4 text-xs font-black uppercase tracking-widest rounded-xl" type="submit">
                      Book Free Demo Session
                    </Button>
                  </form>
                )}
              </div>
            </Card>
          </div>

          {/* Right Column: Info */}
          <div className="lg:col-span-6 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-none font-bold uppercase tracking-widest text-[10px] px-3">
                  {toy.category}
                </Badge>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 font-black text-[10px] uppercase tracking-wider border border-amber-500/20">
                  <Star className="w-3 h-3 fill-current" /> {toy.rating} Consumer Rating
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-black mb-4 leading-tight tracking-tight text-foreground">{toy.name}</h1>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xl">{toy.description}</p>
            </motion.div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Age Group', value: toy.age_group || '3+ Years', icon: User, color: 'text-blue-500 bg-blue-50' },
                { label: 'Material', value: toy.material || 'Safe & Non-Toxic', icon: Box, color: 'text-green-500 bg-green-50' },
                { label: 'Stock Status', value: `${toy.availableQuantity} available`, icon: Package, color: 'text-purple-500 bg-purple-50' },
                { label: 'Express Dist.', value: '2-3 Business Days', icon: Truck, color: 'text-amber-500 bg-amber-50' },
              ].map((spec, i) => (
                <div key={i} className="flex flex-col p-4 rounded-xl bg-card border border-border/50 transition-colors hover:border-primary/20">
                  <div className={`w-10 h-10 rounded-lg ${spec.color} flex items-center justify-center mb-4`}>
                    <spec.icon className="w-5 h-5" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{spec.label}</p>
                  <p className="text-sm font-black">{spec.value}</p>
                </div>
              ))}
            </div>

            {/* Price & Action Box */}
            <div className="p-8 rounded-xl bg-card border border-border/50 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground font-black uppercase tracking-widest text-[10px] mb-1">Guaranteed Price</p>
                  <p className="text-4xl font-black text-primary">${toy.price}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge variant="accent" className="px-3 py-1 text-[10px] uppercase tracking-wider font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 inline mr-1.5" /> Authorized Dealer
                  </Badge>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="flex-1 rounded-xl font-bold text-xs uppercase tracking-widest h-14">
                  Add to Shopping Bag
                </Button>
                <Button variant="outline" size="lg" onClick={handleLike} className={`flex-1 rounded-xl font-bold text-xs uppercase tracking-widest h-14 gap-2 ${liked ? 'bg-destructive/5 text-destructive border-destructive/20' : ''}`}>
                  <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} /> {liked ? 'In Favorites' : 'Add to Wishlist'}
                </Button>
              </div>
            </div>

            {/* Seller Info */}
            <div className="glass p-6 rounded-xl flex flex-col md:flex-row md:items-center gap-6 border-white/20">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl font-black shadow-lg">
                {toy.seller_name?.[0] || 'S'}
              </div>
              <div className="flex-1">
                <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Seller Information</h4>
                <div className="space-y-1">
                  <p className="text-xl font-black">{toy.seller_name}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    <p className="flex items-center gap-2 text-muted-foreground text-xs font-bold"><Mail className="w-3.5 h-3.5" /> {toy.seller_email}</p>
                    <p className="flex items-center gap-2 text-muted-foreground text-xs font-bold"><MapPin className="w-3.5 h-3.5" /> {toy.seller_info}</p>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="font-bold text-primary hover:bg-primary/5 uppercase tracking-widest text-[10px]">
                View Store →
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default ToyDetails;
