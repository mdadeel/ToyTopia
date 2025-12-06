import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Eye, ShoppingBag, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useFavorites } from '@/hooks/useFavorites';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const ModernToyCard = ({ toy }) => {
  const { id, name, description, price, image, category, rating = 0 } = toy;
  const { user } = useAuth();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    setIsFav(isFavorite(id));
  }, [isFavorite, id]);

  const handleFavoriteToggle = () => {
    if (!user) {
      toast.error("Please login to save favorites");
      return;
    }

    if (isFavorite(id)) {
      removeFromFavorites(id);
      toast.success("Removed from favorites");
    } else {
      addToFavorites(id);
      toast.success("Added to favorites");
    }
  };

  return (
    <Card className="group rounded-xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full bg-white">
      <div className="aspect-square overflow-hidden bg-gray-50 relative">
        {image ? (
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-300">
            <ShoppingBag className="h-16 w-16" />
          </div>
        )}
        {/* Quick action overlay could go here */}
      </div>

      <div className="p-5 space-y-3 flex-grow flex flex-col">
        <div className="flex justify-between items-start gap-2">
          {category && (
            <Badge variant="secondary" className="text-xs font-normal">
              {category}
            </Badge>
          )}
          {rating > 0 && (
            <div className="flex items-center gap-1 text-xs font-medium text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full">
              <Star className="h-3 w-3 fill-current" />
              {rating.toFixed(1)}
            </div>
          )}
        </div>

        <div>
          <h3 className="font-bold text-gray-900 line-clamp-1 group-hover:text-primary transition-colors">
            {name}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2 mt-1">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
          <span className="text-lg font-bold text-primary">
            ${price.toFixed(2)}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleFavoriteToggle}
              className={`p-2 rounded-full transition-colors ${isFav ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                }`}
            >
              <Heart className={`h-4 w-4 ${isFav ? 'fill-current' : ''}`} />
            </button>

            <Link to={`/toy/${id}`}>
              <Button size="sm" variant="default" className="text-xs px-4 h-9">
                <Eye className="h-3.5 w-3.5 mr-1.5" />
                View
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ModernToyCard;
