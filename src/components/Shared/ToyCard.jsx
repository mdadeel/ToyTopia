import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { Card, CardHeader, CardContent, CardFooter, Badge, Button } from '../ui';
import { Heart, Star, Eye, ShoppingBag } from 'lucide-react';
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
        <Card className="group flex flex-col h-full bg-background border border-border/50 hover:border-primary/30 transition-all duration-300 rounded-xl overflow-hidden shadow-sm">
            <Link to={`/toy/${id}`} className="block relative aspect-[4/5] overflow-hidden">
                {image ? (
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center text-xs font-bold uppercase tracking-widest text-muted-foreground">No Image</div>
                )}

                {/* Fixed Badge */}
                <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="bg-background/90 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm border-none rounded-md px-2 py-1 shadow-sm">
                        {category}
                    </Badge>
                </div>

                {/* Like Button */}
                <button
                    onClick={handleLike}
                    className={`absolute top-3 right-3 p-2 rounded-lg bg-background/90 backdrop-blur-sm border border-border shadow-sm transition-all hover:scale-110 ${isLiked ? 'text-destructive' : 'text-foreground/40 hover:text-destructive'}`}
                >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                </button>
            </Link>

            <div className="p-3 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2 gap-2">
                    <h3 className="font-bold text-base leading-tight group-hover:text-primary transition-colors line-clamp-1">{name}</h3>
                    <div className="flex items-center gap-1 shrink-0 text-amber-500">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="text-[10px] font-black">{rating}</span>
                    </div>
                </div>

                <p className="text-muted-foreground text-xs line-clamp-2 mb-4 leading-relaxed font-medium">
                    {description}
                </p>

                <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-none mb-1">Price</span>
                        <span className="text-base font-black text-foreground">${price}</span>
                    </div>
                    <Button size="sm" className="rounded-lg font-bold text-[11px] uppercase tracking-widest px-4 h-9 gap-2">
                        <ShoppingBag size={14} /> Add
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default ToyCard;
