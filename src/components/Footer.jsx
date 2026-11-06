import { Link } from 'react-router-dom';
import { Mail, Send } from 'lucide-react';
import { Logo, PaymentRow } from './Brand';

export default function Footer() {
  return (
    <footer className="mt-10 bg-ink text-cream">
      <div className="shell grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo textClass="text-2xl text-cream" />
          <p className="mt-4 max-w-xs text-cream/75">
            Toys that make little eyes go wide. Curated, safe and seriously fun — delivered with a smile.
          </p>
          <PaymentRow className="mt-6" />
        </div>

        <div className="md:col-span-2">
          <h4 className="mb-4 font-display text-lg font-extrabold text-cream">Shop</h4>
          <ul className="space-y-3 text-cream/75">
            <li><Link to="/all-toys" className="hover:text-coral">All Toys</Link></li>
            <li><Link to="/all-toys" className="hover:text-coral">New Arrivals</Link></li>
            <li><Link to="/all-toys" className="hover:text-coral">Best Sellers</Link></li>
            <li><Link to="/all-toys" className="hover:text-coral">On Sale</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="mb-4 font-display text-lg font-extrabold text-cream">Help</h4>
          <ul className="space-y-3 text-cream/75">
            <li><Link to="/" className="hover:text-coral">Shipping</Link></li>
            <li><Link to="/" className="hover:text-coral">Returns</Link></li>
            <li><Link to="/" className="hover:text-coral">Safety</Link></li>
            <li><Link to="/" className="hover:text-coral">FAQ</Link></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="mb-4 font-display text-lg font-extrabold text-cream">Stay in the loop</h4>
          <p className="mb-4 text-cream/75">New drops, playful ideas and the odd discount. No spam, promise.</p>
          <form onSubmit={(e) => e.preventDefault()} className="flex max-w-sm items-center gap-2 rounded-full bg-cream/10 p-1.5 pl-4">
            <Mail className="h-4 w-4 shrink-0 text-cream/70" />
            <input
              type="email"
              placeholder="you@email.com"
              className="w-full bg-transparent text-sm text-cream placeholder:text-cream/70 outline-none"
            />
            <button type="submit" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-coral text-white">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="shell flex flex-col items-center justify-between gap-3 py-6 text-sm text-cream/70 sm:flex-row">
          <p>© {new Date().getFullYear()} ToyTopia. Made for play.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-cream">Privacy</a>
            <a href="#" className="hover:text-cream">Terms</a>
            <a href="#" className="hover:text-cream">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
