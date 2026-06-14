import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { getAllBlogPostsForAdmin } from "@/features/blog/blog-post.service";
import { CreateBlogPostModal } from "@/features/blog/components/CreateBlogPostModal";
import { EditBlogPostButton } from "@/features/blog/components/EditBlogPostButton";
import { DeleteBlogPostButton } from "@/features/blog/components/DeleteBlogPostButton";
import { BlogPostStatusAction } from "@/features/blog/components/BlogPostStatusAction";
import { Eye, EyeOff, Archive } from "lucide-react";

export default async function AdminBlogPage() {
    const posts = await getAllBlogPostsForAdmin();

    return (
        <section className="min-h-screen py-20">
            <Container className="lg:px-12">
                <div className="flex items-center justify-between">
                    <PageHeader
                        variant="admin"
                        label="Admin / Blog"
                        title="Gestionar artículos."
                        description="Crea, edita y administra los posts del blog."
                    />
                    <CreateBlogPostModal />
                </div>

                <section className="mt-14 border-t border-white/10 pt-10">
                    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="font-mono text-xs uppercase tracking-[0.25em] text-red-500">
                                Todos los posts
                            </p>
                            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white">
                                Listado de artículos
                            </h2>
                        </div>
                        <p className="max-w-md text-sm leading-6 text-neutral-500">
                            Desde aquí puedes gestionar el estado, editar contenido y eliminar posts.
                        </p>
                    </div>

                    <div className="mt-10 overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b border-white/10 text-left">
                                    <th className="pb-4 font-mono text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
                                        Título
                                    </th>
                                    <th className="pb-4 font-mono text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
                                        Estado
                                    </th>
                                    <th className="pb-4 font-mono text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
                                        Fecha
                                    </th>
                                    <th className="pb-4 font-mono text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.map((post) => (
                                    <tr key={post.id} className="border-b border-white/5">
                                        <td className="py-5 pr-4">
                                            <div className="font-medium text-white">{post.title}</div>
                                            <div className="mt-1 font-mono text-xs text-neutral-500">
                                                /{post.href}
                                            </div>
                                        </td>
                                        <td className="py-5 pr-4">
                                            <span
                                                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs uppercase tracking-[0.1em] ${
                                                    post.status === "published"
                                                        ? "bg-green-500/10 text-green-400"
                                                        : post.status === "draft"
                                                          ? "bg-yellow-500/10 text-yellow-400"
                                                          : "bg-neutral-500/10 text-neutral-400"
                                                }`}
                                            >
                                                {post.status === "published" ? (
                                                    <Eye className="h-3 w-3" />
                                                ) : post.status === "draft" ? (
                                                    <EyeOff className="h-3 w-3" />
                                                ) : (
                                                    <Archive className="h-3 w-3" />
                                                )}
                                                {post.status}
                                            </span>
                                        </td>
                                        <td className="py-5 pr-4 font-mono text-sm text-neutral-400">
                                            {post.publishedAt
                                                ? new Date(post.publishedAt).toLocaleDateString("es-ES")
                                                : "Borrador"}
                                        </td>
                                        <td className="py-5">
                                            <div className="flex flex-wrap gap-2">
                                                <EditBlogPostButton post={post} />
                                                <BlogPostStatusAction post={post} />
                                                <DeleteBlogPostButton postId={post.id} postTitle={post.title} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </Container>
        </section>
    );
}