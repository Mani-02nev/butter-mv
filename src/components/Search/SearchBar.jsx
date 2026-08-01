import React from 'react';
import { Search, X, Sparkles } from 'lucide-react';

export default function SearchBar({ value, onChange, onClear, genres = [], selectedGenre, onSelectGenre }) {
  return (
    <div className="w-full space-y-4">
      {/* Live Input Field */}
      <div className="relative flex items-center">
        <Search className="absolute left-5 w-6 h-6 text-[#E50914]" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search by movie title, actor, director, or genre..."
          className="w-full pl-14 pr-12 py-4 bg-black/60 text-white placeholder-gray-400 font-medium text-base sm:text-lg rounded-2xl border border-white/10 focus:outline-none focus:border-[#E50914] focus:ring-2 focus:ring-[#E50914]/30 backdrop-blur-xl shadow-2xl transition-all"
          autoFocus
        />
        {value && (
          <button
            onClick={onClear}
            className="absolute right-4 p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Quick Genre Suggestions */}
      {genres.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <span className="text-xs font-semibold text-gray-400 flex items-center gap-1 shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-[#E50914]" />
            Quick Tags:
          </span>
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => onSelectGenre(g === selectedGenre ? 'All' : g)}
              className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                selectedGenre === g
                  ? 'bg-[#E50914] text-white shadow-md shadow-[#E50914]/30'
                  : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
