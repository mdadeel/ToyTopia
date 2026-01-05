import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Button } from "../components/ui";
import { User, Mail, Lock, Image as ImageIcon, Eye, EyeOff, ArrowLeft, Gift } from "lucide-react";
import { motion } from "framer-motion";

const Register = () => {
    const { createuser, user, loading } = useContext(AuthContext);
    const [error, setError] = useState("");
    const [showPass, setShowPass] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "ToyTopia || Register";
    }, [location]);

    useEffect(() => {
        if (!loading && user) {
            navigate('/profile');
        }
    }, [user, loading, navigate]);

    const from = location.state || "/";

    const handelRegister = async (e) => {
        setError("");
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photo = form.photo.value;
        const password = form.password.value;

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }
        if (!/[A-Z]/.test(password)) {
            setError("Password must have an uppercase letter");
            return;
        }
        if (!/[a-z]/.test(password)) {
            setError("Password must have a lowercase letter");
            return;
        }

        try {
            await createuser(name, email, password, photo);
            navigate(from, { replace: true });
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-stretch bg-background">
            {/* Left Side: Form */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-full lg:w-[45%] flex flex-col justify-center px-8 sm:px-12 lg:px-20 py-12 relative z-10 bg-background"
            >
                <div className="max-w-md w-full mx-auto">
                    <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary font-bold mb-10 transition-colors group">
                        <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" /> Back to Store
                    </Link>

                    <div className="mb-10">
                        <h1 className="text-4xl font-black mb-3 tracking-tight">Create <span className="text-secondary italic">Account</span></h1>
                        <p className="text-muted-foreground font-medium">Join our community of toy lovers and curators today.</p>
                    </div>

                    <form onSubmit={handelRegister} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-black uppercase tracking-widest text-muted-foreground ml-1">Full Name</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-secondary transition-colors" />
                                <input
                                    required
                                    type="text"
                                    name="name"
                                    placeholder="John Doe"
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-muted/50 border border-border focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none font-bold transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-black uppercase tracking-widest text-muted-foreground ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-secondary transition-colors" />
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    placeholder="name@example.com"
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-muted/50 border border-border focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none font-bold transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-black uppercase tracking-widest text-muted-foreground ml-1">Photo URL (Optional)</label>
                            <div className="relative group">
                                <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-secondary transition-colors" />
                                <input
                                    type="url"
                                    name="photo"
                                    placeholder="https://..."
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-muted/50 border border-border focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none font-bold transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-black uppercase tracking-widest text-muted-foreground ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-secondary transition-colors" />
                                <input
                                    required
                                    type={showPass ? "text" : "password"}
                                    name="password"
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-12 py-4 rounded-2xl bg-muted/50 border border-border focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none font-bold transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass(!showPass)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-secondary transition-colors"
                                >
                                    {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">
                                Min 6 chars, with both upper & lowercase letters
                            </p>
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

                        <Button variant="secondary" className="w-full py-4 text-lg" type="submit">Create Account</Button>
                    </form>

                    <p className="mt-10 text-center text-muted-foreground font-medium">
                        Already have an account? <Link className="text-secondary font-black hover:underline" to="/auth">Sign In</Link>
                    </p>
                </div>
            </motion.div>

            {/* Right Side: Visual */}
            <div className="hidden lg:block w-[55%] relative overflow-hidden bg-secondary/10">
                <motion.div
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0"
                >
                    <img
                        src="https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&q=80&w=1200"
                        alt="Toys background"
                        className="w-full h-full object-cover grayscale-[20%]"
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
                        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white mb-6">
                            <Gift className="w-8 h-8" />
                        </div>
                        <h2 className="text-4xl font-black mb-4 text-white">Start Your Magic Hub</h2>
                        <p className="text-white/80 text-lg font-medium leading-relaxed">
                            Organize your collection, track your wishlist, and stay updated with the most magical toys around the world.
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Register;
