import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export const useFavorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  // Load favorites when user changes
  useEffect(() => {
    if (user) {
      const stored = localStorage.getItem(`favorites_${user.uid}`);
      if (stored) {
        setFavorites(JSON.parse(stored));
      } else {
        setFavorites([]);
      }
    } else {
      setFavorites([]);
    }
  }, [user]);

  // Add Item
  const addToFavorites = (toyId) => {
    if (!user) return;
    const newFav = { toyId, userId: user.uid, date: new Date() };
    const newList = [...favorites, newFav];
    localStorage.setItem(`favorites_${user.uid}`, JSON.stringify(newList));
    setFavorites(newList);
  };

  // Remove Item
  const removeFromFavorites = (toyId) => {
    if (!user) return;
    const newList = favorites.filter(item => item.toyId !== toyId);
    localStorage.setItem(`favorites_${user.uid}`, JSON.stringify(newList));
    setFavorites(newList);
  };

  // Check if exists
  const isFavorite = (toyId) => {
    return favorites.find(item => item.toyId === toyId);
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite
  };
};
