import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { Section, Card, Button } from '../components/ui';
import { KeyRound, Mail, ArrowLeft, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
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
    document.title = "ToyTopia || Reset Access";

    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email) return setError("Please enter your email");

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
    <div className="min-h-screen pt-32 pb-24 bg-muted/20 relative overflow-hidden flex items-center">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/2" />

      <Section containerClassName="max-w-xl relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 20 }}
        >
          <Card className="p-12 rounded-[3.5rem] premium-shadow border-white/40 glass">
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <KeyRound className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-4xl font-black mb-3 tracking-tight">Lost your <span className="text-secondary italic">Key?</span></h1>
              <p className="text-muted-foreground font-medium">No worries! Magic is just an email away.</p>
            </div>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-4"
                >
                  <div className="bg-emerald-50 text-emerald-700 p-8 rounded-[2.5rem] border border-emerald-100 mb-8">
                    <CheckCircle2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="font-black text-lg mb-2">Instructions Sent!</p>
                    <p className="font-medium text-sm opacity-80 leading-relaxed">
                      Check <span className="font-black">{email}</span> for your reset link. We've also opened Gmail for you.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <Button variant="outline" className="w-full rounded-2xl font-black gap-2 h-14" onClick={() => setSubmitted(false)}>
                      Try another email
                    </Button>
                    <Link to="/auth" className="block p-4 font-black text-sm text-primary hover:text-primary/80 transition-colors">
                      Back to Login
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Email Identity</label>
                    <div className="relative group">
                      <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-14 pr-6 py-5 rounded-2xl bg-muted border border-border focus:border-primary outline-none font-bold transition-all focus:ring-4 ring-primary/5"
                        required
                      />
                    </div>
                  </div>

                  {error && (
                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-destructive text-center text-sm font-black"
                    >
                      {error}
                    </motion.p>
                  )}

                  <Button type="submit" size="lg" className="w-full h-16 rounded-2xl text-lg font-black gap-3 mt-4" disabled={loading}>
                    {loading ? 'Sending Magic...' : 'Request Reset Link'}
                    {!loading && <ChevronRight className="w-6 h-6" />}
                  </Button>

                  <div className="text-center pt-4">
                    <Link to="/auth" className="inline-flex items-center gap-2 text-sm font-black text-muted-foreground hover:text-primary transition-colors group">
                      <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Login
                    </Link>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </Card>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">
              <Sparkles className="w-3 h-3" /> Secure Magic Link Protocol <Sparkles className="w-3 h-3" />
            </div>
          </div>
        </motion.div>
      </Section>
    </div>
  );
};

export default ForgotPassword;
