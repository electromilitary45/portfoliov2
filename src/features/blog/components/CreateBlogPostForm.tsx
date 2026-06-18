// src/features/blog/components/CreateBlogPostForm.tsx
"use client";

import { useState } from "react";
import { createBlogPostAction } from "@/app/actions/blog/create-blog-post.action";
import { Image, Plus, Trash2 } from "lucide-react";

interface ImageInput {
  file: File | null;
  alt: string;
  preview: string;
  order: number;
}

export function CreateBlogPostForm() {
  const [images, setImages] = useState<ImageInput[]>([
    { file: null, alt: "", preview: "", order: 0 }
  ]);
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const titleInput = e.target;
    const slugInput = document.getElementById("slug") as HTMLInputElement;
    if (slugInput && !slugInput.value) {
      slugInput.value = generateSlug(titleInput.value);
    }
  };

  const addImage = () => {
    const newOrder = images.length > 0 ? Math.max(...images.map(i => i.order)) + 1 : 0;
    setImages([...images, { file: null, alt: "", preview: "", order: newOrder }]);
  };

  const removeImage = (index: number) => {
    if (images.length <= 1) return;
    setImages(images.filter((_, i) => i !== index));
  };

  const handleFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    const newImages = [...images];
    if (file) {
      const preview = URL.createObjectURL(file);
      newImages[index] = { ...newImages[index], file, preview };
    } else {
      newImages[index] = { ...newImages[index], file: null, preview: "" };
    }
    setImages(newImages);
  };

  const handleAltChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newImages = [...images];
    newImages[index] = { ...newImages[index], alt: e.target.value };
    setImages(newImages);
  };

  return (
    <form action={createBlogPostAction} className="space-y-5">
      {/* Título */}
      <div>
        <label className="text-sm text-neutral-300" htmlFor="title">
          Título
        </label>
        <input
          id="title"
          name="title"
          required
          onBlur={handleTitleChange}
          className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
          placeholder="Mi nuevo artículo"
        />
      </div>

      {/* Slug */}
      <div>
        <label className="text-sm text-neutral-300" htmlFor="slug">
          Slug (URL)
        </label>
        <input
          id="slug"
          name="slug"
          required
          className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
          placeholder="mi-nuevo-articulo"
        />
        <p className="mt-1 text-xs text-neutral-500">
          Se genera automático desde el título, pero puedes editarlo.
        </p>
      </div>

      {/* Extracto */}
      <div>
        <label className="text-sm text-neutral-300" htmlFor="excerpt">
          Extracto
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          required
          rows={3}
          className="mt-2 w-full resize-none border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
          placeholder="Breve descripción del artículo..."
        />
      </div>

      {/* Contenido */}
      <div>
        <label className="text-sm text-neutral-300" htmlFor="content">
          Contenido (Markdown o HTML)
        </label>
        <textarea
          id="content"
          name="content"
          rows={10}
          className="mt-2 w-full resize-none border border-white/10 bg-neutral-900 px-4 py-3 font-mono text-sm text-white outline-none transition focus:border-red-500"
          placeholder="# Mi artículo&#10;&#10;Este es el contenido..."
        />
        <p className="mt-1 text-xs text-neutral-500">
          Puedes usar Markdown o HTML directamente. Usa las imágenes con: ![alt](url)
        </p>
      </div>

      {/* Tags */}
      <div>
        <label className="text-sm text-neutral-300" htmlFor="tags">
          Tags (separados por comas)
        </label>
        <input
          id="tags"
          name="tags"
          required
          className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
          placeholder="Next.js, React, Tutorial"
        />
      </div>

      {/* Tiempo de lectura */}
      <div>
        <label className="text-sm text-neutral-300" htmlFor="readingTime">
          Tiempo de lectura
        </label>
        <input
          id="readingTime"
          name="readingTime"
          required
          className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
          placeholder="4 min"
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
          {images.map((image, index) => (
            <div key={image.order} className="border border-white/10 bg-neutral-900/50 p-4 rounded-lg relative">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-white">
                  Imagen {index + 1} {index === 0 && <span className="ml-2 text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded">Portada</span>}
                </span>
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

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm text-neutral-300">Archivo de imagen</label>
                  <input
                    type="file"
                    accept="image/*"
                    name={`imageFiles_${image.order}`}   // ← nombre único con el orden
                    onChange={(e) => handleFileChange(index, e)}
                    className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-sm text-neutral-300 outline-none transition file:mr-4 file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-medium file:text-neutral-950 focus:border-red-500"
                  />
                  {image.preview && (
                    <div className="mt-2 relative aspect-[16/9] overflow-hidden border border-white/10 bg-neutral-900">
                      <img
                        src={image.preview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
                <div>
                  <label className="text-sm text-neutral-300" htmlFor={`imageAlt-${image.order}`}>
                    Texto alternativo (alt)
                  </label>
                  <input
                    id={`imageAlt-${image.order}`}
                    name={`imageAlts_${image.order}`}   // ← nombre único con el orden
                    value={image.alt}
                    onChange={(e) => handleAltChange(index, e)}
                    className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
                    placeholder="Descripción de la imagen"
                  />
                  {/* Eliminamos el campo imageOrders */}
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs text-neutral-500">
          La primera imagen se usará como portada del artículo. Máximo 10 imágenes.
        </p>
      </div>

      {/* Estado */}
      <div>
        <label className="text-sm text-neutral-300" htmlFor="status">
          Estado
        </label>
        <select
          id="status"
          name="status"
          defaultValue="draft"
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
        Crear artículo
      </button>
    </form>
  );
}