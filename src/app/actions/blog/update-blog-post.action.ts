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
    const coverImageAlt = formData.get('coverImageAlt') as string;
    const imageFile = formData.get('coverImageFile') as File;
    const currentCoverImageUrl = formData.get('currentCoverImageUrl') as string;

    let coverImageUrl = currentCoverImageUrl;
    if (imageFile && imageFile.size > 0) {
        // Si hay archivo nuevo, subirlo y reemplazar
        coverImageUrl = await uploadBlogImage(imageFile);
    }

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