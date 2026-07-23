type FeedbackBannerProps = {
    params: Record<string, string | string[] | undefined>;
};

const feedbackMessages: Record<string, { message: string; type: "success" | "error" }> = {
    created: { message: "Experiencia creada correctamente.", type: "success" },
    updated: { message: "Experiencia actualizada correctamente.", type: "success" },
    deleted: { message: "Experiencia eliminada correctamente.", type: "success" },
    missing_required_fields: { message: "Faltan campos obligatorios (rol, empresa, periodo).", type: "error" },
    create_failed: { message: "Error al crear la experiencia.", type: "error" },
    update_failed: { message: "Error al actualizar la experiencia.", type: "error" },
    delete_failed: { message: "Error al eliminar la experiencia.", type: "error" },
    missing_experience_id: { message: "Falta el ID de la experiencia.", type: "error" },
    invalid_experience_update: { message: "Datos inválidos para actualizar.", type: "error" },
};

export function FeedbackBanner({ params }: FeedbackBannerProps) {
    const error = typeof params.error === "string" ? params.error : undefined;
    const successParam =
        typeof params.created === "string"
            ? "created"
            : typeof params.updated === "string"
                ? "updated"
                : typeof params.deleted === "string"
                    ? "deleted"
                    : undefined;

    const feedbackKey = error ?? successParam;

    if (!feedbackKey || !feedbackMessages[feedbackKey]) {
        return null;
    }

    const { message, type } = feedbackMessages[feedbackKey];

    return (
        <div
            className={`mt-6 border px-5 py-4 text-sm ${
                type === "success"
                    ? "border-green-500/30 bg-green-500/10 text-green-300"
                    : "border-red-500/30 bg-red-500/10 text-red-300"
            }`}
        >
            <p className="font-medium">
                {type === "success" ? "✓" : "✗"} {message}
            </p>
        </div>
    );
}
