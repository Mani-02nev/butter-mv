import React from 'react';
import { Film, Search, Heart, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EmptyState({ icon = 'film', title, description, actionText, actionLink }) {
  const renderIcon = () => {
    switch (icon) {
      case 'search':
        return <Search className="w-12 h-12 text-[#E50914]" />;
      case 'heart':
        return <Heart className="w-12 h-12 text-[#E50914]" />;
      case 'download':
        return <Download className="w-12 h-12 text-[#E50914]" />;
      default:
        return <Film className="w-12 h-12 text-[#E50914]" />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center glass-panel rounded-2xl border border-white/10 max-w-md mx-auto my-12">
      <div className="p-4 bg-[#E50914]/10 rounded-full mb-4 border border-[#E50914]/20 glow-red">
        {renderIcon()}
      </div>
      <h3 className="text-2xl font-bold font-heading text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm mb-6 leading-relaxed">{description}</p>
      {actionText && actionLink && (
        <Link
          to={actionLink}
          className="px-6 py-3 bg-[#E50914] hover:bg-[#FF1E27] text-white font-semibold rounded-xl transition-all glow-red shadow-lg hover:scale-105"
        >
          {actionText}
        </Link>
      )}
    </div>
  );
}
