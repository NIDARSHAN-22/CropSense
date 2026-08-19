import React from 'react';
import { AlertCircle, WifiOff, CameraOff, RefreshCw, Home, ShieldAlert } from 'lucide-react';
import { SanitizedError } from '../../services/errorHandler';

interface ErrorViewProps {
  error: SanitizedError;
  onRetry?: () => void;
  onGoHome?: () => void;
}

export const ErrorView: React.FC<ErrorViewProps> = ({ error, onRetry, onGoHome }) => {
  const getIcon = () => {
    switch (error.category) {
      case 'network':
        return <WifiOff className="w-10 h-10 text-amber-500" />;
      case 'camera':
        return <CameraOff className="w-10 h-10 text-red-500" />;
      case 'system':
        return <ShieldAlert className="w-10 h-10 text-emerald-600" />;
      default:
        return <AlertCircle className="w-10 h-10 text-amber-500" />;
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-xl max-w-lg mx-auto text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
      <div className="w-20 h-20 rounded-2xl bg-stone-100 flex items-center justify-center mx-auto shadow-inner">
        {getIcon()}
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-black text-stone-900 font-sans tracking-tight">
          {error.title}
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
          {error.message}
        </p>
      </div>

      <div className="p-4 bg-agri-50/70 border border-agri-200 rounded-2xl text-xs text-agri-950 text-left">
        <p className="font-bold text-agri-800 mb-1">Recommended Action:</p>
        <p>{error.actionHint}</p>
      </div>

      <div className="flex items-center justify-center gap-3 pt-2">
        {onRetry && (
          <button
            onClick={onRetry}
            className="flex-1 py-3 px-4 bg-agri-600 hover:bg-agri-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md shadow-agri-600/30 transition-colors active:scale-[0.98]"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        )}

        {onGoHome && (
          <button
            onClick={onGoHome}
            className="flex-1 py-3 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-xl text-xs flex items-center justify-center gap-2 border border-stone-200 transition-colors active:scale-[0.98]"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </button>
        )}
      </div>
    </div>
  );
};
