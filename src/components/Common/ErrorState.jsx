import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center glass-panel rounded-2xl border border-red-500/30 max-w-md mx-auto my-12">
      <div className="p-4 bg-red-500/10 rounded-full mb-4">
        <AlertTriangle className="w-10 h-10 text-red-500" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">Something Went Wrong</h3>
      <p className="text-gray-400 text-sm mb-6">{message || 'Unable to load movie data. Please check your connection and try again.'}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-all border border-white/10"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Retry Loading</span>
        </button>
      )}
    </div>
  );
}
