-- Run this SQL in your Supabase SQL Editor if the automatic setup doesn't work

-- Create projects table with image_url field
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  link TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Add sample projects with images
INSERT INTO projects (title, description, link, image_url)
VALUES 
  ('Personal Blog', 'A responsive blog built with Next.js and Tailwind CSS', 'https://example.com/blog', 'https://via.placeholder.com/600x400?text=Blog+Project'),
  ('Weather App', 'Real-time weather application using OpenWeather API', 'https://example.com/weather', 'https://via.placeholder.com/600x400?text=Weather+App'),
  ('E-commerce Dashboard', 'Admin dashboard for managing products and orders', 'https://example.com/dashboard', 'https://via.placeholder.com/600x400?text=Dashboard');
