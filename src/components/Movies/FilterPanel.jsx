import React from 'react';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';

export default function FilterPanel({
  selectedGenre,
  setSelectedGenre,
  selectedYear,
  setSelectedYear,
  selectedQuality,
  setSelectedQuality,
  sortBy,
  setSortBy,
  genresList = [],
  qualitiesList = [],
  onReset,
}) {
  const years = ['All Years', '2025', '2024', '2023'];
  const sortOptions = [
    { label: 'Popularity', value: 'popular' },
    { label: 'IMDb Rating', value: 'rating' },
    { label: 'Latest Uploads', value: 'latest' },
    { label: 'Title (A-Z)', value: 'title' },
  ];

  return (
    <div className="glass-panel p-5 rounded-2xl border border-white/10 mb-8 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-[#E50914]" />
          <h3 className="text-lg font-bold font-heading text-white">Filter & Sort Catalog</h3>
        </div>

        <button
          onClick={onReset}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Filters</span>
        </button>
      </div>

      {/* Genre Pills */}
      <div>
        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
          Genres
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedGenre('All')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedGenre === 'All'
                ? 'bg-[#E50914] text-white shadow-md shadow-[#E50914]/30'
                : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10'
            }`}
          >
            All Genres
          </button>

          {genresList.map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGenre(g)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedGenre === g
                  ? 'bg-[#E50914] text-white shadow-md shadow-[#E50914]/30'
                  : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Dropdown Filters Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        {/* Year Filter */}
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
            Release Year
          </label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full px-3.5 py-2 bg-black/60 text-white text-xs font-medium rounded-xl border border-white/10 focus:outline-none focus:border-[#E50914]"
          >
            {years.map((y) => (
              <option key={y} value={y} className="bg-[#0a0a0f] text-white">
                {y}
              </option>
            ))}
          </select>
        </div>

        {/* Quality Filter */}
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
            Video Resolution
          </label>
          <select
            value={selectedQuality}
            onChange={(e) => setSelectedQuality(e.target.value)}
            className="w-full px-3.5 py-2 bg-black/60 text-white text-xs font-medium rounded-xl border border-white/10 focus:outline-none focus:border-[#E50914]"
          >
            <option value="All" className="bg-[#0a0a0f] text-white">
              All Qualities
            </option>
            {qualitiesList.map((q) => (
              <option key={q} value={q} className="bg-[#0a0a0f] text-white">
                {q}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Option */}
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-3.5 py-2 bg-black/60 text-white text-xs font-medium rounded-xl border border-white/10 focus:outline-none focus:border-[#E50914]"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-[#0a0a0f] text-white">
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
