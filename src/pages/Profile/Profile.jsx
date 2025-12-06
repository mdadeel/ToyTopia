import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import toysData from '@/data/toys.json';
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
    document.title = "ToyTopia || Profile";
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
      console.log("loaded favs:", favs.length)
    }
  }, [user]);

  const handleSave = async () => {
    if (!name.trim()) {
      alert("Name cannot be empty");
      return;
    }
    setSaving(true);
    try {
      await updateUserInfo(name, photo);
      setEditing(false);
      alert("Profile updated!");
    } catch (error) {
      alert("Update failed");
      console.log(error)
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    signOut()
      .then(() => navigate('/'))
      .catch(error => console.log(error));
  };

  const removeFavourite = (toyId) => {
    let favs = JSON.parse(localStorage.getItem('favourites') || '[]');
    favs = favs.filter(f => f !== toyId);
    localStorage.setItem('favourites', JSON.stringify(favs));
    setFavouriteToys(favouriteToys.filter(t => t.id !== toyId));
  };

  if (loading) {
    return (<div className="min-h-screen flex justify-center items-center"><span className="loading loading-spinner loading-lg"></span></div>);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        <div className="md:col-span-1">
          <div className="card bg-base-100 shadow">
            <div className="card-body items-center text-center">
              <div className="avatar mb-4">
                <div className="w-24 rounded-full ring ring-primary ring-offset-2"><img src={user?.photoURL || 'https://i.ibb.co/ZYW3VTp/brown-brim.png'} /></div>
              </div>

              {editing ? (
                <div className="w-full space-y-4">
                  <div className="form-control"><label className="label">Name</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input input-bordered" /></div>
                  <div className="form-control"><label className="label">Photo URL</label><input type="url" value={photo} onChange={(e) => setPhoto(e.target.value)} className="input input-bordered" /></div>
                  <div className="flex gap-2">
                    <button onClick={handleSave} disabled={saving} className="btn btn-primary flex-1">{saving ? 'Saving...' : 'Save'}</button>
                    <button onClick={() => { setEditing(false); setName(user.displayName || ''); setPhoto(user.photoURL || ''); }} className="btn btn-ghost">Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="card-title">{user?.displayName || 'User'}</h2>
                  <p className="text-gray-500">{user?.email}</p>
                  <div className="card-actions mt-4">
                    <button onClick={() => setEditing(true)} className="btn btn-outline btn-sm">✏️ Edit Profile</button>
                    <button onClick={handleLogout} className="btn btn-ghost btn-sm text-red-500">🚪 Logout</button>
                  </div>
                </>
              )}

              <div className="divider"></div>
              <div className="w-full text-left">
                <p className="flex justify-between py-2"><span className="text-gray-500">Member Since</span><span className="font-medium">{new Date(user?.metadata?.creationTime).toLocaleDateString()}</span></p>
                <p className="flex justify-between py-2"><span className="text-gray-500">Saved Toys</span><span className="font-medium">{favouriteToys.length}</span></p>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">❤️ My Favourites</h3>

          {favouriteToys.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {favouriteToys.map(toy => (
                <div key={toy.id} className="card card-side bg-base-100 shadow-sm">
                  <figure className="w-24 h-24 flex-shrink-0"><img src={toy.image} alt={toy.name} className="w-full h-full object-cover" /></figure>
                  <div className="card-body p-4">
                    <Link to={`/toy/${toy.id}`} className="card-title text-sm hover:text-blue-600">{toy.name}</Link>
                    <p className="text-blue-600 font-bold">${toy.price}</p>
                    <button onClick={() => removeFavourite(toy.id)} className="btn btn-ghost btn-xs text-red-500">Remove</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body text-center">
                <p className="text-gray-500">No favourite toys yet</p>
                <Link to="/all-toys" className="btn btn-primary btn-sm">Browse Toys</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
