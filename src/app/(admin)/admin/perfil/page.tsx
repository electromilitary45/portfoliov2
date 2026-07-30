import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { getAdminExperiences, getAdminEducation, getAdminCertificates, getAdminProfile } from "@/features/profile/profile.service";
import { CreateExperienceModal } from "@/features/profile/components/CreateExperienceModal";
import { UpdateExperienceModal } from "@/features/profile/components/UpdateExperienceModal";
import { DeleteExperienceButton } from "@/features/profile/components/DeleteExperienceButton";
import { CreateEducationModal } from "@/features/profile/components/CreateEducationModal";
import { UpdateEducationModal } from "@/features/profile/components/UpdateEducationModal";
import { DeleteEducationButton } from "@/features/profile/components/DeleteEducationButton";
import { CreateCertificateModal } from "@/features/profile/components/CreateCertificateModal";
import { AdminCertificateList } from "@/features/profile/components/AdminCertificateList";
import { ProfileAvatarUpload } from "@/features/profile/components/ProfileAvatarUpload";
import { FeedbackBanner } from "@/features/profile/components/FeedbackBanner";

type Props = {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AdminProfilePage({ searchParams }: Props) {
    const params = await searchParams;
    const experiences = await getAdminExperiences();
    const educationList = await getAdminEducation();
    const certificates = await getAdminCertificates();
    const { avatarUrl } = await getAdminProfile();

    return (
        <section className="min-h-screen py-20">
            <Container className="lg:px-12">
                <PageHeader
                    variant="admin"
                    label="Admin / Perfil"
                    title="Gestionar perfil."
                    description="Aquí administraremos experiencia, estudios, certificados, tecnologías y contenido de la página Sobre mí."
                />

                <FeedbackBanner params={params} />

                <section className="mt-14 border-t border-white/10 pt-10">
                    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="font-mono text-xs uppercase tracking-[0.25em] text-red-500">
                                Profile CMS
                            </p>

                            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white">
                                Foto de perfil
                            </h2>

                            <p className="mt-4 max-w-2xl text-sm leading-6 text-neutral-500">
                                Sube una foto tuya para mostrarla en la página Sobre mí.
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 border border-white/10 bg-neutral-950 p-6">
                        <ProfileAvatarUpload currentAvatarUrl={avatarUrl} />
                    </div>
                </section>

                <section className="mt-14 border-t border-white/10 pt-10">
                    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="font-mono text-xs uppercase tracking-[0.25em] text-red-500">
                                Profile CMS
                            </p>

                            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white">
                                Contenido profesional
                            </h2>

                            <p className="mt-4 max-w-2xl text-sm leading-6 text-neutral-500">
                                Administra tu experiencia laboral, estudios y certificados.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="mt-14 border-t border-white/10 pt-10">
                    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="font-mono text-xs uppercase tracking-[0.25em] text-red-500">
                                01 — Experiencia
                            </p>

                            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white">
                                Experiencia laboral
                            </h2>
                        </div>

                        <CreateExperienceModal />
                    </div>

                    <div className="mt-10 overflow-hidden border border-white/10">
                        {experiences.map((experience) => (
                            <article
                                key={experience.id}
                                className="grid gap-5 border-b border-white/10 bg-neutral-950 p-5 last:border-b-0 md:grid-cols-[1fr_auto]"
                            >
                                <div>
                                    <h3 className="text-xl font-semibold text-white">
                                        {experience.role}
                                    </h3>

                                    <p className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-red-500">
                                        {experience.company} — {experience.period}
                                    </p>

                                    <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-400">
                                        {experience.description}
                                    </p>

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {experience.stack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="border border-white/10 px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-neutral-500"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col items-start gap-3 md:items-end md:justify-center">
                                    <div className="flex flex-wrap gap-2 md:justify-end">
                                        <UpdateExperienceModal experience={experience} />
                                        <DeleteExperienceButton experienceId={experience.id} role={experience.role} />
                                    </div>
                                </div>
                            </article>
                        ))}

                        {experiences.length === 0 && (
                            <div className="bg-neutral-950 p-10 text-center">
                                <p className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-600">
                                    No hay experiencias registradas
                                </p>
                                <p className="mt-2 text-sm text-neutral-500">
                                    Crea tu primera experiencia usando el botón de arriba.
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                <section className="mt-14 border-t border-white/10 pt-10">
                    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="font-mono text-xs uppercase tracking-[0.25em] text-red-500">
                                02 — Estudios
                            </p>

                            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white">
                                Formación académica
                            </h2>
                        </div>

                        <CreateEducationModal />
                    </div>

                    <div className="mt-10 overflow-hidden border border-white/10">
                        {educationList.map((education) => (
                            <article
                                key={education.id}
                                className="grid gap-5 border-b border-white/10 bg-neutral-950 p-5 last:border-b-0 md:grid-cols-[1fr_auto]"
                            >
                                <div>
                                    <h3 className="text-xl font-semibold text-white">
                                        {education.title}
                                    </h3>

                                    <p className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-red-500">
                                        {education.institution} — {education.period}
                                    </p>
                                </div>

                                <div className="flex flex-col items-start gap-3 md:items-end md:justify-center">
                                    <div className="flex flex-wrap gap-2 md:justify-end">
                                        <UpdateEducationModal education={education} />
                                        <DeleteEducationButton educationId={education.id} title={education.title} />
                                    </div>
                                </div>
                            </article>
                        ))}

                        {educationList.length === 0 && (
                            <div className="bg-neutral-950 p-10 text-center">
                                <p className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-600">
                                    No hay formación registrada
                                </p>
                                <p className="mt-2 text-sm text-neutral-500">
                                    Crea tu primera formación usando el botón de arriba.
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                <section className="mt-14 border-t border-white/10 pt-10">
                    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="font-mono text-xs uppercase tracking-[0.25em] text-red-500">
                                03 — Certificados
                            </p>

                            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white">
                                Certificaciones
                            </h2>
                        </div>

                        <CreateCertificateModal />
                    </div>

                    <div className="mt-10 overflow-hidden border border-white/10">
                        <AdminCertificateList certificates={certificates} />
                    </div>
                </section>
            </Container>
        </section>
    );
}
