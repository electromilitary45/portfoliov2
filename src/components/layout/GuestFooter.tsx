export function GuestFooter() {
    return (
        <footer className="border-t border-neutral-200">
            <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 text-sm text-neutral-500 md:flex-row md:items-center md:justify-between">
                <p>© {new Date().getFullYear()} Developer Portfolio.</p>
                <p className="font-mono uppercase tracking-[0.25em]">
                    Built with Next.js
                </p>
            </div>
        </footer>
    );
}