import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Card, Button } from '../components/ui';
import { Settings, LogOut, Heart, Package, Sparkles, ShieldCheck, ChevronRight, Camera, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mark } from '../components/Brand';

const Profile = () => {
  const { user, loading, signOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');
  const [saving, setSaving] = useState(false);
  const [favCount, setFavCount] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'ToyTopia || Profile';
  }, [location]);

  useEffect(() => {
    if (user) {
      setName(user.displayName || '');
      setPhoto(user.photoURL || '');
      setFavCount(JSON.parse(localStorage.getItem('favourites') || '[]').length);
    }
  }, [user]);

  useEffect(() => {
    if (!loading && !user) navigate('/auth', { replace: true });
  }, [loading, user, navigate]);

  const handleSave = () => {
    setSaving(true);
    // persist locally for the demo; wire to your API as needed
    setTimeout(() => { setSaving(false); setEditing(false); }, 600);
  };

  const handleLogout = () => signOut().then(() => navigate('/')).catch(() => {});

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}
          className="w-16 h-16 bg-coral rounded-full blur-xl" />
      </div>
    );
  }

  const joined = user.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : '—';

  return (
    <div className="pt-28 bg-cream">
      <div className="shell pb-20">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left: Overview */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="p-8 relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-28 bg-ink" />
              <div className="relative z-10 text-center">
                <div className="relative inline-block mb-4">
                  <div className="h-28 w-28 overflow-hidden rounded-[28px] border-4 border-white bg-cream shadow-card">
                    {photo ? (
                      <img src={photo} alt={name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="grid h-full w-full place-items-center text-coral"><User className="h-10 w-10" /></div>
                    )}
                  </div>
                  {editing && <div className="absolute inset-0 grid place-items-center rounded-[28px] bg-black/40 text-white"><Camera className="h-6 w-6" /></div>}
                </div>

                <AnimatePresence mode="wait">
                  {editing ? (
                    <motion.div key="edit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3 text-left">
                      <div className="space-y-1">
                        <label className="text-[10px] font-extrabold uppercase tracking-wide text-ink/70 ml-1">Display name</label>
                        <input value={name} onChange={(e) => setName(e.target.value)}
                          className="w-full rounded-2xl border border-line bg-cream px-4 py-2.5 font-bold outline-none focus:ring-4 focus:ring-coral/10" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-extrabold uppercase tracking-wide text-ink/70 ml-1">Photo URL</label>
                        <input value={photo} onChange={(e) => setPhoto(e.target.value)}
                          className="w-full rounded-2xl border border-line bg-cream px-4 py-2.5 text-sm font-bold outline-none focus:ring-4 focus:ring-coral/10" />
                      </div>
                      <div className="flex gap-3 pt-1">
                        <Button size="sm" onClick={handleSave} disabled={saving} className="flex-1 justify-center">{saving ? 'Saving…' : 'Save'}</Button>
                        <Button size="sm" variant="ghost" onClick={() => setEditing(false)} className="flex-1 justify-center">Cancel</Button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div key="view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <h2 className="text-2xl font-extrabold">{user.displayName || 'Adventurer'}</h2>
                      <p className="text-ink/70 font-medium">{user.email}</p>
                      <div className="mt-5 flex justify-center gap-3">
                        <Button size="sm" variant="outline" onClick={() => setEditing(true)} className="gap-2"><Settings className="h-4 w-4" /> Edit</Button>
                        <Button size="sm" variant="ghost" onClick={handleLogout} className="gap-2 text-coral"><LogOut className="h-4 w-4" /> Log out</Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="relative z-10 mt-8 space-y-3 border-t border-line pt-6">
                <div className="flex items-center justify-between"><span className="flex items-center gap-2 text-sm font-bold text-ink/75"><Heart className="h-4 w-4 text-coral" /> Wishlist</span><span className="font-extrabold">{favCount} items</span></div>
                <div className="flex items-center justify-between"><span className="flex items-center gap-2 text-sm font-bold text-ink/75"><Package className="h-4 w-4 text-sky" /> Orders</span><span className="font-extrabold">3 shipped</span></div>
                <div className="flex items-center justify-between"><span className="flex items-center gap-2 text-sm font-bold text-ink/75"><Sparkles className="h-4 w-4 text-sun" /> ToyPoints</span><span className="font-extrabold">1,240</span></div>
                <div className="flex items-center justify-between"><span className="flex items-center gap-2 text-sm font-bold text-ink/75"><ShieldCheck className="h-4 w-4 text-mint" /> Joined</span><span className="font-extrabold">{joined}</span></div>
              </div>
            </Card>

            <div className="flex items-center gap-4 rounded-[28px] bg-coral p-6 text-white shadow-pop">
              <Mark className="h-12 w-12" />
              <div>
                <p className="font-extrabold">ToyPass Member</p>
                <p className="text-sm text-white/80">Exclusive rewards are active</p>
              </div>
            </div>
          </div>

          {/* Right: Quick actions */}
          <div className="lg:col-span-8 space-y-6">
            <h3 className="text-2xl font-extrabold">Quick actions</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <Link to="/favorites">
                <Card className="flex items-center gap-4 p-6 transition-transform hover:-translate-y-1">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-coral/10 text-coral"><Heart className="h-6 w-6" /></span>
                  <div className="flex-1"><p className="font-extrabold">My Wishlist</p><p className="text-xs font-bold text-ink/70">{favCount} items saved</p></div>
                  <ChevronRight className="h-5 w-5 text-ink/70" />
                </Card>
              </Link>
              <Link to="/all-toys">
                <Card className="flex items-center gap-4 p-6 transition-transform hover:-translate-y-1">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sky/10 text-sky"><Package className="h-6 w-6" /></span>
                  <div className="flex-1"><p className="font-extrabold">Browse Toys</p><p className="text-xs font-bold text-ink/70">Explore the collection</p></div>
                  <ChevronRight className="h-5 w-5 text-ink/70" />
                </Card>
              </Link>
            </div>

            <Card className="flex items-center gap-4 p-6">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sun/20 text-sun"><Sparkles className="h-6 w-6" /></span>
              <div className="flex-1"><p className="font-extrabold">Account in good standing</p><p className="text-xs font-bold text-ink/70">Your ToyTopia account is active and safe.</p></div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
