import React, { useState } from 'react';
import { Shield, Zap, Film, Sparkles, Code, Layers, ChevronDown, ChevronUp, Globe, X, Mail } from 'lucide-react';

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: 'How does the dynamic catalog work on Butter MV?',
      a: 'Butter MV automatically discovers locally available movies from the public JSON catalog (/catalog.json). Any new entry added to the catalog is instantly displayed with poster artwork, backdrops, and streaming links without code changes.',
    },
    {
      q: 'Can I stream movies without buffering?',
      a: 'Yes — Butter MV streams directly from fast CDN mirrors in 1080p Full HD, split into multi-part segments for near-instant start times.',
    },
    {
      q: 'What video quality formats are supported?',
      a: 'Butter MV supports 1080p Full HD movies encoded in MP4 containers with multi-audio tracks (Tamil, Telugu, Hindi, English).',
    },
    {
      q: 'Is Butter MV PWA-ready for mobile devices?',
      a: 'Yes — Butter MV includes a progressive web app manifest and service worker caching strategy for smooth mobile installation and responsive touch playback.',
    },
  ];

  const capabilities = [
    {
      icon: Film,
      title: 'Dynamic Auto Discovery',
      desc: 'Automatic catalog population from structured JSON definitions — no static hardcoding required.',
    },
    {
      icon: Zap,
      title: 'Custom OTT Player',
      desc: 'A ground-up HTML5 player with keyboard shortcuts, chaptered multi-part playback, and mobile-first fullscreen controls.',
    },
    {
      icon: Shield,
      title: 'Multi-Audio Streaming',
      desc: '1080p multi-part files delivered instantly with native multi-audio track support.',
    },
  ];

  return (
    <div className="space-y-20 pb-20 pt-6 max-w-5xl mx-auto px-4 sm:px-6">
      {/* Hero Header */}
      <div className="text-center space-y-5">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[#E50914] text-[11px] font-bold uppercase tracking-[0.15em]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>About the Platform</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black font-heading text-white tracking-tight">
          Built for <span className="text-[#E50914]">Cinema Purists</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Butter MV is a dark-themed OTT streaming platform engineered for fast, uninterrupted 1080p playback.
        </p>
      </div>

      {/* Founder Card */}
      <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#0a0a0f] p-6 sm:p-10 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-[#E50914]/[0.06] via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-8">
          {/* Monogram Avatar */}
          <div className="shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-[#1a1a24] to-[#0a0a0f] border border-white/10 flex items-center justify-center">
            <span className="text-4xl sm:text-5xl font-black font-heading text-[#E50914]">K</span>
          </div>

          {/* Founder Bio Info */}
          <div className="space-y-3 text-center sm:text-left flex-grow">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black font-heading text-white">
                Mr K
              </h2>
              <p className="text-sm text-[#E50914] font-semibold mt-0.5">
                Founder &amp; CEO, Butter MV
              </p>
            </div>

            <p className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-2xl">
              Built to deliver an ultra-fast, dark-themed streaming experience — instant 1080p playback with clean, distraction-free controls.
            </p>

            <div className="flex items-center justify-center sm:justify-start gap-2 pt-2">
              <a href="#" className="p-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg border border-white/10 transition-colors" title="Website">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg border border-white/10 transition-colors" title="X (Twitter)">
                <X className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg border border-white/10 transition-colors" title="Email">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="hidden lg:flex flex-col gap-2 shrink-0 pt-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-medium text-gray-300">
              <Code className="w-3.5 h-3.5 text-[#E50914]" />
              React 19 &amp; Vite
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-medium text-gray-300">
              <Layers className="w-3.5 h-3.5 text-[#E50914]" />
              Tailwind CSS v4
            </span>
          </div>
        </div>
      </div>

      {/* Capabilities */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#E50914]">What We Offer</span>
          <h3 className="text-2xl sm:text-3xl font-black font-heading text-white">Platform Capabilities</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {capabilities.map((c, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors space-y-3">
              <div className="p-2.5 bg-[#E50914]/10 text-[#E50914] w-fit rounded-xl border border-[#E50914]/20">
                <c.icon className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold font-heading text-white">{c.title}</h4>
              <p className="text-sm text-gray-400 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#E50914]">Support</span>
          <h3 className="text-2xl sm:text-3xl font-black font-heading text-white">Frequently Asked Questions</h3>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left font-semibold text-sm sm:text-base text-white hover:text-[#E50914] transition-colors"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? (
                  <ChevronUp className="w-5 h-5 text-[#E50914] shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 shrink-0" />
                )}
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-sm text-gray-400 leading-relaxed border-t border-white/5 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Dedication */}
      <p className="text-center text-xs text-gray-600 pt-8 border-t border-white/10 tracking-wide">
        Dedicated to <span className="text-[#E50914] font-semibold">A</span>
      </p>
    </div>
  );
}
