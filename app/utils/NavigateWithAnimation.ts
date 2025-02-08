import { useRouter } from 'next/navigation';
import {
  pagePop,
  pagePopDown,
  pageSlideDown,
  pageSlideUp,
} from '@/app/styles/transitions';

interface NavigateWithAnimationProps {
  href: string;
  animation?: 'pop' | 'slide-down' | 'slide-up' | 'pop-down' | 'pop-up';
  back?: boolean;
  duration?: number;
  onComplete?: () => void;
}

interface TransitionStyle {
  transition: {
    duration: number;
    ease: number[];
    type?: string;
  };
}
export function useNavigateWithAnimation() {
  const router = useRouter();
  const controller = new AbortController();

  return ({
    href,
    animation = 'pop',
    back = false,
    duration = 600,
    onComplete,
  }: NavigateWithAnimationProps) => {
    const main = document.querySelector('main');
    if (!main) return;

    // Abort any ongoing transitions
    if (controller.signal.aborted) return;
    controller.abort();

    // Create wrapper for the temporary container to handle stacking context
    const tempWrapper = document.createElement('div');
    tempWrapper.style.position = 'fixed';
    tempWrapper.style.top = '0';
    tempWrapper.style.left = '0';
    tempWrapper.style.width = '100%';
    tempWrapper.style.height = '100%';
    tempWrapper.style.zIndex = '100';
    tempWrapper.style.pointerEvents = 'none';
    tempWrapper.style.isolation = 'isolate'; // Create new stacking context

    // Create temporary container for previous page
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.top = '0';
    tempContainer.style.left = '0';
    tempContainer.style.width = '100%';
    tempContainer.style.height = '100%';
    tempContainer.style.backgroundColor = getComputedStyle(
      document.body,
    ).backgroundColor;

    // Get animation styles
    const animationType =
      animation === 'slide-down'
        ? pageSlideDown(duration)
        : animation === 'slide-up'
          ? pageSlideUp(duration)
          : animation === 'pop'
            ? pagePop(duration)
            : animation === 'pop-down'
              ? pagePopDown(duration)
              : pagePop(duration);

    const animationStyles = back ? animationType.reverse : animationType;

    // Setup transition properties
    const applyTransition = (element: HTMLElement, styles: TransitionStyle) => {
      element.style.transition = `
        all ${styles.transition.duration}s
        cubic-bezier(${styles.transition.ease.join(', ')})
      `;
    };

    // Clone current page content to temp container
    tempContainer.appendChild(main.cloneNode(true));
    tempWrapper.appendChild(tempContainer);
    document.body.appendChild(tempWrapper);

    // Hide original main content immediately
    Object.assign(main.style, animationStyles.enterFrom);

    // Navigate immediately after setting up temporary container
    router.push(href);

    // Start leave animation for previous page (temp container)
    Object.assign(tempContainer.style, animationStyles.leaveFrom);

    requestAnimationFrame(() => {
      applyTransition(tempContainer, animationStyles.leaveActive);
      Object.assign(tempContainer.style, animationStyles.leaveTo);

      const finishLeave = () => {
        tempContainer.removeEventListener('transitionend', finishLeave);

        // Wait for new page content to be loaded after leave animation completes
        const checkContent = setInterval(() => {
          if (main.children.length > 0) {
            clearInterval(checkContent);

            // Start enter animation for new page with slight delay
            requestAnimationFrame(() => {
              main.classList.add('page-enter-active');
              applyTransition(main, animationStyles.enterActive);
              Object.assign(main.style, animationStyles.enterTo);

              const finishEnter = () => {
                main.removeEventListener('transitionend', finishEnter);
                main.classList.remove('page-enter-active');
                main.style.transition = '';
                main.style.position = '';
                main.style.zIndex = '';
                tempWrapper.remove();
                onComplete?.();
              };

              main.addEventListener('transitionend', finishEnter);
            });
          }
        }, 50);

        setTimeout(() => clearInterval(checkContent), 5000);
      };

      tempContainer.addEventListener('transitionend', finishLeave);
    });
  };
}
