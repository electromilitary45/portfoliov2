import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CertificateList } from "@/features/profile/components/CertificateList";
import { EducationList } from "@/features/profile/components/EducationList";
import { ExperienceTimeline } from "@/features/profile/components/ExperienceTimeline";
import { getProfileWithAvatar } from "@/features/profile/profile.service";

export const metadata: Metadata = {
    title: "Sobre mí",
    description:
        "Conoce mi trayectoria: experiencia laboral, formación académica y certificados en desarrollo web.",
    alternates: { canonical: "/sobre-mi" },
};

export default async function AboutPage() {
    const profile = await getProfileWithAvatar();

    return (
        <main className="min-h-[calc(100vh-161px)] bg-neutral-50 py-20">
            <Container>
                <ScrollReveal>
                    <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
                        {profile.avatarUrl && (
                            <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-full border-4 border-neutral-200 shadow-lg">
                                <Image
                                    src={profile.avatarUrl}
                                    alt="Foto de perfil"
                                    fill
                                    sizes="160px"
                                    className="object-cover"
                                />
                            </div>
                        )}

                        <div className="flex-1">
                            <PageHeader
                                label="Sobre mí"
                                title={profile.headline}
                                description={profile.summary}
                            />
                        </div>
                    </div>
                </ScrollReveal>

                <div className="mt-16 grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
                    <ScrollReveal delay={100}>
                        <ExperienceTimeline items={profile.experience} />
                    </ScrollReveal>

                    <div className="space-y-12">
                        <ScrollReveal delay={200}>
                            <EducationList items={profile.education} />
                        </ScrollReveal>

                        <ScrollReveal delay={300}>
                            <CertificateList items={profile.certificates} />
                        </ScrollReveal>
                    </div>
                </div>
            </Container>
        </main>
    );
}
