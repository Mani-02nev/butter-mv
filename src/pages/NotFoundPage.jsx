import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 my-8">
      <div className="relative mb-6">
        <span className="text-8xl sm:text-9xl font-black font-heading text-white/10 tracking-widest select-none">
          404
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="p-4 bg-[#E50914]/20 rounded-full border border-[#E50914]/40 glow-red">
            <Film className="w-12 h-12 text-[#E50914]" />
          </div>
        </div>
      </div>

      <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-white mb-2">
        Scene Not Found
      </h1>
      <p className="text-gray-400 text-sm sm:text-base max-w-md mb-8 leading-relaxed">
        The movie or page you are looking for has been cut from the final reel or does not exist.
      </p>

      <div className="flex flex-wrap items-center gap-4">
        <Link
          to="/"
          className="flex items-center gap-2 px-6 py-3 bg-[#E50914] hover:bg-[#FF1E27] text-white font-bold rounded-xl transition-all shadow-lg glow-red"
        >
          <Home className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        <Link
          to="/movies"
          className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/10 transition-all"
        >
          <Film className="w-4 h-4" />
          <span>Explore Movies</span>
        </Link>
      </div>
    </div>
  );
}
