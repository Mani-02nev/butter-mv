import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCatalog } from '../context/CatalogContext';
import VideoPlayer from '../components/Player/VideoPlayer';
import MovieGrid from '../components/Movies/MovieGrid';
import DownloadModal from '../components/Download/DownloadModal';
import EmptyState from '../components/Common/EmptyState';
import { Download, Heart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

export default function WatchPage() {
  const { id } = useParams();
  const { getMovieById, getRelatedMovies, loading } = useCatalog();
  const { isFavorite, toggleFavorite } = useFavorites();

  const movie = getMovieById(id);
  const relatedMovies = getRelatedMovies(movie, 4);
  const favorite = movie ? isFavorite(movie.id) : false;

  const [downloadModalOpen, setDownloadModalOpen] = useState(false);

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
        title="Video Stream Unavailable"
        description="The video file for this movie could not be located."
        actionText="Back to Catalog"
        actionLink="/movies"
      />
    );
  }

  return (
    <div className="space-y-8 pb-16 pt-2">
      {/* Video Player Container */}
      <VideoPlayer movie={movie} />

      {/* Under Player Metadata Banner */}
      <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#E50914] font-bold uppercase tracking-wider">
              <span>Now Playing</span>
              <span>•</span>
              <span>4K Ultra HD</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-heading text-white mt-1">
              {movie.title}
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              {movie.year} • {movie.formattedRuntime} • {movie.genres?.join(', ')}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => toggleFavorite(movie)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                favorite
                  ? 'bg-[#E50914] border-[#E50914] text-white glow-red'
                  : 'bg-white/5 border-white/10 text-gray-300 hover:text-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${favorite ? 'fill-white' : ''}`} />
              <span>{favorite ? 'Watchlisted' : 'Add to Watchlist'}</span>
            </button>

            <button
              onClick={() => setDownloadModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold rounded-xl transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download 4K</span>
            </button>
          </div>
        </div>

        <p className="text-sm text-gray-300 leading-relaxed pt-2 border-t border-white/10">
          {movie.synopsis}
        </p>
      </div>

      {/* Related Movies */}
      {relatedMovies.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold font-heading text-white">Recommended Next</h3>
          <MovieGrid movies={relatedMovies} loading={false} />
        </div>
      )}

      {/* Download Modal */}
      <DownloadModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
        movie={movie}
      />
    </div>
  );
}
