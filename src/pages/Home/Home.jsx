import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ToyCard from '@/components/Shared/ToyCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import toysData from '@/data/toys.json';
import AOS from 'aos';
import 'aos/dist/aos.css';
const Home = () => {
  const toys = toysData.toys;
  const location = useLocation();

  // const [search, setSearch] = useState('');
  // const [catagory, setCatagory] = useState('All Catagories');
  // const [showCount, setShowCount] = useState(8);

  // new states
  const [search, setSearch] = useState('');
  const [catagory, setCatagory] = useState('All Catagories'); // keeping spell mistake for now
  const [showCount, setShowCount] = useState(8);

  let filteredToys = toys;
  if (search) {
    let q = search.toLowerCase();
    filteredToys = filteredToys.filter(toy => {
      // search by name or description
      let nameMatch = toy.name.toLowerCase().includes(q);
      let descMatch = toy.description && toy.description.toLowerCase().includes(q);
      return nameMatch || descMatch;
    });
  }
  if (catagory !== 'All Catagories') {
    filteredToys = filteredToys.filter(toy => toy.category === catagory);
  }
  // console.log("filtered:", filteredToys.length);

  const catagories = [
    'All Catagories',
    'Building Blocks',
    'Stuffed Animals',
    'Puzzles',
    'Educational',
    'Outdoor',
    'Arts & Crafts',
    'Action Figures',
    'Board Games'
  ];

  /*
  useEffect(() => {
    fetch('https://toypia-server.vercel.app/toys')
      .then(res => res.json())
      .then(data => setToys(data))
  }, [])
  */

  useEffect(() => {
    // scroll to top
    window.scrollTo(0, 0);
    document.title = "ToyTopia || Home";
    AOS.init({ duration: 1000 });
  }, [location]);

  // FIXME: sometimes this runs twice
  useEffect(() => {
    setShowCount(8);
  }, [search, catagory]);

  const scrollToToys = () => {
    const el = document.getElementById('toys-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // TODO: add loader here
  const loadMore = () => {
    setShowCount(prev => prev + 8);
  };

  return (
    <div>

      <section className="bg-gray-50 rounded-3xl my-4 mx-4" data-aos="fade-up">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <div className="badge badge-primary mb-4">🇧🇩 No.1 Toy Shop in Bangladesh</div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Welcome to <br /><span className="text-blue-600">ToyTopia</span></h1>
            <p className="max-w-2xl mb-6 text-gray-600 text-lg">Best toys for your kids. We delever all over Bangladesh. Cash on Delivery available! 🚚</p>
            <button onClick={scrollToToys} className="btn btn-primary mr-3">Shop Now</button>
            <button className="btn btn-outline">Call for Bulk</button>

            <div className="flex gap-8 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{toys.length}+</div>
                <div className="text-sm text-gray-500">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">100%</div>
                <div className="text-sm text-gray-500">Original</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">Fast</div>
                <div className="text-sm text-gray-500">Delievery</div>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex lg:col-span-5 lg:mt-0" data-aos="fade-left">
            <div className="grid grid-cols-2 gap-4">
              {toys.slice(0, 4).map((toy) => (
                <Link key={toy.id} to={`/toy/${toy.id}`} className="card bg-white shadow hover:shadow-lg transition">
                  <figure className="px-4 pt-4"><img src={toy.image} alt={toy.name} className="rounded-xl h-24 w-full object-cover" /></figure>
                  <div className="card-body p-3">
                    <h3 className="text-sm font-bold truncate">{toy.name}</h3>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-600 font-bold">${toy.price}</span>
                      <span className="text-gray-400">⭐ {toy.rating}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 px-4">
        <h2 className="text-3xl font-bold text-center mb-6" data-aos="fade-up">🔥 Trending Toys</h2>
        <Swiper modules={[Navigation, Autoplay]} spaceBetween={16} slidesPerView={1} navigation autoplay={{ delay: 3000 }} breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 }, 1280: { slidesPerView: 4 } }}>
          {toys.slice(0, 8).map((toy) => (
            <SwiperSlide key={`slide-${toy.id}`}><ToyCard toy={toy} /></SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="py-8 px-4 bg-gray-100" data-aos="fade-up">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card bg-blue-50">
            <div className="card-body flex-row items-center gap-4">
              <span className="text-3xl">🚚</span>
              <div><h3 className="font-bold">Fast Delievery</h3><p className="text-sm text-gray-500">Inside Dhaka 24hrs</p></div>
            </div>
          </div>
          <div className="card bg-green-50">
            <div className="card-body flex-row items-center gap-4">
              <span className="text-3xl">✅</span>
              <div><h3 className="font-bold">100% Original</h3><p className="text-sm text-gray-500">Guaranteed authentic</p></div>
            </div>
          </div>
          <div className="card bg-purple-50">
            <div className="card-body flex-row items-center gap-4">
              <span className="text-3xl">🏪</span>
              <div><h3 className="font-bold">Visit Store</h3><p className="text-sm text-gray-500">Agrabad, Chittagong</p></div>
            </div>
          </div>
        </div>
      </section>

      <main id="toys-section" className="py-8 px-4">
        <div className="text-center mb-8" data-aos="fade-up">
          <h2 className="text-3xl font-bold mb-2">All Products</h2>
          <p className="text-gray-500">Browse our collection of quality toys</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
          <input type="text" placeholder="Search toys..." value={search} onChange={(e) => setSearch(e.target.value)} className="input input-bordered w-full md:w-1/2" />
          <select value={catagory} onChange={(e) => setCatagory(e.target.value)} className="select select-bordered w-full md:w-48">
            {catagories.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
          </select>
        </div>

        {filteredToys.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-bold mb-2">No toys found</h3>
            <p className="text-gray-500 mb-4">Try different search or filter</p>
            <button onClick={() => { setSearch(''); setCatagory('All Catagories'); }} className="btn btn-outline">Clear Filters</button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredToys.slice(0, showCount).map((toy) => (<ToyCard key={toy.id} toy={toy} />))}
            </div>

            {filteredToys.length > showCount && (
              <div className="text-center mt-10">
                <button onClick={loadMore} className="btn btn-secondary">Load More ({filteredToys.length - showCount} remaining)</button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
