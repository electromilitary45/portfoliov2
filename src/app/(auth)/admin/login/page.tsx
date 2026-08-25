import { redirect } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function AdminLoginPage() {
    async function signIn(formData: FormData) {
        "use server";

        const email = String(formData.get("email") ?? "");
        const password = String(formData.get("password") ?? "");

        const supabase = await createSupabaseServerClient();

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            redirect("/admin/login?error=invalid_credentials");
        }

        redirect("/admin");
    }

    return (
        <main className="palette-default min-h-screen bg-neutral-950 px-6 py-20 text-white">
            <section className="mx-auto max-w-md">
                <p className="font-mono text-sm uppercase tracking-[0.35em] text-red-500">
                    Admin Login
                </p>

                <h1 className="mt-6 text-5xl font-semibold tracking-[-0.05em]">
                    Acceso privado.
                </h1>

                <p className="mt-6 leading-7 text-neutral-400">
                    Inicia sesión para administrar proyectos, blog y contenido del
                    portfolio.
                </p>

                <form action={signIn} className="mt-10 space-y-4">
                    <div>
                        <label className="text-sm text-neutral-300" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-neutral-300" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
                        />
                    </div>

                    <Button type="submit" variant="dark" className="w-full">
                        Entrar
                    </Button>
                </form>
            </section>
        </main>
    );
}