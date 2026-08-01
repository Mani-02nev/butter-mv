import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { useCatalog } from '../context/CatalogContext';
import SearchBar from '../components/Search/SearchBar';
import MovieGrid from '../components/Movies/MovieGrid';
import FilterPanel from '../components/Movies/FilterPanel';
import DownloadModal from '../components/Download/DownloadModal';
import TrailerModal from '../components/Common/TrailerModal';

export default function SearchPage() {
  const { movies, genresList, qualitiesList, loading } = useCatalog();

  const [query, setQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All Years');
  const [selectedQuality, setSelectedQuality] = useState('All');
  const [sortBy, setSortBy] = useState('popular');

  const [downloadModalMovie, setDownloadModalMovie] = useState(null);
  const [trailerModalMovie, setTrailerModalMovie] = useState(null);

  const handleReset = () => {
    setQuery('');
    setSelectedGenre('All');
    setSelectedYear('All Years');
    setSelectedQuality('All');
    setSortBy('popular');
  };

  const filteredMovies = useMemo(() => {
    let result = [...movies];

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.synopsis.toLowerCase().includes(q) ||
          m.director?.toLowerCase().includes(q) ||
          m.cast?.some((c) => c.toLowerCase().includes(q)) ||
          m.genres?.some((g) => g.toLowerCase().includes(q))
      );
    }

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
  }, [movies, query, selectedGenre, selectedYear, selectedQuality, sortBy]);

  return (
    <div className="space-y-8 pb-12 pt-4">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Search className="w-8 h-8 text-[#E50914]" />
          <h1 className="text-3xl sm:text-4xl font-black font-heading text-white tracking-wide">
            Live Instant Search
          </h1>
        </div>
        <p className="text-sm text-gray-400">
          Find movies instantly by title, cast members, director, or keywords
        </p>
      </div>

      {/* Search Input Bar */}
      <SearchBar
        value={query}
        onChange={setQuery}
        onClear={() => setQuery('')}
        genres={genresList}
        selectedGenre={selectedGenre}
        onSelectGenre={setSelectedGenre}
      />

      {/* Filters Accordion */}
      <FilterPanel
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
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

      {/* Results Info */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-300">
          {query ? `Search results for "${query}"` : 'All Movies Results'}
        </span>
        <span className="text-xs font-mono text-gray-400">
          Found {filteredMovies.length} movies
        </span>
      </div>

      {/* Movie Grid */}
      <MovieGrid
        movies={filteredMovies}
        loading={loading}
        onOpenDownload={(m) => setDownloadModalMovie(m)}
        onOpenTrailer={(m) => setTrailerModalMovie(m)}
        emptyMessage={
          query
            ? `No movies match "${query}". Try searching another keyword.`
            : 'No movies match your filters.'
        }
      />

      {/* Modals */}
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
