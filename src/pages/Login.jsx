import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Sparkles, Truck, ShieldCheck, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { Logo } from '../components/Brand';
import hero from '../assets/hero.jpg';

const Login = () => {
  const { userLogin, googleSign, user, loading } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'ToyTopia || Login';
  }, [location]);

  useEffect(() => {
    if (!loading && user) navigate('/profile');
  }, [user, loading, navigate]);

  const from = location.state?.from?.pathname || '/';

  const handelLogin = (e) => {
    setError('');
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    userLogin(email, password)
      .then(() => navigate(from, { replace: true }))
      .catch((err) => setError(err.message));
  };

  const googleLogin = () => googleSign().then(() => navigate(from, { replace: true }));

  return (
    <div className="min-h-screen flex items-stretch bg-cream">
      {/* Left: Form */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full lg:w-[44%] flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-12 relative z-10"
      >
        <div className="mx-auto w-full max-w-md">
          <Link to="/" className="inline-flex items-center gap-2 mb-10 text-ink/75 hover:text-coral font-extrabold">
            <ArrowLeft className="w-5 h-5" /> Back to store
          </Link>
          <Logo className="mb-8" />

          <h1 className="text-4xl font-extrabold mb-2">Welcome <span className="text-coral italic">back!</span></h1>
          <p className="text-ink/75 font-medium mb-8">Log in to pick up where the play left off.</p>

          <form onSubmit={handelLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-extrabold uppercase tracking-wide text-ink/70 ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/70" />
                <input required type="email" name="email" placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-line focus:ring-4 focus:ring-coral/10 focus:border-coral outline-none font-bold transition-all" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-extrabold uppercase tracking-wide text-ink/70 ml-1">Password</label>
                <Link to="/forgot-password" className="text-xs font-extrabold text-coral hover:underline">Forgot?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/70" />
                <input required type={showPass ? 'text' : 'password'} name="password" placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-white border border-line focus:ring-4 focus:ring-coral/10 focus:border-coral outline-none font-bold transition-all" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/70 hover:text-coral">
                  {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className="p-3.5 rounded-2xl bg-coral/10 border border-coral/20 text-coral text-sm font-bold">{error}</motion.div>
            )}

            <button type="submit" className="btn-coral w-full py-4 text-lg">Sign in</button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-line" /></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-cream px-4 text-ink/70 font-extrabold tracking-widest">Or continue with</span></div>
          </div>

          <button onClick={googleLogin}
            className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl border border-line bg-white hover:bg-cream font-extrabold transition-all">
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Sign in with Google
          </button>

          <p className="mt-8 text-center text-ink/75 font-medium">
            New to ToyTopia? <Link className="text-coral font-extrabold hover:underline" to="/register" state={from}>Create an account</Link>
          </p>
        </div>
      </motion.div>

      {/* Right: Brand panel */}
      <div className="hidden lg:block w-[56%] relative overflow-hidden bg-coral">
        <img src={hero} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover object-right opacity-90" />
        <div className="absolute inset-0 bg-coral/35" />
        <div className="absolute inset-0 flex items-center p-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="max-w-lg rounded-[36px] bg-white p-10 shadow-pop">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-coral text-white"><Sparkles className="h-7 w-7" /></span>
            <h2 className="mt-6 text-4xl font-extrabold text-ink">Welcome to ToyTopia</h2>
            <p className="mt-3 text-lg text-ink/65 font-medium">
              Thousands of families trust ToyTopia for safe, fun toys that little ones actually love.
            </p>
            <ul className="mt-6 space-y-2 text-sm font-bold text-ink/70">
              <li className="flex items-center gap-2"><Truck className="h-4 w-4 text-coral" /> Free shipping over $50</li>
              <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-coral" /> Safety tested & non-toxic</li>
              <li className="flex items-center gap-2"><RotateCcw className="h-4 w-4 text-coral" /> 30-day easy returns</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
