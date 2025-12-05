import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export const useFavorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = useCallback(() => {
    if (!user) {
      setFavorites([]);
      return;
    }
    try {
      const stored = localStorage.getItem(`favorites_${user.uid}`);
      const parsed = stored ? JSON.parse(stored) : [];
      setFavorites(parsed);
    } catch (error) {
      console.error("Failed to parse favorites", error);
      setFavorites([]);
    }
  }, [user]);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

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

  const removeFromFavorites = (toyId) => {
    if (!user) return false;

    const updated = favorites.filter(fav => fav.toyId !== toyId);
    localStorage.setItem(`favorites_${user.uid}`, JSON.stringify(updated));
    setFavorites(updated);
    return true;
  };

  const isFavorite = (toyId) => favorites.some(fav => fav.toyId === toyId);

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    loadFavorites
  };
};
