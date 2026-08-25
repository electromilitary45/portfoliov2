type ContactNotificationEmailProps = {
    name: string;
    email: string;
    message: string;
};

export function ContactNotificationEmail({
    name,
    email,
    message,
}: ContactNotificationEmailProps) {
    const paragraphs = message.split(/\n{2,}/).filter(Boolean);

    return (
        <html lang="es">
            <body style={{ margin: 0, backgroundColor: "#fafafa", fontFamily: "Arial, Helvetica, sans-serif" }}>
                <div
                    style={{
                        maxWidth: 600,
                        margin: "0 auto",
                        borderTop: "8px solid #dc2626",
                        backgroundColor: "#ffffff",
                        padding: "40px 48px",
                    }}
                >
                    <p
                        style={{
                            margin: 0,
                            fontSize: 12,
                            fontWeight: 700,
                            letterSpacing: "0.3em",
                            textTransform: "uppercase",
                            color: "#dc2626",
                        }}
                    >
                        Nuevo mensaje del portfolio
                    </p>

                    <h1 style={{ margin: "24px 0 0", fontSize: 26, color: "#0a0a0a" }}>
                        {name} te contactó
                    </h1>

                    <div
                        style={{
                            marginTop: 24,
                            padding: "20px 24px",
                            border: "1px solid #e5e5e5",
                            backgroundColor: "#fafafa",
                        }}
                    >
                        <p style={{ margin: 0, fontSize: 14, color: "#737373" }}>
                            <strong style={{ color: "#0a0a0a" }}>De:</strong> {name}
                        </p>
                        <p style={{ margin: "8px 0 0", fontSize: 14, color: "#737373" }}>
                            <strong style={{ color: "#0a0a0a" }}>Email:</strong>{" "}
                            <a href={`mailto:${email}`} style={{ color: "#dc2626" }}>
                                {email}
                            </a>
                        </p>
                    </div>

                    <div style={{ marginTop: 32 }}>
                        {paragraphs.map((paragraph, index) => (
                            <p
                                key={index}
                                style={{
                                    margin: "0 0 16px",
                                    fontSize: 15,
                                    lineHeight: 1.7,
                                    color: "#404040",
                                    whiteSpace: "pre-line",
                                }}
                            >
                                {paragraph}
                            </p>
                        ))}
                    </div>

                    <p
                        style={{
                            margin: "40px 0 0",
                            paddingTop: 24,
                            borderTop: "1px solid #e5e5e5",
                            fontSize: 11,
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            color: "#a3a3a3",
                        }}
                    >
                        Enviado desde portfolio.villalobossebas.me
                    </p>
                </div>
            </body>
        </html>
    );
}
