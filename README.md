# 🌿 CropDoctor — Real-Time AI Plant Health Web App

> **A production-ready, mobile-first, multilingual crop diagnosis platform for farmers.**
> Photograph any sick crop leaf to receive instant AI disease detection, severity rating, and step-by-step organic and chemical treatment advice in your native language.

---

## 🚀 Key Features

- **Multilingual Support (7 Indian Languages)**: English, Hindi (`हिंदी`), Tamil (`தமிழ்`), Telugu (`తెలుగు`), Kannada (`ಕನ್ನಡ`), Marathi (`मराठी`), and Bengali (`বাংলা`).
- **Low-Bandwidth Mobile First UI**: Large buttons, clear iconography, instant preview, and **client-side image compression (< 1MB)** for fast upload on 3G/4G networks.
- **In-App Live Camera & Viewfinder**: Native camera capture with leaf centering reticle or gallery image upload.
- **Vernacular Voice Assistant (Audio TTS)**: Listen to diagnosis and treatment advice aloud in the farmer's native tongue for low-literacy users.
- **38+ Plant Disease Classifications**: PlantVillage neural catalog covering Tomato, Potato, Corn, Apple, Grape, Pepper, Rice, Cotton, and more.
- **3-Tier Treatment Guidance**:
  1. *Organic & Cultural Remedies* (Neem oil, bio-fungicides, pruning, mulching).
  2. *Chemical Controls* (Active ingredients, dosage, pre-harvest safety interval).
  3. *Future Prevention* (Crop rotation, spacing, resistant varieties).
- **Weather-Aware Fungal Blight Radar**: Live humidity & temperature tracking alerting farmers to spore germination conditions.
- **Share on WhatsApp & PDF Summary**: One-tap report sharing with local pesticide dealers or Krishi Vigyan Kendra (KVK) agronomists.
- **DPDP Act 2023 / DPDP Rules 2025 Compliance**: Granular consent tracking, 72-hour breach commitment, Grievance Officer portal, data portability export, and erasure tools.

---

## 🛠️ Technology Stack (100% Free-Tier Architecture)

| Layer | Technology | Free-Tier Details |
|---|---|---|
| **Frontend** | React 18 + Vite + TailwindCSS | Fast, mobile-responsive SPA with PWA capabilities |
| **Hosting** | Vercel / Netlify | Free HTTPS, global edge CDN, automatic GitHub CI/CD |
| **Backend & DB** | Supabase (PostgreSQL + RLS) | 500 MB DB, Row Level Security, Auth, Storage, Edge Functions |
| **Primary AI Diagnosis** | Hugging Face Inference API | Free tier with PlantVillage MobileNet / ViT models + local fallback |
| **Secondary Diagnosis** | Kindwise `crop.health` API | Optional, feature-flagged (10 free demo scans/mo) |
| **Translations (Static)** | `i18next` + bundled JSON | Bundled at build time, 0 runtime latency, offline-safe |
| **Translations (Dynamic)**| LibreTranslate API + DB Cache | Edge function translation layer with Postgres caching |
| **Weather Risk** | OpenWeatherMap API | 1,000 free calls/day |
| **Auth & SMS** | Supabase Phone Auth + Email Magic Link | Zero-cost email magic links + SMS OTP fallback |
| **Legal Compliance** | India DPDP Act 2023 Framework | Granular consent checkboxes, `consent_log` table, Grievance Officer |

---

