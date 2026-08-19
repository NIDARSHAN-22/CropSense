import React, { useRef, useState, useEffect } from 'react';
import { Camera, X, RefreshCw, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface CameraViewfinderProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (file: File) => void;
}

export const CameraViewfinder: React.FC<CameraViewfinderProps> = ({
  isOpen,
  onClose,
  onCapture,
}) => {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) {
      stopStream();
      return;
    }

    startCamera();

    return () => {
      stopStream();
    };
  }, [isOpen, facingMode]);

  const startCamera = async () => {
    stopStream();
    setError('');

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      });

      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err: any) {
      console.error('Camera access error:', err);
      setError('Camera access denied or unavailable. Please use file upload.');
    }
  };

  const stopStream = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const handleCapture = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const capturedFile = new File([blob], `crop_leaf_${Date.now()}.jpg`, {
          type: 'image/jpeg',
          lastModified: Date.now(),
        });
        stopStream();
        onCapture(capturedFile);
        onClose();
      },
      'image/jpeg',
      0.9
    );
  };

  const toggleFacingMode = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-between p-4 animate-in fade-in duration-200">
      {/* Top Controls */}
      <div className="w-full max-w-xl flex items-center justify-between z-10 text-white pt-2">
        <div className="flex items-center gap-2">
          <Camera className="w-5 h-5 text-agri-400" />
          <span className="text-sm font-semibold">{t('scan.cameraActive')}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleFacingMode}
            className="p-2.5 rounded-full bg-stone-800/80 text-white hover:bg-stone-700"
            title="Flip Camera"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              stopStream();
              onClose();
            }}
            className="p-2.5 rounded-full bg-stone-800/80 text-white hover:bg-stone-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Video Viewfinder with Reticle Overlay */}
      <div className="relative w-full max-w-xl flex-1 flex items-center justify-center overflow-hidden rounded-2xl bg-stone-950 my-3">
        {error ? (
          <div className="p-6 text-center text-stone-300 space-y-3">
            <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
            <p className="text-sm">{error}</p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-stone-800 rounded-xl text-xs font-semibold text-white"
            >
              Use Gallery Upload
            </button>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            {/* Plant Leaf Aiming Box */}
            <div className="absolute inset-8 sm:inset-14 border-2 border-dashed border-emerald-400/80 rounded-2xl pointer-events-none flex flex-col items-center justify-between p-4">
              <div className="text-[11px] font-bold text-white bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm">
                Center leaf lesion inside frame
              </div>
              <div className="w-8 h-8 border-b-2 border-r-2 border-emerald-400 self-end -mb-2 -mr-2" />
            </div>
          </>
        )}
      </div>

      {/* Capture Shutter Button */}
      <div className="w-full max-w-xl flex items-center justify-center pb-4">
        {!error && (
          <button
            onClick={handleCapture}
            className="w-18 h-18 rounded-full border-4 border-white p-1 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
          >
            <div className="w-full h-full rounded-full bg-agri-500 shadow-lg shadow-agri-500/50" />
          </button>
        )}
      </div>
    </div>
  );
};
