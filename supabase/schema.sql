-- Supabase SQL Database Schema & RLS Policies
-- Execute this script in your Supabase SQL Editor to set up tables, storage, and access policies.

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

---------------------------------------------------------
-- 1. TABLES CREATION
---------------------------------------------------------

-- Create Projects table
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    category TEXT NOT NULL,
    year INTEGER NOT NULL,
    thumbnail_url TEXT,
    banner_url TEXT,
    video_url TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Gallery table (Associated images per project)
CREATE TABLE IF NOT EXISTS public.gallery (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
    image_url TEXT NOT NULL
);

-- Create Contacts table (Inbound contact form submissions)
CREATE TABLE IF NOT EXISTS public.contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Subscribers table (Newsletter emails)
CREATE TABLE IF NOT EXISTS public.subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

---------------------------------------------------------
-- 2. ROW LEVEL SECURITY (RLS) POLICIES
---------------------------------------------------------

-- Enable RLS on all tables
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- PROJECTS Policies
-- Allow anyone to view projects
CREATE POLICY "Allow public read access to projects" 
ON public.projects FOR SELECT 
USING (true);

-- Allow authenticated users (admin) to insert/update/delete projects
CREATE POLICY "Allow authenticated users all access to projects" 
ON public.projects FOR ALL 
TO authenticated 
USING (true)
WITH CHECK (true);

-- GALLERY Policies
-- Allow anyone to view gallery images
CREATE POLICY "Allow public read access to gallery" 
ON public.gallery FOR SELECT 
USING (true);

-- Allow authenticated users (admin) to insert/update/delete gallery images
CREATE POLICY "Allow authenticated users all access to gallery" 
ON public.gallery FOR ALL 
TO authenticated 
USING (true)
WITH CHECK (true);

-- CONTACTS Policies
-- Allow anyone to insert contact form submissions (submit form anonymously)
CREATE POLICY "Allow anyone to insert contact inquiries" 
ON public.contacts FOR INSERT 
WITH CHECK (true);

-- Allow only authenticated users (admin) to read/manage contact forms
CREATE POLICY "Allow authenticated users to read/manage contacts" 
ON public.contacts FOR ALL 
TO authenticated 
USING (true)
WITH CHECK (true);

-- SUBSCRIBERS Policies
-- Allow anyone to subscribe (insert email)
CREATE POLICY "Allow anyone to subscribe to newsletter" 
ON public.subscribers FOR INSERT 
WITH CHECK (true);

-- Allow only authenticated users (admin) to read/manage newsletter subscribers
CREATE POLICY "Allow authenticated users to read/manage subscribers" 
ON public.subscribers FOR ALL 
TO authenticated 
USING (true)
WITH CHECK (true);

---------------------------------------------------------
-- 3. STORAGE BUCKETS SETUP
---------------------------------------------------------
-- Note: Run the following in SQL Editor to create the bucket and policies
-- or configure public buckets "project-media" inside the Supabase Storage dashboard manually.

-- Create storage bucket for project media (thumbnails, banners, gallery)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('project-media', 'project-media', true) ON CONFLICT DO NOTHING;

-- Storage policies:
-- CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'project-media');
-- CREATE POLICY "Admin Upload" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'project-media');
-- CREATE POLICY "Admin Delete" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'project-media');

---------------------------------------------------------
-- 4. HELPER INDICES FOR PERFORMANCE
---------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_gallery_project_id ON public.gallery(project_id);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON public.contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_subscribers_created_at ON public.subscribers(created_at DESC);
