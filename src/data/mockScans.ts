import { ScanRecord } from '../types';
import { PLANTVILLAGE_DISEASES } from './plantVillageDiseases';

export const MOCK_SCANS: ScanRecord[] = [
  {
    id: 'scan-demo-001',
    userId: 'demo-farmer-id',
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6910a4f8?w=500&auto=format&fit=crop&q=60',
    cropGuess: 'Tomato',
    diagnosis: 'Early Blight',
    confidence: 0.94,
    severity: 'moderate',
    treatmentText: 'Apply Mancozeb 75% WP @ 2.5g/L and prune lower infected leaves. Spray cold-pressed neem oil.',
    providerUsed: 'HuggingFace AI (MobileNet-PlantVillage)',
    status: 'treated',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    diseaseData: {
      ...PLANTVILLAGE_DISEASES['Tomato___Early_blight'],
      confidence: 0.94,
      severity: 'moderate',
      lowConfidence: false,
      provider: 'huggingface',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6910a4f8?w=500&auto=format&fit=crop&q=60'
    }
  },
  {
    id: 'scan-demo-002',
    userId: 'demo-farmer-id',
    imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&auto=format&fit=crop&q=60',
    cropGuess: 'Potato',
    diagnosis: 'Late Blight',
    confidence: 0.91,
    severity: 'severe',
    treatmentText: 'Immediate application of Cymoxanil + Mancozeb required due to high humidity conditions.',
    providerUsed: 'HuggingFace AI (MobileNet-PlantVillage)',
    status: 'active',
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    diseaseData: {
      ...PLANTVILLAGE_DISEASES['Potato___Late_blight'],
      confidence: 0.91,
      severity: 'severe',
      lowConfidence: false,
      provider: 'huggingface',
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&auto=format&fit=crop&q=60'
    }
  },
  {
    id: 'scan-demo-003',
    userId: 'demo-farmer-id',
    imageUrl: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=500&auto=format&fit=crop&q=60',
    cropGuess: 'Tomato',
    diagnosis: 'Healthy Leaf',
    confidence: 0.98,
    severity: 'none',
    treatmentText: 'Plant is healthy. Maintain balanced fertigation and regular morning scouting.',
    providerUsed: 'HuggingFace AI (MobileNet-PlantVillage)',
    status: 'resolved',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    diseaseData: {
      ...PLANTVILLAGE_DISEASES['Tomato___healthy'],
      confidence: 0.98,
      severity: 'none',
      lowConfidence: false,
      provider: 'huggingface',
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=500&auto=format&fit=crop&q=60'
    }
  }
];

export const DEMO_SAMPLE_IMAGES = [
  {
    name: 'Tomato - Early Blight',
    cropKey: 'tomato',
    expectedId: 'Tomato___Early_blight',
    url: 'https://images.unsplash.com/photo-1592417817098-8f3d6910a4f8?w=500&auto=format&fit=crop&q=60'
  },
  {
    name: 'Potato - Late Blight',
    cropKey: 'potato',
    expectedId: 'Potato___Late_blight',
    url: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&auto=format&fit=crop&q=60'
  },
  {
    name: 'Corn - Common Rust',
    cropKey: 'corn',
    expectedId: 'Corn_(maize)___Common_rust_',
    url: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=500&auto=format&fit=crop&q=60'
  },
  {
    name: 'Tomato - Healthy Leaf',
    cropKey: 'tomato',
    expectedId: 'Tomato___healthy',
    url: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=500&auto=format&fit=crop&q=60'
  }
];
