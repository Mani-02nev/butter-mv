import React, { useState } from 'react';
import Modal from '../Common/Modal';
import { Download, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useDownloads } from '../../context/DownloadContext';

export default function DownloadModal({ isOpen, onClose, movie }) {
  const { startDownload } = useDownloads();
  const [downloadTriggered, setDownloadTriggered] = useState(false);

  if (!movie) return null;

  const downloadInfo = movie.download || {
    resolution: '1080p HQ PreDVD',
    size: '5.5 GB',
    format: 'MKV [Tam + Tel + Hin + Eng]',
    bitrate: 'High Speed Multi-Audio',
  };

  const handleDirectDownload = () => {
    startDownload(movie);
    setDownloadTriggered(true);
    setTimeout(() => {
      setDownloadTriggered(false);
      onClose();
    }, 1200);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Direct Device Download`} maxWidth="max-w-xl">
      <div className="space-y-6">
        {/* Banner Preview */}
        <div className="flex items-center gap-4 p-4 glass-panel rounded-2xl border border-white/10">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-20 h-28 object-cover rounded-xl border border-white/10 shadow-lg"
          />
          <div className="space-y-1">
            <h4 className="text-xl font-bold font-heading text-white">{movie.title}</h4>
            <p className="text-xs text-gray-400">
              {movie.year} • {movie.formattedRuntime} • {movie.genres?.join(', ')}
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="px-2.5 py-0.5 text-[11px] font-black bg-[#E50914] text-white rounded glow-red">
                {downloadInfo.resolution}
              </span>
              <span className="px-2.5 py-0.5 text-[11px] font-bold bg-green-500/20 text-green-400 rounded border border-green-500/30 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                <span>Direct Device Download</span>
              </span>
            </div>
          </div>
        </div>

        {/* Download File Spec Card */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-300">
            <span className="font-semibold text-gray-400">File Format & Codec:</span>
            <span className="font-bold text-white">{downloadInfo.format}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-300">
            <span className="font-semibold text-gray-400">Actual File Size:</span>
            <span className="font-extrabold text-[#E50914] text-sm">{downloadInfo.size}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-300">
            <span className="font-semibold text-gray-400">Audio Languages:</span>
            <span className="font-bold text-green-400">{movie.audioLanguages?.slice(0, 4).join(', ')}</span>
          </div>
        </div>

        {/* Direct Device Download Anchor Button */}
        <a
          href={movie.download?.url || movie.videoUrl || '/movies/spider-man-brand-new-day.mkv'}
          download="spider-man-brand-new-day.mkv"
          onClick={handleDirectDownload}
          className="w-full flex items-center justify-center gap-3 py-4 bg-[#E50914] hover:bg-[#FF1E27] text-white font-extrabold text-lg rounded-xl transition-all shadow-xl glow-red hover:scale-[1.01]"
        >
          {downloadTriggered ? (
            <>
              <CheckCircle2 className="w-6 h-6 animate-bounce" />
              <span>Downloading to Your Device...</span>
            </>
          ) : (
            <>
              <Download className="w-6 h-6" />
              <span>Download Direct to Device ({downloadInfo.size})</span>
            </>
          )}
        </a>
      </div>
    </Modal>
  );
}
