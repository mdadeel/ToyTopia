import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Send, Mail, MapPin, Phone, Sparkles } from 'lucide-react';
import { Button } from './ui';
import logo from '/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 pt-24 pb-12 px-4 border-t border-border/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand Column */}
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <img src={logo} alt="ToyTopia" className="w-7 h-7 object-contain" />
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent italic">ToyTopia</span>
            </Link>
            <p className="text-muted-foreground leading-relaxed font-medium">
              Creating magical moments and inspiring young minds with the world's most innovative and quality toys since 2024.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-widest mb-8 text-foreground">Explore Store</h4>
            <ul className="space-y-4">
              {['All Toys', 'New Arrivals', 'Trending Now', 'Educational Tools', 'Outdoor Play'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-muted-foreground hover:text-primary font-bold transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-widest mb-8 text-foreground">Support & Info</h4>
            <ul className="space-y-4">
              {['About Our Story', 'Shipping Policy', 'Terms of Service', 'Privacy Guardian', 'Contact Us'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-muted-foreground hover:text-primary font-bold transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-8">
            <div>
              <h4 className="text-sm font-black uppercase tracking-widest mb-4 text-foreground flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" /> Stay Initialized
              </h4>
              <p className="text-muted-foreground text-sm font-medium mb-6">
                Join 5000+ parents getting weekly toy drops and creative play ideas.
              </p>
              <div className="relative group">
                <Send className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  type="email"
                  placeholder="Parent's Email"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-background border border-border focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none font-bold transition-all text-sm"
                />
              </div>
              <Button size="sm" className="w-full mt-4 py-3">Subscribe Now</Button>
            </div>

            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-3 text-sm text-muted-foreground font-bold">
                <MapPin className="w-4 h-4 text-primary" /> Agrabad, Chittagong, BD
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground font-bold">
                <Phone className="w-4 h-4 text-primary" /> +880 1234-567890
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-muted-foreground font-bold">
            &copy; {currentYear} <span className="text-primary">ToyTopia</span>. All magic reserved.
          </p>
          <div className="flex gap-8">
            <img src="https://i.ibb.co/Vv9mS1z/cards.png" alt="Payment Methods" className="h-6 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
