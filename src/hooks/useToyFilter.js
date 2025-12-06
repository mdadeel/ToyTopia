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
    // checks both name and description
    if (searchQuery) {
      let q = searchQuery.toLowerCase();
      result = result.filter(toy => {
        let nameMatch = toy.name.toLowerCase().includes(q);
        // had a bug here before where description was null
        let descMatch = toy.description && toy.description.toLowerCase().includes(q);
        return nameMatch || descMatch;
      });
    }

    /*
    // old logic - strict match
    if (selectedCategory) {
      result = result.filter(t => t.category == selectedCategory)
    }
    */

    // category filter
    if (selectedCategory !== 'All Categories') {
      result = result.filter(toy => toy.category === selectedCategory);
    }

    // console.log("filtered:", result.length); // debugging
    setFilteredToys(result);
  }, [searchQuery, selectedCategory, toys]);

  // reset everything
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
