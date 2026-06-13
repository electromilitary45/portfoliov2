// src/app/actions/blog/delete-blog-post.action.ts
'use server';

import { revalidatePath } from 'next/cache';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function deleteBlogPostAction(formData: FormData) {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('No autorizado');
    }

    const postId = formData.get('postId') as string;

    const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postId);

    if (error) {
        console.error('Error al eliminar el post:', error);
        throw new Error('No se pudo eliminar el post');
    }

    revalidatePath('/admin/blog');
    revalidatePath('/blog');
    redirect('/admin/blog');
}