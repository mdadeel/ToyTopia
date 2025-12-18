// allToys page - shows all products with filter options
// spent like 2 hours on the filters ughhh finally working

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ToyCard from '../components/ToyCard';
import toysData from '../data/toys.json';
import AOS from 'aos';
import 'aos/dist/aos.css';

// keeping spelling as catagories cuz changing it breaks stuff
const catagories = [
  'All Catagories',
  'Building Blocks',
  'Stuffed Animals',
  'Puzzles',
  'Arts & Crafts',
  'Action Figures',
  'Educational',
  'Outdoor',
  'Board Games'
];

const AllToys = () => {
  var toys = toysData.toys || []; // using var here, let was acting weird earlier
  const location = useLocation();

  const [search, setSearch] = useState('');
  const [catagory, setCatagory] = useState('All Catagories');
  const [sort, setSort] = useState('');

  // making a copy so original array doesnt get mutated (learned this the hard way lol)
  let filteredToys = [...toys];

  // search filter - lowrcase for case insensitive matching
  if (search) {
    let q = search.toLowerCase();
    filteredToys = filteredToys.filter(toy => {
      let nameMatch = toy.name.toLowerCase().includes(q);
      let descMatch = toy.description && toy.description.toLowerCase().includes(q);
      return nameMatch || descMatch;
    });
  }

  // catagory filter
  if (catagory !== 'All Catagories') {
    filteredToys = filteredToys.filter(toy => toy.category === catagory);
  }

  // sorting - kinda works but sometimes feels buggy idk
  // tried using localeCompare for alphabetical but nah too complicated
  if (sort === 'to low') {
    filteredToys.sort((a, b) => b.price - a.price);
  } else if (sort === 'to high') {
    filteredToys.sort((a, b) => a.price - b.price);
  }

  console.log("total filtered:", filteredToys.length)

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "ToyTopia || All Toys";
    AOS.init({ duration: 1000 });
  }, [location]);

  const clearFilters = () => {
    setSearch('');
    setCatagory('All Catagories');
    setSort('');
  };

  return (
    <div className="min-h-screen">
      <div className="bg-blue-600 text-white py-12" data-aos="fade-down">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">All Toys</h1>
          <p className="text-blue-100">Browse our collection of {toys.length}+ quality toys</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
          <input type="search" placeholder="Search toys..." value={search} onChange={(e) => setSearch(e.target.value)} className="input input-bordered w-full md:w-1/3" />
          <select value={catagory} onChange={(e) => setCatagory(e.target.value)} className="select select-bordered w-full md:w-48">
            {catagories.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="select select-bordered w-full md:w-48">
            <option value="">Sort by price</option>
            <option value="to low">High to Low</option>
            <option value="to high">Low to High</option>
          </select>
        </div>

        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">Showing {filteredToys.length} results</p>
          {(search || catagory !== 'All Catagories' || sort) && (<button onClick={clearFilters} className="btn btn-ghost btn-sm text-red-500">Clear Filters</button>)}
        </div>

        {filteredToys.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-xl font-bold mb-2">No toys found</h3>
            <p className="text-gray-500 mb-4">Try different search or filter</p>
            <button onClick={clearFilters} className="btn btn-outline">View All Toys</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredToys.map((toy) => (<ToyCard key={toy.id} toy={toy} />))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllToys;
