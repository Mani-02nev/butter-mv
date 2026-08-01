import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Heart, Download, Menu, X, Film, Sparkles, Home, Grid } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';
import { useDownloads } from '../../context/DownloadContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { favoritesCount } = useFavorites();
  const { activeCount } = useDownloads();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Movies', path: '/movies', icon: Film },
    { name: 'Categories', path: '/categories', icon: Grid },
    { name: 'About', path: '/about', icon: Sparkles },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#050505]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3'
          : 'bg-gradient-to-b from-black/90 via-black/50 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo with MNC Butterfly */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF1E27] via-[#E50914] to-[#99000D] p-0.5 shadow-xl glow-red group-hover:scale-105 transition-transform">
              <img
                src="/favicon.svg"
                alt="Butter MV Butterfly Logo"
                className="w-full h-full object-contain rounded-2xl"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black font-heading tracking-wider text-white leading-none">
                BUTTER<span className="text-[#E50914]">MV</span>
              </span>
              <span className="text-[9px] font-bold text-gray-400 tracking-widest uppercase">
                CINEMA OTT
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 glass-panel px-4 py-1.5 rounded-full border border-white/10">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    active
                      ? 'bg-[#E50914] text-white shadow-md glow-red'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/search"
              className="p-2.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-colors relative"
              title="Search Movies"
            >
              <Search className="w-5 h-5" />
            </Link>

            <Link
              to="/favorites"
              className="p-2.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-colors relative"
              title="My Watchlist"
            >
              <Heart className="w-5 h-5" />
              {favoritesCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#E50914] text-white text-[10px] font-extrabold rounded-full flex items-center justify-center glow-red">
                  {favoritesCount}
                </span>
              )}
            </Link>

            <Link
              to="/downloads"
              className="p-2.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-colors relative"
              title="Device Downloads"
            >
              <Download className="w-5 h-5" />
              {activeCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-green-500 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center animate-pulse">
                  {activeCount}
                </span>
              )}
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 p-4 glass-panel rounded-3xl border border-white/10 space-y-2 animate-in slide-in-from-top-4">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                    active
                      ? 'bg-[#E50914] text-white glow-red'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}
