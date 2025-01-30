"use client";

import Link, { LinkProps } from "next/link";
import { useNavigateWithAnimation } from "../utils/NavigateWithAnimation";

interface TransitionLinkProps extends LinkProps {
    children: React.ReactNode;
    href: string;
    animation?: 'pop' | 'slide-down' | 'slide-up';
    duration?: number;
    delayBetweenPages?: number;
    onComplete?: () => void;
}

export default function TransitionLink({ children, href, animation = 'pop', duration = 300, delayBetweenPages = 100, onComplete, ...props }: TransitionLinkProps) {
    const navigateWithAnimation = useNavigateWithAnimation();

    async function handleClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        e.preventDefault();
        navigateWithAnimation({ href, animation, duration, delayBetweenPages, onComplete });
    }

    return (
        <Link onClick={handleClick} href={href} {...props}>
            {children}
        </Link>
    );

}