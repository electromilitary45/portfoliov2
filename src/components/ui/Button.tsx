import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant =
    | "primary"
    | "secondary"
    | "dark"
    | "darkSecondary"
    | "danger"
    | "ghost"
    | "ghostDark";

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

const baseClasses =
    "inline-flex items-center justify-center px-6 py-3 text-sm font-medium transition";

const variantClasses: Record<ButtonVariant, string> = {
    primary:
        "border border-neutral-950 bg-neutral-950 text-white hover:border-red-600 hover:bg-red-600",

    secondary:
        "border border-neutral-300 bg-white text-neutral-950 hover:border-neutral-950",

    dark:
        "border border-white bg-white text-neutral-950 hover:border-red-500 hover:bg-red-500 hover:text-white",

    darkSecondary:
        "border border-white/20 bg-transparent text-white hover:border-red-500 hover:text-red-500",

    danger:
        "border border-red-600 bg-red-600 text-white hover:border-red-700 hover:bg-red-700",

    ghost:
        "border border-transparent bg-transparent text-neutral-600 hover:border-neutral-200 hover:text-neutral-950",

    ghostDark:
        "border border-transparent bg-transparent text-neutral-400 hover:border-white/10 hover:text-white",
};

export function Button(props: ButtonProps) {
    const { children, variant = "primary", className = "" } = props;

    const classes = [baseClasses, variantClasses[variant], className]
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

    const {
        href,
        variant: _variant,
        className: _className,
        children: _children,
        ...buttonProps
    } = props;

    return (
        <button className={classes} {...buttonProps}>
            {children}
        </button>
    );
}