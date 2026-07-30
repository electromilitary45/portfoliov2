export type Experience = {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  stack: string[];
};

export type Education = {
  id: string;
  title: string;
  institution: string;
  period: string;
};

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  year: string;
  fileUrl?: string | null;
  linkUrl?: string | null;
  sortOrder: number;
};

export type Profile = {
  headline: string;
  summary: string;
  avatarUrl?: string | null;
  experience: Experience[];
  education: Education[];
  certificates: Certificate[];
};
