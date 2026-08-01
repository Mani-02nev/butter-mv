import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Film, Zap, Compass, Smile, Drama, Rocket, Shield, Sparkles, Heart, Ghost } from 'lucide-react';

const GENRE_ICONS = {
  Action: Zap,
  Adventure: Compass,
  Animation: Sparkles,
  Comedy: Smile,
  Crime: Shield,
  Cyberpunk: Ghost,
  Drama: Drama,
  Family: Sparkles,
  Fantasy: Sparkles,
  History: Shield,
  Mystery: Ghost,
  Romance: Heart,
  'Sci-Fi': Rocket,
  Thriller: Film,
};

export default function CategoryCard({ genre, count, backdrop }) {
  const navigate = useNavigate();
  const Icon = GENRE_ICONS[genre] || Film;

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(`/movies?genre=${encodeURIComponent(genre)}`)}
      className="group relative aspect-[16/9] rounded-2xl overflow-hidden glass-panel border border-white/10 cursor-pointer shadow-lg hover:border-[#E50914]/50"
    >
      {/* Background Graphic */}
      <div className="absolute inset-0 bg-[#0a0a0f] overflow-hidden">
        {backdrop ? (
          <img
            src={backdrop}
            alt={genre}
            className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#12121c] to-[#050505] opacity-80" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      {/* Card Content */}
      <div className="relative z-10 h-full p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="p-3 bg-[#E50914]/20 text-[#E50914] group-hover:bg-[#E50914] group-hover:text-white rounded-xl backdrop-blur-md border border-[#E50914]/30 transition-all">
            <Icon className="w-6 h-6" />
          </div>
          <span className="px-2.5 py-1 text-xs font-extrabold bg-black/60 backdrop-blur-md text-gray-300 rounded-lg border border-white/10">
            {count} {count === 1 ? 'Movie' : 'Movies'}
          </span>
        </div>

        <div>
          <h3 className="text-xl font-extrabold font-heading text-white group-hover:text-[#E50914] transition-colors">
            {genre}
          </h3>
          <p className="text-xs text-gray-400 mt-1">Explore top rated {genre} films</p>
        </div>
      </div>
    </motion.div>
  );
}
