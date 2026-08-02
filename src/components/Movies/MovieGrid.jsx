import React from 'react';
import MovieCard from './MovieCard';
import { MovieCardSkeleton } from '../Common/Skeleton';
import EmptyState from '../Common/EmptyState';

export default function MovieGrid({ movies, loading, emptyMessage }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-6">
        {Array.from({ length: 10 }).map((_, i) => (
          <MovieCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <EmptyState
        icon="film"
        title="No Movies Found"
        description={emptyMessage || "We couldn't find any movies matching your query."}
        actionText="Browse All Movies"
        actionLink="/movies"
      />
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
