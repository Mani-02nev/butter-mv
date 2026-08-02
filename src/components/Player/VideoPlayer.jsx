import React, { useRef, useState, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  ArrowLeft,
  ListVideo,
  RotateCcw,
  RotateCw,
  X,
  Check,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function VideoPlayer({ movie }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const parts = movie?.parts && movie.parts.length > 0 ? movie.parts : [
    { part: 1, title: 'Part 1', url: '/compressed/part_0.mp4' },
    { part: 2, title: 'Part 2', url: '/compressed/part_1.mp4' },
    { part: 3, title: 'Part 3', url: '/compressed/part_2.mp4' },
  ];

  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [srcUrl, setSrcUrl] = useState(parts[0]?.url || '/compressed/part_0.mp4');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showPartsMenu, setShowPartsMenu] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const controlsTimeoutRef = useRef(null);

  // Sync srcUrl when movie or parts change dynamically
  useEffect(() => {
    if (movie?.parts && movie.parts.length > 0) {
      const activePart = movie.parts[currentPartIndex] || movie.parts[0];
      setSrcUrl(activePart.url);
      setVideoError(false);
    } else if (movie?.videoUrl) {
      setSrcUrl(movie.videoUrl);
      setVideoError(false);
    }
  }, [movie, currentPartIndex]);

  // Switch part handler
  const switchPart = (index) => {
    if (index >= 0 && index < parts.length) {
      setCurrentPartIndex(index);
      setSrcUrl(parts[index].url);
      setVideoError(false);
      setIsPlaying(true);
      setShowPartsMenu(false);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().catch(() => {});
        }
      }, 150);
    }
  };

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      switch (e.code) {
        case 'Space':
        case 'KeyK':
          e.preventDefault();
          togglePlay();
          break;
        case 'KeyF':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'KeyM':
          e.preventDefault();
          toggleMute();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          skipTime(-10);
          break;
        case 'ArrowRight':
          e.preventDefault();
          skipTime(10);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- togglePlay/toggleFullscreen read videoRef directly; toggleMute's only state dependency (isMuted) is already listed
  }, [isPlaying, isMuted, isFullscreen]);

  // Fullscreen listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        Boolean(document.fullscreenElement || document.webkitFullscreenElement)
      );
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Auto-hide controls on mouse or touch idle
  const handleUserActivity = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused) {
        setShowControls(false);
        setShowPartsMenu(false);
      }
    }, 3500);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch((err) => console.log('Play error:', err));
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Center Screen Click to Toggle Play/Pause cleanly
  const handleCenterClick = () => {
    togglePlay();
    handleUserActivity();
  };

  const skipTime = (delta) => {
    if (!videoRef.current) return;
    const max = videoRef.current.duration || duration || Infinity;
    videoRef.current.currentTime = Math.min(Math.max(videoRef.current.currentTime + delta, 0), max);
    setCurrentTime(videoRef.current.currentTime);
    handleUserActivity();
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 0);
    }
  };

  const handleSeekChange = (e) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      setIsMuted(val === 0);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    const v = videoRef.current;
    const c = containerRef.current;
    if (!c && !v) return;

    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
      if (c?.requestFullscreen) {
        c.requestFullscreen().catch(() => {});
      } else if (c?.webkitRequestFullscreen) {
        c.webkitRequestFullscreen();
      } else if (v?.webkitEnterFullscreen) {
        v.webkitEnterFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '00:00';
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const pad = (num) => String(num).padStart(2, '0');
    if (hrs > 0) {
      return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
    }
    return `${pad(mins)}:${pad(secs)}`;
  };

  // Auto advance to next part when current segment ends
  const handleVideoEnded = () => {
    if (currentPartIndex + 1 < parts.length) {
      switchPart(currentPartIndex + 1);
    } else {
      setIsPlaying(false);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleUserActivity}
      onTouchStart={handleUserActivity}
      className={`relative w-full ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none bg-black' : 'aspect-video rounded-2xl sm:rounded-3xl'
      } bg-black overflow-hidden shadow-2xl border border-white/10 group select-none transition-all`}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={srcUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onClick={handleCenterClick}
        onEnded={handleVideoEnded}
        onError={() => setVideoError(true)}
        playsInline
        className="w-full h-full object-contain bg-black cursor-pointer"
      />

      {/* Video Error Overlay */}
      {videoError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 p-6 text-center z-20 space-y-3">
          <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center font-bold">
            !
          </div>
          <h4 className="text-lg font-bold text-white">Video Stream Syncing</h4>
          <p className="text-xs text-gray-400 max-w-sm">
            Part {currentPartIndex + 1} is syncing with GitHub Vercel CDN. Try switching parts or re-downloading.
          </p>
        </div>
      )}

      {/* Dim wash behind the center cluster while paused (clicks pass through to the video) */}
      {!isPlaying && !videoError && (
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] z-[5] pointer-events-none transition-opacity duration-300" />
      )}

      {/* Center Controls Cluster: Rewind 10s / Play-Pause / Forward 10s.
          Only mounted while paused — disappears the instant playback starts,
          so it never lingers over the video during normal viewing. */}
      {!isPlaying && !videoError && (
        <div className="absolute inset-0 flex items-center justify-center gap-5 sm:gap-8 z-10 animate-in fade-in duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              skipTime(-10);
            }}
            className="relative p-3 sm:p-3.5 rounded-full bg-black/50 hover:bg-black/70 active:bg-black/90 text-white backdrop-blur-md border border-white/10 shadow-xl transition-all hover:scale-110 active:scale-95"
            title="Rewind 10 seconds"
          >
            <RotateCcw className="w-6 h-6 sm:w-7 sm:h-7" />
            <span className="absolute inset-0 flex items-center justify-center text-[9px] sm:text-[10px] font-black pt-px pointer-events-none">
              10
            </span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCenterClick();
            }}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#E50914] text-white flex items-center justify-center shadow-2xl glow-red hover:scale-110 active:scale-95 transition-transform"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 sm:w-10 sm:h-10 fill-white" />
            ) : (
              <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-white ml-1" />
            )}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              skipTime(10);
            }}
            className="relative p-3 sm:p-3.5 rounded-full bg-black/50 hover:bg-black/70 active:bg-black/90 text-white backdrop-blur-md border border-white/10 shadow-xl transition-all hover:scale-110 active:scale-95"
            title="Forward 10 seconds"
          >
            <RotateCw className="w-6 h-6 sm:w-7 sm:h-7" />
            <span className="absolute inset-0 flex items-center justify-center text-[9px] sm:text-[10px] font-black pt-px pointer-events-none">
              10
            </span>
          </button>
        </div>
      )}

      {/* Top Header Navigation */}
      <div
        className={`absolute top-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-b from-black/90 via-black/40 to-transparent flex items-center justify-between z-30 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-gray-300 hover:text-white bg-black/60 hover:bg-black/90 active:bg-black px-3 py-2 sm:px-3.5 sm:py-1.5 rounded-xl backdrop-blur-md border border-white/10 transition-colors text-xs sm:text-sm font-semibold shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden min-[380px]:inline">Back</span>
        </button>

        <div className="text-center px-1 sm:px-2 min-w-0">
          <h2 className="text-xs sm:text-base font-extrabold font-heading text-white truncate max-w-[120px] min-[380px]:max-w-[160px] sm:max-w-md">
            {movie?.title} <span className="text-[#E50914] ml-1">(Part {currentPartIndex + 1})</span>
          </h2>
          <span className="hidden sm:inline text-[10px] text-gray-400 font-mono">Tap center to play / stop</span>
        </div>

        {/* Multi-Part Switcher Button (opens the bottom sheet) */}
        <button
          onClick={() => setShowPartsMenu(true)}
          className="flex items-center gap-1.5 px-2.5 py-2 sm:px-3 sm:py-1.5 text-xs font-bold bg-[#E50914] text-white rounded-lg glow-red hover:bg-[#FF1E27] active:bg-[#c40810] transition-all shrink-0"
        >
          <ListVideo className="w-4 h-4" />
          <span className="hidden sm:inline">Parts ({currentPartIndex + 1}/{parts.length})</span>
        </button>
      </div>

      {/* Ultra Clean Bottom Controls Bar */}
      <div
        className={`absolute bottom-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-t from-black/95 via-black/70 to-transparent z-30 space-y-3 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Seek Progress Bar (extra vertical padding widens the touch hit area) */}
        <div className="relative flex items-center py-2 -my-2">
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeekChange}
            className="w-full h-2 sm:h-1.5 sm:hover:h-2.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#E50914] transition-all"
          />
        </div>

        {/* Clean Controls Row */}
        <div className="flex items-center justify-between text-white gap-2">
          <div className="flex items-center gap-1 sm:gap-3 min-w-0">
            <button
              onClick={handleCenterClick}
              className="p-2.5 sm:p-2 hover:bg-white/10 active:bg-white/20 rounded-full transition-colors shrink-0"
              title={isPlaying ? 'Stop / Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 fill-white" />
              ) : (
                <Play className="w-6 h-6 fill-white" />
              )}
            </button>

            {/* Mute & Volume */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              <button onClick={toggleMute} className="p-2.5 sm:p-2 text-gray-300 hover:text-white hover:bg-white/10 active:bg-white/20 rounded-full transition-colors">
                {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="hidden sm:block w-20 h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#E50914]"
              />
            </div>

            {/* Time Stamp */}
            <div className="text-[11px] sm:text-xs font-mono text-gray-300 truncate">
              <span>{formatTime(currentTime)}</span>
              <span className="text-gray-500 mx-1">/</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={toggleFullscreen}
              className="p-2.5 sm:p-2 text-gray-300 hover:text-white hover:bg-white/10 active:bg-white/20 rounded-full transition-colors"
              title="Fullscreen"
            >
              {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Parts Bottom Sheet (Hotstar-style) — fixed to the viewport so it works the same in and out of fullscreen */}
      {showPartsMenu && (
        <>
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 animate-in fade-in duration-200"
            onClick={() => setShowPartsMenu(false)}
          />
          <div className="fixed inset-x-0 bottom-0 z-50 max-h-[75vh] flex flex-col rounded-t-3xl bg-[#0c0c14] border-t border-white/10 shadow-2xl animate-in slide-in-from-bottom duration-300">
            {/* Drag Handle */}
            <button
              onClick={() => setShowPartsMenu(false)}
              className="w-full flex flex-col items-center pt-3 pb-1 shrink-0"
              title="Close"
            >
              <span className="w-10 h-1.5 rounded-full bg-white/25" />
            </button>

            {/* Header */}
            <div className="flex items-center justify-between px-5 pb-3 border-b border-white/10 shrink-0">
              <div>
                <h3 className="text-base font-extrabold font-heading text-white">Select Part</h3>
                <p className="text-[11px] text-gray-400">{movie?.title} • {parts.length} parts</p>
              </div>
              <button
                onClick={() => setShowPartsMenu(false)}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Parts List */}
            <div className="overflow-y-auto px-3 py-3 space-y-2">
              {parts.map((p, idx) => {
                const active = currentPartIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => switchPart(idx)}
                    className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all ${
                      active
                        ? 'bg-[#E50914]/15 border border-[#E50914]/50'
                        : 'bg-white/5 border border-transparent hover:bg-white/10 active:bg-white/15'
                    }`}
                  >
                    <span
                      className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-xs font-black ${
                        active ? 'bg-[#E50914] text-white glow-red' : 'bg-white/10 text-gray-300'
                      }`}
                    >
                      {active ? <Check className="w-4 h-4" /> : p.part ?? idx + 1}
                    </span>
                    <div className="flex-1 min-w-0 text-left">
                      <span className={`block text-sm font-semibold truncate ${active ? 'text-white' : 'text-gray-200'}`}>
                        {p.title}
                      </span>
                      {p.size && <span className="text-[11px] text-gray-500">{p.size}</span>}
                    </div>
                    {active && (
                      <span className="shrink-0 text-[10px] font-black uppercase text-[#E50914] tracking-wide">
                        Now Playing
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
