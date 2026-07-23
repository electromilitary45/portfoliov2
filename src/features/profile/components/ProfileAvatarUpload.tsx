"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { updateProfileAvatarAction } from "@/app/actions/profile/update-profile-avatar.action";

type ProfileAvatarUploadProps = {
  currentAvatarUrl: string | null | undefined;
};

export function ProfileAvatarUpload({ currentAvatarUrl }: ProfileAvatarUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  }

  const displayUrl = preview ?? currentAvatarUrl ?? null;

  return (
    <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
      <div className="relative h-32 w-32 overflow-hidden rounded-full border-2 border-white/10 bg-neutral-900">
        {displayUrl ? (
          <Image
            src={displayUrl}
            alt="Foto de perfil"
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-4xl text-neutral-600">
            ?
          </div>
        )}
      </div>

      <form ref={formRef} action={updateProfileAvatarAction} className="space-y-4">
        <div>
          <label className="text-sm text-neutral-300" htmlFor="avatar">
            Imagen de perfil
          </label>
          <input
            id="avatar"
            name="avatar"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-sm text-neutral-300 outline-none transition file:mr-4 file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-medium file:text-neutral-950 focus:border-red-500"
          />
          <p className="mt-1 text-xs text-neutral-500">
            Formatos: JPG, PNG, WEBP. Máximo 5MB.
          </p>
        </div>

        {selectedFile && (
          <button
            type="submit"
            className="border border-white bg-white px-6 py-3 text-sm font-medium text-neutral-950 transition hover:border-red-500 hover:bg-red-500 hover:text-white"
          >
            Guardar imagen
          </button>
        )}
      </form>
    </div>
  );
}
