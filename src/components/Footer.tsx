import Link from "next/link";
import { Mail, Phone, MapPin, Send, Share2, Camera } from "lucide-react";
import { footerLinks } from "@/constants/data";

const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-100 py-20">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          <div className="space-y-8">
            <Link
              href="/"
              className="text-3xl font-black bg-linrar-to-r from-rose-400 to-rose-600 bg-clip-text text-transparent"
            >
              Blush Drive
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Redefining the premium car rental experience with a curated fleet
              of the world&apos;s most prestigious vehicles. Experience
              excellence in every journey.
            </p>
            <div className="flex gap-4">
              {[Camera, Send, Share2].map((Icon, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:border-rose-200 transition-all cursor-pointer"
                >
                  <Icon size={18} />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 mb-8 italic">
              The Fleet
            </h4>
            <ul className="space-y-4">
              {footerLinks.fleet.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-slate-500 hover:text-rose-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 mb-8 italic">
              Company
            </h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-slate-500 hover:text-rose-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 mb-8 italic">
              Get in Touch
            </h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin className="text-rose-500 mt-1" size={18} />
                <span className="text-sm font-medium text-slate-500">
                  123 Luxury Blvd, Beverly Hills,
                  <br />
                  CA 90210, USA
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="text-rose-500" size={18} />
                <span className="text-sm font-medium text-slate-500">
                  +1 (800) BLUSH-DRIVE
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="text-rose-500" size={18} />
                <span className="text-sm font-medium text-slate-500">
                  concierge@blushdrive.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            © 2024 Blush Drive Premium Rentals. All rights reserved.
          </p>
          <div className="flex gap-8">
            {footerLinks.support.slice(1).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-rose-500 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
