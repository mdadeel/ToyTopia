import { Facebook, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="ToyTopia" className="h-8 w-8" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                ToyTopia
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Your trusted local toy store in Bangladesh. We connect families with quality toys that spark joy and creativity. Visit our flagship store in Agrabad, Chittagong.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Facebook, href: "https://www.facebook.com/badshahnawas.adeel" },
                { Icon: Linkedin, href: "https://www.linkedin.com/in/shahnawasadee1" },
                { Icon: Instagram, href: "https://www.instagram.com/shahnawas.adeel" }
              ].map(({ Icon, href }, idx) => (
                <a
                  key={idx}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-gray-50 text-gray-600 hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Quick Links</h3>
            <div className="flex flex-col gap-2">
              {[
                { to: "/", label: "Home" },
                { to: "/profile", label: "My Profile" },
                { to: "/all-toys", label: "Browse Toys" },
                { to: "/favorites", label: "Favorites" }
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-gray-500 hover:text-primary transition-colors text-sm w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Legal</h3>
            <div className="flex flex-col gap-2">
              {["Terms of Service", "Privacy Policy", "Refund Policy"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-500 hover:text-primary transition-colors text-sm w-fit"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-gray-500">
                <Mail className="h-4 w-4 mt-1 shrink-0" />
                <span className="text-sm">mdadeel125@gmail.com</span>
              </div>
              <div className="flex items-start gap-3 text-gray-500">
                <Phone className="h-4 w-4 mt-1 shrink-0" />
                <span className="text-sm">+88 018 5555 5555</span>
              </div>
              <div className="flex items-start gap-3 text-gray-500">
                <MapPin className="h-4 w-4 mt-1 shrink-0" />
                <span className="text-sm">Agrabad, Chittagong, Bangladesh</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 text-center text-gray-400 text-xs">
          © {new Date().getFullYear()} ToyTopia. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
