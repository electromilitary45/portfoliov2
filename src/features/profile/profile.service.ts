import { createSupabaseServerClient } from "@/lib/supabase/server";
import { profile } from "@/features/profile/profile.mock";
import type { Certificate, Education, Experience, Profile } from "@/features/profile/profile.type";

type SupabaseExperienceRow = {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string | null;
  stack: string[];
};

function mapExperienceRow(row: SupabaseExperienceRow): Experience {
  return {
    id: row.id,
    role: row.role,
    company: row.company,
    period: row.period,
    description: row.description ?? "",
    stack: row.stack ?? [],
  };
}

type SupabaseEducationRow = {
  id: string;
  title: string;
  institution: string;
  period: string;
};

function mapEducationRow(row: SupabaseEducationRow): Education {
  return {
    id: row.id,
    title: row.title,
    institution: row.institution,
    period: row.period,
  };
}

function shouldUseMock() {
  return (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export async function getAdminProfile(): Promise<{ avatarUrl: string | null }> {
  if (shouldUseMock()) {
    return { avatarUrl: profile.avatarUrl ?? null };
  }

  try {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
      .from("profiles")
      .select("avatar_url")
      .limit(1)
      .maybeSingle();

    if (error || !data) {
      return { avatarUrl: null };
    }

    return { avatarUrl: data.avatar_url ?? null };
  } catch {
    return { avatarUrl: null };
  }
}

export function getProfile(): Profile {
  return profile;
}

export async function getProfileWithAvatar(): Promise<Profile & { avatarUrl: string | null }> {
  if (shouldUseMock()) {
    return { ...profile, avatarUrl: profile.avatarUrl ?? null };
  }

  try {
    const supabase = await createSupabaseServerClient();

    const [profileResult, experiences, educationList, certificates] = await Promise.all([
      supabase.from("profiles").select("avatar_url,headline,summary").limit(1).maybeSingle(),
      supabase.from("experiences").select("id,role,company,period,description,stack"),
      supabase.from("education").select("id,title,institution,period"),
      supabase.from("certificates").select("id,title,issuer,year,file_url"),
    ]);

    const profileData = profileResult.data;

    return {
      headline: profileData?.headline ?? "",
      summary: profileData?.summary ?? "",
      avatarUrl: profileData?.avatar_url ?? null,
      experience: experiences.data
        ? experiences.data.map((row) => mapExperienceRow(row as unknown as SupabaseExperienceRow))
        : [],
      education: educationList.data
        ? educationList.data.map((row) => mapEducationRow(row as unknown as SupabaseEducationRow))
        : [],
      certificates: certificates.data
        ? certificates.data.map((row) => mapCertificateRow(row as unknown as SupabaseCertificateRow))
        : [],
    };
  } catch {
    return { headline: "", summary: "", avatarUrl: null, experience: [], education: [], certificates: [] };
  }
}

export async function getExperiences(): Promise<Experience[]> {
  if (shouldUseMock()) {
    return profile.experience;
  }

  try {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
      .from("experiences")
      .select("id,role,company,period,description,stack");

    if (error || !data) {
      console.error("=== SUPABASE EXPERIENCES SELECT ERROR ===");
      console.error(JSON.stringify(error, null, 2));
      return profile.experience;
    }

    return data.map((row) => mapExperienceRow(row as unknown as SupabaseExperienceRow));
  } catch (err) {
    console.error("=== SUPABASE EXPERIENCES CATCH ===");
    console.error(err);
    return profile.experience;
  }
}

export async function getAdminExperiences(): Promise<Experience[]> {
  if (shouldUseMock()) {
    return profile.experience;
  }

  try {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
      .from("experiences")
      .select("id,role,company,period,description,stack");

    if (error || !data) {
      console.error("=== SUPABASE ADMIN EXPERIENCES SELECT ERROR ===");
      console.error(JSON.stringify(error, null, 2));
      return profile.experience;
    }

    return data.map((row) => mapExperienceRow(row as unknown as SupabaseExperienceRow));
  } catch (err) {
    console.error("=== SUPABASE ADMIN EXPERIENCES CATCH ===");
    console.error(err);
    return profile.experience;
  }
}

export async function getEducation(): Promise<Education[]> {
  if (shouldUseMock()) {
    return profile.education;
  }

  try {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
      .from("education")
      .select("id,title,institution,period");

    if (error || !data) {
      return profile.education;
    }

    return data.map((row) => mapEducationRow(row as unknown as SupabaseEducationRow));
  } catch {
    return profile.education;
  }
}

export async function getAdminEducation(): Promise<Education[]> {
  if (shouldUseMock()) {
    return profile.education;
  }

  try {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
      .from("education")
      .select("id,title,institution,period");

    if (error || !data) {
      return profile.education;
    }

    return data.map((row) => mapEducationRow(row as unknown as SupabaseEducationRow));
  } catch {
    return profile.education;
  }
}

type SupabaseCertificateRow = {
  id: string;
  title: string;
  issuer: string;
  year: string;
  file_url: string | null;
};

function mapCertificateRow(row: SupabaseCertificateRow): Certificate {
  return {
    id: row.id,
    title: row.title,
    issuer: row.issuer,
    year: row.year,
    fileUrl: row.file_url,
  };
}

export async function getCertificates(): Promise<Certificate[]> {
  if (shouldUseMock()) {
    return profile.certificates;
  }

  try {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
      .from("certificates")
      .select("id,title,issuer,year,file_url");

    if (error || !data) {
      return profile.certificates;
    }

    return data.map((row) => mapCertificateRow(row as unknown as SupabaseCertificateRow));
  } catch {
    return profile.certificates;
  }
}

export async function getAdminCertificates(): Promise<Certificate[]> {
  if (shouldUseMock()) {
    return profile.certificates;
  }

  try {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
      .from("certificates")
      .select("id,title,issuer,year,file_url");

    if (error || !data) {
      return profile.certificates;
    }

    return data.map((row) => mapCertificateRow(row as unknown as SupabaseCertificateRow));
  } catch {
    return profile.certificates;
  }
}
