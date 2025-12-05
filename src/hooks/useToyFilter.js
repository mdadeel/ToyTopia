import { useState, useEffect } from 'react';

// filter toys hook
export const useToyFilter = (toys, initialCategory = 'All Categories') => {
  const [filteredToys, setFilteredToys] = useState(toys);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  useEffect(() => {
    let result = toys;

    // search filter
    if (searchQuery) {
      result = result.filter(toy =>
        toy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        toy.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // category filter
    if (selectedCategory !== 'All Categories') {
      result = result.filter(toy => toy.category === selectedCategory);
    }

    setFilteredToys(result);
  }, [searchQuery, selectedCategory, toys]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Categories');
  };

  return {
    filteredToys,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    resetFilters
  };
};
