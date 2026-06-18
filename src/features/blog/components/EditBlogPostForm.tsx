// src/features/blog/components/EditBlogPostForm.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { updateBlogPostAction } from "@/app/actions/blog/update-blog-post.action";
import type { BlogPost, BlogPostImage } from "@/features/blog/blog-post.type";
import { Plus, Trash2, GripVertical } from "lucide-react";

type EditBlogPostFormProps = {
    post: BlogPost;
};

interface ImageInput {
  url: string;
  alt: string;
  order: number;
  file: File | null;
  preview: string;
  isNew: boolean;
  isDeleted: boolean;
}

export function EditBlogPostForm({ post }: EditBlogPostFormProps) {
  const [images, setImages] = useState<ImageInput[]>(() => {
    const initialImages = post.images ?? [];
    if (initialImages.length === 0 && post.coverImageUrl) {
      return [{ url: post.coverImageUrl, alt: post.coverImageAlt ?? "", order: 0, file: null, preview: post.coverImageUrl, isNew: false, isDeleted: false }];
    }
    return initialImages.map(img => ({
      url: img.url,
      alt: img.alt,
      order: img.order,
      file: null,
      preview: img.url,
      isNew: false,
      isDeleted: false
    }));
  });

  const addImage = () => {
    const newOrder = images.length > 0 ? Math.max(...images.map(i => i.order)) + 1 : 0;
    setImages([...images, { url: "", alt: "", order: newOrder, file: null, preview: "", isNew: true, isDeleted: false }]);
  };

  const removeImage = (index: number) => {
    if (images.length <= 1) return;
    const newImages = [...images];
    if (newImages[index].isNew) {
      newImages.splice(index, 1);
    } else {
      newImages[index] = { ...newImages[index], isDeleted: true };
    }
    setImages(newImages);
  };

  const handleFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    const newImages = [...images];
    if (file) {
      const preview = URL.createObjectURL(file);
      newImages[index] = { ...newImages[index], file, preview, isNew: !newImages[index].url };
    } else {
      newImages[index] = { ...newImages[index], file: null, preview: newImages[index].url || "" };
    }
    setImages(newImages);
  };

  const handleAltChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newImages = [...images];
    newImages[index] = { ...newImages[index], alt: e.target.value };
    setImages(newImages);
  };

  const handleDragEnd = (result: { active: { id: string }, over: { id: string } | null }) => {
    if (!result.over) return;
    const activeIndex = images.findIndex(img => img.order.toString() === result.active.id);
    const overId = result.over.id;
    const overIndex = images.findIndex(img => img.order.toString() === overId);
    if (activeIndex !== -1 && overIndex !== -1 && activeIndex !== overIndex) {
      const newImages = [...images];
      const [removed] = newImages.splice(activeIndex, 1);
      newImages.splice(overIndex, 0, removed);
      // Update order
      newImages.forEach((img, i) => { img.order = i; });
      setImages(newImages);
    }
  };

  return (
    <form action={updateBlogPostAction} className="space-y-5">
      <input type="hidden" name="postId" value={post.id} />

      {/* Current images JSON for the action */}
      <input
        type="hidden"
        name="currentImages"
        value={JSON.stringify(
          (post.images ?? []).map(img => ({ url: img.url, alt: img.alt, order: img.order }))
        )}
      />

      {/* Título */}
      <div>
        <label className="text-sm text-neutral-300" htmlFor={`title-${post.id}`}>
          Título
        </label>
        <input
          id={`title-${post.id}`}
          name="title"
          required
          defaultValue={post.title}
          className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
        />
      </div>

      {/* Slug */}
      <div>
        <label className="text-sm text-neutral-300" htmlFor={`slug-${post.id}`}>
          Slug (URL)
        </label>
        <input
          id={`slug-${post.id}`}
          name="slug"
          required
          defaultValue={post.slug}
          className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
        />
      </div>

      {/* Extracto */}
      <div>
        <label className="text-sm text-neutral-300" htmlFor={`excerpt-${post.id}`}>
          Extracto
        </label>
        <textarea
          id={`excerpt-${post.id}`}
          name="excerpt"
          required
          rows={3}
          defaultValue={post.excerpt}
          className="mt-2 w-full resize-none border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
        />
      </div>

      {/* Contenido */}
      <div>
        <label className="text-sm text-neutral-300" htmlFor={`content-${post.id}`}>
          Contenido (Markdown o HTML)
        </label>
        <textarea
          id={`content-${post.id}`}
          name="content"
          rows={12}
          defaultValue={post.content ?? ""}
          className="mt-2 w-full resize-none border border-white/10 bg-neutral-900 px-4 py-3 font-mono text-sm text-white outline-none transition focus:border-red-500"
        />
      </div>

      {/* Tags */}
      <div>
        <label className="text-sm text-neutral-300" htmlFor={`tags-${post.id}`}>
          Tags (separados por comas)
        </label>
        <input
          id={`tags-${post.id}`}
          name="tags"
          required
          defaultValue={post.tags.join(", ")}
          className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
        />
      </div>

      {/* Tiempo de lectura */}
      <div>
        <label className="text-sm text-neutral-300" htmlFor={`readingTime-${post.id}`}>
          Tiempo de lectura
        </label>
        <input
          id={`readingTime-${post.id}`}
          name="readingTime"
          required
          defaultValue={post.readingTime}
          className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
        />
      </div>

      {/* Imágenes múltiples */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="text-sm text-neutral-300">Imágenes del artículo</label>
          {images.length < 10 && (
            <button
              type="button"
              onClick={addImage}
              className="text-sm text-red-500 hover:text-red-400 flex items-center gap-1"
            >
              <Plus className="h-4 w-4" />
              Añadir imagen
            </button>
          )}
        </div>

        <div className="space-y-4">
          {images.map((image, index) => {
            if (image.isDeleted) return null;
            const isCover = index === 0;
            return (
              <div key={image.order} className="border border-white/10 bg-neutral-900/50 p-4 rounded-lg relative">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-white">
                    Imagen {index + 1} {isCover && <span className="ml-2 text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded">Portada</span>}
                  </span>
                  <div className="flex items-center gap-2">
                    <GripVertical className="h-4 w-4 text-neutral-500 cursor-grab active:cursor-grabbing" />
                    {images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="text-neutral-400 hover:text-red-400 transition"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm text-neutral-300">Archivo de imagen</label>
                    <input
                      type="file"
                      accept="image/*"
                      name="imageFiles"
                      onChange={(e) => handleFileChange(index, e)}
                      className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-sm text-neutral-300 outline-none transition file:mr-4 file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-medium file:text-neutral-950 focus:border-red-500"
                    />
                    {image.preview && (
                      <div className="mt-2 relative aspect-[16/9] overflow-hidden border border-white/10 bg-neutral-900">
                        <Image
                          src={image.preview}
                          alt="Preview"
                          fill
                          className="object-cover"
                          sizes="(min-width: 768px) 640px, 100vw"
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="text-sm text-neutral-300" htmlFor={`imageAlt-${post.id}-${index}`}>
                      Texto alternativo (alt)
                    </label>
                    <input
                      id={`imageAlt-${post.id}-${index}`}
                      name="imageAlts"
                      value={image.alt}
                      onChange={(e) => handleAltChange(index, e)}
                      className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
                      placeholder="Descripción de la imagen"
                    />
                    <input type="hidden" name="imageOrders" value={image.order} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-2 text-xs text-neutral-500">
          La primera imagen se usará como portada del artículo. Arrastra para reordenar. Máximo 10 imágenes.
        </p>
      </div>

      {/* Estado */}
      <div>
        <label className="text-sm text-neutral-300" htmlFor={`status-${post.id}`}>
          Estado
        </label>
        <select
          id={`status-${post.id}`}
          name="status"
          defaultValue={post.status}
          className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
        >
          <option value="draft">Borrador</option>
          <option value="published">Publicado</option>
          <option value="archived">Archivado</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full border border-white bg-white px-6 py-3 text-sm font-medium text-neutral-950 transition hover:border-red-500 hover:bg-red-500 hover:text-white"
      >
        Actualizar artículo
      </button>
    </form>
  );
}