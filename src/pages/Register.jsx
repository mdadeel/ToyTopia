import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { User, Mail, Lock, Image as ImageIcon, Eye, EyeOff, ArrowLeft, Gift, Heart, Package, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Logo } from '../components/Brand';
import hero from '../assets/raw/hero-1.png';

const Register = () => {
  const { createuser, user, loading } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'ToyTopia || Register';
  }, [location]);

  useEffect(() => {
    if (!loading && user) navigate('/profile');
  }, [user, loading, navigate]);

  const from = location.state || '/';

  const handelRegister = async (e) => {
    setError('');
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;
    if (password.length < 6) return setError('Password must be at least 6 characters');
    if (!/[A-Z]/.test(password)) return setError('Password must have an uppercase letter');
    if (!/[a-z]/.test(password)) return setError('Password must have a lowercase letter');
    try {
      await createuser(name, email, password, photo);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  const input = 'w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-line focus:ring-4 focus:ring-coral/10 focus:border-coral outline-none font-bold transition-all';

  return (
    <div className="min-h-screen flex items-stretch bg-cream">
      {/* Left: Form */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
        className="w-full lg:w-[44%] flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-12 relative z-10">
        <div className="mx-auto w-full max-w-md">
          <Link to="/" className="inline-flex items-center gap-2 mb-10 text-ink/75 hover:text-coral font-extrabold">
            <ArrowLeft className="w-5 h-5" /> Back to store
          </Link>
          <Logo className="mb-8" />
          <h1 className="text-4xl font-extrabold mb-2">Start your <span className="text-coral italic">toy box</span></h1>
          <p className="text-ink/75 font-medium mb-8">Create an account and start filling the toy box.</p>

          <form onSubmit={handelRegister} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-extrabold uppercase tracking-wide text-ink/70 ml-1">Your name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/70" />
                <input required type="text" name="name" placeholder="Alex Parent" className={input} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-extrabold uppercase tracking-wide text-ink/70 ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/70" />
                <input required type="email" name="email" placeholder="name@example.com" className={input} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-extrabold uppercase tracking-wide text-ink/70 ml-1">Photo URL <span className="text-ink/30">(optional)</span></label>
              <div className="relative">
                <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/70" />
                <input type="url" name="photo" placeholder="https://…" className={input} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-extrabold uppercase tracking-wide text-ink/70 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/70" />
                <input required type={showPass ? 'text' : 'password'} name="password" placeholder="••••••••" className={input} />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/70 hover:text-coral">
                  {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="ml-1 text-xs text-ink/70">Min 6 chars, with upper & lower case letters.</p>
            </div>

            {error && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className="p-3.5 rounded-2xl bg-coral/10 border border-coral/20 text-coral text-sm font-bold">{error}</motion.div>
            )}

            <button type="submit" className="btn-coral w-full py-4 text-lg">Create account</button>
          </form>

          <p className="mt-8 text-center text-ink/75 font-medium">
            Already have an account? <Link className="text-coral font-extrabold hover:underline" to="/auth" state={from}>Sign in</Link>
          </p>
        </div>
      </motion.div>

      {/* Right: Brand panel */}
      <div className="hidden lg:block w-[56%] relative overflow-hidden bg-sky">
        <img src={hero} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover object-left opacity-90" />
        <div className="absolute inset-0 bg-sky/35" />
        <div className="absolute inset-0 flex items-center p-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="max-w-lg rounded-[36px] bg-white p-10 shadow-pop">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-sky text-white"><Gift className="h-7 w-7" /></span>
            <h2 className="mt-6 text-4xl font-extrabold text-ink">A toy box full of wonder</h2>
            <p className="mt-3 text-lg text-ink/65 font-medium">
              Join ToyTopia to save favourites, track orders and get first dibs on new drops.
            </p>
            <ul className="mt-6 space-y-2 text-sm font-bold text-ink/70">
              <li className="flex items-center gap-2"><Heart className="h-4 w-4 text-coral" /> Save favourites</li>
              <li className="flex items-center gap-2"><Package className="h-4 w-4 text-coral" /> Track every order</li>
              <li className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-coral" /> Early access to new drops</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register;
