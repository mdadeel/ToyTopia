import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import logo from '/logo.png';
const Navbar = () => {
  const { user, signOut } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(user)

  const handleLogout = () => {
    signOut()
      .then()
      .catch(error => console.log(error))
    navigate("/")
  }

  const menuItems = <>
    <li><NavLink to="/" className={({ isActive }) => (isActive ? 'text-blue-600 underline' : 'default')}>Home</NavLink></li>
    <li><NavLink to="/all-toys" className={({ isActive }) => (isActive ? 'text-blue-600 underline' : 'default')}>All Toys</NavLink></li>
    {user && <li><NavLink to="/favourites" className={({ isActive }) => (isActive ? 'text-blue-600 underline' : 'default')}>Favourites</NavLink></li>}
    {user && <li><NavLink to="/profile" className={({ isActive }) => (isActive ? 'text-blue-600 underline' : 'default')}>My Profile</NavLink></li>}
  </>

  const userInfo = <div className="ml-auto dropdown dropdown-end">
    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
      <div className="w-10 rounded-full"><img src={user?.photoURL || 'https://i.ibb.co/ZYW3VTp/brown-brim.png'} /></div>
    </label>
    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
      <li className="text-center font-bold py-2">{user?.displayName}</li>
      <li><Link to="/profile" className="justify-between">My Profile</Link></li>
      <li><Link to="/favourites">Favourites</Link></li>
      <li onClick={handleLogout}><a>Logout</a></li>
    </ul>
  </div>

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">{menuItems}</ul>
        </div>
        <Link to="/" className="flex items-center gap-2">
          {/* logo size is too big on mobile, fixing later */}
          <img src={logo} alt="ToyTopia" style={{ width: '40px', height: '40px' }} />
          <span className="btn btn-ghost normal-case text-xl font-bold text-blue-600">ToyTopia</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-medium">{menuItems}</ul>
      </div>
      <div className="navbar-end">
        {user ? userInfo : <Link className="btn btn-primary" to="/auth">Login</Link>}
      </div>
    </div>
  );
};

export default Navbar;
