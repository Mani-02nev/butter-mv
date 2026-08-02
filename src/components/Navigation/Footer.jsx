import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Shield, FileText, Mail, Heart, Globe, Share2, Tv, MessageSquare } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-[#050505] text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand Col with Original Red Play Logo */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF1E27] to-[#E50914] flex items-center justify-center glow-red shadow-xl">
                <Play className="w-4 h-4 fill-white text-white ml-0.5" />
              </div>
              <span className="text-2xl font-black font-heading tracking-wider text-white">
                BUTTER<span className="text-[#E50914]">MV</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              Butter MV is an ultra-premium, dark-themed streaming web platform designed for cinema lovers worldwide. Stream in crisp 1080p HD, multi-part playback with zero buffering.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2.5 bg-white/5 hover:bg-[#E50914] text-gray-300 hover:text-white rounded-full transition-all border border-white/10" title="Global Network">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 bg-white/5 hover:bg-[#E50914] text-gray-300 hover:text-white rounded-full transition-all border border-white/10" title="OTT Television">
                <Tv className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 bg-white/5 hover:bg-[#E50914] text-gray-300 hover:text-white rounded-full transition-all border border-white/10" title="Community">
                <MessageSquare className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 bg-white/5 hover:bg-[#E50914] text-gray-300 hover:text-white rounded-full transition-all border border-white/10" title="Share Platform">
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold font-heading mb-4 text-base tracking-wide">Explore</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/movies" className="hover:text-white transition-colors">Movies Catalog</Link></li>
              <li><Link to="/categories" className="hover:text-white transition-colors">Genres & Categories</Link></li>
              <li><Link to="/search" className="hover:text-white transition-colors">Instant Live Search</Link></li>
              <li><Link to="/favorites" className="hover:text-white transition-colors">My Watchlist</Link></li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-white font-bold font-heading mb-4 text-base tracking-wide">Platform Features</h4>
            <ul className="space-y-2.5 text-sm">
              <li><span className="text-gray-500">1080p HD Multi-Part Playback</span></li>
              <li><span className="text-gray-500">Multi-Audio Subtitles</span></li>
              <li><span className="text-gray-500">GitHub Compliant Mirroring</span></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Butter MV</Link></li>
            </ul>
          </div>

          {/* Legal / Contact */}
          <div>
            <h4 className="text-white font-bold font-heading mb-4 text-base tracking-wide">Legal & Support</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2"><Shield className="w-3.5 h-3.5 text-[#E50914]" /><span className="hover:text-white cursor-pointer">Privacy Policy</span></li>
              <li className="flex items-center gap-2"><FileText className="w-3.5 h-3.5 text-[#E50914]" /><span className="hover:text-white cursor-pointer">Terms of Service</span></li>
              <li className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-[#E50914]" /><span className="hover:text-white cursor-pointer">Contact Support</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Butter MV Inc. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart className="w-3.5 h-3.5 text-[#E50914] fill-[#E50914]" /> for cinema enthusiasts by <span className="text-white font-bold">Mr K</span> (Founder &amp; CEO, Butter MV).
          </p>
        </div>
      </div>
    </footer>
  );
}
