import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { KeyRound, Mail, ArrowLeft, CheckCircle2, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ForgotPassword = () => {
  const { resetPassword } = useContext(AuthContext);
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'ToyTopia || Reset password';
    if (location.state?.email) setEmail(location.state.email);
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email) return setError('Please enter your email');
    setLoading(true);
    try {
      await resetPassword(email);
      setSubmitted(true);
      window.open('https://mail.google.com', '_blank');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-4 py-28">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-[36px] bg-white border border-line p-8 sm:p-10 shadow-card">
        <Link to="/auth" className="inline-flex items-center gap-2 mb-6 text-ink/75 hover:text-coral font-extrabold">
          <ArrowLeft className="w-4 h-4" /> Back to login
        </Link>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-mint/15 text-mint">
                <CheckCircle2 className="h-8 w-8" />
              </span>
              <h1 className="mt-5 text-3xl font-extrabold">Check your inbox!</h1>
              <p className="mt-2 text-ink/75">
                We sent a reset link to <span className="font-extrabold text-ink">{email}</span>. We also opened Gmail for you.
              </p>
              <button onClick={() => setSubmitted(false)} className="btn-outline-toy mt-7 w-full justify-center">Use another email</button>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <span className="grid h-16 w-16 place-items-center rounded-2xl bg-coral/10 text-coral">
                <KeyRound className="h-8 w-8" />
              </span>
              <h1 className="mt-5 text-3xl font-extrabold">Forgot your password?</h1>
              <p className="mt-2 text-ink/75">No worries — we'll send a magic reset link right away.</p>

              <form onSubmit={handleSubmit} className="mt-7 space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-extrabold uppercase tracking-wide text-ink/70 ml-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/70" />
                    <input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-cream border border-line focus:ring-4 focus:ring-coral/10 focus:border-coral outline-none font-bold transition-all" required />
                  </div>
                </div>
                {error && <p className="text-coral text-sm font-extrabold">{error}</p>}
                <button type="submit" disabled={loading} className="btn-coral w-full py-4 text-lg justify-center">
                  {loading ? 'Sending…' : <>Send reset link <ChevronRight className="w-5 h-5" /></>}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
