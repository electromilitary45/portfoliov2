// src/app/actions/blog/create-blog-post.action.ts
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

export async function createBlogPostAction(formData: FormData) {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('No autorizado');
    }

    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const excerpt = formData.get('excerpt') as string;
    const content = formData.get('content') as string;
    const tags = (formData.get('tags') as string).split(',').map(tag => tag.trim());
    const readingTime = formData.get('readingTime') as string;
    const status = formData.get('status') as 'draft' | 'published' | 'archived';
    const coverImageAlt = formData.get('coverImageAlt') as string;
    const imageFile = formData.get('coverImageFile') as File;

    let coverImageUrl = null;
    if (imageFile && imageFile.size > 0) {
        coverImageUrl = await uploadBlogImage(imageFile);
    }

    const publishedAt = status === 'published' ? new Date().toISOString() : null;

    const { error } = await supabase
        .from('blog_posts')
        .insert({
            title,
            slug,
            excerpt,
            content,
            tags,
            reading_time: readingTime,
            status,
            cover_image_url: coverImageUrl,
            cover_image_alt: coverImageAlt,
            published_at: publishedAt,
        });

    if (error) {
        console.error('Error al crear post:', error);
        throw new Error('No se pudo crear el post');
    }

    revalidatePath('/admin/blog');
    revalidatePath('/blog');
    redirect('/admin/blog');
}