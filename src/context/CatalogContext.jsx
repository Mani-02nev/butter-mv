import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const CatalogContext = createContext();

export function CatalogProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Auto-discover movies from /catalog.json
  useEffect(() => {
    async function loadCatalog() {
      try {
        setLoading(true);
        const res = await fetch('/catalog.json');
        if (!res.ok) throw new Error('Failed to load movie catalog');
        const data = await res.json();
        setMovies(data);
        setError(null);
      } catch (err) {
        console.error('Error loading catalog:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadCatalog();
  }, []);

  const featuredMovie = useMemo(() => {
    return movies.find((m) => m.isFeatured) || movies[0] || null;
  }, [movies]);

  const trendingMovies = useMemo(() => {
    return movies.filter((m) => m.isTrending);
  }, [movies]);

  const latestMovies = useMemo(() => {
    return movies.filter((m) => m.isLatest);
  }, [movies]);

  // Extract unique genres, languages, and qualities dynamically
  const genresList = useMemo(() => {
    const set = new Set();
    movies.forEach((m) => m.genres?.forEach((g) => set.add(g)));
    return Array.from(set).sort();
  }, [movies]);

  const languagesList = useMemo(() => {
    const set = new Set();
    movies.forEach((m) =>
      m.audioLanguages?.forEach((lang) => set.add(lang.split(' ')[0]))
    );
    return Array.from(set).sort();
  }, [movies]);

  const qualitiesList = useMemo(() => {
    const set = new Set();
    movies.forEach((m) => {
      if (Array.isArray(m.quality)) {
        m.quality.forEach((q) => set.add(q));
      } else if (m.quality) {
        set.add(m.quality);
      }
    });
    return Array.from(set);
  }, [movies]);

  const getMovieById = (id) => {
    return movies.find((m) => m.id === id);
  };

  const getRelatedMovies = (currentMovie, limit = 6) => {
    if (!currentMovie) return [];
    return movies
      .filter((m) => m.id !== currentMovie.id)
      .filter((m) => m.genres.some((g) => currentMovie.genres.includes(g)))
      .slice(0, limit);
  };

  return (
    <CatalogContext.Provider
      value={{
        movies,
        loading,
        error,
        featuredMovie,
        trendingMovies,
        latestMovies,
        genresList,
        languagesList,
        qualitiesList,
        getMovieById,
        getRelatedMovies,
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
}

export function useCatalog() {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error('useCatalog must be used within a CatalogProvider');
  }
  return context;
}
