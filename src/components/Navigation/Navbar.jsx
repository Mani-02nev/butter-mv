import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Search,
  Heart,
  Download,
  Menu,
  X,
  Film,
  Grid,
  Info,
  Sparkles,
  Flame,
} from 'lucide-react';
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

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/', icon: Film },
    { name: 'Movies', path: '/movies', icon: Flame },
    { name: 'Categories', path: '/categories', icon: Grid },
    { name: 'Search', path: '/search', icon: Search },
    { name: 'Favorites', path: '/favorites', icon: Heart, badge: favoritesCount },
    { name: 'Downloads', path: '/downloads', icon: Download, badge: activeCount },
    { name: 'About', path: '/about', icon: Info },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'glass-nav py-3' : 'bg-gradient-to-b from-black/90 via-black/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF1E27] to-[#E50914] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform glow-red">
                <Play className="w-5 h-5 fill-white text-white ml-0.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black font-heading tracking-wider text-white group-hover:text-red-500 transition-colors">
                  BUTTER<span className="text-[#E50914] text-xs font-bold px-1.5 py-0.5 rounded bg-[#E50914]/20 border border-[#E50914]/30 ml-1">MV</span>
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 bg-black/40 p-1.5 rounded-full border border-white/10 backdrop-blur-lg">
              {navLinks.slice(0, 5).map((link) => {
                const isActive = location.pathname === link.path;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'text-white bg-[#E50914] shadow-md shadow-[#E50914]/30'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.name}</span>
                    {link.badge > 0 && (
                      <span className="w-4 h-4 text-[10px] font-bold rounded-full bg-white text-[#E50914] flex items-center justify-center ml-0.5">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Quick Actions */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={() => navigate('/search')}
                className="p-2.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-full border border-white/10 transition-colors"
                title="Search Movies"
              >
                <Search className="w-5 h-5" />
              </button>

              <Link
                to="/favorites"
                className="relative p-2.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-full border border-white/10 transition-colors"
                title="Watchlist"
              >
                <Heart className="w-5 h-5" />
                {favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 text-xs font-bold text-white bg-[#E50914] rounded-full flex items-center justify-center border-2 border-black">
                    {favoritesCount}
                  </span>
                )}
              </Link>

              <Link
                to="/downloads"
                className="relative p-2.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-full border border-white/10 transition-colors"
                title="Downloads"
              >
                <Download className="w-5 h-5" />
                {activeCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 text-xs font-bold text-white bg-green-500 rounded-full flex items-center justify-center border-2 border-black animate-pulse">
                    {activeCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl border border-white/10 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 z-30 md:hidden glass-panel border-b border-white/10 p-6 shadow-2xl backdrop-blur-2xl"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center justify-between p-3.5 rounded-xl font-medium text-base transition-colors ${
                      isActive
                        ? 'bg-[#E50914] text-white font-bold glow-red'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      <span>{link.name}</span>
                    </div>
                    {link.badge > 0 && (
                      <span className="px-2.5 py-0.5 text-xs font-bold bg-white text-[#E50914] rounded-full">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
