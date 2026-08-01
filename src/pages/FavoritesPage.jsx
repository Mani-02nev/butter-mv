import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import MovieGrid from '../components/Movies/MovieGrid';
import DownloadModal from '../components/Download/DownloadModal';
import EmptyState from '../components/Common/EmptyState';

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const [downloadModalMovie, setDownloadModalMovie] = useState(null);

  return (
    <div className="space-y-8 pb-12 pt-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Heart className="w-8 h-8 text-[#E50914] fill-[#E50914]" />
          <h1 className="text-3xl sm:text-4xl font-black font-heading text-white tracking-wide">
            My Watchlist
          </h1>
        </div>
        <p className="text-sm text-gray-400">
          Saved movies to watch later or download for offline viewing
        </p>
      </div>

      {favorites.length === 0 ? (
        <EmptyState
          icon="heart"
          title="Your Watchlist is Empty"
          description="Explore movies in our catalog and click the heart icon to save them here!"
          actionText="Explore Movies Catalog"
          actionLink="/movies"
        />
      ) : (
        <MovieGrid
          movies={favorites}
          loading={false}
          onOpenDownload={(m) => setDownloadModalMovie(m)}
        />
      )}

      <DownloadModal
        isOpen={Boolean(downloadModalMovie)}
        onClose={() => setDownloadModalMovie(null)}
        movie={downloadModalMovie}
      />
    </div>
  );
}
