import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useFavorites } from '@/hooks/useFavorites';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star, Heart, Package, User, ShoppingBag, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import toysData from '@/data/toys.json';
import { z } from 'zod';

const reviewSchema = z.object({
  rating: z.number().min(1).max(5),

  comment: z.string().trim().max(500, "Comment cannot exceed 500 characters"),
});

const ToyDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { isFavorite: isToyFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const navigate = useNavigate();

  const [toy, setToy] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  // Review Form State
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [editingReviewId, setEditingReviewId] = useState(null);

  // Inquiry Form State
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');

  useEffect(() => {
    const foundToy = toysData.toys.find(t => t.id === id);
    if (!foundToy) {
      toast.error("Toy not found");
      navigate('/');
      return;
    }
    setToy(foundToy);
    document.title = `${foundToy.name} | ToyTopia`;
    setLoading(false);

    // Load reviews
    try {
      const allReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
      setReviews(allReviews.filter(r => r.toyId === id));
    } catch (e) {
      console.error("Failed to load reviews", e);
    }
  }, [id, navigate]);

  useEffect(() => {
    setIsFavorite(isToyFavorite(id));
  }, [isToyFavorite, id]);

  const handleFavoriteToggle = () => {
    if (!user) {
      toast.error("Please login to save favorites");
      navigate('/auth');
      return;
    }
    if (isFavorite) {
      removeFromFavorites(id);
      setIsFavorite(false);
      toast.success("Removed from favorites");
    } else {
      addToFavorites(id);
      setIsFavorite(true);
      toast.success("Added to favorites");
    }
  };

  const handleReviewSubmit = () => {
    if (!user) {
      toast.error("Please login to review");
      navigate('/auth');
      return;
    }

    try {
      reviewSchema.parse({ rating, comment });

      const allReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
      let updatedReviews;

      if (editingReviewId) {
        updatedReviews = allReviews.map(r =>
          r.id === editingReviewId
            ? { ...r, rating, comment, updatedAt: new Date().toISOString() }
            : r
        );
        toast.success("Review updated successfully");
      } else {
        const newReview = {
          id: `review-${Date.now()}`,
          toyId: id,
          userId: user.uid,
          userEmail: user.email,
          rating,
          comment,
          createdAt: new Date().toISOString()
        };
        updatedReviews = [...allReviews, newReview];
        toast.success("Review submitted successfully");
      }

      localStorage.setItem('reviews', JSON.stringify(updatedReviews));
      setReviews(updatedReviews.filter(r => r.toyId === id));
      resetReviewForm();
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const handleDeleteReview = (reviewId) => {
    if (!confirm("Are you sure you want to delete this review?")) return;

    const allReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    const updatedReviews = allReviews.filter(r => r.id !== reviewId);

    localStorage.setItem('reviews', JSON.stringify(updatedReviews));
    setReviews(updatedReviews.filter(r => r.toyId === id));
    toast.success("Review deleted");
  };

  const resetReviewForm = () => {
    setRating(5);
    setComment('');
    setEditingReviewId(null);
  };

  const handleInquirySubmit = () => {
    if (!inquiryName.trim() || !inquiryEmail.trim()) {
      toast.error("Please fill in your details");
      return;
    }
    toast.success(`Request received, ${inquiryName}! We'll contact you shortly.`);
    setInquiryName('');
    setInquiryEmail('');
  };

  if (loading || !toy) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50/30">

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm relative group">
              {toy.image ? (
                <img src={toy.image} alt={toy.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-50">
                  <Package className="h-20 w-20 text-gray-300" />
                </div>
              )}
              {toy.availableQuantity < 5 && (
                <Badge variant="destructive" className="absolute top-4 left-4 text-xs font-bold animate-pulse">
                  Only {toy.availableQuantity} left!
                </Badge>
              )}
            </div>

            {/* Inquiry Form (Mobile/Desktop) */}
            <Card className="bg-blue-50/50 border-blue-100">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2 text-blue-800">
                  <Package className="h-5 w-5" />
                  Request a Demo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    placeholder="Your Name"
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    className="bg-white"
                  />
                  <Input
                    placeholder="Your Email or Phone"
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                    className="bg-white"
                  />
                </div>
                <Button onClick={handleInquirySubmit} className="w-full font-bold">
                  Send Inquiry
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="px-3 py-1 text-sm font-medium border-primary/20 text-primary bg-primary/5">
                  {toy.category}
                </Badge>
                <div className="flex items-center gap-1 text-yellow-500 font-bold text-sm">
                  <Star className="h-4 w-4 fill-current" />
                  {toy.rating} <span className="text-gray-400 font-normal">({reviews.length} reviews)</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4 leading-tight">{toy.name}</h1>
              <p className="text-gray-600 text-lg leading-relaxed">{toy.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-500 text-xs uppercase font-bold mb-1">Age Group</p>
                <p className="font-semibold text-gray-900">{toy.age_group || '3+ Years'}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-500 text-xs uppercase font-bold mb-1">Material</p>
                <p className="font-semibold text-gray-900">{toy.material || 'Child Safe Plastic'}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-500 text-xs uppercase font-bold mb-1">Seller</p>
                <p className="font-semibold text-gray-900">{toy.seller_name || 'ToyTopia Official'}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-500 text-xs uppercase font-bold mb-1">Availability</p>
                <p className="font-semibold text-green-600">In Stock</p>
              </div>
            </div>

            <div className="flex items-center items-stretch gap-4 border-t pt-6">
              <div className="flex-1">
                <p className="text-sm text-gray-500 font-medium">Total Price</p>
                <p className="text-4xl font-black text-primary">${toy.price.toFixed(2)}</p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-auto text-red-500 border-red-200 hover:bg-red-50"
                  onClick={() => toast.error("Sorry Bhai, fixed price! No bargaining 🙏")}
                >
                  Bargain?
                </Button>
                <Button
                  size="lg"
                  className={`h-auto px-8 gap-2 font-bold text-lg ${isFavorite ? 'bg-pink-50 text-pink-500 border-2 border-pink-200 hover:bg-pink-100 hover:text-pink-600' : ''}`}
                  variant={isFavorite ? "ghost" : "default"}
                  onClick={handleFavoriteToggle}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                  {isFavorite ? 'Saved' : 'Add to Favorites'}
                </Button>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="border-t pt-8">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                Customer Reviews
                <Badge variant="secondary" className="rounded-full px-2">{reviews.length}</Badge>
              </h3>

              {user ? (
                <div className="bg-gray-50 p-6 rounded-xl mb-8">
                  <h4 className="font-bold text-sm uppercase text-gray-500 mb-4">
                    {editingReviewId ? 'Edit your review' : 'Write a review'}
                  </h4>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setRating(star)}
                          className={`transition-transform hover:scale-110 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        >
                          <Star className="h-8 w-8 fill-current" />
                        </button>
                      ))}
                    </div>
                    <Textarea
                      placeholder="Share your experience... (e.g. My kid loved it!)"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="bg-white"
                    />
                    <div className="flex gap-2">
                      <Button onClick={handleReviewSubmit}>
                        {editingReviewId ? 'Update Review' : 'Post Review'}
                      </Button>
                      {editingReviewId && (
                        <Button variant="ghost" onClick={resetReviewForm}>Cancel</Button>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-blue-50 p-4 rounded-lg text-center mb-8">
                  <p className="text-blue-800">Please <Button variant="link" className="px-1 h-auto font-bold" onClick={() => navigate('/auth')}>login</Button> to write a review.</p>
                </div>
              )}

              <div className="space-y-4">
                {reviews.length === 0 ? (
                  <p className="text-center text-gray-500 py-8 italic">No reviews yet. Be the first!</p>
                ) : (
                  reviews.map((review) => (
                    <div key={review.id} className="border-b last:border-0 pb-4 last:pb-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{review.userEmail?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-bold text-sm text-gray-900">{review.userEmail}</p>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`h-3 w-3 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                              ))}
                              <span className="text-xs text-gray-400 ml-2">
                                {new Date(review.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        {user?.uid === review.userId && (
                          <div className="flex gap-1">
                            <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => {
                              setEditingReviewId(review.id);
                              setRating(review.rating);
                              setComment(review.comment);
                            }}>
                              <Edit className="h-4 w-4 text-gray-500" />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8 hover:text-red-600" onClick={() => handleDeleteReview(review.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm pl-10">{review.comment}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ToyDetails;
