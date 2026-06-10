import { createSupabaseServerClient } from "@/lib/supabase/server";

type UploadPublicFileParams = {
  bucket: string;
  file: File;
  folder: string;
};

function sanitizeFileName(fileName: string) {
  return fileName
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function uploadPublicFile({
  bucket,
  file,
  folder,
}: UploadPublicFileParams) {
  if (file.size === 0) {
    return null;
  }

  if (!file.type.startsWith("image/")) {
    throw new Error("Invalid image file");
  }

  const supabase = await createSupabaseServerClient();

  const safeFileName = sanitizeFileName(file.name);
  const filePath = `${folder}/${Date.now()}-${safeFileName}`;

  const { error } = await supabase.storage.from(bucket).upload(filePath, file, {
    contentType: file.type,
    upsert: false,
  });

  if (error) {
    throw error;
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);

  return data.publicUrl;
}

export async function uploadProjectImage(file: File, projectSlug: string) {
  return uploadPublicFile({
    bucket: "project-images",
    file,
    folder: projectSlug,
  });
}
