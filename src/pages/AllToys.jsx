import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ToyCard from '../components/Shared/ToyCard';
import toysData from '../data/toys.json';
import { Section, Badge, Button } from '../components/ui';
import { Search, SlidersHorizontal, ArrowUpDown, FilterX, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

const categories = [
  'All Categories',
  'Building Blocks',
  'Stuffed Animals',
  'Puzzles',
  'Arts & Crafts',
  'Action Figures',
  'Educational',
  'Outdoor',
  'Board Games'
];

const AllToys = () => {
  const toys = toysData.toys || [];
  const location = useLocation();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All Categories');
  const [sort, setSort] = useState('');

  let filteredToys = [...toys];

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

  if (sort === 'to low') {
    filteredToys.sort((a, b) => b.price - a.price);
  } else if (sort === 'to high') {
    filteredToys.sort((a, b) => a.price - b.price);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "ToyTopia || Discover All Toys";
    AOS.init({ duration: 1000, once: true });
  }, [location]);

  const clearFilters = () => {
    setSearch('');
    setCategory('All Categories');
    setSort('');
  };

  return (
    <div className="min-h-screen pt-2">
      <Section className="bg-primary/5 pb-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Our <span className="text-secondary italic">Toy Universe</span></h1>
            <p className="text-muted-foreground text-lg">Discover curated magic for every age.</p>
          </motion.div>
        </div>
      </Section>

      <div className="container mx-auto px-4 -mt-24 relative z-10 pb-24">
        {/* Filter Bar */}
        <div className="glass rounded-xl p-6 mb-12 flex flex-col lg:flex-row gap-6 items-center premium-shadow">
          <div className="relative w-full lg:flex-1 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="search"
              placeholder="Search by name or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-14 pr-6 py-5 rounded-[2rem] bg-background/50 border border-border focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none font-bold transition-all"
            />
          </div>

          <div className="flex flex-wrap gap-4 w-full lg:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <SlidersHorizontal className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full sm:w-64 pl-14 pr-10 py-5 rounded-[2rem] bg-background/50 border border-border focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none appearance-none font-bold cursor-pointer transition-all"
              >
                {categories.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
              </select>
            </div>

            <div className="relative flex-1 sm:flex-none">
              <ArrowUpDown className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full sm:w-60 pl-14 pr-10 py-5 rounded-[2rem] bg-background/50 border border-border focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none appearance-none font-bold cursor-pointer transition-all"
              >
                <option value="">Sort: Default</option>
                <option value="to low">Price: High to Low</option>
                <option value="to high">Price: Low to High</option>
              </select>
            </div>

            <AnimatePresence>
              {(search || category !== 'All Categories' || sort) && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <Button variant="ghost" onClick={clearFilters} className="text-destructive hover:bg-destructive/10 h-full px-6 gap-2">
                    <FilterX className="w-5 h-5" /> Reset
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex justify-between items-center mb-10 px-4">
          <Badge variant="outline" className="py-2 px-6">Showing {filteredToys.length} results</Badge>
        </div>

        {filteredToys.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32 bg-card rounded-[4rem] border border-dashed border-border"
          >
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-8">
              <Search className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-4xl font-black mb-4 tracking-tight">No magic found here</h3>
            <p className="text-muted-foreground text-xl mb-10 max-w-md mx-auto leading-relaxed">
              We couldn't find any toys matching your current filters. Try relaxing your criteria or search for something else!
            </p>
            <Button size="lg" onClick={clearFilters} className="gap-2">
              <FilterX className="w-5 h-5" /> View All Toys
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {filteredToys.map((toy, idx) => (
              <motion.div
                key={toy.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <ToyCard toy={toy} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllToys;
