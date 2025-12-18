import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

// Beginner-style card with clearer variable names and extra comments
const ToyCard = ({ toy }) => {
    // pull out toy fields we care about
    const { id, name, description, price, image, category, rating } = toy;
    const { user } = useContext(AuthContext);

    // track if current user liked this toy
    const [isToyLikedByCurrentUser, setIsToyLikedByCurrentUser] = useState(false);

    // small helper: get favourites list from localStorage (simple approach)
    const getFavouriteIds = () => {
        // I am keeping it simple and forgiving here
        const raw = localStorage.getItem('favourites');
        return raw ? JSON.parse(raw) : [];
    };

    // small helper: write favourites list back
    const saveFavouriteIds = (ids) => {
        // writing directly is fine for this demo
        localStorage.setItem('favourites', JSON.stringify(ids));
    };

    // when the component loads or the toy id changes, check liked state
    useEffect(() => {
        const favouriteIds = getFavouriteIds();
        const alreadyLiked = favouriteIds.includes(id);
        setIsToyLikedByCurrentUser(alreadyLiked);
    }, [id]);

    // toggle like: show an alert if user is not logged in
    const handleLike = () => {
        if (!user) {
            alert("Please login first");
            return;
        }

        // read favourites (beginner style: a couple of intermediate variables)
        const favouriteIdsBefore = getFavouriteIds();
        let favouriteIdsAfter = [...favouriteIdsBefore];

        if (favouriteIdsAfter.includes(id)) {
            // remove this id
            favouriteIdsAfter = favouriteIdsAfter.filter((favouriteToyId) => favouriteToyId !== id);
            console.log("removed from favourites");
        } else {
            // add this id
            favouriteIdsAfter.push(id);
            console.log("added to favourites");
        }

        // save changes
        saveFavouriteIds(favouriteIdsAfter);

        // update local UI state (beginner approach: derive next state with !)
        setIsToyLikedByCurrentUser(!isToyLikedByCurrentUser);
    };

    /*
    // simple card for testing
    return (
      <div className="card">
        <img src={image} />
        <h3>{name}</h3>
      </div>
    )
    */

    return (
        <div className="card bg-base-100 shadow hover:shadow-lg transition">
            <figure className="px-4 pt-4 relative">
                {image ? (<img src={image} alt={name} className="rounded-xl h-48 w-full object-cover" />) : (<div className="rounded-xl h-48 w-full bg-gray-200 flex items-center justify-center">No Image</div>)}
                {/* like button (simple toggle) */}
                <button onClick={handleLike} className={`btn btn-circle btn-sm absolute top-6 right-6 ${isToyLikedByCurrentUser ? 'btn-error' : 'btn-ghost bg-white'}`}>{isToyLikedByCurrentUser ? '❤️' : '🤍'}</button>
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
