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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-border/50 ${isScrolled ? 'bg-background/80 backdrop-blur-md py-3' : 'bg-background py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 flex items-center justify-center">
            <img src={logo} alt="ToyTopia" className="w-full h-full object-contain" />
          </div>
          <span className="text-xl font-bold tracking-tight">ToyTopia</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => `
                text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:text-primary
                ${isActive ? 'text-primary' : 'text-foreground/60'}
              `}
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/favourites" className="text-foreground/60 hover:text-primary transition-colors">
                <Heart className="w-5 h-5" />
              </Link>
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="w-8 h-8 rounded-full overflow-hidden border border-border cursor-pointer block hover:border-primary transition-colors">
                  <img src={user?.photoURL || 'https://i.ibb.co/ZYW3VTp/brown-brim.png'} className="w-full h-full object-cover" />
                </label>
                <ul tabIndex={0} className="dropdown-content mt-4 p-2 bg-background border border-border rounded-xl w-56 shadow-xl">
                  <div className="px-3 py-2 border-b border-border mb-1">
                    <p className="font-bold text-sm truncate">{user?.displayName}</p>
                    <p className="text-[10px] text-muted-foreground truncate">{user?.email}</p>
                  </div>
                  <li><Link to="/profile" className="flex items-center gap-2 p-2 hover:bg-muted rounded-lg transition-all text-xs font-bold"><User className="w-3.5 h-3.5" /> Profile</Link></li>
                  <li><button onClick={handleLogout} className="w-full flex items-center gap-2 p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-all text-xs font-bold"><LogOut className="w-3.5 h-3.5" /> Logout</button></li>
                </ul>
              </div>
            </div>
          ) : (
            <Link to="/auth">
              <Button size="sm" className="rounded-lg px-6">Login</Button>
            </Link>
          )}

          <button
            className="lg:hidden p-2 text-foreground/70"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden fixed top-[65px] left-0 right-0 bg-background border-b border-border shadow-2xl overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) => `
                    text-sm font-bold uppercase tracking-widest p-2 transition-all
                    ${isActive ? 'text-primary' : 'text-foreground/60'}
                  `}
                >
                  {link.name}
                </NavLink>
              ))}
              {!user && (
                <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full rounded-lg mt-4">Login</Button>
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
