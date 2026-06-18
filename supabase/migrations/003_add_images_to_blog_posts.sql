-- Migration: Add images array column to blog_posts table
-- Description: Adds support for multiple images per blog post
-- Date: 2026-06-18

alter table public.blog_posts
add column if not exists images jsonb not null default '[]'::jsonb;

comment on column public.blog_posts.images is 'Array of blog post images with url, alt text, and display order. Format: [{"url": "...", "alt": "...", "order": 0}]';