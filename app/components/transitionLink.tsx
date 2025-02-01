'use client';

import Link from 'next/link';
import { useNavigateWithAnimation } from '../utils/NavigateWithAnimation';

interface TransitionLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  href: string;
  animation?: 'pop' | 'slide-down' | 'slide-up' | 'pop-down' | 'pop-up';
  back?: boolean;
  duration?: number;
  delayBetweenPages?: number;
  onComplete?: () => void;
  size?: 'sm' | 'md' | 'lg';
  color?:
    | 'foreground'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger';
  underline?: 'none' | 'hover' | 'always' | 'active' | 'focus';
  isExternal?: boolean;
  showAnchorIcon?: boolean;
  anchorIcon?: React.ReactNode;
  isBlock?: boolean;
  isDisabled?: boolean;
  disableAnimation?: boolean;
}

export default function TransitionLink({
  children,
  href,
  animation = 'pop',
  back = false,
  duration = 300,
  delayBetweenPages = 100,
  onComplete,
  className = '',
  size = 'md',
  color = 'primary',
  underline = 'none',
  isExternal = false,
  showAnchorIcon = false,
  anchorIcon,
  isBlock = false,
  isDisabled = false,
  disableAnimation = false,
  ...props
}: TransitionLinkProps) {
  const navigateWithAnimation = useNavigateWithAnimation();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isDisabled) return;
    e.preventDefault();
    navigateWithAnimation({
      href,
      animation,
      back,
      duration,
      delayBetweenPages,
      onComplete,
    });
  };

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const heroUIStyles = `
    ${sizeClasses[size]}
    text-${color} hover:text-${color}/80 
    transition-colors duration-200
    focus:outline-none focus-visible:ring-2 focus-visible:ring-${color}/50
    data-[focus-visible]:ring-2 data-[focus-visible]:ring-${color}/50
    ${underline === 'hover' ? 'hover:underline' : ''}
    ${underline === 'always' ? 'underline' : ''}
    ${underline === 'active' ? 'active:underline' : ''}
    ${underline === 'focus' ? 'focus:underline' : ''}
    ${isBlock ? 'block w-full' : ''}
    ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${disableAnimation ? 'transition-none' : ''}
    ${className}
  `;

  return (
    <Link
      href={href}
      className={heroUIStyles}
      onClick={handleClick}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      aria-disabled={isDisabled}
      {...props}
    >
      {children}
      {showAnchorIcon && (
        <span className="ml-1">
          {anchorIcon || (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="inline-block"
            >
              <path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19V6.413L11.207 14.207L9.793 12.793L17.585 5H13V3H21Z" />
            </svg>
          )}
        </span>
      )}
    </Link>
  );
}
