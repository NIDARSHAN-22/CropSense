import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  History, 
  Filter, 
  Calendar, 
  CheckCircle, 
  AlertCircle, 
  ArrowRight,
  Download,
  Trash2,
  Sprout,
  Search,
  Lock
} from 'lucide-react';
import { ScanRecord, UserProfile } from '../types';
import { dbService, updateLocalScanStatus } from '../services/supabase';
import { DiagnosisResultCard } from '../components/scan/DiagnosisResultCard';
import { securityService } from '../services/securityService';

interface HistoryPageProps {
  currentUser: UserProfile | null;
  onNavigate: (page: string) => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({ currentUser, onNavigate }) => {
  const { t } = useTranslation();
  const [scans, setScans] = useState<ScanRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCropFilter, setSelectedCropFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeScanDetail, setActiveScanDetail] = useState<ScanRecord | null>(null);

  useEffect(() => {
    loadScans();
  }, [currentUser]);

  const loadScans = async () => {
    setLoading(true);
    // Strict isolation: only fetch scans belonging to current user
    const userId = currentUser?.id || 'guest-farmer';
    const data = await dbService.fetchUserScans(userId);
    setScans(data);
    setLoading(false);
  };

  const handleStatusChange = (scanId: string, newStatus: 'active' | 'treated' | 'resolved') => {
    updateLocalScanStatus(scanId, newStatus);
    setScans((prev) =>
      prev.map((s) => (s.id === scanId ? { ...s, status: newStatus } : s))
    );
  };

  const filteredScans = scans.filter((s) => {
    const matchesCrop = selectedCropFilter === 'all' || s.cropGuess.toLowerCase() === selectedCropFilter.toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesQuery = !query || s.cropGuess.toLowerCase().includes(query) || s.diagnosis.toLowerCase().includes(query);
    return matchesCrop && matchesQuery;
  });

  const uniqueCrops = Array.from(new Set(scans.map((s) => s.cropGuess)));

