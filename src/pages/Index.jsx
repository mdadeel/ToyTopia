import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ModernToyCard from '@/components/ModernToyCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Star, ChevronLeft, ChevronRight, ShoppingBag, Truck, Shield } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useToyFilter } from '@/hooks/useToyFilter';
import { toast } from 'sonner';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import toysData from '@/data/toys.json';

const categories = [
  'All Categories',
  'Building Blocks',
  'Plush',
  'Puzzles',
  'Educational',
  'Outdoor',
  'Arts & Crafts',
  'Action Figures',
  'Board Games'
];

const Index = () => {
  const toys = toysData.toys;
  const {
    filteredToys,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    resetFilters
  } = useToyFilter(toys);
  const [visibleToysCount, setVisibleToysCount] = useState(8);

  useEffect(() => {
    document.title = 'ToyTopia - Premier Toy Store in Bangladesh';
  }, []);

  useEffect(() => {
    setVisibleToysCount(8);
  }, [searchQuery, selectedCategory]);

  // Scroll to toys
  const scrollToToys = () => {
    const toysSection = document.getElementById('toys-section');
    if (toysSection) {
      toysSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Bulk Order Info
  const handleCallOrder = () => {
    toast.info("Call us at 01700000000 for bulk orders!");
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-white border-b-4 border-primary">
        <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-in slide-in-from-left duration-500">
              <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-100 shadow-sm">
                <span className="text-xl">🇧🇩</span>
                <span className="text-sm font-bold text-blue-700">No.1 Toy Shop in Bangladesh</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-gray-900 leading-tight tracking-tight">
                Discover Joy at <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">ToyTopia</span>
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                Premium toys for your little ones. We deliver happiness across Dhaka, Chittagong, and purely nationwide. Cash on Delivery supported! 🚚
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button
                  onClick={scrollToToys}
                  size="lg"
                  className="px-8 py-6 text-lg shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all transform hover:-translate-y-1"
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Start Shopping
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-6 text-lg border-2 hover:bg-gray-50"
                  onClick={handleCallOrder}
                >
                  Call for Bulk
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-8">
                {[
                  { label: "Items Stock", value: `${toys.length}+`, color: "yellow" },
                  { label: "Original Products", value: "100%", color: "green" },
                  { label: "Home Delivery", value: "Fast", color: "purple" }
                ].map((stat, idx) => (
                  <div key={idx} className={`bg-${stat.color}-50 border-2 border-${stat.color}-200 rounded-2xl p-4 text-center transform hover:scale-105 transition-transform`}>
                    <div className={`text-3xl font-black text-${stat.color}-700 mb-1`}>{stat.value}</div>
                    <div className={`text-xs font-bold text-${stat.color}-600 uppercase tracking-wide`}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-in slide-in-from-right duration-500 delay-100">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-[2.5rem] p-8 border-4 border-white shadow-2xl">
                <div className="grid grid-cols-2 gap-4">
                  {toys.slice(0, 4).map((toy) => (
                    <div
                      key={toy.id}
                      className="bg-white rounded-2xl p-3 shadow-md hover:shadow-xl transition-shadow border border-gray-100"
                    >
                      <div className="relative aspect-square mb-2 overflow-hidden rounded-xl">
                        <img
                          src={toy.image}
                          alt={toy.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-2 right-2 bg-yellow-400/90 backdrop-blur-sm text-yellow-900 text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
                          ⭐ {toy.rating}
                        </div>
                      </div>
                      <h3 className="font-bold text-gray-900 text-xs truncate px-1">{toy.name}</h3>
                      <div className="flex items-center justify-between px-1 pb-1">
                        <span className="text-primary font-black text-sm">${toy.price}</span>
                        <span className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-full">{toy.category}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <Link to="/all-toys">
                    <Button variant="ghost" className="w-full text-primary hover:text-primary/80 hover:bg-white/50 font-bold">
                      View Full Collection →
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 px-6 py-3 rounded-full font-black text-sm shadow-xl border-4 border-white rotate-12 animate-bounce hidden md:block">
                🎁 Eid Sale is Live!
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Truck, title: "Fast Delivery", desc: "Inside Dhaka in 24 Hours", color: "blue" },
              { icon: Shield, title: "Authentic Goods", desc: "100% Original Guarantee", color: "green" },
              { icon: ShoppingBag, title: "Visit Store", desc: "Level 8, Bashundhara City", color: "purple" }
            ].map((feature, idx) => (
              <div key={idx} className={`bg-${feature.color}-50 border border-${feature.color}-100 rounded-2xl p-6 flex items-center gap-4 hover:shadow-md transition-shadow`}>
                <div className={`bg-${feature.color}-500 p-4 rounded-xl shadow-lg shadow-${feature.color}-500/30`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-600 font-medium">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Section */}
      <section className="py-12 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">🔥 Trending Now</h2>
            <div className="flex gap-2">
              <button className="swiper-button-prev-custom p-2 rounded-full border border-gray-200 hover:bg-white transition-colors">
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>
              <button className="swiper-button-next-custom p-2 rounded-full border border-gray-200 hover:bg-white transition-colors">
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="pb-4"
          >
            {toys.slice(0, 8).map((toy) => (
              <SwiperSlide key={`slider-${toy.id}`}>
                <ModernToyCard toy={toy} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Eid Promo */}
      <section className="py-12 bg-emerald-50 border-y border-emerald-100 overflow-hidden relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-white/50 backdrop-blur-md p-8 rounded-3xl border border-white/50 shadow-sm">
            <div className="text-center md:text-left space-y-2">
              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold mb-2">LIMITED TIME OFFER</span>
              <h2 className="text-3xl md:text-4xl font-bold text-emerald-900">🌙 Eid Special Collection</h2>
              <p className="text-emerald-700 max-w-lg">
                Celebrate this Eid with exclusive discounts on electronic sets and dollhouses. Make their smile brighter!
              </p>
            </div>
            <div className="flex gap-4 transform rotate-2">
              <div className="bg-white p-6 rounded-2xl shadow-lg text-center border-2 border-emerald-100 min-w-[120px]">
                <span className="block text-3xl font-black text-emerald-600">15%</span>
                <span className="text-xs font-bold text-gray-400 tracking-wider">FLAT OFF</span>
              </div>
              <div className="bg-emerald-600 p-6 rounded-2xl shadow-lg text-center border-2 border-emerald-600 min-w-[120px]">
                <span className="block text-3xl font-black text-white">FREE</span>
                <span className="text-xs font-bold text-emerald-100 tracking-wider">WRAPPING</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </section>

      {/* Regional Bestsellers */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">🏆 Regional Favorites</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-blue-600 mb-6 flex items-center gap-3">
                <span className="text-2xl">📍</span> Trending in Dhaka
              </h3>
              <div className="space-y-4">
                {toys.slice(0, 3).map(toy => (
                  <Link key={toy.id} to={`/toy/${toy.id}`} className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-gray-100 shadow-sm hover:border-blue-200 transition-colors group">
                    <img src={toy.image} alt="" className="w-16 h-16 rounded-xl object-cover group-hover:scale-105 transition-transform" />
                    <div>
                      <p className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{toy.name}</p>
                      <p className="text-xs text-gray-500 mt-1">Selling fast in Gulshan & Banani</p>
                    </div>
                    <div className="ml-auto font-bold text-gray-300 group-hover:text-blue-500">→</div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-purple-600 mb-6 flex items-center gap-3">
                <span className="text-2xl">📍</span> Trending in Chittagong
              </h3>
              <div className="space-y-4">
                {toys.slice(3, 6).map(toy => (
                  <Link key={toy.id} to={`/toy/${toy.id}`} className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-gray-100 shadow-sm hover:border-purple-200 transition-colors group">
                    <img src={toy.image} alt="" className="w-16 h-16 rounded-xl object-cover group-hover:scale-105 transition-transform" />
                    <div>
                      <p className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors">{toy.name}</p>
                      <p className="text-xs text-gray-500 mt-1">Popular in Agrabad & GEC</p>
                    </div>
                    <div className="ml-auto font-bold text-gray-300 group-hover:text-purple-500">→</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Toys Grid */}
      <main id="toys-section" className="container mx-auto px-4 py-16 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Complete Collection</h2>
          <p className="text-gray-600">Browse our extensive collection of high-quality toys. Filter by category or search for something specific.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8 sticky top-20 z-40 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-gray-100 shadow-sm">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search toys (e.g., Lego, Doll, Car)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-base rounded-xl border-gray-200 bg-white"
            />
          </div>

          <div className="relative w-full md:w-64">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="h-12 pl-4 text-base rounded-xl border-gray-200 bg-white">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {filteredToys.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <div className="bg-white p-4 rounded-full w-fit mx-auto shadow-sm mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No toys found matching your criteria</h3>
            <p className="text-gray-500 mb-6">Try clearing your filters or search for something else.</p>
            <Button onClick={resetFilters} variant="outline">
              Clear All Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredToys.slice(0, visibleToysCount).map((toy) => (
              <ModernToyCard key={toy.id} toy={toy} />
            ))}
          </div>
        )}

        {filteredToys.length > visibleToysCount && (
          <div className="text-center mt-12">
            <Button
              onClick={() => setVisibleToysCount(prev => prev + 8)}
              size="lg"
              variant="secondary"
              className="px-8 min-w-[200px]"
            >
              Load More
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
