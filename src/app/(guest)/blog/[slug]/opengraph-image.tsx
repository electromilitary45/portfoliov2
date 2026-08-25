import { ImageResponse } from "next/og";
import { getBlogPostBySlug } from "@/features/blog/blog-post.service";

export const alt = "Artículo - Portfolio Derek Leiva";
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = "image/png";

export default async function BlogPostOgImage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);

    const title = post?.title ?? "Blog";
    const excerpt = post?.excerpt
        ? post.excerpt.length > 160
            ? `${post.excerpt.slice(0, 157)}...`
            : post.excerpt
        : "Portfolio Derek Leiva";
    const tags = post?.tags.slice(0, 3) ?? [];

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
                    Blog
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
                        {excerpt}
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
                    <div style={{ display: "flex", gap: 16 }}>
                        {tags.map((tag) => (
                            <div
                                key={tag}
                                style={{
                                    display: "flex",
                                    padding: "8px 20px",
                                    border: "1px solid #e5e5e5",
                                    color: "#525252",
                                }}
                            >
                                {tag}
                            </div>
                        ))}
                    </div>
                    <div style={{ display: "flex", color: "#dc2626" }}>
                        portfolio.villalobossebas.me
                    </div>
                </div>
            </div>
        ),
        { ...size }
    );
}
