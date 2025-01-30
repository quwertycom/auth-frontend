import { useRouter } from "next/navigation";

interface NavigateWithAnimationProps {
    href: string;
    animation?: 'pop' | 'slide-down' | 'slide-up';
    duration?: number;
    delayBetweenPages?: number;
    onComplete?: () => void;
}

export function useNavigateWithAnimation() {
    const router = useRouter();

    return ({ href, animation = 'pop', duration = 300, delayBetweenPages = 100, onComplete }: NavigateWithAnimationProps) => {
        const main = document.querySelector('main');
        const halfDuration = duration / 2;
        const animationPrefix = `page-${animation}`;

        // Apply duration directly to the element's style
        if (main) {
            main.style.transitionDuration = `${halfDuration}ms`;
        }

        // Start leave animation
        main?.classList.add(`${animationPrefix}-leave-active`);
        main?.classList.add(`${animationPrefix}-leave-from`);
        
        // Force reflow to trigger animation
        void main?.offsetHeight;
        
        // Start leave transition
        main?.classList.remove(`${animationPrefix}-leave-from`);
        main?.classList.add(`${animationPrefix}-leave-to`);

        setTimeout(() => {
            // Ensure minimum 50ms delay between pages
            const effectiveDelay = delayBetweenPages < 50 ? 50 : delayBetweenPages;

            // Add delay before navigation
            router.push(href);
            setTimeout(() => {
                // Remove transition duration before removing leave classes
                if (main) {
                    main.style.transitionDuration = '0ms';
                }

                // Wait for the new page to load before starting enter animation
                setTimeout(() => {
                    // Add another delay before starting enter animation
                    setTimeout(() => {
                        main?.classList.add(`${animationPrefix}-enter-from`);
                        // Clean up leave animation
                        main?.classList.remove(`${animationPrefix}-leave-active`);
                        main?.classList.remove(`${animationPrefix}-leave-to`);
                        // Start enter animation
                        main?.classList.add(`${animationPrefix}-enter-active`);
                        
                        // Force reflow to trigger animation
                        void main?.offsetHeight;

                        // add transition duration
                        if (main) {
                            main.style.transitionDuration = `${halfDuration}ms`;
                        }
                        
                        // Start enter transition
                        main?.classList.remove(`${animationPrefix}-enter-from`);
                        main?.classList.add(`${animationPrefix}-enter-to`);

                        // Clean up enter animation after delay
                        setTimeout(() => {
                            main?.classList.remove(`${animationPrefix}-enter-active`);
                            main?.classList.remove(`${animationPrefix}-enter-to`);
                            
                            if (onComplete) {
                                onComplete();
                            }
                        }, halfDuration);
                    }, effectiveDelay);
                }, 0); // Small delay to ensure new page is ready
            }, effectiveDelay);
        }, halfDuration);
    };
}