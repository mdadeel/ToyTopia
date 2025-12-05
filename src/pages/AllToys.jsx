import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ModernToyCard from '@/components/ModernToyCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Rocket } from 'lucide-react';
import { useToyFilter } from '@/hooks/useToyFilter';
import toysData from '@/data/toys.json';

const categories = [
  'All Categories',
  'Building Blocks',
  'Plush',
  'Stuffed Animals',
  'Puzzles',
  'Arts & Crafts',
  'Vehicles & Playsets',
  'Action Figures',
  'Educational',
  'Musical Instruments',
  'Outdoor',
  'Board Games'
];

const AllToys = () => {
  const toys = toysData.toys || [];
  const {
    filteredToys,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    resetFilters
  } = useToyFilter(toys);

  useEffect(() => {
    document.title = 'All Toys | ToyTopia';
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />

      <div className="bg-primary text-primary-foreground py-10 sm:py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-10">
          <Rocket className="h-64 w-64 transform rotate-45" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-3xl sm:text-5xl font-black mb-4">Discover Amazing Toys</h1>
          <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">
            Browse our curated collection of {toys.length}+ educational and fun toys for every age group.
          </p>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-8 sm:py-12">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-8 sticky top-20 z-10 backdrop-blur-xl bg-white/90">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search toys by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 sm:h-12"
              />
            </div>
            <div className="relative w-full md:w-64">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="h-10 sm:h-12 w-full">
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
        </div>

        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-500 font-medium">
            Showing {filteredToys.length} results
          </p>
          {(searchQuery || selectedCategory !== 'All Categories') && (
            <Button variant="link" onClick={resetFilters} className="text-destructive h-auto p-0">
              Clear Filters
            </Button>
          )}
        </div>

        {filteredToys.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-2">No toys found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your filters or search terms</p>
            <Button onClick={resetFilters} variant="outline">
              View All Toys
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredToys.map((toy) => (
              <ModernToyCard key={toy.id} toy={toy} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AllToys;
