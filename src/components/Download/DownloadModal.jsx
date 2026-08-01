import React, { useState } from 'react';
import Modal from '../Common/Modal';
import { Download, ShieldCheck, CheckCircle2, ListVideo, Layers } from 'lucide-react';
import { useDownloads } from '../../context/DownloadContext';

export default function DownloadModal({ isOpen, onClose, movie }) {
  const { startDownload } = useDownloads();
  const [downloadTriggered, setDownloadTriggered] = useState(false);
  const [activeTab, setActiveTab] = useState('batch'); // 'batch' | 'parts'

  if (!movie) return null;

  const parts = movie.parts || [
    { part: 1, title: 'Part 1 (0:00 - 4:33)', url: '/compressed/part_0.mp4', size: '15 MB' },
  ];

  const downloadInfo = movie.download || {
    resolution: '1080p 30-Part HD',
    size: '15 MB per Part',
    format: 'MP4 (Web Optimized)',
    bitrate: 'High Speed Multi-Audio',
  };

  const handleDownloadSingle = (partItem) => {
    const singleMovieObj = {
      id: `${movie.id}-part-${partItem.part}`,
      title: `${movie.title} - ${partItem.title}`,
      posterUrl: movie.posterUrl,
      download: {
        resolution: '1080p HD',
        size: partItem.size,
        format: 'MP4 Part',
        url: partItem.url,
      },
    };
    startDownload(singleMovieObj);
  };

  const handleDownloadAllParts = () => {
    setDownloadTriggered(true);
    parts.forEach((p, idx) => {
      setTimeout(() => {
        const a = document.createElement('a');
        a.href = p.url;
        a.download = `spider-man-brand-new-day-part-${p.part}.mp4`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }, idx * 500);
    });

    setTimeout(() => {
      setDownloadTriggered(false);
      onClose();
    }, 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Direct Device Download`} maxWidth="max-w-2xl">
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
              {movie.year} • {movie.formattedRuntime} • {parts.length} Parts Playlist
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="px-2.5 py-0.5 text-[11px] font-black bg-[#E50914] text-white rounded glow-red">
                {downloadInfo.resolution}
              </span>
              <span className="px-2.5 py-0.5 text-[11px] font-bold bg-green-500/20 text-green-400 rounded border border-green-500/30 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                <span>GitHub Safe Downloads</span>
              </span>
            </div>
          </div>
        </div>

        {/* Tab Switcher: Download Full Playlist vs Individual Part */}
        <div className="flex items-center gap-2 p-1 bg-white/5 rounded-xl border border-white/10">
          <button
            onClick={() => setActiveTab('batch')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'batch'
                ? 'bg-[#E50914] text-white shadow-md glow-red'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Download All ({parts.length} Parts)</span>
          </button>

          <button
            onClick={() => setActiveTab('parts')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'parts'
                ? 'bg-[#E50914] text-white shadow-md glow-red'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <ListVideo className="w-4 h-4" />
            <span>Select Single Part</span>
          </button>
        </div>

        {/* Tab 1: Download All Parts Batch */}
        {activeTab === 'batch' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-300">
                <span className="font-semibold text-gray-400">Total Playlist Segments:</span>
                <span className="font-bold text-white">{parts.length} Parts</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-300">
                <span className="font-semibold text-gray-400">Average Part Size:</span>
                <span className="font-extrabold text-[#E50914] text-sm">~15 MB - 45 MB per part</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-300">
                <span className="font-semibold text-gray-400">Audio Languages:</span>
                <span className="font-bold text-green-400">{movie.audioLanguages?.join(', ')}</span>
              </div>
            </div>

            <button
              onClick={handleDownloadAllParts}
              disabled={downloadTriggered}
              className="w-full flex items-center justify-center gap-3 py-4 bg-[#E50914] hover:bg-[#FF1E27] text-white font-extrabold text-lg rounded-xl transition-all shadow-xl glow-red hover:scale-[1.01]"
            >
              {downloadTriggered ? (
                <>
                  <CheckCircle2 className="w-6 h-6 animate-bounce" />
                  <span>Triggering Batch Device Download...</span>
                </>
              ) : (
                <>
                  <Download className="w-6 h-6" />
                  <span>Download All {parts.length} Parts to Device</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Tab 2: Individual Parts Selector List */}
        {activeTab === 'parts' && (
          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {parts.map((p) => (
              <div
                key={p.part}
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              >
                <div>
                  <h5 className="text-sm font-bold text-white">{p.title}</h5>
                  <span className="text-[10px] text-gray-400">{p.size} • MP4 Video</span>
                </div>
                <a
                  href={p.url}
                  download={`spider-man-brand-new-day-part-${p.part}.mp4`}
                  onClick={() => handleDownloadSingle(p)}
                  className="px-3 py-1.5 bg-[#E50914] hover:bg-[#FF1E27] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 glow-red shadow-md"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Part {p.part}</span>
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}
