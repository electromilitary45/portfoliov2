import { createSupabaseServerClient } from "@/lib/supabase/server";
import { profile } from "@/features/profile/profile.mock";
import type { Experience, Profile } from "@/features/profile/profile.type";

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

function shouldUseMock() {
  return (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export function getProfile(): Profile {
  return profile;
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
