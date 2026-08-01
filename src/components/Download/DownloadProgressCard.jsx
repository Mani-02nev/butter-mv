import React from 'react';
import { Download, Trash2, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useDownloads } from '../../context/DownloadContext';

export default function DownloadProgressCard({ item }) {
  const { removeCompleted } = useDownloads();

  return (
    <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-4 hover:border-white/20 transition-all shadow-xl bg-gradient-to-r from-[#0a0a0f] to-[#12121c]">
      <div className="flex items-center gap-4">
        <img
          src={item.posterUrl}
          alt={item.title}
          className="w-14 h-20 object-cover rounded-xl border border-white/10 shadow-md shrink-0"
        />

        <div className="flex-grow min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-base font-extrabold font-heading text-white truncate">{item.title}</h4>
            <span className="px-2.5 py-0.5 text-[10px] font-black bg-[#E50914] text-white rounded glow-red shrink-0">
              {item.resolution || '1080p'}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-300 mt-1">
            <span className="font-semibold text-white">{item.size || '5.5 GB'} File</span>
            <span>•</span>
            <span className="text-green-400 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Direct Device Download
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={item.fileUrl || '/movies/spider-man-brand-new-day.mkv'}
            download="spider-man-brand-new-day.mkv"
            className="p-2.5 bg-[#E50914] hover:bg-[#FF1E27] text-white rounded-xl transition-all shadow-md glow-red"
            title="Re-Download to Device"
          >
            <Download className="w-4 h-4" />
          </a>

          <button
            onClick={() => removeCompleted(item.id)}
            className="p-2.5 bg-white/5 text-gray-400 hover:text-red-400 hover:bg-white/10 rounded-xl transition-all border border-white/10"
            title="Remove Entry"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-green-400 font-semibold pt-1 border-t border-white/5">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4" />
          <span>Downloaded Directly to Your Device (Chrome/Browser)</span>
        </div>
      </div>
    </div>
  );
}
