import { GuestFooter } from "@/components/layout/GuestFooter";
import { GuestNavbar } from "@/components/layout/GuestNavbar";
import { ScrollToTop } from "@/components/layout/ScrollToTop";

export default function GuestLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <GuestNavbar />
            {children}
            <GuestFooter />
            <ScrollToTop />
        </>
    );
}