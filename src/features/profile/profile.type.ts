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
  id: number;
  title: string;
  issuer: string;
  year: string;
  url?: string;
};

export type Profile = {
  headline: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  certificates: Certificate[];
};
