import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Star, Heart, Clock } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';

export default function MovieCard({ movie }) {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(movie.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.25 }}
      className="group relative rounded-2xl overflow-hidden glass-panel border border-white/10 cursor-pointer flex flex-col h-full shadow-lg hover:shadow-2xl hover:border-[#E50914]/50"
    >
      {/* Poster Image & Badges Container */}
      <div
        onClick={() => navigate(`/movie/${movie.id}`)}
        className="relative aspect-[2/3] w-full overflow-hidden bg-[#0a0a0f]"
      >
        <img
          src={movie.posterUrl}
          alt={movie.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="px-2.5 py-1 text-[11px] font-extrabold tracking-wider bg-black/70 backdrop-blur-md text-white rounded-md border border-white/10">
            {typeof movie.quality === 'string' ? movie.quality : movie.quality?.[0] || '4K UHD'}
          </span>
          <div className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold bg-[#E50914]/90 text-white rounded-md shadow-md backdrop-blur-md">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span>{movie.imdbRating}</span>
          </div>
        </div>

        {/* Favorite Bookmark Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(movie);
          }}
          className={`absolute bottom-3 right-3 p-2.5 rounded-full backdrop-blur-md border transition-all z-10 ${
            favorite
              ? 'bg-[#E50914] border-[#E50914] text-white shadow-lg glow-red'
              : 'bg-black/60 border-white/20 text-gray-300 hover:text-white hover:bg-black/90'
          }`}
          title={favorite ? 'Remove from Watchlist' : 'Add to Watchlist'}
        >
          <Heart className={`w-4 h-4 ${favorite ? 'fill-white' : ''}`} />
        </button>

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <div className="space-y-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex items-center gap-2 text-xs text-gray-300 font-medium">
              <Clock className="w-3.5 h-3.5 text-[#E50914]" />
              <span>{movie.formattedRuntime}</span>
              <span>•</span>
              <span>{movie.year}</span>
            </div>
            <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
              {movie.synopsis}
            </p>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/watch/${movie.id}`);
                }}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#E50914] hover:bg-[#FF1E27] text-white text-xs font-bold rounded-xl transition-all glow-red"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Play</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Card Info Below Poster */}
      <div
        onClick={() => navigate(`/movie/${movie.id}`)}
        className="p-4 flex flex-col justify-between flex-grow bg-[#0a0a0f]/80"
      >
        <div>
          <h3 className="text-base font-bold font-heading text-white group-hover:text-[#E50914] transition-colors truncate">
            {movie.title}
          </h3>
          <div className="flex items-center justify-between text-xs text-gray-400 mt-1">
            <span>{movie.genres?.slice(0, 2).join(' • ')}</span>
            <span>{movie.year}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
