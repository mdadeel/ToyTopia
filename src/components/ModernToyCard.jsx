import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Eye, ShoppingBag, Heart } from 'lucide-react'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useFavorites } from '@/hooks/useFavorites'
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const ModernToyCard = ({ toy }) => {
  const { id, name, description, price, image, category, rating = 0 } = toy;
  const { user } = useAuth();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const [isFav, setIsFav] = useState(false)

  useEffect(() => {
    setIsFav(isFavorite(id));
  }, [isFavorite, id]);

  return (
    <Card className="rounded-lg border overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
      <div className="aspect-square overflow-hidden bg-gray-100">
        {image ? (
          <img src={image} alt={name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100">
            <ShoppingBag className="h-16 w-16 text-gray-300" />
          </div>
        )}
      </div>

      <div className="p-4 space-y-3 flex-grow flex flex-col">
        {category && (
          <Badge variant="secondary" className="text-xs w-fit">
            {category}
          </Badge>
        )}

        <h3 className="font-semibold text-lg line-clamp-1">{name}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>

        {/* rating stars */}
        <div className="flex items-center gap-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                  }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">({rating.toFixed(1)})</span>
        </div>

        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="text-xl font-bold text-primary">${price.toFixed(2)}</span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (!user) {
                  toast({ title: "Login required", description: "Please log in to add favorites" });
                  return;
                }

                if (isFavorite(id)) {
                  removeFromFavorites(id);
                  toast({ title: "Removed" });
                } else {
                  addToFavorites(id);
                  toast({ title: "Added!" });
                }
              }}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <Heart className={`h-5 w-5 ${isFav ? 'fill-current text-red-500' : 'text-gray-400'}`} />
            </button>

            <Link to={`/toy/${id}`}>
              <Button size="sm" variant="outline" className="text-xs px-3 py-1">
                <Eye className="h-4 w-4 mr-1" />
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
