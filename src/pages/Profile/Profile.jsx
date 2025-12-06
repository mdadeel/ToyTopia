
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useFavorites } from '@/hooks/useFavorites';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, Trash2, Heart, User, Image, Save, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useNavigate, Link } from 'react-router-dom';

const Profile = () => {
  // ... logic ...

  // ... (keeping existing logic - wait, I need to keep the content)
  const { user, updateUserInfo, loading: authLoading, signOut } = useAuth();
  const { favorites: favoriteIds, removeFromFavorites } = useFavorites();
  const navigate = useNavigate();

  const [reviews, setReviews] = useState([]);
  const [favoriteToys, setFavoriteToys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  // Edit Form State
  const [name, setName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    document.title = 'My Profile | ToyTopia';
  }, []);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Load user reviews from local storage (mock DB)
        const allReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
        const userReviews = allReviews.filter(review => review.userId === user.uid);
        setReviews(userReviews);

        // Load favorites details
        const toysData = await import('@/data/toys.json');
        const favToys = toysData.toys.filter(toy => favoriteIds.map(fav => fav.toyId).includes(toy.id));
        setFavoriteToys(favToys);
      } catch (error) {
        console.error("Failed to load user data", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      setName(user.displayName || '');
      setPhotoURL(user.photoURL || '');
      fetchUserData();
    }
  }, [user, favoriteIds]);

  const handleSaveProfile = async () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    setSaving(true);
    try {
      await updateUserInfo(name, photoURL);
      setEditing(false);
    } catch (error) {
      // Error handled by AuthContext
    } finally {
      setSaving(false);
    }
  };

  const deleteReview = async (reviewId) => {
    if (!confirm("Delete this review?")) return;

    try {
      let allReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
      const updatedReviews = allReviews.filter(review => review.id !== reviewId);
      localStorage.setItem('reviews', JSON.stringify(updatedReviews));

      toast.success("Review deleted successfully");
      fetchUserData();
    } catch (error) {
      toast.error("Failed to delete review");
    }
  };

  const removeFavorite = async (toyId) => {
    removeFromFavorites(toyId);
    toast.success("Removed from favorites");
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  if (authLoading || loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50/50">

      <main className="flex-1 container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Left Column: User Profile Card */}
          <div className="md:col-span-1">
            <Card className="sticky top-24 shadow-sm border-gray-100 overflow-hidden">
              <div className="h-24 bg-gradient-to-r from-primary/10 to-primary/5"></div>
              <CardContent className="pt-0 relative px-6">
                <div className="flex justify-center -mt-12 mb-4">
                  <Avatar className="h-24 w-24 border-4 border-white shadow-sm bg-white">
                    <AvatarImage src={photoURL || user?.photoURL} alt="Profile" />
                    <AvatarFallback className="bg-gray-100 text-gray-500 text-2xl font-bold">
                      {(name || user?.displayName)?.charAt(0)?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="text-center mb-6">
                  {editing ? (
                    <div className="space-y-4 animate-in fade-in duration-300">
                      <div className="space-y-2 text-left">
                        <Label>Full Name</Label>
                        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" />
                      </div>
                      <div className="space-y-2 text-left">
                        <Label>Photo URL</Label>
                        <Input value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} placeholder="https://..." />
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button className="flex-1" onClick={handleSaveProfile} disabled={saving}>
                          {saving ? 'Saving...' : 'Save Changes'}
                        </Button>
                        <Button variant="outline" onClick={() => {
                          setEditing(false);
                          setName(user.displayName || '');
                          setPhotoURL(user.photoURL || '');
                        }} disabled={saving}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-xl font-bold text-gray-900">{name || user?.displayName || 'User'}</h2>
                      <p className="text-sm text-gray-500 mb-4">{user?.email}</p>

                      <div className="flex justify-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
                          <User className="h-4 w-4 mr-2" />
                          Edit Profile
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10" onClick={handleSignOut}>
                          <LogOut className="h-4 w-4" />
                        </Button>
                      </div>
                    </>
                  )}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm py-1">
                    <span className="text-gray-500">Member Since</span>
                    <span className="font-medium">{new Date(user?.metadata?.creationTime).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-sm py-1">
                    <span className="text-gray-500">Total Reviews</span>
                    <span className="font-medium">{reviews.length}</span>
                  </div>
                  <div className="flex justify-between text-sm py-1">
                    <span className="text-gray-500">Saved Toys</span>
                    <span className="font-medium">{favoriteToys.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Activity Feed */}
          <div className="md:col-span-2 space-y-8">

            {/* Favorites Section */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500 fill-current" />
                  Recent Favorites
                </h3>
                {favoriteToys.length > 0 && (
                  <Link to="/favorites" className="text-primary text-sm font-medium hover:underline">
                    View All
                  </Link>
                )}
              </div>

              {favoriteToys.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {favoriteToys.slice(0, 4).map(toy => (
                    <div key={toy.id} className="group flex bg-white border border-gray-100 rounded-lg p-3 hover:shadow-md transition-all">
                      <div className="h-16 w-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                        {toy.image ? (
                          <img src={toy.image} alt={toy.name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center">
                            <Star className="h-4 w-4 text-gray-300" />
                          </div>
                        )}
                      </div>
                      <div className="ml-3 flex-1 min-w-0">
                        <Link to={`/toy/${toy.id}`} className="block font-medium text-gray-900 truncate hover:text-primary transition-colors">
                          {toy.name}
                        </Link>
                        <p className="text-primary font-bold text-sm">${toy.price.toFixed(2)}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-0 text-gray-400 hover:text-destructive text-xs mt-1"
                          onClick={() => removeFavorite(toy.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white border border-dashed border-gray-200 rounded-lg p-8 text-center">
                  <Heart className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500">No favorite toys yet.</p>
                  <Button variant="link" asChild>
                    <Link to="/all-toys">Browse Toys</Link>
                  </Button>
                </div>
              )}
            </section>

            {/* Reviews Section */}
            <section>
              <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
                My Reviews
              </h3>

              <div className="space-y-4">
                {reviews.length > 0 ? (
                  reviews.map(review => (
                    <Card key={review.id} className="border-gray-100 shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-1 mb-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`h-3 w-3 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
                              ))}
                              <span className="text-gray-400 text-xs ml-2">
                                {new Date(review.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            {review.comment && (
                              <p className="text-gray-700 text-sm mt-1">{review.comment}</p>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-400 hover:text-destructive -mr-2 -mt-2"
                            onClick={() => deleteReview(review.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="bg-white border border-dashed border-gray-200 rounded-lg p-8 text-center">
                    <Star className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500">You haven't reviewed any toys yet.</p>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
