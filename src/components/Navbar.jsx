import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Button } from './ui';
import { ShoppingBag, Heart, User, LogOut, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '/logo.png';

const Navbar = () => {
  const { user, signOut } = useContext(AuthContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    signOut().catch(error => console.log(error));
    navigate("/");
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'All Toys', path: '/all-toys' },
    ...(user ? [
      { name: 'Favourites', path: '/favourites' },
      { name: 'My Profile', path: '/profile' }
    ] : [])
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-3' : 'py-5'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className={`glass rounded-[2rem] px-6 py-3 flex items-center justify-between transition-all duration-500 ${isScrolled ? 'mx-0' : 'mx-2 md:mx-4'}`}>
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div whileHover={{ rotate: 15 }} className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <img src={logo} alt="ToyTopia" className="w-7 h-7 object-contain" />
            </motion.div>
            <span className="text-2xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">ToyTopia</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => `
                  text-sm font-bold transition-all duration-300 hover:text-primary
                  ${isActive ? 'text-primary scale-110' : 'text-foreground/70'}
                `}
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/favourites" className="p-2 hover:bg-primary/10 rounded-full transition-colors relative">
                  <Heart className="w-5 h-5 text-foreground/70" />
                </Link>
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20 cursor-pointer block hover:border-primary transition-colors">
                    <img src={user?.photoURL || 'https://i.ibb.co/ZYW3VTp/brown-brim.png'} referrerPolicy="no-referrer" />
                  </label>
                  <ul tabIndex={0} className="dropdown-content mt-4 p-4 glass rounded-3xl w-64 premium-shadow border border-white/20">
                    <div className="px-2 py-3 border-b border-white/10 mb-2">
                      <p className="font-black text-lg">{user?.displayName}</p>
                      <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                    </div>
                    <li><Link to="/profile" className="flex items-center gap-3 p-3 hover:bg-primary/10 rounded-2xl transition-all font-bold"><User className="w-4 h-4" /> Profile</Link></li>
                    <li><button onClick={handleLogout} className="w-full flex items-center gap-3 p-3 hover:bg-destructive/10 text-destructive rounded-2xl transition-all font-bold"><LogOut className="w-4 h-4" /> Logout</button></li>
                  </ul>
                </div>
              </div>
            ) : (
              <Link to="/auth">
                <Button size="sm">Get Started</Button>
              </Link>
            )}

            <button
              className="lg:hidden p-2 hover:bg-primary/10 rounded-xl transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 right-0 px-4 mt-2"
          >
            <div className="glass rounded-[2rem] p-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) => `
                    text-lg font-bold p-3 rounded-2xl transition-all
                    ${isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-primary/10'}
                  `}
                >
                  {link.name}
                </NavLink>
              ))}
              {!user && (
                <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full">Get Started</Button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
