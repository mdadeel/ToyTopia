import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { Card, CardHeader, CardContent, CardFooter, Badge, Button } from '../ui';
import { Heart, Star, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

const ToyCard = ({ toy }) => {
    const { id, name, description, price, image, category, rating } = toy;
    const { user } = useContext(AuthContext);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        const favs = JSON.parse(localStorage.getItem('favourites') || '[]');
        setIsLiked(favs.includes(id));
    }, [id]);

    const handleLike = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!user) {
            alert("Please login first");
            return;
        }
        let favs = JSON.parse(localStorage.getItem('favourites') || '[]');
        if (favs.includes(id)) {
            favs = favs.filter(f => f !== id);
        } else {
            favs.push(id);
        }
        localStorage.setItem('favourites', JSON.stringify(favs));
        setIsLiked(!isLiked);
    };

    return (
        <Card className="group relative" hoverLift={true}>
            <Link to={`/toy/${id}`}>
                <div className="relative aspect-square overflow-hidden rounded-[2rem] mb-6">
                    {image ? (
                        <img
                            src={image}
                            alt={name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">No Image</div>
                    )}

                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Badge variant="secondary" className="glass py-2">{category}</Badge>
                        <button
                            onClick={handleLike}
                            className={`p-3 rounded-2xl glass transition-all ${isLiked ? 'text-destructive bg-destructive/10' : 'text-foreground/70 hover:text-destructive'}`}
                        >
                            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                        </button>
                    </div>

                    <div className="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <Button className="w-full glass border-white/20" size="sm">
                            <Eye className="w-4 h-4 mr-2" /> Quick View
                        </Button>
                    </div>
                </div>

                <CardContent className="p-0">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-black text-xl leading-tight group-hover:text-primary transition-colors line-clamp-1">{name}</h3>
                    </div>
                    <div className="flex items-center gap-1 mb-4 text-amber-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-bold">{rating}</span>
                    </div>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-6">{description}</p>
                </CardContent>

                <CardFooter className="p-0 border-t-0 flex items-center justify-between">
                    <span className="text-2xl font-black text-primary">${price}</span>
                    <Button variant="ghost" size="sm" className="p-0 hover:bg-transparent hover:text-primary">
                        Details →
                    </Button>
                </CardFooter>
            </Link>
        </Card>
    );
};

export default ToyCard;
