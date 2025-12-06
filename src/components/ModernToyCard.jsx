// toy card component
// this shows single toy in grid
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Eye, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useFavorites } from '@/hooks/useFavorites';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const ModernToyCard = ({ toy }) => {
  const { id, name, description, price, image, category, rating } = toy;

  const { user } = useAuth();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();

  // for heart icon
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(isFavorite(id));
  }, [isFavorite, id]);

  // toggle favorite
  const handleLike = () => {
    if (!user) {
      toast.error("Please login first");
      return;
    }
    if (isFavorite(id)) {
      removeFromFavorites(id);
      toast.success("Removed");
    } else {
      addToFavorites(id);
      toast.success("Added to favorites");
    }
  };

  return (
    <Card className="group rounded-xl border overflow-hidden hover:shadow-lg transition flex flex-col h-full bg-white">
      {/* img */}
      <div className="aspect-square overflow-hidden bg-gray-100 relative">
        {image ? (
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover group-hover:scale-105 transition"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-300">
            No Image
          </div>
        )}
      </div>

      {/* content */}
      <div className="p-4 space-y-2 flex-grow flex flex-col">
        <div className="flex justify-between items-center">
          {category && (
            <Badge variant="secondary" className="text-xs">
              {category}
            </Badge>
          )}
          {rating > 0 && (
            <div className="flex items-center gap-1 text-xs text-amber-500">
              <Star className="h-3 w-3 fill-current" />
              {rating}
            </div>
          )}
        </div>

        <div>
          <h3 className="font-bold text-gray-900 line-clamp-1">{name}</h3>
          <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
        </div>

        {/* price and btns */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t">
          <span className="text-lg font-bold text-blue-600">
            ${price}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLike}
              className={`p-2 rounded-full transition ${liked ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-400'}`}
            >
              <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
            </button>

            <Link to={`/toy/${id}`}>
              <Button size="sm" className="text-xs">
                <Eye className="h-3 w-3 mr-1" />
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
