// src/app/actions/blog/update-blog-post.action.ts
'use server';

import { revalidatePath } from 'next/cache';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

async function uploadBlogImage(file: File): Promise<string> {
    const supabase = await createSupabaseServerClient();
    const fileExt = file.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file);

    if (uploadError) {
        throw new Error('Error al subir la imagen');
    }

    const { data: publicUrlData } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
}

export async function updateBlogPostAction(formData: FormData) {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('No autorizado');
    }

    const postId = formData.get('postId') as string;
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const excerpt = formData.get('excerpt') as string;
    const content = formData.get('content') as string;
    const tags = (formData.get('tags') as string).split(',').map(tag => tag.trim());
    const readingTime = formData.get('readingTime') as string;
    const status = formData.get('status') as 'draft' | 'published' | 'archived';

    // Handle multiple images
    const imageFiles = formData.getAll('imageFiles') as File[];
    const imageAlts = formData.getAll('imageAlts') as string[];
    const imageOrders = formData.getAll('imageOrders') as string[];
    const currentImagesJson = formData.get('currentImages') as string;

    let currentImages: { url: string; alt: string; order: number }[] = [];
    try {
        currentImages = currentImagesJson ? JSON.parse(currentImagesJson) : [];
    } catch {
        currentImages = [];
    }

    // Build a set of orders that have NEW files uploaded (size > 0)
    const ordersWithNewFiles = new Set<number>();
    for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i];
        const order = parseInt(imageOrders[i]) || i;
        if (file && file.size > 0) {
            ordersWithNewFiles.add(order);
        }
    }

    const newImages: { url: string; alt: string; order: number }[] = [];

    // Keep existing images that don't have a new file uploaded for their order
    for (const existingImg of currentImages) {
        if (!ordersWithNewFiles.has(existingImg.order)) {
            // No new file for this order, keep the existing image
            newImages.push(existingImg);
        }
        // If there IS a new file for this order, it will be handled in the loop below (replaced)
    }

    // Add new/replaced images (only where a file was actually uploaded)
    for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i];
        const alt = imageAlts[i] || '';
        const order = parseInt(imageOrders[i]) || i;
        if (file && file.size > 0) {
            const url = await uploadBlogImage(file);
            newImages.push({ url, alt, order });
        }
    }

    // Sort by order
    newImages.sort((a, b) => a.order - b.order);

    // Backward compatibility: first image becomes cover image
    const coverImageUrl = newImages.length > 0 ? newImages[0].url : null;
    const coverImageAlt = newImages.length > 0 ? newImages[0].alt : '';

    // Mantener published_at si ya estaba publicado
    let publishedAt = null;
    if (status === 'published') {
        const { data: currentPost } = await supabase
            .from('blog_posts')
            .select('published_at')
            .eq('id', postId)
            .single();
        publishedAt = currentPost?.published_at || new Date().toISOString();
    }

    const { error } = await supabase
        .from('blog_posts')
        .update({
            title,
            slug,
            excerpt,
            content,
            tags,
            reading_time: readingTime,
            status,
            cover_image_url: coverImageUrl,
            cover_image_alt: coverImageAlt,
            images: newImages,
            published_at: publishedAt,
            updated_at: new Date().toISOString(),
        })
        .eq('id', postId);

    if (error) {
        console.error('Error al actualizar post:', error);
        throw new Error('No se pudo actualizar el post');
    }

    revalidatePath('/admin/blog');
    revalidatePath(`/blog/${slug}`);
    revalidatePath('/blog');
    redirect('/admin/blog');
}