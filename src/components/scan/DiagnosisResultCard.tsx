import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  DiagnosisResult, 
  SeverityLevel 
} from '../../types';
import { 
  CheckCircle, 
  AlertTriangle, 
  Leaf, 
  FlaskConical, 
  ShieldCheck, 
  Volume2, 
  VolumeX, 
  Share2, 
  Download, 
  ThumbsUp, 
  ThumbsDown, 
  RotateCcw,
  Sparkles,
  Printer
} from 'lucide-react';
import { voiceService } from '../../services/voiceService';
import { dbService } from '../../services/supabase';
import { securityService } from '../../services/securityService';
import { getLocalizedDiseaseContent } from '../../data/localizedDiseases';

interface DiagnosisResultCardProps {
  result: DiagnosisResult;
  imageUrl?: string;
  onScanAnother: () => void;
  onViewHistory: () => void;
  userId?: string;
}

export const DiagnosisResultCard: React.FC<DiagnosisResultCardProps> = ({
  result,
  imageUrl,
  onScanAnother,
  onViewHistory,
  userId,
}) => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState<'organic' | 'chemical' | 'prevention'>('organic');
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Feedback State
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [helpfulChoice, setHelpfulChoice] = useState<boolean | null>(null);
  const [feedbackComment, setFeedbackComment] = useState('');
  const [showCommentBox, setShowCommentBox] = useState(false);

  // Dynamically resolve localized content based on current active language
  const diseaseFullKey = `${result.cropKey}___${result.diseaseKey}`;
  const localized = getLocalizedDiseaseContent(diseaseFullKey, i18n.language);

  const displayCrop = localized?.cropName || result.crop;
  const displayDisease = localized?.diseaseName || result.disease;
  const displaySymptoms = localized?.symptoms || result.symptoms || [];
  const displayOrganic = localized?.organicRemedies || result.organicRemedies || [];
  const displayChemical = localized?.chemicalRemedies || result.chemicalRemedies || [];
  const displayPrevention = localized?.preventionTips || result.preventionTips || [];

  const getSeverityBadge = (severity: SeverityLevel) => {
    switch (severity) {
      case 'severe':
        return { text: t('result.severe'), bg: 'bg-red-100 dark:bg-red-950 text-red-900 dark:text-red-200 border-red-300' };
      case 'moderate':
        return { text: t('result.moderate'), bg: 'bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 border-amber-300' };
      case 'mild':
        return { text: t('result.mild'), bg: 'bg-yellow-100 dark:bg-yellow-950 text-yellow-900 dark:text-yellow-200 border-yellow-300' };
      default:
        return { text: 'Healthy', bg: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 border-emerald-300' };
    }
  };

  const severityBadge = getSeverityBadge(result.severity);

  // Audio Readout Handler in Native Selected Language
  const handleToggleAudio = () => {
    if (isSpeaking) {
      voiceService.stop();
      setIsSpeaking(false);
    } else {
      // Build speech text fully localized in active language
      const summarySpeech = `${displayCrop}. ${displayDisease}. ${
        result.isHealthy
          ? t('result.healthyDesc')
          : `${displayOrganic[0] || ''}. ${displayChemical[0] || ''}`
      }`;

      voiceService.speak(
        summarySpeech,
        i18n.language,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false)
      );
    }
  };

  // WhatsApp Share Handler
  const handleWhatsAppShare = () => {
    const text = `🌿 *CropDoctor Diagnosis Report*\n*${t('result.crop')}:* ${displayCrop}\n*${t('result.disease')}:* ${displayDisease}\n*${t('result.confidence')}:* ${Math.round(
      result.confidence * 100
    )}%\n*${t('result.severity')}:* ${severityBadge.text}\n\n*${t('result.tabOrganic')}:* ${displayOrganic[0] || displayChemical[0] || 'Regular field scouting'}\n\nGenerated via CropDoctor`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  // Feedback Submission Handler
  const handleFeedbackSubmit = async (wasHelpful: boolean) => {
    setHelpfulChoice(wasHelpful);
    setShowCommentBox(true);
    setFeedbackSent(true);

    await dbService.recordFeedback({
      scanId: result.id,
      userId,
      wasHelpful,
      comment: securityService.sanitizeInput(feedbackComment),
      createdAt: new Date().toISOString(),
    });
  };

  const handleDetailedCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (helpfulChoice !== null) {
      await dbService.recordFeedback({
        scanId: result.id,
        userId,
        wasHelpful: helpfulChoice,
        comment: securityService.sanitizeInput(feedbackComment),
        createdAt: new Date().toISOString(),
      });
      setShowCommentBox(false);
    }
  };

  return (
    <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300 print:border-none print:shadow-none print:m-0 print:p-0">
      {/* Header Banner */}
      <div
        className={`p-6 sm:p-8 text-white relative ${
          result.isHealthy
            ? 'bg-gradient-to-r from-emerald-800 to-agri-900'
            : result.severity === 'severe'
            ? 'bg-gradient-to-r from-red-900 via-stone-900 to-agri-950'
            : 'bg-gradient-to-r from-agri-900 via-agri-800 to-stone-900'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-300">
                {displayCrop}
              </span>
              <span className="text-[10px] bg-white/15 px-2.5 py-0.5 rounded-full font-bold uppercase backdrop-blur-sm">
                {result.pathogenType}
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight font-sans">
              {displayDisease}
            </h2>
            {result.scientificName && (
              <p className="text-xs italic text-stone-300 mt-1">
                Pathogen: {result.scientificName}
              </p>
            )}
          </div>

          {/* Severity Badge */}
          <div className="shrink-0 self-start sm:self-center">
            <span
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-extrabold border shadow-sm ${severityBadge.bg}`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              {severityBadge.text}
            </span>
          </div>
        </div>

        {/* Confidence Meter Bar & Audio Assistant */}
        <div className="mt-6 pt-5 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
              <span className="text-stone-300">{t('result.confidence')}</span>
              <span className="font-bold text-white text-sm">
                {Math.round(result.confidence * 100)}% Match
              </span>
            </div>
            <div className="w-full bg-black/40 rounded-full h-2.5 overflow-hidden p-0.5">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  result.confidence > 0.8
                    ? 'bg-emerald-400 shadow-[0_0_10px_#34d399]'
                    : result.confidence > 0.6
                    ? 'bg-amber-400 shadow-[0_0_10px_#fbbf24]'
                    : 'bg-red-400'
                }`}
                style={{ width: `${Math.round(result.confidence * 100)}%` }}
              />
            </div>
          </div>

          {/* Audio TTS Button */}
          <button
            onClick={handleToggleAudio}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition-all shadow-md active:scale-95 ${
              isSpeaking
                ? 'bg-red-500 text-white animate-pulse'
                : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-md'
            }`}
          >
            {isSpeaking ? (
              <>
                <VolumeX className="w-4 h-4" />
                <span>{t('result.stopAudio')}</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4" />
                <span>{t('result.listenAudio')}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-6 sm:p-8 space-y-6">
        {/* Low Confidence Warning Alert */}
        {result.lowConfidence && (
          <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 rounded-2xl flex items-start gap-3 text-xs text-amber-900 dark:text-amber-200">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold mb-0.5">Notice: Low Confidence Classification</p>
              <p>{t('result.lowConfidenceAlert')}</p>
            </div>
          </div>
        )}

        {/* Symptoms Section */}
        {displaySymptoms.length > 0 && (
          <div className="bg-stone-50 dark:bg-stone-800/60 rounded-2xl p-5 border border-stone-200 dark:border-stone-700">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2.5">
              {t('result.symptomsTitle')}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {displaySymptoms.map((symptom, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-stone-700 dark:text-stone-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-agri-600 mt-1.5 shrink-0" />
                  <span>{symptom}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actionable Remedies Tabs */}
        {!result.isHealthy ? (
          <div>
            {/* Tab Headers */}
            <div className="flex border-b border-stone-200 dark:border-stone-800 print:hidden">
              <button
                onClick={() => setActiveTab('organic')}
                className={`flex-1 py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                  activeTab === 'organic'
                    ? 'border-agri-600 text-agri-800 dark:text-agri-300 bg-agri-50/50 dark:bg-agri-950/30'
                    : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
                }`}
              >
                <Leaf className="w-4 h-4 text-emerald-600" />
                <span>{t('result.tabOrganic')}</span>
              </button>

              <button
                onClick={() => setActiveTab('chemical')}
                className={`flex-1 py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                  activeTab === 'chemical'
                    ? 'border-agri-600 text-agri-800 dark:text-agri-300 bg-agri-50/50 dark:bg-agri-950/30'
                    : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
                }`}
              >
                <FlaskConical className="w-4 h-4 text-amber-600" />
                <span>{t('result.tabChemical')}</span>
              </button>

              <button
                onClick={() => setActiveTab('prevention')}
                className={`flex-1 py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                  activeTab === 'prevention'
                    ? 'border-agri-600 text-agri-800 dark:text-agri-300 bg-agri-50/50 dark:bg-agri-950/30'
                    : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>{t('result.tabPrevention')}</span>
              </button>
            </div>

            {/* Tab Contents */}
            <div className="pt-4 space-y-3">
              {(activeTab === 'organic' || typeof window !== 'undefined' && window.matchMedia('print').matches) && (
                <div className="space-y-2.5">
                  <div className="font-bold text-xs text-emerald-800 dark:text-emerald-300 hidden print:block">
                    {t('result.tabOrganic')}
                  </div>
                  {displayOrganic.map((remedy, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-950 dark:text-emerald-200 flex items-start gap-3"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{remedy}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'chemical' && (
                <div className="space-y-2.5">
                  {displayChemical.map((chem, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-xs text-amber-950 dark:text-amber-200 flex items-start gap-3"
                    >
                      <FlaskConical className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{chem}</span>
                    </div>
                  ))}
                  <p className="text-[11px] text-stone-400 italic pt-1">
                    * Always adhere to recommended dosage, wear protective gear, and observe safety pre-harvest withholding periods.
                  </p>
                </div>
              )}

              {activeTab === 'prevention' && (
                <div className="space-y-2.5">
                  {displayPrevention.map((tip, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 text-xs text-blue-950 dark:text-blue-200 flex items-start gap-3"
                    >
                      <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="p-6 bg-emerald-50 dark:bg-emerald-950/40 rounded-3xl border border-emerald-200 dark:border-emerald-900 text-center space-y-2">
            <Sparkles className="w-10 h-10 text-emerald-600 mx-auto" />
            <h4 className="font-extrabold text-base text-emerald-950 dark:text-emerald-200">{t('result.healthyTitle')}</h4>
            <p className="text-xs text-emerald-800 dark:text-emerald-300 max-w-md mx-auto">{t('result.healthyDesc')}</p>
          </div>
        )}

        {/* Share & Download Actions */}
        <div className="grid grid-cols-2 gap-3 pt-2 print:hidden">
          <button
            onClick={handleWhatsAppShare}
            className="py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-600/30 transition-all active:scale-[0.98]"
          >
            <Share2 className="w-4 h-4" />
            <span>{t('result.shareWhatsApp')}</span>
          </button>

          <button
            onClick={() => window.print()}
            className="py-3.5 px-4 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 transition-all border border-stone-200 dark:border-stone-700 active:scale-[0.98]"
          >
            <Printer className="w-4 h-4" />
            <span>{t('result.downloadPdf')}</span>
          </button>
        </div>

        {/* Feedback Section */}
        <div className="pt-4 border-t border-stone-200 dark:border-stone-800 print:hidden">
          {!feedbackSent ? (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
                {t('result.feedbackTitle')}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleFeedbackSubmit(true)}
                  className="px-4 py-2 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 transition-colors active:scale-95"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{t('result.feedbackHelpful')}</span>
                </button>
                <button
                  onClick={() => handleFeedbackSubmit(false)}
                  className="px-4 py-2 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-red-50 dark:hover:bg-red-950/40 text-xs font-bold text-red-800 dark:text-red-300 flex items-center gap-1.5 transition-colors active:scale-95"
                >
                  <ThumbsDown className="w-3.5 h-3.5" />
                  <span>{t('result.feedbackNotHelpful')}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" />
                {t('result.feedbackThanks')}
              </p>

              {showCommentBox && (
                <form onSubmit={handleDetailedCommentSubmit} className="space-y-2">
                  <input
                    type="text"
                    value={feedbackComment}
                    onChange={(e) => setFeedbackComment(e.target.value)}
                    placeholder={t('result.feedbackComment')}
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-300 dark:border-stone-700 dark:bg-stone-800 outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-xl text-xs font-bold"
                  >
                    {t('result.feedbackSubmit')}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-2 flex items-center justify-between gap-3 print:hidden">
          <button
            onClick={onScanAnother}
            className="flex-1 py-3.5 rounded-2xl border-2 border-agri-600 text-agri-900 dark:text-agri-300 font-black text-xs hover:bg-agri-50 dark:hover:bg-agri-950/30 transition-all flex items-center justify-center gap-1.5 active:scale-[0.98]"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{t('result.scanAnother')}</span>
          </button>
          <button
            onClick={onViewHistory}
            className="flex-1 py-3.5 rounded-2xl bg-agri-800 hover:bg-agri-900 text-white font-black text-xs transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98]"
          >
            <span>{t('result.viewHistory')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
