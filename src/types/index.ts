export type PathogenType = 'fungal' | 'bacterial' | 'viral' | 'pest' | 'deficiency' | 'healthy';
export type SeverityLevel = 'mild' | 'moderate' | 'severe' | 'none';
export type ScanStatus = 'active' | 'treated' | 'resolved';

export interface DiseaseInfo {
  id: string;
  crop: string;
  cropKey: string;
  disease: string;
  diseaseKey: string;
  scientificName?: string;
  pathogenType: PathogenType;
  defaultSeverity: SeverityLevel;
  isHealthy: boolean;
  symptoms: string[];
  organicRemedies: string[];
  chemicalRemedies: string[];
  preventionTips: string[];
  sampleImages?: string[];
}

export interface DiagnosisResult {
  id: string;
  crop: string;
  cropKey: string;
  disease: string;
  diseaseKey: string;
  scientificName?: string;
  pathogenType: PathogenType;
  confidence: number;
  severity: SeverityLevel;
  isHealthy: boolean;
  symptoms: string[];
  organicRemedies: string[];
  chemicalRemedies: string[];
  preventionTips: string[];
  lowConfidence: boolean;
  provider: 'huggingface' | 'kindwise' | 'plantvillage-local';
  timestamp: string;
  imageUrl?: string;
}

export interface ScanRecord {
  id: string;
  userId: string;
  imageUrl: string;
  cropGuess: string;
  diagnosis: string;
  confidence: number;
  severity: SeverityLevel;
  treatmentText: string;
  providerUsed: string;
  status: ScanStatus;
  createdAt: string;
  diseaseData?: DiagnosisResult;
}

export interface FeedbackRecord {
  id?: string;
  scanId: string;
  userId?: string;
  wasHelpful: boolean;
  comment?: string;
  createdAt: string;
}

export interface ConsentLog {
  id?: string;
  userId?: string;
  consentType: 'terms' | 'privacy' | 'cookies';
  version: string;
  languageShown: string;
  givenAt: string;
  ipHash?: string;
}

export interface CookiePreferences {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  phone?: string;
  email?: string;
  displayName: string;
  preferredLanguage: string;
  region?: string;
  isGuest?: boolean;
  createdAt: string;
}

export interface WeatherRisk {
  location: string;
  temperature: number;
  humidity: number;
  description: string;
  riskLevel: 'low' | 'moderate' | 'high';
  riskMessage: string;
  advisories: string[];
}
