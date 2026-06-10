import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { CertificateList } from "@/features/profile/components/CertificateList";
import { EducationList } from "@/features/profile/components/EducationList";
import { ExperienceTimeline } from "@/features/profile/components/ExperienceTimeline";
import { getProfile } from "@/features/profile/profile.service";

export default function AboutPage() {
    const profile = getProfile();

    return (
        <main className="min-h-[calc(100vh-161px)] bg-neutral-50 py-20">
            <Container>
                <PageHeader
                    label="Sobre mí"
                    title={profile.headline}
                    description={profile.summary}
                />

                <div className="mt-16 grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
                    <ExperienceTimeline items={profile.experience} />

                    <div className="space-y-12">
                        <EducationList items={profile.education} />
                        <CertificateList items={profile.certificates} />
                    </div>
                </div>
            </Container>
        </main>
    );
}