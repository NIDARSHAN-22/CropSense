import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Camera, 
  Upload, 
  Sparkles, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Zap, 
  Filter,
  Image as ImageIcon,
  ScanLine
} from 'lucide-react';
import { CROP_LIST } from '../data/plantVillageDiseases';
import { compressImage, CompressionResult } from '../services/compressionService';
import { diagnosisService } from '../services/diagnosisService';
import { dbService } from '../services/supabase';
import { errorHandler } from '../services/errorHandler';
import { CameraViewfinder } from '../components/scan/CameraViewfinder';
import { DiagnosisProgress } from '../components/scan/DiagnosisProgress';
import { DiagnosisResultCard } from '../components/scan/DiagnosisResultCard';
import { DiagnosisResult, ScanRecord, UserProfile } from '../types';

interface ScanPageProps {
  currentUser: UserProfile | null;
  onNavigate: (page: string) => void;
  preselectedSample?: any;
}

export const ScanPage: React.FC<ScanPageProps> = ({
  currentUser,
  onNavigate,
  preselectedSample,
}) => {
  const { t, i18n } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Scan state
  const [selectedCrop, setSelectedCrop] = useState<string>(
    preselectedSample?.cropKey || 'all'
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(
    preselectedSample?.url || ''
  );
  const [compressionInfo, setCompressionInfo] = useState<CompressionResult | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<{ title: string; message: string; hint: string } | null>(null);

  // Handle file selection from gallery/disk
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg({
        title: 'Invalid File',
        message: t('scan.errorInvalidFormat'),
        hint: 'Please choose a standard JPG, PNG, or WEBP image of a plant leaf.',
      });
      return;
    }

    setErrorMsg(null);
    try {
      const compResult = await compressImage(file);
      setCompressionInfo(compResult);
      setSelectedFile(compResult.file);
      setPreviewUrl(compResult.dataUrl);
      setDiagnosisResult(null);
    } catch (err: any) {
      const sanitized = errorHandler.sanitize(err);
      setErrorMsg({
        title: sanitized.title,
        message: sanitized.message,
        hint: sanitized.actionHint,
      });
    }
  };

  // Handle camera capture
  const handleCameraCapture = async (file: File) => {
    setErrorMsg(null);
    try {
      const compResult = await compressImage(file);
      setCompressionInfo(compResult);
      setSelectedFile(compResult.file);
      setPreviewUrl(compResult.dataUrl);
      setDiagnosisResult(null);
    } catch (err) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Trigger Diagnosis Pipeline
  const handleRunDiagnosis = async () => {
    if (!selectedFile && !previewUrl) {
      setErrorMsg({
        title: 'No Image Selected',
        message: t('scan.errorNoFile'),
        hint: 'Please take a photo or select an existing image from your gallery.',
      });
      return;
    }

    setIsDiagnosing(true);
    setErrorMsg(null);

    try {
      let fileToDiagnose = selectedFile;
      if (!fileToDiagnose && previewUrl) {
        const res = await fetch(previewUrl);
        const blob = await res.blob();
        fileToDiagnose = new File([blob], `${selectedCrop}_sample.jpg`, { type: 'image/jpeg' });
      }

      if (!fileToDiagnose) {
        throw new Error('Image file unavailable');
      }

      const result = await diagnosisService.diagnoseCropImage(fileToDiagnose, {
        cropHint: selectedCrop,
        language: i18n.language,
        expectedDiseaseId: preselectedSample?.expectedId,
      });

      result.imageUrl = previewUrl;
      setDiagnosisResult(result);

      // Record in local / Supabase scan history
      const scanRecord: ScanRecord = {
        id: result.id,
        userId: currentUser?.id || 'guest-farmer',
        imageUrl: previewUrl,
        cropGuess: result.crop,
        diagnosis: result.disease,
        confidence: result.confidence,
        severity: result.severity,
        treatmentText: result.organicRemedies[0] || result.chemicalRemedies[0] || '',
        providerUsed: result.provider,
        status: result.isHealthy ? 'resolved' : 'active',
        createdAt: new Date().toISOString(),
        diseaseData: result,
      };

      await dbService.insertScan(scanRecord);
    } catch (err: any) {
      const sanitized = errorHandler.sanitize(err);
      setErrorMsg({
        title: sanitized.title,
        message: sanitized.message,
        hint: sanitized.actionHint,
      });
    } finally {
      setIsDiagnosing(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    setCompressionInfo(null);
    setDiagnosisResult(null);
    setErrorMsg(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Live In-App Viewfinder Modal */}
      <CameraViewfinder
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={handleCameraCapture}
      />

      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-agri-100 text-agri-900 text-xs font-bold shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-agri-600" />
          <span>PlantVillage Neural Classifier</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-stone-900 font-sans tracking-tight">
          {t('scan.title')}
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 max-w-xl mx-auto">
          {t('scan.subtitle')}
        </p>
      </div>

      {/* Crop Hint Selector */}
      {!diagnosisResult && !isDiagnosing && (
        <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-sm max-w-2xl mx-auto space-y-3">
          <label className="flex items-center gap-2 text-xs font-bold text-stone-700">
            <Filter className="w-4 h-4 text-agri-600" />
            <span>{t('scan.selectCropHint')}</span>
          </label>
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl border border-stone-300 focus:border-agri-600 focus:ring-2 focus:ring-agri-100 text-xs sm:text-sm font-semibold text-stone-800 outline-none bg-stone-50 transition-colors"
          >
            {CROP_LIST.map((crop) => (
              <option key={crop.key} value={crop.key}>
                {crop.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Animated Diagnosis Progress */}
      {isDiagnosing && <DiagnosisProgress />}

      {/* Diagnosis Result Card */}
      {diagnosisResult && !isDiagnosing && (
        <DiagnosisResultCard
          result={diagnosisResult}
          imageUrl={previewUrl}
          onScanAnother={handleReset}
          onViewHistory={() => onNavigate('history')}
          userId={currentUser?.id}
        />
      )}

      {/* Scanner Upload & Camera Capture Zone */}
      {!diagnosisResult && !isDiagnosing && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xl max-w-2xl mx-auto space-y-6">
          {errorMsg && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-800 space-y-1">
              <div className="flex items-center gap-2 font-bold text-red-900">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{errorMsg.title}</span>
              </div>
              <p>{errorMsg.message}</p>
              <p className="text-[11px] text-red-700 font-medium pt-1 border-t border-red-200/60">
                Hint: {errorMsg.hint}
              </p>
            </div>
          )}

          {!previewUrl ? (
            <div className="space-y-6">
              {/* Action Buttons: Camera & Gallery */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Live Camera Button */}
                <button
                  onClick={() => setIsCameraOpen(true)}
                  className="p-6 rounded-3xl border-2 border-agri-600 bg-agri-50/50 hover:bg-agri-100/70 text-agri-950 flex flex-col items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] group shadow-sm"
                >
                  <div className="w-14 h-14 rounded-2xl bg-agri-600 text-white flex items-center justify-center shadow-md shadow-agri-600/30 group-hover:scale-110 transition-transform">
                    <Camera className="w-7 h-7" />
                  </div>
                  <div className="text-center">
                    <span className="font-extrabold text-base block">{t('scan.takePhoto')}</span>
                    <span className="text-[11px] text-stone-500">In-App Live Viewfinder</span>
                  </div>
                </button>

                {/* 2. Gallery Upload Button */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-6 rounded-3xl border-2 border-stone-300 hover:border-agri-500 bg-stone-50 hover:bg-white text-stone-800 flex flex-col items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] group shadow-sm"
                >
                  <div className="w-14 h-14 rounded-2xl bg-stone-900 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <Upload className="w-7 h-7" />
                  </div>
                  <div className="text-center">
                    <span className="font-extrabold text-base block">{t('scan.uploadGallery')}</span>
                    <span className="text-[11px] text-stone-500">JPG, PNG, WEBP</span>
                  </div>
                </button>
              </div>

              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Drag & Drop Area */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-stone-300 hover:border-agri-500 rounded-3xl p-8 text-center cursor-pointer bg-stone-50/50 hover:bg-stone-50 transition-colors space-y-2"
              >
                <ImageIcon className="w-8 h-8 text-stone-400 mx-auto" />
                <p className="text-xs font-bold text-stone-700">{t('scan.dragDrop')}</p>
                <p className="text-[11px] text-stone-400">{t('scan.supportFormats')}</p>
              </div>
            </div>
          ) : (
            /* Image Preview with Laser Sweep Overlay */
            <div className="space-y-6">
              <div className="relative rounded-3xl overflow-hidden border border-stone-300 max-h-96 bg-stone-950 flex items-center justify-center group shadow-inner">
                <img
                  src={previewUrl}
                  alt="Crop Leaf Preview"
                  className="max-h-96 w-full object-contain"
                />

                {/* Laser Scanning Animation Bar */}
                <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10b981] animate-laser pointer-events-none" />

                <button
                  onClick={handleReset}
                  className="absolute top-4 right-4 px-3.5 py-2 rounded-2xl bg-black/75 hover:bg-black text-white text-xs font-bold backdrop-blur-md flex items-center gap-1.5 transition-colors shadow-md"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{t('scan.retake')}</span>
                </button>
              </div>

              {/* Compression Metric Badge */}
              {compressionInfo && (
                <div className="p-3.5 bg-agri-50/80 rounded-2xl border border-agri-200 text-xs text-agri-950 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-agri-600" />
                    <span>
                      {t('scan.compressedSaved', {
                        original: (compressionInfo.originalSizeBytes / (1024 * 1024)).toFixed(1),
                        compressed: Math.round(compressionInfo.compressedSizeBytes / 1024),
                      })}
                    </span>
                  </div>
                  <span className="font-bold text-agri-700">
                    -{compressionInfo.reductionPercentage}% Size Optimized
                  </span>
                </div>
              )}

              {/* Start Diagnosis Button */}
              <button
                onClick={handleRunDiagnosis}
                className="w-full py-4 bg-agri-600 hover:bg-agri-700 text-white font-black rounded-2xl text-base shadow-xl shadow-agri-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.98]"
              >
                <Zap className="w-5 h-5 text-sun" />
                <span>{t('scan.diagnoseBtn')}</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
