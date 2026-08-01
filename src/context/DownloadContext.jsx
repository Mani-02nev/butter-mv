import React, { createContext, useContext, useState, useEffect } from 'react';

const DownloadContext = createContext();

const COMPLETED_KEY = 'butter_mv_download_history';

export function DownloadProvider({ children }) {
  const [completed, setCompleted] = useState(() => {
    try {
      const saved = localStorage.getItem(COMPLETED_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(COMPLETED_KEY, JSON.stringify(completed));
    } catch (e) {
      console.error('Failed to save download history:', e);
    }
  }, [completed]);

  // Clean direct download function - triggers ACTUAL device browser file download directly
  const startDownload = (movie) => {
    const fileUrl = movie.download?.url || movie.videoUrl || '/movies/spider-man-brand-new-day.mkv';
    const downloadInfo = movie.download || {
      resolution: '1080p HQ PreDVD',
      size: '5.5 GB',
      format: 'MKV',
      bitrate: 'High Speed Multi-Audio',
      url: fileUrl,
    };

    // Trigger REAL device browser native download directly
    try {
      const a = document.createElement('a');
      a.href = fileUrl;
      a.download = `spider-man-brand-new-day.mkv`;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error('Browser download trigger:', err);
    }

    // Save to device download history
    setCompleted((prev) => {
      const existing = prev.filter((item) => item.id !== `${movie.id}-download`);
      return [
        {
          id: `${movie.id}-download`,
          movieId: movie.id,
          title: movie.title,
          posterUrl: movie.posterUrl,
          resolution: downloadInfo.resolution,
          size: downloadInfo.size,
          format: downloadInfo.format,
          fileUrl,
          downloadedAt: new Date().toISOString(),
        },
        ...existing,
      ];
    });
  };

  const removeCompleted = (id) => {
    setCompleted((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <DownloadContext.Provider
      value={{
        downloads: [],
        completed,
        startDownload,
        removeCompleted,
        activeCount: 0,
      }}
    >
      {children}
    </DownloadContext.Provider>
  );
}

export function useDownloads() {
  const context = useContext(DownloadContext);
  if (!context) {
    throw new Error('useDownloads must be used within a DownloadContext');
  }
  return context;
}
