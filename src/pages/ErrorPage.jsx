import { Link } from "react-router-dom";
import { Button, Section } from "../components/ui";
import { Home, ArrowLeft, Ghost, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 blur-3xl rounded-full animate-pulse" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/20 blur-3xl rounded-full" />

      <Section containerClassName="max-w-2xl">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="relative inline-block">
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Ghost className="w-32 h-32 text-primary/40 mx-auto" />
              </motion.div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="text-8xl font-black text-foreground drop-shadow-2xl">404</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Oops! You've drifted out of <span className="text-primary italic">Toy Orbit</span></h1>
            <p className="text-muted-foreground text-xl mb-12 max-w-md mx-auto font-medium leading-relaxed">
              We couldn't find the page you're searching for. It might have been relocated to a different galaxy.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button size="lg" className="px-10 gap-2">
                  <Home className="w-5 h-5" /> Back to Base
                </Button>
              </Link>
              <Button variant="ghost" size="lg" className="px-10 gap-2 font-black" onClick={() => window.history.back()}>
                <ArrowLeft className="w-5 h-5" /> Previous Page
              </Button>
            </div>
          </motion.div>

          <div className="mt-20 pt-10 border-t border-border/50">
            <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs font-black uppercase tracking-widest leading-none">
              <AlertTriangle className="w-4 h-4 text-amber-500" /> Lost & Found Support: support@toypia.com
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};



export default ErrorPage;
