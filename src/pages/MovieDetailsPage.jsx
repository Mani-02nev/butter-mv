import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Play,
  Star,
  Heart,
  Clock,
  Calendar,
  Film,
  User,
  Users,
  Globe,
  Subtitles,
  ArrowLeft,
} from 'lucide-react';
import { useCatalog } from '../context/CatalogContext';
import { useFavorites } from '../context/FavoritesContext';
import MovieGrid from '../components/Movies/MovieGrid';
import TrailerModal from '../components/Common/TrailerModal';
import EmptyState from '../components/Common/EmptyState';

export default function MovieDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getMovieById, getRelatedMovies, loading } = useCatalog();
  const { isFavorite, toggleFavorite } = useFavorites();

  const movie = getMovieById(id);
  const relatedMovies = getRelatedMovies(movie, 5);
  const favorite = movie ? isFavorite(movie.id) : false;

  const [trailerModalOpen, setTrailerModalOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen py-16 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#E50914] border-t-transparent rounded-full animate-spin glow-red" />
      </div>
    );
  }

  if (!movie) {
    return (
      <EmptyState
        icon="film"
        title="Movie Not Found"
        description="The requested movie details could not be loaded."
        actionText="Back to Catalog"
        actionLink="/movies"
      />
    );
  }

  return (
    <div className="space-y-12 pb-16 pt-4">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-xl backdrop-blur-md border border-white/10 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Back</span>
      </button>

      {/* Hero Backdrop Box */}
      <div className="relative rounded-3xl overflow-hidden glass-panel border border-white/10 shadow-2xl bg-[#050505]">
        {/* Backdrop Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={movie.backdropUrl}
            alt={movie.title}
            className="w-full h-full object-cover object-center filter brightness-75 transform scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/90 to-transparent" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Poster Column */}
          <div className="lg:col-span-4 flex justify-center lg:justify-start">
            <div className="relative aspect-[2/3] w-64 sm:w-72 lg:w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10 group">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 px-3 py-1 bg-[#E50914] text-white text-xs font-black rounded-lg shadow-lg">
                {typeof movie.quality === 'string' ? movie.quality : movie.quality?.[0] || '4K UHD'}
              </span>
            </div>
          </div>

          {/* Details Info Column */}
          <div className="lg:col-span-8 space-y-6">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 font-extrabold text-xs rounded-lg">
                <Star className="w-4 h-4 fill-yellow-400" />
                <span>{movie.imdbRating}</span>
                <span className="text-gray-400 font-normal">({movie.voteCount} votes)</span>
              </div>

              <span className="px-3 py-1 bg-white/10 text-white font-bold text-xs rounded-lg border border-white/10">
                {movie.ageRating || '16+'}
              </span>

              <span className="flex items-center gap-1 px-3 py-1 bg-white/10 text-gray-300 text-xs font-medium rounded-lg">
                <Clock className="w-3.5 h-3.5 text-[#E50914]" />
                <span>{movie.formattedRuntime}</span>
              </span>

              <span className="flex items-center gap-1 px-3 py-1 bg-white/10 text-gray-300 text-xs font-medium rounded-lg">
                <Calendar className="w-3.5 h-3.5 text-[#E50914]" />
                <span>{movie.year}</span>
              </span>
            </div>

            {/* Title & Tagline */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-white">
                {movie.title}
              </h1>
              {movie.tagline && (
                <p className="text-base sm:text-lg text-[#E50914] font-semibold italic mt-2">
                  "{movie.tagline}"
                </p>
              )}
            </div>

            {/* Genres Chips */}
            <div className="flex flex-wrap gap-2">
              {movie.genres?.map((g) => (
                <span
                  key={g}
                  className="px-3 py-1 bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold rounded-full border border-white/10"
                >
                  {g}
                </span>
              ))}
            </div>

            {/* Synopsis */}
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-3xl">
              {movie.synopsis}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => navigate(`/watch/${movie.id}`)}
                className="flex items-center gap-2.5 px-7 py-3.5 bg-[#E50914] hover:bg-[#FF1E27] text-white font-extrabold text-base rounded-2xl transition-all shadow-xl glow-red hover:scale-105"
              >
                <Play className="w-5 h-5 fill-white" />
                <span>Play Online</span>
              </button>

              <button
                onClick={() => setTrailerModalOpen(true)}
                className="px-5 py-3.5 bg-black/40 hover:bg-black/70 text-gray-300 hover:text-white font-medium text-sm rounded-2xl border border-white/10 transition-all"
              >
                Watch Trailer
              </button>

              <button
                onClick={() => toggleFavorite(movie)}
                className={`p-3.5 rounded-2xl border transition-all ${
                  favorite
                    ? 'bg-[#E50914] border-[#E50914] text-white glow-red'
                    : 'bg-black/40 border-white/10 text-gray-300 hover:text-white'
                }`}
                title={favorite ? 'Remove from Watchlist' : 'Add to Watchlist'}
              >
                <Heart className={`w-5 h-5 ${favorite ? 'fill-white' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Specification Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
          <h3 className="text-lg font-bold font-heading text-white border-b border-white/10 pb-3 flex items-center gap-2">
            <Film className="w-5 h-5 text-[#E50914]" />
            <span>Cast & Crew Information</span>
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <User className="w-4 h-4 text-gray-400 mt-1 shrink-0" />
              <div>
                <span className="text-gray-400 block text-xs font-semibold uppercase">Director</span>
                <span className="text-white font-medium">{movie.director}</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="w-4 h-4 text-gray-400 mt-1 shrink-0" />
              <div>
                <span className="text-gray-400 block text-xs font-semibold uppercase">Starring Cast</span>
                <span className="text-white font-medium">{movie.cast?.join(', ')}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
          <h3 className="text-lg font-bold font-heading text-white border-b border-white/10 pb-3 flex items-center gap-2">
            <Globe className="w-5 h-5 text-[#E50914]" />
            <span>Audio & Subtitle Specifications</span>
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <Globe className="w-4 h-4 text-gray-400 mt-1 shrink-0" />
              <div>
                <span className="text-gray-400 block text-xs font-semibold uppercase">Audio Tracks</span>
                <span className="text-white font-medium">{movie.audioLanguages?.join(', ')}</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Subtitles className="w-4 h-4 text-gray-400 mt-1 shrink-0" />
              <div>
                <span className="text-gray-400 block text-xs font-semibold uppercase">Subtitles</span>
                <span className="text-white font-medium">{movie.subtitles?.join(', ')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Movies Section */}
      {relatedMovies.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold font-heading text-white">More Like This</h2>
          <MovieGrid movies={relatedMovies} loading={false} />
        </div>
      )}

      {/* Modals */}
      <TrailerModal
        isOpen={trailerModalOpen}
        onClose={() => setTrailerModalOpen(false)}
        movie={movie}
      />
    </div>
  );
}
