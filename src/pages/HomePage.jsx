import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flame, Sparkles, Film, ArrowRight, Download, Shield, Play } from 'lucide-react';
import { useCatalog } from '../context/CatalogContext';
import HeroBanner from '../components/Movies/HeroBanner';
import MovieGrid from '../components/Movies/MovieGrid';
import CategoryCard from '../components/Categories/CategoryCard';
import DownloadModal from '../components/Download/DownloadModal';
import TrailerModal from '../components/Common/TrailerModal';

export default function HomePage() {
  const navigate = useNavigate();
  const { movies, featuredMovie, trendingMovies, latestMovies, genresList, loading } = useCatalog();

  const [downloadModalMovie, setDownloadModalMovie] = useState(null);
  const [trailerModalMovie, setTrailerModalMovie] = useState(null);

  const topRatedMovies = [...movies].sort((a, b) => b.imdbRating - a.imdbRating).slice(0, 5);

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Banner Section */}
      <HeroBanner
        movie={featuredMovie}
        loading={loading}
        onOpenDownload={(m) => setDownloadModalMovie(m)}
        onOpenTrailer={(m) => setTrailerModalMovie(m)}
      />

      {/* Trending Now Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#E50914]/20 rounded-xl border border-[#E50914]/30 glow-red">
              <Flame className="w-6 h-6 text-[#E50914]" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">Trending Movies</h2>
              <p className="text-xs sm:text-sm text-gray-400">Most watched releases this week</p>
            </div>
          </div>

          <Link
            to="/movies"
            className="flex items-center gap-1.5 text-sm font-semibold text-[#E50914] hover:text-[#FF1E27] transition-colors group"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <MovieGrid
          movies={trendingMovies}
          loading={loading}
          onOpenDownload={(m) => setDownloadModalMovie(m)}
          onOpenTrailer={(m) => setTrailerModalMovie(m)}
        />
      </section>

      {/* Popular Categories Teaser */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 rounded-xl border border-white/10">
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">Browse Categories</h2>
              <p className="text-xs sm:text-sm text-gray-400">Find movies by your favorite genres</p>
            </div>
          </div>

          <Link
            to="/categories"
            className="flex items-center gap-1.5 text-sm font-semibold text-[#E50914] hover:text-[#FF1E27] transition-colors group"
          >
            <span>All Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {genresList.slice(0, 4).map((genre) => {
            const genreMovie = movies.find((m) => m.genres.includes(genre));
            const count = movies.filter((m) => m.genres.includes(genre)).length;
            return (
              <CategoryCard
                key={genre}
                genre={genre}
                count={count}
                backdrop={genreMovie?.backdropUrl}
              />
            );
          })}
        </div>
      </section>

      {/* Top Rated Blockbusters Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-yellow-500/20 rounded-xl border border-yellow-500/30">
              <Film className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">Top Rated Blockbusters</h2>
              <p className="text-xs sm:text-sm text-gray-400">Critically acclaimed 4K cinema</p>
            </div>
          </div>
        </div>

        <MovieGrid
          movies={topRatedMovies}
          loading={loading}
          onOpenDownload={(m) => setDownloadModalMovie(m)}
          onOpenTrailer={(m) => setTrailerModalMovie(m)}
        />
      </section>

      {/* Download CTA Banner */}
      <section className="relative rounded-3xl overflow-hidden glass-panel border border-[#E50914]/40 p-8 sm:p-12 shadow-2xl bg-gradient-to-r from-[#050505] via-[#12121c] to-[#050505]">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#E50914]/20 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="px-3 py-1 bg-[#E50914] text-white text-xs font-black uppercase tracking-wider rounded-lg shadow-lg glow-red">
            OFFLINE STREAMING
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white leading-tight">
            Download Your Favorite Movies in 4K UHD
          </h2>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Watch anytime, anywhere with zero buffering. Choose between multiple resolution presets (480p to 4K UHD) with superfast CDN mirrors.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              to="/movies"
              className="flex items-center gap-2 px-6 py-3 bg-[#E50914] hover:bg-[#FF1E27] text-white font-bold rounded-xl transition-all glow-red shadow-lg"
            >
              <Download className="w-4 h-4" />
              <span>Explore Catalog Downloads</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Download & Trailer Modals */}
      <DownloadModal
        isOpen={Boolean(downloadModalMovie)}
        onClose={() => setDownloadModalMovie(null)}
        movie={downloadModalMovie}
      />
      <TrailerModal
        isOpen={Boolean(trailerModalMovie)}
        onClose={() => setTrailerModalMovie(null)}
        movie={trailerModalMovie}
      />
    </div>
  );
}
