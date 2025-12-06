import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
const ToyCard = ({ toy }) => {
    const { id, name, description, price, image, category, rating } = toy;
    const { user } = useContext(AuthContext);

    const [liked, setLiked] = useState(false);

    useEffect(() => {
        const favs = JSON.parse(localStorage.getItem('favourites') || '[]');
        setLiked(favs.includes(id));
    }, [id]);

    const handleLike = () => {
        if (!user) {
            alert("Please login first");
            return;
        }
        let favs = JSON.parse(localStorage.getItem('favourites') || '[]');
        if (favs.includes(id)) {
            favs = favs.filter(f => f !== id);
            console.log("removed from favs")
        } else {
            favs.push(id);
            console.log("added to favs")
        }
        localStorage.setItem('favourites', JSON.stringify(favs));
        setLiked(!liked);
    };

    return (
        <div className="card bg-base-100 shadow hover:shadow-lg transition">
            <figure className="px-4 pt-4 relative">
                {image ? (<img src={image} alt={name} className="rounded-xl h-48 w-full object-cover" />) : (<div className="rounded-xl h-48 w-full bg-gray-200 flex items-center justify-center">No Image</div>)}
                <button onClick={handleLike} className={`btn btn-circle btn-sm absolute top-6 right-6 ${liked ? 'btn-error' : 'btn-ghost bg-white'}`}>{liked ? '❤️' : '🤍'}</button>
            </figure>

            <div className="card-body p-4">
                <div className="flex justify-between items-center mb-2">
                    {category && <span className="badge badge-secondary">{category}</span>}
                    {rating > 0 && <span className="text-amber-500 text-sm">⭐ {rating}</span>}
                </div>
                <h3 className="card-title text-base">{name}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">{description}</p>

                <div className="card-actions justify-between items-center mt-auto pt-3 border-t">
                    <span className="text-lg font-bold text-blue-600">${price}</span>
                    <Link to={`/toy/${id}`}><button className="btn btn-primary btn-sm">View Details</button></Link>
                </div>
            </div>
        </div>
    );
};

export default ToyCard;
