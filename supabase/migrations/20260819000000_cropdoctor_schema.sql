-- ==============================================================================
-- CropDoctor PostgreSQL Database Schema & Row Level Security (RLS) Policies
-- Migration: 20260819000000_cropdoctor_schema.sql
-- ==============================================================================

-- 1. Profiles Table (Extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    phone TEXT,
    display_name TEXT,
    preferred_language VARCHAR(10) DEFAULT 'en',
    region TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
    ON public.profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

-- 2. Scans Table (Farmer Diagnostic Submissions)
CREATE TABLE IF NOT EXISTS public.scans (
    id TEXT PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    crop_guess TEXT NOT NULL,
    diagnosis TEXT NOT NULL,
    confidence NUMERIC(4, 3) NOT NULL,
    severity VARCHAR(20) DEFAULT 'moderate',
    treatment_text TEXT,
    provider_used VARCHAR(50) DEFAULT 'huggingface',
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'treated', 'resolved')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on scans
ALTER TABLE public.scans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own crop scans"
    ON public.scans FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own crop scans"
    ON public.scans FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update status of their own scans"
    ON public.scans FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own crop scans"
    ON public.scans FOR DELETE
    USING (auth.uid() = user_id);

-- 3. Feedback Table (Diagnosis Accuracy Ratings)
CREATE TABLE IF NOT EXISTS public.feedback (
    id BIGSERIAL PRIMARY KEY,
    scan_id TEXT REFERENCES public.scans(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    was_helpful BOOLEAN NOT NULL,
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on feedback
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert feedback"
    ON public.feedback FOR INSERT
    WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can view their own feedback"
    ON public.feedback FOR SELECT
    USING (auth.uid() = user_id);

-- 4. Consent Log (India DPDP Act 2023 Mandatory Audit Trail)
CREATE TABLE IF NOT EXISTS public.consent_log (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    consent_type VARCHAR(50) NOT NULL CHECK (consent_type IN ('terms', 'privacy', 'cookies')),
    version VARCHAR(20) NOT NULL,
    language_shown VARCHAR(10) NOT NULL,
    given_at TIMESTAMPTZ DEFAULT NOW(),
    ip_hash TEXT
);

-- Enable RLS on consent_log (Client Insert-Only; Non-Editable)
ALTER TABLE public.consent_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow client consent logging"
    ON public.consent_log FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Users can view own consent logs"
    ON public.consent_log FOR SELECT
    USING (auth.uid() = user_id);

-- 5. Audit Log
CREATE TABLE IF NOT EXISTS public.audit_log (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    table_affected TEXT NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- 6. Dynamic Translation Cache (Prevents repeat translation API calls)
CREATE TABLE IF NOT EXISTS public.translation_cache (
    id BIGSERIAL PRIMARY KEY,
    disease_key TEXT NOT NULL,
    target_language VARCHAR(10) NOT NULL,
    translated_text TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(disease_key, target_language)
);

ALTER TABLE public.translation_cache ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read for translation cache"
    ON public.translation_cache FOR SELECT
    USING (true);

-- 7. Trigger for automatic profile creation upon auth.users signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, phone, display_name, preferred_language)
    VALUES (
        NEW.id,
        NEW.phone,
        COALESCE(NEW.raw_user_meta_data->>'display_name', 'Farmer'),
        COALESCE(NEW.raw_user_meta_data->>'preferred_language', 'en')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 8. Storage Bucket Policy for 'crop-scans'
-- Run this in Supabase Storage dashboard or via SQL:
INSERT INTO storage.buckets (id, name, public) 
VALUES ('crop-scans', 'crop-scans', false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Authenticated users can upload crop scans"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'crop-scans' AND 
        (auth.uid() IS NOT NULL OR auth.role() = 'anon')
    );

CREATE POLICY "Users can read their own scan images"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'crop-scans');
