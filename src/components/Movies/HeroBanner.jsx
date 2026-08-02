import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Star, Info, Flame, Volume2 } from 'lucide-react';
import { HeroBannerSkeleton } from '../Common/Skeleton';

export default function HeroBanner({ movie, onOpenTrailer, loading }) {
  const navigate = useNavigate();

  if (loading || !movie) {
    return <HeroBannerSkeleton />;
  }

  return (
    <div className="relative w-full min-h-[75vh] md:min-h-[85vh] flex items-end justify-start rounded-3xl overflow-hidden mb-12 border border-white/10 shadow-2xl bg-[#050505]">
      {/* Background Backdrop Image with Overlay Gradients */}
      <div className="absolute inset-0 z-0">
        <img
          src={movie.backdropUrl}
          alt={movie.title}
          className="w-full h-full object-cover object-center transform scale-105 filter brightness-90 animate-pulse-subtle"
        />
        {/* Left-to-Right & Bottom-to-Top Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent w-full md:w-3/4" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-600/20 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Hero Banner Content */}
      <div className="relative z-10 p-6 sm:p-12 lg:p-16 max-w-3xl space-y-5">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-1.5 px-3 py-1 bg-[#E50914] text-white text-xs font-black uppercase tracking-wider rounded-lg shadow-lg glow-red">
            <Flame className="w-3.5 h-3.5 fill-white" />
            <span>FEATURED EXCLUSIVE</span>
          </span>

          <div className="flex items-center gap-1 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-yellow-400 text-xs font-bold rounded-lg">
            <Star className="w-3.5 h-3.5 fill-yellow-400" />
            <span className="text-white">{movie.imdbRating}</span>
            <span className="text-gray-400 text-[10px]">({movie.voteCount})</span>
          </div>

          <span className="px-2.5 py-1 bg-white/10 backdrop-blur-md text-white text-xs font-bold rounded-lg border border-white/10">
            {typeof movie.quality === 'string' ? movie.quality : movie.quality?.[0] || '4K UHD'}
          </span>

          <span className="px-2.5 py-1 bg-white/10 backdrop-blur-md text-gray-300 text-xs font-medium rounded-lg">
            {movie.year}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-heading tracking-tight text-white drop-shadow-2xl leading-none">
          {movie.title}
        </h1>

        {/* Tagline & Genres */}
        <div className="space-y-1">
          <p className="text-base sm:text-lg text-[#E50914] font-semibold italic">
            "{movie.tagline}"
          </p>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
            <span>{movie.genres?.join(' • ')}</span>
            <span>•</span>
            <span>{movie.formattedRuntime}</span>
          </div>
        </div>

        {/* Synopsis */}
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed line-clamp-3 max-w-2xl font-sans">
          {movie.synopsis}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-4">
          <button
            onClick={() => navigate(`/watch/${movie.id}`)}
            className="flex items-center gap-2.5 px-7 py-3.5 bg-[#E50914] hover:bg-[#FF1E27] text-white font-extrabold text-base rounded-2xl transition-all shadow-xl hover:scale-105 glow-red"
          >
            <Play className="w-5 h-5 fill-white" />
            <span>Watch Online</span>
          </button>

          <button
            onClick={() => onOpenTrailer ? onOpenTrailer(movie) : null}
            className="flex items-center gap-2 px-5 py-3.5 bg-black/40 hover:bg-black/70 text-gray-300 hover:text-white font-medium text-sm rounded-2xl backdrop-blur-md border border-white/10 transition-all"
          >
            <Volume2 className="w-4 h-4 text-[#E50914]" />
            <span>Trailer</span>
          </button>

          <button
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="p-3.5 bg-black/40 hover:bg-black/70 text-gray-300 hover:text-white rounded-2xl backdrop-blur-md border border-white/10 transition-all"
            title="More Details"
          >
            <Info className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
