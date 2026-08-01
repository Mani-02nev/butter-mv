import React from 'react';

export function MovieCardSkeleton() {
  return (
    <div className="relative rounded-xl overflow-hidden glass-panel border border-white/5 animate-pulse">
      <div className="w-full aspect-[2/3] bg-white/5" />
      <div className="p-4 space-y-2">
        <div className="h-5 bg-white/10 rounded w-3/4" />
        <div className="h-4 bg-white/5 rounded w-1/2" />
        <div className="flex gap-2 pt-2">
          <div className="h-4 bg-white/10 rounded w-12" />
          <div className="h-4 bg-white/10 rounded w-12" />
        </div>
      </div>
    </div>
  );
}

export function HeroBannerSkeleton() {
  return (
    <div className="relative w-full h-[70vh] bg-white/5 animate-pulse rounded-3xl overflow-hidden">
      <div className="absolute bottom-12 left-8 sm:left-16 space-y-4 max-w-xl">
        <div className="h-8 bg-white/10 rounded w-1/3" />
        <div className="h-12 bg-white/10 rounded w-4/5" />
        <div className="h-16 bg-white/5 rounded w-full" />
        <div className="flex gap-4 pt-4">
          <div className="h-12 w-32 bg-white/10 rounded-xl" />
          <div className="h-12 w-32 bg-white/10 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