  const handleExportCSV = () => {
    const headers = ['Scan ID', 'Crop', 'Diagnosis', 'Confidence', 'Severity', 'Status', 'Date'];
    const rows = filteredScans.map((s) => [
      s.id,
      s.cropGuess,
      s.diagnosis,
      `${Math.round(s.confidence * 100)}%`,
      s.severity,
      s.status,
      new Date(s.createdAt).toLocaleDateString(),
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.map((c) => `"${c}"`).join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cropdoctor_scans_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-agri-700 text-xs font-bold uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>Isolated Farm Diagnostic History</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 font-sans mt-1">
            {t('history.title')}
          </h1>
          <p className="text-xs text-stone-500">{t('history.subtitle')}</p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by crop or disease..."
              className="pl-9 pr-3 py-2 bg-white border border-stone-200 rounded-xl text-xs font-semibold text-stone-800 outline-none focus:border-agri-600"
            />
          </div>

          {/* Filter Dropdown */}
          {uniqueCrops.length > 0 && (
            <select
              value={selectedCropFilter}
              onChange={(e) => setSelectedCropFilter(e.target.value)}
              className="px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs font-semibold text-stone-800 outline-none focus:border-agri-600"
            >
              <option value="all">{t('history.filterAll')}</option>
              {uniqueCrops.map((crop) => (
                <option key={crop} value={crop}>
                  {crop}
                </option>
              ))}
            </select>
          )}

          {filteredScans.length > 0 && (
            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
              title="Export as CSV spreadsheet"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          )}
        </div>
      </div>

      {/* Detail Inspection Modal */}
      {activeScanDetail && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm p-4 overflow-y-auto flex items-center justify-center animate-in fade-in duration-200">
          <div className="max-w-3xl w-full my-8 relative">
            <DiagnosisResultCard
              result={
                activeScanDetail.diseaseData || {
                  id: activeScanDetail.id,
                  crop: activeScanDetail.cropGuess,
                  cropKey: 'general',
                  disease: activeScanDetail.diagnosis,
                  diseaseKey: 'general',
                  pathogenType: 'fungal',
                  confidence: activeScanDetail.confidence,
                  severity: activeScanDetail.severity,
                  isHealthy: activeScanDetail.severity === 'none',
                  symptoms: ['Observed lesion patterns'],
                  organicRemedies: [activeScanDetail.treatmentText || 'Apply neem oil'],
                  chemicalRemedies: ['Consult local KVK agronomist'],
                  preventionTips: ['Maintain good airflow'],
                  lowConfidence: false,
                  provider: 'plantvillage-local',
                  timestamp: activeScanDetail.createdAt,
                  imageUrl: activeScanDetail.imageUrl,
                }
              }
              imageUrl={activeScanDetail.imageUrl}
              onScanAnother={() => {
                setActiveScanDetail(null);
                onNavigate('scan');
              }}
              onViewHistory={() => setActiveScanDetail(null)}
              userId={currentUser?.id}
            />
            <button
              onClick={() => setActiveScanDetail(null)}
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-stone-900 text-white font-bold flex items-center justify-center shadow-lg hover:bg-stone-800"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Scans List Grid */}
      {loading ? (
        <div className="text-center py-16 text-stone-400 text-xs animate-pulse">
          Loading authenticated farm scan records...
        </div>
      ) : filteredScans.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 shadow-sm space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-agri-50 text-agri-600 flex items-center justify-center mx-auto">
            <Sprout className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-stone-900 text-base">No Crop Scans Found</h3>
          <p className="text-xs text-stone-500 leading-relaxed">{t('history.empty')}</p>
          <button
            onClick={() => onNavigate('scan')}
            className="px-6 py-3 bg-agri-600 hover:bg-agri-700 text-white font-bold rounded-xl text-xs shadow-md transition-colors"
          >
            Diagnose First Crop Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScans.map((scan) => (
            <div
              key={scan.id}
              className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                {/* Image Thumbnail */}
                <div className="h-48 bg-stone-950 relative overflow-hidden group">
                  <img
                    src={scan.imageUrl}
                    alt={scan.diagnosis}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-95"
                  />
                  <div className="absolute top-3 left-3 bg-black/65 backdrop-blur-md text-white px-2.5 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider">
                    {scan.cropGuess}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/65 backdrop-blur-md text-white px-2.5 py-1 rounded-xl text-[10px] flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-emerald-400" />
                    <span>{new Date(scan.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Info Content */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-black text-stone-900 text-base leading-tight truncate">
                      {scan.diagnosis}
                    </h3>
                    <span className="text-[11px] font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {Math.round(scan.confidence * 100)}%
                    </span>
                  </div>

                  <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                    {scan.treatmentText}
                  </p>
                </div>
              </div>

              {/* Status & View Button */}
              <div className="p-5 pt-0 border-t border-stone-100 mt-2 flex items-center justify-between gap-3">
                {/* Status Toggle */}
                <select
                  value={scan.status}
                  onChange={(e) =>
                    handleStatusChange(
                      scan.id,
                      e.target.value as 'active' | 'treated' | 'resolved'
                    )
                  }
                  className={`text-[11px] font-bold px-3 py-1.5 rounded-xl border outline-none cursor-pointer ${
                    scan.status === 'resolved'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : scan.status === 'treated'
                      ? 'bg-blue-50 text-blue-800 border-blue-200'
                      : 'bg-amber-50 text-amber-800 border-amber-200'
                  }`}
                >
                  <option value="active">{t('history.statusActive')}</option>
                  <option value="treated">{t('history.statusTreated')}</option>
                  <option value="resolved">{t('history.statusResolved')}</option>
                </select>

                <button
                  onClick={() => setActiveScanDetail(scan)}
                  className="px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm active:scale-95"
                >
                  <span>{t('history.openDetails')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
