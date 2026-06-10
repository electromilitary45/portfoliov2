import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "admin";

type BaseButtonProps = {
    children: ReactNode;
    variant?: ButtonVariant;
    className?: string;
};

type ButtonAsLinkProps = BaseButtonProps & {
    href: string;
    target?: string;
    rel?: string;
};

type ButtonAsButtonProps = BaseButtonProps &
    ButtonHTMLAttributes<HTMLButtonElement> & {
        href?: undefined;
    };

type ButtonProps = ButtonAsLinkProps | ButtonAsButtonProps;

const variantClasses: Record<ButtonVariant, string> = {
    primary:
        "border border-neutral-950 bg-neutral-950 text-white hover:border-red-600 hover:bg-red-600",
    secondary:
        "border border-neutral-300 text-neutral-950 hover:border-neutral-950 hover:bg-white",
    ghost:
        "border border-transparent text-neutral-600 hover:border-neutral-200 hover:text-neutral-950",
    admin:
        "border border-white/10 text-neutral-300 hover:border-red-500 hover:text-white",
};

export function Button(props: ButtonProps) {
    const {
        children,
        variant = "primary",
        className = "",
    } = props;

    const classes = [
        "inline-flex items-center justify-center px-6 py-3 text-sm font-medium transition",
        variantClasses[variant],
        className,
    ]
        .filter(Boolean)
        .join(" ");

    if ("href" in props && props.href) {
        const { href, target, rel } = props;

        return (
            <Link href={href} target={target} rel={rel} className={classes}>
                {children}
            </Link>
        );
    }

    const { href, variant: _variant, className: _className, children: _children, ...buttonProps } = props;

    return (
        <button className={classes} {...buttonProps}>
            {children}
        </button>
    );
}