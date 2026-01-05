import { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import ToyCard from '../components/Shared/ToyCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import toysData from '../data/toys.json';
import { Button, Section, Badge } from '../components/ui';
import { ShoppingBag, Truck, ShieldCheck, MapPin, Search, SlidersHorizontal, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
  const toys = toysData.toys;
  const location = useLocation();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All Categories');
  const [showCount, setShowCount] = useState(8);

  const categories = [
    'All Categories',
    'Building Blocks',
    'Stuffed Animals',
    'Puzzles',
    'Educational',
    'Outdoor',
    'Arts & Crafts',
    'Action Figures',
    'Board Games'
  ];

  let filteredToys = toys;
  if (search) {
    let q = search.toLowerCase();
    filteredToys = filteredToys.filter(toy => {
      let nameMatch = toy.name.toLowerCase().includes(q);
      let descMatch = toy.description && toy.description.toLowerCase().includes(q);
      return nameMatch || descMatch;
    });
  }
  if (category !== 'All Categories') {
    filteredToys = filteredToys.filter(toy => toy.category === category);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "ToyTopia || Premium Toy Store";
    AOS.init({ duration: 1000, once: true });
  }, [location]);

  useEffect(() => {
    setShowCount(8);
  }, [search, category]);

  const scrollToToys = () => {
    document.getElementById('toys-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadMore = () => setShowCount(prev => prev + 8);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-12 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/20 blur-[120px] rounded-full" />

        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-8">
              <Sparkles className="w-4 h-4" />
              <span>No.1 Toy Shop in Bangladesh</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight">
              Where Every <span className="text-primary italic">Toy</span> <br />
              Tells a <span className="underline decoration-secondary/30">Story</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed">
              Discover a curated universe of premium toys designed to inspire imagination, creativity, and endless joy for your little ones.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={scrollToToys} className="gap-2">
                Explore Collection <ArrowRight className="w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline">
                Visit our Store
              </Button>
            </div>

            <div className="flex gap-12 mt-16 pt-12 border-t border-border">
              <div>
                <div className="text-4xl font-black text-primary">{toys.length}+</div>
                <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest mt-1">Products</div>
              </div>
              <div>
                <div className="text-4xl font-black text-secondary">4.9/5</div>
                <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest mt-1">Average Rating</div>
              </div>
              <div>
                <div className="text-4xl font-black text-accent">100%</div>
                <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest mt-1">Original</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative lg:h-[600px] hidden lg:block"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-[4rem] -rotate-3 border border-primary/10" />
            <img
              src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=1000"
              alt="Hero Toy"
              className="w-full h-full object-cover rounded-[4rem] shadow-2xl relative z-10"
            />
            {/* Floating Card */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -left-8 glass p-6 rounded-[2.5rem] z-20 premium-shadow max-w-[240px]"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center text-white">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-black">Flash Delivery</p>
                  <p className="text-xs text-muted-foreground">Inside Dhaka 24h</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trending Section */}
      <Section
        title="🔥 Trending This Week"
        subtitle="Our most loved and requested items that are flying off the shelves."
        className="bg-muted/30"
      >
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={32}
          slidesPerView={1}
          navigation
          autoplay={{ delay: 3000 }}
          breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 }, 1280: { slidesPerView: 4 } }}
          className="pb-12"
        >
          {toys.slice(0, 8).map((toy) => (
            <SwiperSlide key={`trending-${toy.id}`} className="p-2">
              <ToyCard toy={toy} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Section>

      {/* Features Grid */}
      <Section>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Truck, title: "Fast Delivery", desc: "Express delivery across Bangladesh. Inside Dhaka within 24 hours.", color: "bg-blue-500", light: "bg-blue-50 text-blue-500" },
            { icon: ShieldCheck, title: "100% Original", desc: "Authentic global brands. We guarantee quality and safety for your kids.", color: "bg-green-500", light: "bg-green-50 text-green-500" },
            { icon: MapPin, title: "Physical Store", desc: "Visit our toy paradise at Agrabad, Chittagong and experience the joy.", color: "bg-purple-500", light: "bg-purple-50 text-purple-500" },
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="p-10 rounded-[3rem] bg-card border border-border/50 hover:border-primary/20 transition-all premium-shadow"
            >
              <div className={`w-16 h-16 rounded-3xl ${feature.light} flex items-center justify-center mb-8`}>
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black mb-4">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Main Catalog */}
      <main id="toys-section" className="py-24 px-4 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div data-aos="fade-right">
              <h2 className="text-4xl md:text-5xl font-black mb-4">Discover Your Next <span className="text-primary">Playmate</span></h2>
              <p className="text-muted-foreground text-lg">Browse our complete collection by category or keywords.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto" data-aos="fade-left">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  placeholder="Search toys..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-12 pr-6 py-4 rounded-2xl bg-card border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none w-full sm:w-80 font-medium transition-all"
                />
              </div>
              <div className="relative">
                <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="pl-12 pr-10 py-4 rounded-2xl bg-card border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none appearance-none font-bold cursor-pointer transition-all"
                >
                  {categories.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
                </select>
              </div>
            </div>
          </div>

          {filteredToys.length === 0 ? (
            <div className="text-center py-24 bg-card rounded-[3rem] border border-dashed border-border">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-3xl font-black mb-4">Oh no! No toys found</h3>
              <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">We couldn't find anything matching your search. Try adjusting your filters or keywords.</p>
              <Button onClick={() => { setSearch(''); setCategory('All Categories'); }}>
                Clear All Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredToys.slice(0, showCount).map((toy) => (
                  <motion.div
                    key={toy.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ToyCard toy={toy} />
                  </motion.div>
                ))}
              </div>

              {filteredToys.length > showCount && (
                <div className="text-center mt-20">
                  <Button variant="outline" size="lg" onClick={loadMore} className="group">
                    Load More ✨ ({filteredToys.length - showCount} magic left)
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