## 📦 Quickstart & Local Setup

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 2. Installation
```bash
# Clone or navigate to the project directory
cd cropSense

# Install all frontend dependencies
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
*(Note: CropDoctor includes an **instant offline/guest mode** so you can test all diagnostic and UI flows immediately even before adding external API keys!)*

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📋 Comprehensive Checklist of Manual Steps Required From You

To transition this application to your own live production environment, complete the following manual steps:

### 1. Supabase Backend Setup (5 minutes)
1. Go to [https://supabase.com](https://supabase.com) and create a **Free Project** (choose the **South Asia / Mumbai (`ap-south-1`)** region for optimal latency in India).
2. Open the **SQL Editor** in your Supabase dashboard.
3. Open [`supabase/migrations/20260819000000_cropdoctor_schema.sql`](file:///c:/Users/Asus/OneDrive/Documents/cropSense/supabase/migrations/20260819000000_cropdoctor_schema.sql) and paste the entire script, then click **Run**.
4. In your Supabase Dashboard under **Project Settings > API**, copy:
   - `Project URL` → paste into `VITE_SUPABASE_URL` in `.env.local`
   - `anon public` key → paste into `VITE_SUPABASE_ANON_KEY` in `.env.local`
   - `service_role secret` → configure in Supabase Edge Functions environment.

### 2. Hugging Face Inference Token (2 minutes)
1. Sign up for a free account at [https://huggingface.co](https://huggingface.co).
2. Go to **Settings > Access Tokens** and click **New Token** (Read access).
3. Copy your token (starts with `hf_...`) and add it to your Supabase Edge Function environment variable `HUGGINGFACE_API_TOKEN`.

### 3. OpenWeatherMap API Key (Optional, 2 minutes)
1. Sign up for a free account at [https://openweathermap.org](https://openweathermap.org).
2. Navigate to **API Keys** and generate a free key.
3. Add the key to `VITE_OPENWEATHER_API_KEY` in `.env.local` (or Supabase Edge Function).

### 4. SMS OTP Provider & Indian DLT Registration (Optional for SMS)
> [!WARNING]
> **SMS Cost Notice**: SMS gateways (MSG91, Twilio) require paid per-SMS credits after free trial quotas. In India, sending commercial/transactional SMS requires registering a **DLT Sender ID** (via Jio/Airtel DLT portals).
> **Zero-Cost Recommendation**: Use the built-in **Email Magic Link** and **Guest Demo Mode** for zero-cost operation. If SMS OTP is desired:
1. Create an account on [MSG91](https://msg91.com) or [Twilio](https://twilio.com).
2. In Supabase Dashboard, navigate to **Authentication > Providers > Phone** and enable your provider.

### 5. Production Deployment to Vercel (3 minutes)
1. Push this repository to GitHub.
2. Log in to [https://vercel.com](https://vercel.com) and click **Add New > Project**.
3. Select your GitHub repository.
4. Add your Environment Variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_OPENWEATHER_API_KEY`).
5. Click **Deploy**. Vercel will build and provision an SSL-secured production URL automatically.

---

## ⚠️ Free-Tier Quota Caps & Operational Guidelines

| Service | Free Tier Limit | Behavior When Reached | Mitigation in CropDoctor |
|---|---|---|---|
| **Supabase Database** | 500 MB Postgres storage | New inserts blocked | Data retention policy prunes inactive guest records after 90 days |
| **Supabase Storage** | 1 GB file storage | Image upload fails | Automatic client-side canvas compression reduces photos to < 400 KB |
| **Supabase Edge Functions** | 2 CPU-hours / month (~500k invocations) | Function 429 rate limit | Built-in browser/client fallback diagnostic intelligence |
| **Hugging Face API** | ~30-60 req/min (free tier) | Cold boot delay or 429 status | Client shows friendly progress skeleton + automatic fallback |
| **OpenWeatherMap** | 1,000 calls / day | API returns 429 | Fungal risk banner gracefully falls back to regional seasonal heuristics |
| **MSG91 / Twilio SMS** | Small initial trial credit | SMS fails to deliver | Instant fallback button to Email Magic Link login |

---

## ⚖️ Legal & DPDP Compliance (India)

CropDoctor includes full legal disclosures in compliance with the **Digital Personal Data Protection Act 2023**:
- **Privacy Policy (`/privacy`)**: Discloses Data Fiduciary identity, itemized data collection purposes, cross-border transmission, and retention periods.
- **Terms of Service (`/terms`)**: Includes explicit **AI Diagnostic Disclaimer** stating remedies are advisory.
- **Cookie Policy (`/cookies`)**: Itemizes all active cookies with an unbundled, granular consent controller.
- **Data Rights Portal (`/rights`)**: Allows farmers to export a complete `.JSON` copy of their data or execute total erasure.
- **Grievance Redressal**: Formal contact channel at `grievance@cropdoctor.app` with 72-hour resolution SLA.

---

## 🧠 Machine Learning Model Training (Optional)

If you wish to retrain or fine-tune your own CNN model on the PlantVillage dataset:
1. Download the [PlantVillage dataset from Kaggle](https://www.kaggle.com/datasets/emmarex/plantdisease).
2. Run the modern training pipeline:
   ```bash
   python ml/train_plantvillage_cnn.py
   ```
3. Export the trained model to lightweight edge format:
   ```bash
   python ml/export_model.py
   ```

---

## 📄 License & Attribution

CropDoctor is distributed under the **MIT Open-Source License**. Plant disease symptom dictionaries and classifications are adapted from open-source agronomic research and the PlantVillage dataset.
