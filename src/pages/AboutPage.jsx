import React, { useState } from 'react';
import { Play, Shield, Zap, Film, Sparkles, Code, Heart, ChevronDown, ChevronUp } from 'lucide-react';

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: 'How does the dynamic catalog work on Butter MV?',
      a: 'Butter MV automatically discovers locally available movies from the public JSON catalog (/catalog.json). Any new entry added to the catalog is instantly displayed with poster artwork, backdrops, and download links without code changes.',
    },
    {
      q: 'Can I download movies for offline viewing?',
      a: 'Yes! Butter MV features a direct device download system supporting 1080p Full HD multi-part direct downloads with ultra-fast speed CDN mirrors.',
    },
    {
      q: 'What video quality formats are supported?',
      a: 'Butter MV supports 1080p Full HD movies encoded in MP4 containers with multi-audio tracks (Tamil, Telugu, Hindi, English).',
    },
    {
      q: 'Is Butter MV PWA-ready for mobile devices?',
      a: 'Yes! Butter MV includes a progressive web app manifest and service worker caching strategy allowing smooth mobile installation and responsive touch playback.',
    },
  ];

  return (
    <div className="space-y-16 pb-16 pt-4 max-w-5xl mx-auto px-4 sm:px-6">
      {/* Hero Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#E50914]/20 border border-[#E50914]/40 rounded-full text-[#E50914] text-xs font-black uppercase tracking-wider glow-red">
          <Sparkles className="w-4 h-4" />
          <span>CINEMA REDEFINED</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black font-heading text-white tracking-tight">
          About <span className="text-[#E50914]">Butter MV</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Butter MV is an ultra-premium, dark-themed OTT movie streaming and instant download web platform engineered for cinema purists.
        </p>
      </div>

      {/* Developer & Founder Profile Card */}
      <div className="relative rounded-3xl overflow-hidden glass-panel border border-[#E50914]/40 p-6 sm:p-10 shadow-2xl bg-gradient-to-r from-[#050505] via-[#12121c] to-[#050505]">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#E50914]/20 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          {/* Original Red Play Logo Avatar Badge */}
          <div className="relative shrink-0">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-gradient-to-br from-[#FF1E27] to-[#E50914] flex items-center justify-center shadow-2xl glow-red border-2 border-white/20">
              <Play className="w-16 h-16 fill-white text-white ml-1" />
            </div>
            <span className="absolute -bottom-2 -right-2 px-3 py-1 bg-[#E50914] text-white text-[10px] font-black uppercase rounded-lg shadow-lg">
              FOUNDER
            </span>
          </div>

          {/* Founder Bio Info */}
          <div className="space-y-4 text-center md:text-left flex-grow">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <h2 className="text-3xl sm:text-4xl font-black font-heading text-white">
                  Black
                </h2>
                <span className="px-2.5 py-0.5 text-xs font-extrabold bg-white/10 text-gray-300 rounded-md border border-white/10">
                  Lead Developer & Architect
                </span>
              </div>
              <p className="text-sm text-[#E50914] font-semibold italic">
                Founder & Creator of Butter MV
              </p>
            </div>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-sans max-w-2xl">
              "Crafted with passion for cinema enthusiasts worldwide. Butter MV was created to deliver an ultra-fast, dark-themed OTT experience with instant direct downloads, 1080p video streams, and responsive mobile perfection."
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-xl text-xs font-semibold text-gray-300">
                <Code className="w-3.5 h-3.5 text-[#E50914]" />
                React 19 & Vite
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-xl text-xs font-semibold text-gray-300">
                <Zap className="w-3.5 h-3.5 text-yellow-400" />
                Ultra Fast CDN
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-xl text-xs font-semibold text-gray-300">
                <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                Cinema Enthusiasts
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Streaming Quality', val: '1080p HD' },
          { label: 'Buffering Speed', val: '0.1s' },
          { label: 'Download Speeds', val: '50 MB/s' },
          { label: 'Frame Rate', val: '60 FPS' },
        ].map((stat, i) => (
          <div key={i} className="p-6 rounded-2xl glass-panel border border-white/10 text-center space-y-1">
            <span className="text-3xl sm:text-4xl font-black font-heading text-[#E50914] glow-red-text">
              {stat.val}
            </span>
            <span className="block text-xs text-gray-400 font-semibold uppercase">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Features Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-3">
          <div className="p-3 bg-[#E50914]/20 text-[#E50914] w-fit rounded-xl border border-[#E50914]/30">
            <Film className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold font-heading text-white">Dynamic Auto Discovery</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Automatic catalog population from structured JSON definitions without static hardcoding.
          </p>
        </div>

        <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-3">
          <div className="p-3 bg-[#E50914]/20 text-[#E50914] w-fit rounded-xl border border-[#E50914]/30">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold font-heading text-white">Custom OTT Player</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Netflix-inspired HTML5 video controls, keyboard hotkeys, and mobile fullscreen playback.
          </p>
        </div>

        <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-3">
          <div className="p-3 bg-[#E50914]/20 text-[#E50914] w-fit rounded-xl border border-[#E50914]/30">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold font-heading text-white">Direct Device Downloads</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Direct browser native file downloads supporting 1080p multi-part files with multi-audio.
          </p>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold font-heading text-white text-center">Frequently Asked Questions</h3>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl glass-panel border border-white/10 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left font-bold text-base text-white hover:text-[#E50914] transition-colors"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? (
                  <ChevronUp className="w-5 h-5 text-[#E50914]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-sm text-gray-300 leading-relaxed border-t border-white/5 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
