import React from 'react';
import { Download, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useDownloads } from '../context/DownloadContext';
import DownloadProgressCard from '../components/Download/DownloadProgressCard';
import EmptyState from '../components/Common/EmptyState';

export default function DownloadsPage() {
  const { completed } = useDownloads();

  return (
    <div className="space-y-8 pb-12 pt-4">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Download className="w-8 h-8 text-[#E50914]" />
          <h1 className="text-3xl sm:text-4xl font-black font-heading text-white tracking-wide">
            Device Downloads
          </h1>
        </div>
        <p className="text-sm text-gray-400">
          Direct native device downloads managed by your Chrome / Web Browser
        </p>
      </div>

      {completed.length === 0 ? (
        <EmptyState
          icon="download"
          title="No Device Downloads Yet"
          description="Click download on any movie to save the file directly to your phone or computer."
          actionText="Browse Movies Catalog"
          actionLink="/movies"
        />
      ) : (
        <div className="space-y-4">
          <h3 className="text-xl font-bold font-heading text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span>Direct Device Download History ({completed.length})</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {completed.map((item) => (
              <DownloadProgressCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
