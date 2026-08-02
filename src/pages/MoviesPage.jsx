import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCatalog } from '../context/CatalogContext';
import FilterPanel from '../components/Movies/FilterPanel';
import MovieGrid from '../components/Movies/MovieGrid';
import TrailerModal from '../components/Common/TrailerModal';

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { movies, loading, genresList, qualitiesList } = useCatalog();

  const [selectedGenre, setSelectedGenre] = useState(searchParams.get('genre') || 'All');
  const [selectedYear, setSelectedYear] = useState('All Years');
  const [selectedQuality, setSelectedQuality] = useState('All');
  const [sortBy, setSortBy] = useState('popular');

  const [trailerModalMovie, setTrailerModalMovie] = useState(null);

  // Sync state with URL params
  useEffect(() => {
    const genreParam = searchParams.get('genre');
    if (genreParam) setSelectedGenre(genreParam);
  }, [searchParams]);

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
    if (genre === 'All') {
      searchParams.delete('genre');
    } else {
      searchParams.set('genre', genre);
    }
    setSearchParams(searchParams);
  };

  const handleReset = () => {
    setSelectedGenre('All');
    setSelectedYear('All Years');
    setSelectedQuality('All');
    setSortBy('popular');
    setSearchParams({});
  };

  // Filter & Sort Logic
  const filteredMovies = useMemo(() => {
    let result = [...movies];

    if (selectedGenre !== 'All') {
      result = result.filter((m) => m.genres?.includes(selectedGenre));
    }

    if (selectedYear !== 'All Years') {
      result = result.filter((m) => m.year.toString() === selectedYear);
    }

    if (selectedQuality !== 'All') {
      result = result.filter((m) => m.quality?.includes(selectedQuality));
    }

    switch (sortBy) {
      case 'rating':
        result.sort((a, b) => b.imdbRating - a.imdbRating);
        break;
      case 'latest':
        result.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
        break;
      case 'title':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'popular':
      default:
        result.sort((a, b) => (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0));
        break;
    }

    return result;
  }, [movies, selectedGenre, selectedYear, selectedQuality, sortBy]);

  return (
    <div className="space-y-8 pb-12 pt-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black font-heading text-white tracking-wide">
            Movies Catalog
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Browse our full library of 4K UHD streaming releases
          </p>
        </div>
        <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-gray-300 self-start sm:self-auto">
          Showing {filteredMovies.length} of {movies.length} Movies
        </div>
      </div>

      {/* Filter Panel */}
      <FilterPanel
        selectedGenre={selectedGenre}
        setSelectedGenre={handleGenreChange}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedQuality={selectedQuality}
        setSelectedQuality={setSelectedQuality}
        sortBy={sortBy}
        setSortBy={setSortBy}
        genresList={genresList}
        qualitiesList={qualitiesList}
        onReset={handleReset}
      />

      {/* Movie Grid */}
      <MovieGrid
        movies={filteredMovies}
        loading={loading}
        onOpenTrailer={(m) => setTrailerModalMovie(m)}
        emptyMessage="No movies found matching your selected filters."
      />

      {/* Modals */}
      <TrailerModal
        isOpen={Boolean(trailerModalMovie)}
        onClose={() => setTrailerModalMovie(null)}
        movie={trailerModalMovie}
      />
    </div>
  );
}
