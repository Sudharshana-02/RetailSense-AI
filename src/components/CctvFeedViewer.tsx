import React, { useState, useRef, useEffect } from 'react';
import { CameraFeed } from '../types/retail';
import { CAMERA_FEEDS } from '../data/mockRetailData';
import { useTheme } from '../context/ThemeContext';
import { Video, Columns, Play, Pause, AlertCircle, Loader2, Maximize2, Volume2, VolumeX, Eye } from 'lucide-react';
import camera01Asset from '../assets/videos/camera-01.mp4';
import camera02Asset from '../assets/videos/camera-02.mp4';

interface CctvFeedViewerProps {
  initialCameraId?: string;
  onCameraChange?: (cam: CameraFeed) => void;
  showControls?: boolean;
}

type VideoState = 'loading' | 'playing' | 'paused' | 'ended' | 'error';

interface SingleVideoPlayerProps {
  camera: CameraFeed;
  primarySrc: string;
  fallbackSrc: string;
  isDark: boolean;
  label: string;
  subLabel?: string;
}

const SingleVideoPlayer: React.FC<SingleVideoPlayerProps> = ({
  camera,
  primarySrc,
  fallbackSrc,
  isDark,
  label,
  subLabel,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoState, setVideoState] = useState<VideoState>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  // Ensure autoplay works across all browsers & iframes
  useEffect(() => {
    setVideoState('loading');
    setErrorMessage(null);
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      video.load();
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setVideoState('playing');
          })
          .catch(() => {
            // Autoplay restricted by browser, user can click to play
            setVideoState('paused');
          });
      }
    }
  }, [primarySrc, fallbackSrc]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video
        .play()
        .then(() => setVideoState('playing'))
        .catch(() => setVideoState('paused'));
    } else {
      video.pause();
      setVideoState('paused');
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const requestFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.requestFullscreen) {
      video.requestFullscreen();
    }
  };

  return (
    <div className="relative aspect-[16/9] w-full bg-black overflow-hidden flex flex-col justify-center items-center group select-none">
      {/* Real HTML5 Video Player */}
      <video
        ref={videoRef}
        src={primarySrc}
        controls
        playsInline
        preload="auto"
        muted
        autoPlay
        loop
        poster={camera.image}
        onLoadStart={() => setVideoState('loading')}
        onWaiting={() => setVideoState('loading')}
        onLoadedData={() => {
          if (videoRef.current && !videoRef.current.paused) {
            setVideoState('playing');
          } else {
            setVideoState('paused');
          }
        }}
        onPlaying={() => {
          setVideoState('playing');
          setErrorMessage(null);
        }}
        onPause={() => setVideoState('paused')}
        onEnded={() => setVideoState('ended')}
        onError={(e) => {
          const target = e.target as HTMLVideoElement;
          const code = target.error?.code;
          const msg = target.error?.message || 'Video stream could not be loaded';
          setVideoState('error');
          setErrorMessage(`Stream issue: Code ${code || 'network'} - ${msg}`);
        }}
        className="w-full h-full object-contain bg-black cursor-pointer"
        onClick={togglePlay}
      >
        <source src={primarySrc} type="video/mp4" />
        <source src={fallbackSrc} type="video/mp4" />
        Your browser does not support HTML5 video playback.
      </video>

      {/* Top Stream Status Overlay */}
      <div className="absolute top-3 left-3 flex items-center gap-2 pointer-events-none z-20">
        {videoState === 'loading' && (
          <span className="px-2.5 py-1 text-xs font-mono font-medium rounded bg-amber-500 text-slate-950 flex items-center gap-1.5 shadow-md">
            <Loader2 className="w-3 h-3 animate-spin" />
            <span>CONNECTING RTSP...</span>
          </span>
        )}
        {videoState === 'playing' && (
          <span className="px-2.5 py-1 text-xs font-mono font-bold rounded bg-emerald-600 text-white flex items-center gap-1.5 shadow-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span>LIVE FEED</span>
          </span>
        )}
        {videoState === 'paused' && (
          <span className="px-2.5 py-1 text-xs font-mono font-medium rounded bg-slate-800/90 text-slate-200 flex items-center gap-1.5 shadow-md">
            <Pause className="w-3 h-3" />
            <span>PAUSED</span>
          </span>
        )}
        {videoState === 'error' && (
          <span className="px-2.5 py-1 text-xs font-mono font-medium rounded bg-rose-600 text-white flex items-center gap-1.5 shadow-md">
            <AlertCircle className="w-3 h-3" />
            <span>STREAM ERROR</span>
          </span>
        )}

        <span className="px-2.5 py-1 text-xs font-mono font-semibold rounded bg-black/80 text-white border border-slate-700/70 shadow-md">
          {label}
        </span>
      </div>

      {/* Large Centered Play Button when paused */}
      {videoState === 'paused' && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-blue-600/90 hover:bg-blue-600 text-white flex items-center justify-center shadow-2xl transition-all duration-200 transform hover:scale-105 active:scale-95 z-20"
          title="Click to play video"
        >
          <Play className="w-7 h-7 fill-current ml-1" />
        </button>
      )}

      {/* Quick Action Overlay (Mute / Fullscreen / Pause) */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleMute();
          }}
          className="p-1.5 rounded bg-black/75 hover:bg-black text-white border border-slate-700 text-xs shadow-md"
          title={isMuted ? 'Unmute stream audio' : 'Mute stream audio'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            requestFullscreen();
          }}
          className="p-1.5 rounded bg-black/75 hover:bg-black text-white border border-slate-700 text-xs shadow-md"
          title="Full Screen View"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Error state retry overlay */}
      {videoState === 'error' && (
        <div className="absolute inset-0 bg-slate-950/95 flex flex-col items-center justify-center p-6 text-center z-30">
          <AlertCircle className="w-8 h-8 text-rose-500 mb-2" />
          <div className="text-sm font-semibold text-white">Stream Error</div>
          <div className="text-xs text-slate-400 mt-1 max-w-sm">{errorMessage}</div>
          <button
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.load();
                videoRef.current.play().catch(() => setVideoState('paused'));
              }
            }}
            className="mt-3 px-3 py-1.5 text-xs font-semibold rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Retry Video Stream
          </button>
        </div>
      )}
    </div>
  );
};

