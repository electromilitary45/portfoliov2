// src/app/actions/blog/update-blog-post-status.action.ts
'use server';

import { revalidatePath } from 'next/cache';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function updateBlogPostStatusAction(formData: FormData) {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('No autorizado');
    }

    const postId = formData.get('postId') as string;
    const newStatus = formData.get('status') as 'draft' | 'published' | 'archived';

    let publishedAt = null;
    if (newStatus === 'published') {
        publishedAt = new Date().toISOString();
    }

    const { error } = await supabase
        .from('blog_posts')
        .update({ status: newStatus, published_at: publishedAt })
        .eq('id', postId);

    if (error) {
        console.error('Error al actualizar el estado del post:', error);
        throw new Error('No se pudo actualizar el estado');
    }

    revalidatePath('/admin/blog');
    revalidatePath('/blog');
    redirect('/admin/blog');
}