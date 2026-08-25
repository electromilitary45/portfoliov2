import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import {
    getContactMessages,
} from "@/features/contact/contact.service";
import {
    deleteContactMessageAction,
} from "@/app/actions/contact/delete-contact-message.action";
import {
    markMessageReadAction,
} from "@/app/actions/contact/mark-message-read.action";
import type { ContactMessage } from "@/features/contact/contact-message.type";

type AdminMessagesPageProps = {
    searchParams: Promise<{
        updated?: string;
        deleted?: string;
        error?: string;
    }>;
};

function MessageRow({ message }: { message: ContactMessage }) {
    return (
        <article
            className={`border p-6 md:p-8 ${
                message.isRead
                    ? "border-white/5 bg-transparent"
                    : "border-red-500/40 bg-white/[0.03]"
            }`}
        >
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-lg font-semibold text-white">
                            {message.name}
                        </h3>

                        {!message.isRead && (
                            <span className="inline-flex items-center rounded-full bg-red-500/10 px-3 py-1 font-mono text-xs uppercase tracking-[0.1em] text-red-400">
                                Nuevo
                            </span>
                        )}
                    </div>

                    <a
                        href={`mailto:${message.email}`}
                        className="mt-1 inline-block font-mono text-sm text-neutral-400 transition hover:text-red-500"
                    >
                        {message.email}
                    </a>
                </div>

                <time className="font-mono text-xs uppercase tracking-[0.15em] text-neutral-500">
                    {new Date(message.createdAt).toLocaleString("es-ES", {
                        dateStyle: "medium",
                        timeStyle: "short",
                    })}
                </time>
            </div>

            <p className="mt-4 whitespace-pre-line text-sm leading-7 text-neutral-300">
                {message.message}
            </p>

            <div className="mt-6 flex flex-wrap gap-3 border-t border-white/5 pt-4">
                <form action={markMessageReadAction}>
                    <input type="hidden" name="messageId" value={message.id} />
                    <input
                        type="hidden"
                        name="isRead"
                        value={message.isRead ? "false" : "true"}
                    />
                    <button
                        type="submit"
                        className="border border-white/10 px-4 py-2 text-xs font-medium text-neutral-300 transition hover:border-red-500 hover:text-white"
                    >
                        {message.isRead ? "Marcar como no leído" : "Marcar como leído"}
                    </button>
                </form>

                <form action={deleteContactMessageAction}>
                    <input type="hidden" name="messageId" value={message.id} />
                    <button
                        type="submit"
                        className="border border-white/10 px-4 py-2 text-xs font-medium text-neutral-500 transition hover:border-red-600 hover:bg-red-600 hover:text-white"
                    >
                        Eliminar
                    </button>
                </form>
            </div>
        </article>
    );
}

export default async function AdminMessagesPage({
    searchParams,
}: AdminMessagesPageProps) {
    const [messages, params] = await Promise.all([
        getContactMessages(),
        searchParams,
    ]);

    const unreadCount = messages.filter((m) => !m.isRead).length;

    return (
        <section className="min-h-screen py-20">
            <Container className="lg:px-12">
                <PageHeader
                    variant="admin"
                    label="Admin / Mensajes"
                    title="Bandeja de contacto."
                    description="Mensajes enviados desde el formulario público. También llegan a tu correo vía Resend."
                />

                {(await params).updated && (
                    <div className="mt-8 border-l-4 border-green-500 bg-green-500/10 p-4 text-sm text-green-400">
                        Mensaje actualizado.
                    </div>
                )}

                {(await params).deleted && (
                    <div className="mt-8 border-l-4 border-green-500 bg-green-500/10 p-4 text-sm text-green-400">
                        Mensaje eliminado.
                    </div>
                )}

                {(await params).error && (
                    <div className="mt-8 border-l-4 border-red-600 bg-red-600/10 p-4 text-sm text-red-400">
                        Ocurrió un error: {(await params).error}.
                    </div>
                )}

                <section className="mt-14 border-t border-white/10 pt-10">
                    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="font-mono text-xs uppercase tracking-[0.25em] text-red-500">
                                Inbox
                            </p>

                            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white">
                                Mensajes recibidos
                            </h2>
                        </div>

                        <p className="font-mono text-sm text-neutral-500">
                            {messages.length} total · {unreadCount} sin leer
                        </p>
                    </div>

                    <div className="mt-10 space-y-4">
                        {messages.length === 0 ? (
                            <div className="border border-dashed border-white/10 p-16 text-center">
                                <p className="font-mono text-sm uppercase tracking-[0.25em] text-neutral-500">
                                    Aún no hay mensajes
                                </p>
                                <p className="mt-3 text-sm text-neutral-600">
                                    Los envíos del formulario de contacto aparecerán aquí.
                                </p>
                            </div>
                        ) : (
                            messages.map((message) => (
                                <MessageRow key={message.id} message={message} />
                            ))
                        )}
                    </div>
                </section>
            </Container>
        </section>
    );
}
