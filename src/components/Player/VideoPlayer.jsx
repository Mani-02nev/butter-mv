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
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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

      {/* Static Center Play Icon when Paused */}
      {!isPlaying && !videoError && (
        <div
          onClick={handleCenterClick}
          className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm cursor-pointer z-10"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#E50914] text-white flex items-center justify-center shadow-2xl glow-red hover:scale-110 transition-transform">
            <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-white ml-1" />
          </div>
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
          className="flex items-center gap-1.5 text-gray-300 hover:text-white bg-black/60 hover:bg-black/90 px-3.5 py-1.5 rounded-xl backdrop-blur-md border border-white/10 transition-colors text-xs sm:text-sm font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="text-center px-2">
          <h2 className="text-sm sm:text-base font-extrabold font-heading text-white truncate max-w-[200px] sm:max-w-md">
            {movie?.title} <span className="text-[#E50914] ml-1">(Part {currentPartIndex + 1})</span>
          </h2>
          <span className="text-[10px] text-gray-400 font-mono">Tap center to play / stop</span>
        </div>

        {/* Multi-Part Switcher Button */}
        <div className="relative">
          <button
            onClick={() => setShowPartsMenu(!showPartsMenu)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-[#E50914] text-white rounded-lg glow-red hover:bg-[#FF1E27] transition-all"
          >
            <ListVideo className="w-4 h-4" />
            <span className="hidden sm:inline">Parts ({currentPartIndex + 1}/{parts.length})</span>
          </button>

          {showPartsMenu && (
            <div className="absolute right-0 top-10 w-56 p-2 rounded-xl glass-panel border border-white/10 shadow-2xl space-y-1 z-40 max-h-64 overflow-y-auto">
              <span className="block px-2 py-1 text-[10px] font-black uppercase text-gray-400 border-b border-white/10 mb-1">
                Select Movie Part
              </span>
              {parts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => switchPart(idx)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg transition-all ${
                    currentPartIndex === idx
                      ? 'bg-[#E50914] text-white font-bold glow-red'
                      : 'text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <span className="truncate">{p.title}</span>
                  <span className="text-[10px] opacity-75">{p.size}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Ultra Clean Bottom Controls Bar */}
      <div
        className={`absolute bottom-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-t from-black/95 via-black/70 to-transparent z-30 space-y-3 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Seek Progress Bar */}
        <div className="relative flex items-center">
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeekChange}
            className="w-full h-1.5 bg-white/20 hover:h-2.5 rounded-lg appearance-none cursor-pointer accent-[#E50914] transition-all"
          />
        </div>

        {/* Clean Controls Row */}
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <button
              onClick={handleCenterClick}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              title={isPlaying ? 'Stop / Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 fill-white" />
              ) : (
                <Play className="w-6 h-6 fill-white" />
              )}
            </button>

            {/* Mute & Volume */}
            <div className="flex items-center gap-2">
              <button onClick={toggleMute} className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-colors">
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
            <div className="text-xs font-mono text-gray-300">
              <span>{formatTime(currentTime)}</span>
              <span className="text-gray-500 mx-1">/</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleFullscreen}
              className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              title="Fullscreen"
            >
              {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
