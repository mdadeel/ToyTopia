import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '@/contexts/AuthContext';
import toysData from '@/data/toys.json';
const ToyDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [toy, setToy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!user) {
      navigate('/auth', { state: { from: location } });
      return;
    }

    const found = toysData.toys.find(t => t.id === id);
    if (!found) {
      alert("Toy not found!");
      navigate('/');
      return;
    }

    setToy(found);
    document.title = `${found.name} || ToyTopia`;
    setLoading(false);

    const favs = JSON.parse(localStorage.getItem('favourites') || '[]');
    setLiked(favs.includes(id));
    console.log("toy loaded:", found.name)
  }, [id, user, navigate, location]);

  const handleLike = () => {
    let favs = JSON.parse(localStorage.getItem('favourites') || '[]');
    if (favs.includes(id)) {
      favs = favs.filter(f => f !== id);
    } else {
      favs.push(id);
    }
    localStorage.setItem('favourites', JSON.stringify(favs));
    setLiked(!liked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert("Please fill all fields");
      return;
    }
    setSubmitted(true);
    setName('');
    setEmail('');
  };

  if (loading || !toy) {
    return (<div className="min-h-screen flex justify-center items-center"><span className="loading loading-spinner loading-lg"></span></div>);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <div className="space-y-4">
          <div className="relative">
            {toy.image ? (<img src={toy.image} alt={toy.name} className="w-full rounded-2xl shadow-lg" />) : (<div className="w-full h-96 bg-gray-200 rounded-2xl flex items-center justify-center">No Image</div>)}
            {toy.availableQuantity < 5 && (<span className="badge badge-error absolute top-4 left-4">Only {toy.availableQuantity} left!</span>)}
          </div>

          <div className="card bg-blue-50">
            <div className="card-body">
              <h3 className="card-title">📦 Request Demo</h3>
              {submitted ? (
                <div className="alert alert-success"><span>Request received! We'll contact you soon.</span></div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} className="input input-bordered w-full" required />
                  <input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input input-bordered w-full" required />
                  <button type="submit" className="btn btn-primary w-full">Request Demo</button>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <span className="badge badge-secondary mb-2">{toy.category}</span>
            <h1 className="text-3xl font-bold mb-2">{toy.name}</h1>
            <div className="flex items-center gap-2 text-amber-500"><span>⭐ {toy.rating}</span></div>
          </div>

          <p className="text-gray-600 text-lg">{toy.description}</p>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg"><p className="text-gray-500 text-sm">Age Group</p><p className="font-bold">{toy.age_group || '3+ Years'}</p></div>
            <div className="bg-gray-50 p-4 rounded-lg"><p className="text-gray-500 text-sm">Material</p><p className="font-bold">{toy.material || 'Safe Plastic'}</p></div>
            <div className="bg-gray-50 p-4 rounded-lg"><p className="text-gray-500 text-sm">Seller</p><p className="font-bold">{toy.seller_name}</p></div>
            <div className="bg-gray-50 p-4 rounded-lg"><p className="text-gray-500 text-sm">Stock</p><p className="font-bold text-green-600">{toy.availableQuantity} available</p></div>
          </div>

          <div className="flex items-center justify-between border-t pt-6">
            <div><p className="text-gray-500 text-sm">Price</p><p className="text-4xl font-bold text-blue-600">${toy.price}</p></div>
            <div className="flex gap-2">
              <button onClick={handleLike} className={`btn ${liked ? 'btn-error' : 'btn-outline'}`}>{liked ? '❤️ Saved' : '🤍 Save'}</button>
            </div>
          </div>

          <div className="card bg-gray-50">
            <div className="card-body">
              <h3 className="card-title">Seller Information</h3>
              <p><strong>Name:</strong> {toy.seller_name}</p>
              <p><strong>Email:</strong> {toy.seller_email}</p>
              <p><strong>Location:</strong> {toy.seller_info}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToyDetails;
