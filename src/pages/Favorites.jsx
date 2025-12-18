// favourites page - users can save toys they like
// using localStorage for now, maybe firebase later if we need sync across devices
// TODO: add "clear all favourites" button

import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import ToyCard from '../components/ToyCard';
import toysData from '../data/toys.json';

const Favourites = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [favouriteToys, setFavouriteToys] = useState([]);
  const [dataLoading, setDataLoading] = useState(true); // extra loading state for favs data

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "ToyTopia || Favourites";
  }, [location]);

  // if user not logged in, stop loading
  useEffect(() => {
    if (!loading && !user) {
      setDataLoading(false);
    }
  }, [loading, user]);

  // load favourites from localStorage when user is available
  useEffect(() => {
    if (user) {
      // localStorage theke favs gula niye aschi
      const favs = JSON.parse(localStorage.getItem('favourites') || '[]');
      const toys = toysData.toys.filter(toy => favs.includes(toy.id));
      setFavouriteToys(toys);
      setDataLoading(false);
      // console.log("found these favs:", favs);
      console.log("favs loaded:", toys.length)
    }
  }, [user]);

  if (loading || dataLoading) {
    return (<div className="min-h-screen flex justify-center items-center"><span className="loading loading-spinner loading-lg"></span></div>);
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <span className="text-6xl mb-4">❤️</span>
        <h1 className="text-3xl font-bold mb-4">Your Favourites List</h1>
        <p className="text-gray-500 mb-8">Please log in to see your saved toys</p>
        <button onClick={() => navigate('/auth')} className="btn btn-primary">Login Now</button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
        <p className="text-gray-500">{favouriteToys.length > 0 ? `You have saved ${favouriteToys.length} toys` : "Your wishlist is empty"}</p>
      </div>

      {favouriteToys.length === 0 ? (
        <div className="card bg-base-100 shadow max-w-md mx-auto">
          <div className="card-body text-center">
            <span className="text-5xl mb-4">🧸</span>
            <h3 className="card-title justify-center">No Favourites Yet</h3>
            <p className="text-gray-500">Browse our collection and tap the heart to save items!</p>
            <div className="card-actions justify-center mt-4"><Link to="/all-toys" className="btn btn-primary">Explore Toys →</Link></div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favouriteToys.map((toy) => (<ToyCard key={toy.id} toy={toy} />))}
        </div>
      )}
    </div>
  );
};

export default Favourites;