export const CctvFeedViewer: React.FC<CctvFeedViewerProps> = ({
  initialCameraId = 'cam-01',
  onCameraChange,
  showControls = true,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [activeCamId, setActiveCamId] = useState<string>(initialCameraId);
  const [viewMode, setViewMode] = useState<'single' | 'split'>('single');

  // Video source mappings for the 2 user-tagged videos
  const videoConfigs: Record<string, { primary: string; fallback: string; label: string; subLabel: string }> = {
    'cam-01': {
      primary: camera01Asset || '/videos/camera-01.mp4',
      fallback: '/videos/camera-01.mp4',
      label: 'CAM 01 · Pharmacy Mart (WhatsApp Video 1)',
      subLabel: 'Checkout Counter & Central Floor Island (1:51)',
    },
    'cam-02': {
      primary: camera02Asset || '/videos/camera-02.mp4',
      fallback: '/videos/camera-02.mp4',
      label: 'CAM 02 · ATM Concourse (WhatsApp Video 2)',
      subLabel: 'ATM Kiosk & Concourse Snack Aisle (1:00)',
    },
  };

  const activeCam = CAMERA_FEEDS.find((c) => c.id === activeCamId) || CAMERA_FEEDS[0];

  const handleSelectCam = (camId: string) => {
    setViewMode('single');
    setActiveCamId(camId);
    const cam = CAMERA_FEEDS.find((c) => c.id === camId);
    if (cam && onCameraChange) onCameraChange(cam);
  };

  return (
    <div
      className={`w-full flex flex-col rounded-xl overflow-hidden border transition-colors shadow-sm ${
        isDark ? 'bg-[#0F172A] border-slate-800' : 'bg-white border-slate-200'
      }`}
    >
      {/* CCTV Top Status Header */}
      <div
        className={`flex flex-wrap items-center justify-between px-4 py-2.5 border-b text-xs font-mono transition-colors ${
          isDark
            ? 'bg-slate-900/90 border-slate-800 text-slate-300'
            : 'bg-slate-50 border-slate-200 text-slate-700'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
            </span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              LIVE VIDEO ANALYSIS FEED
            </span>
          </div>
          <span className="text-slate-400">|</span>
          <span className="font-semibold text-slate-900 dark:text-white">
            {viewMode === 'split' ? 'Split View (Both Videos Playing)' : videoConfigs[activeCam.id]?.label}
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="text-slate-500 font-mono">
            {viewMode === 'split' ? '2 Active Streams (Video 1 & Video 2)' : videoConfigs[activeCam.id]?.subLabel}
          </span>
        </div>
      </div>

      {/* Main Video Viewport (Single Camera or Dual Split View) */}
      {viewMode === 'single' ? (
        <SingleVideoPlayer
          camera={activeCam}
          primarySrc={videoConfigs[activeCam.id]?.primary || '/videos/camera-01.mp4'}
          fallbackSrc={videoConfigs[activeCam.id]?.fallback || '/videos/camera-01.mp4'}
          isDark={isDark}
          label={videoConfigs[activeCam.id]?.label || activeCam.name}
          subLabel={videoConfigs[activeCam.id]?.subLabel}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 bg-black p-1">
          <div className="flex flex-col">
            <SingleVideoPlayer
              camera={CAMERA_FEEDS[0]}
              primarySrc={videoConfigs['cam-01'].primary}
              fallbackSrc={videoConfigs['cam-01'].fallback}
              isDark={isDark}
              label={videoConfigs['cam-01'].label}
              subLabel={videoConfigs['cam-01'].subLabel}
            />
          </div>
          <div className="flex flex-col">
            <SingleVideoPlayer
              camera={CAMERA_FEEDS[1]}
              primarySrc={videoConfigs['cam-02'].primary}
              fallbackSrc={videoConfigs['cam-02'].fallback}
              isDark={isDark}
              label={videoConfigs['cam-02'].label}
              subLabel={videoConfigs['cam-02'].subLabel}
            />
          </div>
        </div>
      )}

      {/* Navigation Controls Bar */}
      {showControls && (
        <div
          className={`p-3 border-t flex flex-wrap items-center justify-between gap-3 text-xs transition-colors ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}
        >
          {/* Camera Selection Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => handleSelectCam('cam-01')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 border ${
                viewMode === 'single' && activeCamId === 'cam-01'
                  ? isDark
                    ? 'bg-blue-600/20 text-blue-400 border-blue-500/50 font-semibold ring-1 ring-blue-500/50'
                    : 'bg-blue-50 text-blue-700 border-blue-400 font-semibold ring-1 ring-blue-300'
                  : isDark
                  ? 'text-slate-400 hover:text-white border-transparent hover:bg-slate-800'
                  : 'text-slate-600 hover:text-slate-900 border-transparent hover:bg-slate-200/60'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>Camera 01: WhatsApp Video 1 (Pharmacy Mart)</span>
            </button>

            <button
              onClick={() => handleSelectCam('cam-02')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 border ${
                viewMode === 'single' && activeCamId === 'cam-02'
                  ? isDark
                    ? 'bg-blue-600/20 text-blue-400 border-blue-500/50 font-semibold ring-1 ring-blue-500/50'
                    : 'bg-blue-50 text-blue-700 border-blue-400 font-semibold ring-1 ring-blue-300'
                  : isDark
                  ? 'text-slate-400 hover:text-white border-transparent hover:bg-slate-800'
                  : 'text-slate-600 hover:text-slate-900 border-transparent hover:bg-slate-200/60'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>Camera 02: WhatsApp Video 2 (ATM Terminal)</span>
            </button>
          </div>

          {/* Split View Toggle for Both Videos */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode(viewMode === 'split' ? 'single' : 'split')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 border ${
                viewMode === 'split'
                  ? 'bg-blue-600 text-white border-blue-600 font-semibold shadow-sm'
                  : isDark
                  ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100 shadow-xs'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>{viewMode === 'split' ? 'Exit Dual View' : 'Dual View (Play Both Videos 1 & 2)'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CctvFeedViewer;
