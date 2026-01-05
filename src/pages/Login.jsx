import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Button, Card } from "../components/ui";
import { Mail, Lock, Eye, EyeOff, Github, ArrowLeft, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const Login = () => {
  const { userLogin, googleSign, user, loading } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "ToyTopia || Login";
  }, [location]);

  useEffect(() => {
    if (!loading && user) {
      navigate('/profile');
    }
  }, [user, loading, navigate]);

  const from = location.state?.from?.pathname || "/";

  const handelLogin = (e) => {
    setError("");
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    userLogin(email, password)
      .then((result) => {
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const googleLogin = () => {
    googleSign()
      .then(result => {
        navigate(from, { replace: true });
      });
  };

  return (
    <div className="min-h-screen flex items-stretch bg-background">
      {/* Left Side: Form */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full lg:w-[40%] flex flex-col justify-center px-8 sm:px-12 lg:px-20 py-12 relative z-10 bg-background"
      >
        <div className="max-w-md w-full mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary font-bold mb-12 transition-colors group">
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" /> Back to Store
          </Link>

          <div className="mb-10">
            <h1 className="text-4xl font-black mb-3 tracking-tight">Welcome <span className="text-primary italic">Back</span></h1>
            <p className="text-muted-foreground font-medium">Login to your account to continue your toy discovery journey.</p>
          </div>

          <form onSubmit={handelLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-black uppercase tracking-widest text-muted-foreground ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-muted/50 border border-border focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none font-bold transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-black uppercase tracking-widest text-muted-foreground ml-1">Password</label>
                <Link to="/forgot-password" size="sm" className="text-xs font-black text-primary hover:underline">Forgot?</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  required
                  type={showPass ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-4 rounded-2xl bg-muted/50 border border-border focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none font-bold transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive text-sm font-bold"
              >
                {error}
              </motion.div>
            )}

            <Button className="w-full py-4 text-lg" type="submit">Sign In</Button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-4 text-muted-foreground font-black tracking-widest">Or continue with</span></div>
          </div>

          <button
            onClick={googleLogin}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl border border-border hover:bg-muted font-black transition-all"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Sign in with Google
          </button>

          <p className="mt-10 text-center text-muted-foreground font-medium">
            New to ToyTopia? <Link className="text-primary font-black hover:underline" to="/register" state={from}>Create an account</Link>
          </p>
        </div>
      </motion.div>

      {/* Right Side: Visual */}
      <div className="hidden lg:block w-[60%] relative overflow-hidden bg-primary/10">
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=1200"
            alt="Toys background"
            className="w-full h-full object-cover grayscale-[20%] sepia-[10%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
        </motion.div>

        <div className="absolute bottom-20 left-20 right-20 z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass p-10 rounded-[3rem] border-white/20 premium-shadow max-w-xl"
          >
            <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center text-white mb-6">
              <Sparkles className="w-8 h-8" />
            </div>
            <h2 className="text-4xl font-black mb-4 text-white">Join the Joy Revolution</h2>
            <p className="text-white/80 text-lg font-medium leading-relaxed">
              Connect with a community of toy enthusiasts and get exclusive access to limited-edition drops and premium curation.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
