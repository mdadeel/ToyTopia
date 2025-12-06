import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useFavorites } from '@/hooks/useFavorites';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Package, Heart, ShoppingBag, User, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate, Link } from 'react-router-dom';
const Favorites = () => {
  const { user, loading } = useAuth();
  const { favorites: favoriteIds, removeFromFavorites } = useFavorites();
  const navigate = useNavigate();

  const [favoriteToys, setFavoriteToys] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    document.title = 'My Favorites | ToyTopia';
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      setDataLoading(false);
    }
  }, [loading, user]);

  useEffect(() => {
    if (user) {
      try {
        const toys = toysData.toys.filter(toy => favoriteIds.map(fav => fav.toyId).includes(toy.id));
        setFavoriteToys(toys);
      } catch (error) {
        console.error("Failed to load favorites", error);
      } finally {
        setDataLoading(false);
      }
    }
  }, [favoriteIds, user]);

  const handleRemoveFavorite = (e, toyId, toyName) => {
    e.stopPropagation();
    e.preventDefault();
    removeFromFavorites(toyId);
    toast.success(`${toyName} removed from favorites`);
  };

  if (loading || dataLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading favorites...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col font-sans">

        <main className="flex-1 container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
          <Heart className="h-20 w-20 text-gray-200 mb-6" />
          <h1 className="text-3xl font-bold mb-4 text-gray-900">Your Favorites List</h1>
          <p className="text-gray-500 mb-8 max-w-md">
            Please log in to see the toys you've saved for later.
          </p>
          <Button onClick={() => navigate('/auth')} size="lg" className="rounded-full px-8 font-bold">
            Login Now
          </Button>
        </main>

      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50/50">

      <main className="flex-1 container mx-auto px-4 py-8 sm:py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">
            My Wishlist
          </h1>
          <p className="text-gray-500">
            {favoriteToys.length > 0
              ? `You have saved ${favoriteToys.length} toys`
              : "Your wishlist is currently empty"}
          </p>
        </div>

        {favoriteToys.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200 shadow-sm max-w-2xl mx-auto">
            <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="h-10 w-10 text-red-200" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Favorites Yet</h3>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">
              Browse our collection and tap the heart icon to save items you love!
            </p>
            <Button asChild size="lg" className="rounded-full">
              <Link to="/all-toys">Explore Toys <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteToys.map((toy) => (
              <Link to={`/toy/${toy.id}`} key={toy.id} className="group block h-full">
                <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 border-gray-100 group-hover:border-primary/20">
                  <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                    {toy.image ? (
                      <img
                        src={toy.image}
                        alt={toy.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <Package className="h-12 w-12" />
                      </div>
                    )}
                    <button
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm text-red-500 hover:bg-red-50 transition-colors z-10"
                      onClick={(e) => handleRemoveFavorite(e, toy.id, toy.name)}
                    >
                      <Heart className="h-4 w-4 fill-current" />
                    </button>
                    {toy.availableQuantity < 5 && (
                      <Badge variant="destructive" className="absolute top-3 left-3 text-xs font-bold shadow-sm">
                        Low Stock
                      </Badge>
                    )}
                  </div>

                  <CardHeader className="pb-3 px-4 pt-4">
                    <div className="flex justify-between items-start mb-1">
                      <Badge variant="secondary" className="text-[10px] px-2 h-5 font-medium">{toy.category}</Badge>
                      <div className="flex items-center gap-1 text-yellow-500 text-xs font-bold">
                        <Star className="h-3 w-3 fill-current" />
                        {toy.rating}
                      </div>
                    </div>
                    <CardTitle className="text-base font-bold line-clamp-1 group-hover:text-primary transition-colors">
                      {toy.name}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="px-4 pb-4">
                    <div className="flex items-end justify-between">
                      <div className="space-y-1">
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <User className="h-3 w-3" /> {toy.age_group}
                        </p>
                        <p className="text-lg font-black text-gray-900">
                          ${toy.price.toFixed(2)}
                        </p>
                      </div>
                      <Button size="sm" variant="outline" className="h-8 rounded-full text-xs font-bold border-primary/20 text-primary hover:bg-primary hover:text-white group-hover:bg-primary group-hover:text-white transition-all">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>

    </div>
  );
};

export default Favorites;