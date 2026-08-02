import React from 'react';
import { Grid } from 'lucide-react';
import { useCatalog } from '../context/CatalogContext';
import CategoryCard from '../components/Categories/CategoryCard';

export default function CategoriesPage() {
  const { movies, genresList, loading } = useCatalog();

  return (
    <div className="space-y-8 pb-12 pt-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Grid className="w-8 h-8 text-[#E50914]" />
          <h1 className="text-3xl sm:text-4xl font-black font-heading text-white tracking-wide">
            Movie Categories & Genres
          </h1>
        </div>
        <p className="text-sm text-gray-400">
          Discover films by genre, theme, and cinematic world
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-[4/3] sm:aspect-[16/9] rounded-2xl glass-panel animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {genresList.map((genre) => {
            const genreMovie = movies.find((m) => m.genres?.includes(genre));
            const count = movies.filter((m) => m.genres?.includes(genre)).length;
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
      )}
    </div>
  );
}
