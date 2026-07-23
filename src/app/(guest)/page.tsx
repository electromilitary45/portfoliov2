import { HeroSection } from "@/components/home/HeroSection";
import { HomeHighlights } from "@/components/home/HomeHighlights";
import { TechStackSection } from "@/components/home/TechStackSection";
import { FeaturedProjectsSection } from "@/components/home/FeaturedProjectsSection";
import { LatestBlogPostsSection } from "@/components/home/LatestBlogPostsSection";
import { GitHubContributions } from "@/components/home/GitHubContributions";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <HomeHighlights />
      <GitHubContributions />
      <TechStackSection />
      <FeaturedProjectsSection />
      <LatestBlogPostsSection />
    </main>
  );
}