import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

// favorites hook
export const useFavorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = () => {
    if (!user) {
      setFavorites([]);
      return;
    }

    const stored = localStorage.getItem(`favorites_${user.uid}`);
    const parsed = stored ? JSON.parse(stored) : [];
    setFavorites(parsed);
  };

  useEffect(() => {
    loadFavorites();
  }, [user]);

  const addToFavorites = (toyId) => {
    if (!user) return false;

    const newFav = {
      toyId,
      userId: user.uid,
      addedAt: new Date().toISOString()
    };

    const updated = [...favorites, newFav];
    localStorage.setItem(`favorites_${user.uid}`, JSON.stringify(updated));
    setFavorites(updated);
    return true;
  };

  // remove function
  const removeFromFavorites = (toyId) => {
    if (!user) return false;

    const updated = favorites.filter(fav => fav.toyId !== toyId);
    localStorage.setItem(`favorites_${user.uid}`, JSON.stringify(updated));
    setFavorites(updated);
    return true;
  };

  const isFavorite = (toyId) => {
    return favorites.some(fav => fav.toyId === toyId);
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    loadFavorites
  };
};
