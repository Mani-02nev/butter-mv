import React from 'react';
import Modal from './Modal';

export default function TrailerModal({ isOpen, onClose, movie }) {
  if (!movie) return null;

  const isYouTube =
    movie.trailerUrl?.includes('youtube.com') ||
    movie.trailerUrl?.includes('youtu.be');

  // Convert standard YouTube watch link to embed link if needed
  const getEmbedUrl = (url) => {
    if (!url) return '';
    if (url.includes('youtube.com/embed')) return url;
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    if (url.includes('youtube.com/watch')) {
      const id = new URLSearchParams(new URL(url).search).get('v');
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    return url;
  };

  const embedUrl = getEmbedUrl(movie.trailerUrl);

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-4xl">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-extrabold font-heading text-white">{movie.title} - Official Trailer</h3>
            <p className="text-xs text-gray-400">{movie.genres?.join(' • ')} | {movie.formattedRuntime}</p>
          </div>
        </div>

        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl">
          {isYouTube ? (
            <iframe
              src={embedUrl}
              title={`${movie.title} Official Trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full border-0"
            />
          ) : movie.trailerUrl ? (
            <video
              src={movie.trailerUrl}
              controls
              autoPlay
              className="w-full h-full object-cover"
            >
              Your browser does not support HTML5 video player.
            </video>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 text-sm">
              Trailer video preview not available.
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
