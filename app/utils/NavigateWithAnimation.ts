import { useRouter } from 'next/navigation';
import { pagePop, pageSlideDown, pageSlideUp } from '@/app/styles/transitions';

interface NavigateWithAnimationProps {
  href: string;
  animation?: 'pop' | 'slide-down' | 'slide-up';
  duration?: number;
  delayBetweenPages?: number;
  onComplete?: () => void;
}

export function useNavigateWithAnimation() {
  const router = useRouter();

  return ({
    href,
    animation = 'pop',
    duration = 300,
    delayBetweenPages = 0,
    onComplete,
  }: NavigateWithAnimationProps) => {
    const main = document.querySelector('main');
    const halfDuration = duration / 2;

    // Get animation styles based on type
    const animationStyles = 
      animation === 'slide-down' ? pageSlideDown(duration) :
      animation === 'slide-up' ? pageSlideUp(duration) :
      animation === 'pop' ? pagePop(duration) :
      pagePop(duration);

    if (!animationStyles) return;

    // Apply duration directly to the element's style
    if (main) {
      main.style.transitionDuration = `${halfDuration}ms`;
    }

    // Start leave animation
    main?.classList.add('page-leave-active');
    Object.assign(main!.style, animationStyles.exit);

    // Force reflow to trigger animation
    void main?.offsetHeight;

    // Start leave transition
    Object.assign(main!.style, animationStyles.exitActive);

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
            // Start enter animation
            Object.assign(main!.style, animationStyles.enter);
            main?.classList.remove('page-leave-active');
            main?.classList.add('page-enter-active');

            // Force reflow to trigger animation
            void main?.offsetHeight;

            // Add transition duration
            if (main) {
              main.style.transitionDuration = `${halfDuration}ms`;
            }

            // Start enter transition
            Object.assign(main!.style, animationStyles.enterActive);

            // Clean up enter animation after delay
            setTimeout(() => {
              main?.classList.remove('page-enter-active');
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
