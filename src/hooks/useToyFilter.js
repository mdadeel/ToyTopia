// filter hook for toys
// used in home page and all toys page
import { useState, useEffect } from 'react';

export const useToyFilter = (toys, initialCategory = 'All Categories') => {
  const [filteredToys, setFilteredToys] = useState(toys);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  // filter when search or category changes
  useEffect(() => {
    let result = toys;

    // search filter
    if (searchQuery) {
      let q = searchQuery.toLowerCase();
      result = result.filter(toy => {
        let nameMatch = toy.name.toLowerCase().includes(q);
        let descMatch = toy.description && toy.description.toLowerCase().includes(q);
        return nameMatch || descMatch;
      });
    }

    // category filter
    if (selectedCategory !== 'All Categories') {
      result = result.filter(toy => toy.category === selectedCategory);
    }

    console.log("filtered:", result.length); // debugging
    setFilteredToys(result);
  }, [searchQuery, selectedCategory, toys]);

  // reset
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
