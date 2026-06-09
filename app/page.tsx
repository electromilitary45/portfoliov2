import { HeroSection } from "@/components/home/HeroSection";
import { HomeHighlights } from "@/components/home/HomeHighlights";
import { GuestFooter } from "@/components/layout/GuestFooter";
import { GuestNavbar } from "@/components/layout/GuestNavbar";

export default function HomePage() {
  return (
    <>
      <GuestNavbar />
      <main>
        <HeroSection />
        <HomeHighlights />
      </main>
      <GuestFooter />
    </>
  );
}