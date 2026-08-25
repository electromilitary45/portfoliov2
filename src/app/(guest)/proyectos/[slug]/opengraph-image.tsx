import { ImageResponse } from "next/og";
import { getProjectBySlug } from "@/features/projects/project.service";

export const alt = "Proyecto - Portfolio Derek Leiva";
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = "image/png";

export default async function ProjectOgImage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);

    const title = project?.title ?? "Proyectos";
    const summary = project?.summary
        ? project.summary.length > 160
            ? `${project.summary.slice(0, 157)}...`
            : project.summary
        : "Portfolio Derek Leiva";

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    backgroundColor: "#fafafa",
                    padding: 80,
                    borderTop: "16px solid #dc2626",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 20,
                        fontSize: 28,
                        color: "#dc2626",
                        textTransform: "uppercase",
                        letterSpacing: "0.35em",
                        fontWeight: 600,
                    }}
                >
                    <div
                        style={{
                            width: 24,
                            height: 24,
                            borderRadius: 999,
                            backgroundColor: "#dc2626",
                            display: "flex",
                        }}
                    />
                    Proyecto
                </div>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 32,
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            fontSize: 84,
                            fontWeight: 700,
                            color: "#0a0a0a",
                            lineHeight: 1.05,
                            letterSpacing: "-0.04em",
                        }}
                    >
                        {title}
                    </div>

                    <div
                        style={{
                            display: "flex",
                            fontSize: 34,
                            color: "#525252",
                            lineHeight: 1.4,
                        }}
                    >
                        {summary}
                    </div>
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: 26,
                        color: "#a3a3a3",
                        textTransform: "uppercase",
                        letterSpacing: "0.25em",
                    }}
                >
                    <div style={{ display: "flex" }}>Portfolio Derek Leiva</div>
                    <div style={{ display: "flex", color: "#dc2626" }}>
                        portfolio.villalobossebas.me
                    </div>
                </div>
            </div>
        ),
        { ...size }
    );
}
