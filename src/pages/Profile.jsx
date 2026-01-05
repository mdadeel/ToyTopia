import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import toysData from '../data/toys.json';
import { Section, Button, Card, CardContent, Badge } from '../components/ui';
import { User, Mail, Camera, Save, X, LogOut, Heart, Calendar, Package, ChevronRight, Settings, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ToyCard from '../components/Shared/ToyCard';

const Profile = () => {
  const { user, updateUserInfo, loading, signOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [favouriteToys, setFavouriteToys] = useState([]);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "ToyTopia || My Profile";
  }, [location]);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      setName(user.displayName || '');
      setPhoto(user.photoURL || '');

      const favs = JSON.parse(localStorage.getItem('favourites') || '[]');
      const toys = toysData.toys.filter(toy => favs.includes(toy.id));
      setFavouriteToys(toys);
    }
  }, [user]);

  const handleSave = async () => {
    if (!name.trim()) return;
    setSaving(true);
    try {
      await updateUserInfo(name, photo);
      setEditing(false);
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    signOut().then(() => navigate('/'));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-16 h-16 bg-primary rounded-full blur-xl"
        />
      </div>
    );
  }

  return (
    <div className="pt-8 pb-20 min-h-screen bg-muted/20">
      <Section containerClassName="max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Left: Profile Overview */}
          <div className="lg:col-span-4 space-y-8">
            <Card className="p-8 rounded-xl premium-shadow overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-primary to-secondary opacity-20" />
              <div className="relative z-10 text-center">
                <div className="relative inline-block mb-6 group">
                  <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-4 border-background ring-8 ring-primary/5 premium-shadow">
                    <img
                      src={user?.photoURL || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucky'}
                      alt={user?.displayName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {editing && (
                    <div className="absolute inset-0 bg-black/40 rounded-[2.5rem] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                  )}
                </div>

                <AnimatePresence mode="wait">
                  {editing ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4 text-left"
                    >
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Display Name</label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary outline-none font-bold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Photo URL</label>
                        <input
                          type="url"
                          value={photo}
                          onChange={(e) => setPhoto(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary outline-none font-bold text-xs"
                        />
                      </div>
                      <div className="flex gap-3 pt-2">
                        <Button size="sm" onClick={handleSave} disabled={saving} className="flex-1 gap-2">
                          <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save'}
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => setEditing(false)} className="flex-1">Cancel</Button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <h2 className="text-3xl font-black tracking-tight mb-1">{user?.displayName || 'Adventurer'}</h2>
                      <p className="text-muted-foreground font-medium mb-8">{user?.email}</p>

                      <div className="flex flex-wrap justify-center gap-3">
                        <Button variant="outline" size="sm" onClick={() => setEditing(true)} className="rounded-2xl gap-2 font-black">
                          <Settings className="w-4 h-4" /> Edit Profile
                        </Button>
                        <Button variant="ghost" size="sm" onClick={handleLogout} className="rounded-2xl gap-2 font-black text-destructive hover:bg-destructive/10">
                          <LogOut className="w-4 h-4" /> Logout
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-12 pt-8 border-t border-border/50 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2 text-muted-foreground font-bold text-sm"><Calendar className="w-4 h-4" /> Joined</span>
                  <span className="font-black text-sm">{new Date(user?.metadata?.creationTime).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2 text-muted-foreground font-bold text-sm"><Heart className="w-4 h-4" /> Wishlist</span>
                  <span className="font-black text-sm">{favouriteToys.length} Items</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2 text-muted-foreground font-bold text-sm"><Package className="w-4 h-4" /> Points</span>
                  <Badge variant="accent" className="font-black">1,240 XP</Badge>
                </div>
              </div>
            </Card>

            <Card className="p-8 rounded-[3rem] bg-secondary text-secondary-foreground premium-shadow group cursor-pointer hover:bg-secondary/90 transition-colors">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-xl font-black mb-1">ToyPass Member</h4>
                  <p className="text-secondary-foreground/70 font-bold text-sm">Exclusive rewards active</p>
                </div>
                <ChevronRight className="w-8 h-8 transition-transform group-hover:translate-x-2" />
              </div>
            </Card>
          </div>

          {/* Right: Quick Links & Stats */}
          <div className="lg:col-span-8 space-y-6">
            <h3 className="text-2xl font-black tracking-tight">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link to="/favorites">
                <Card className="p-6 rounded-xl bg-card border border-border/50 hover:border-primary/20 transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center text-destructive shrink-0 transition-transform group-hover:scale-110">
                      <Heart className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <p className="font-black text-base">My Wishlist</p>
                      <p className="text-xs text-muted-foreground font-bold">{favouriteToys.length} items saved</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </div>
                </Card>
              </Link>
              <Link to="/all-toys">
                <Card className="p-6 rounded-xl bg-card border border-border/50 hover:border-primary/20 transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 transition-transform group-hover:scale-110">
                      <Package className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <p className="font-black text-base">Browse Toys</p>
                      <p className="text-xs text-muted-foreground font-bold">Explore our collection</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </div>
                </Card>
              </Link>
            </div>

            <Card className="p-6 rounded-xl bg-muted/50 border border-border/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="font-black text-base">Account Status: Active</p>
                  <p className="text-xs text-muted-foreground font-bold">Your ToyTopia account is in good standing.</p>
                </div>
              </div>
            </Card>
          </div>

        </div>
      </Section>
    </div>
  );
};

export default Profile;
