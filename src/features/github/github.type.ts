export type GitHubUser = {
  login: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
};

export type GitHubRepo = {
  name: string;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  fork: boolean;
};

export type GitHubStats = {
  user: GitHubUser | null;
  totalStars: number;
  topRepos: GitHubRepo[];
  topLanguages: { language: string; count: number }[];
};
