import { useRouter } from 'next/navigation';
import { pagePop, pagePopDown, pageSlideDown, pageSlideUp } from '@/app/styles/transitions';

interface NavigateWithAnimationProps {
  href: string;
  animation?: 'pop' | 'slide-down' | 'slide-up' | 'pop-down' | 'pop-up';
  back?: boolean;
  duration?: number;
  delayBetweenPages?: number;
  onComplete?: () => void;
}

export function useNavigateWithAnimation() {
  const router = useRouter();
  const controller = new AbortController();

  return ({
    href,
    animation = 'pop',
    back = false,
    duration = 600,
    delayBetweenPages = 0,
    onComplete,
  }: NavigateWithAnimationProps) => {
    const main = document.querySelector('main');
    if (!main) return;

    // Abort any ongoing transitions
    if (controller.signal.aborted) return;
    controller.abort();

    // Clean up previous transitions
    main.style.transition = 'none';
    main.classList.remove('page-leave-active', 'page-enter-active');

    // Get animation styles
    const animationType = 
      animation === 'slide-down' ? pageSlideDown(duration) :
      animation === 'slide-up' ? pageSlideUp(duration) :
      animation === 'pop' ? pagePop(duration) :
      animation === 'pop-down' ? pagePopDown(duration) :
      pagePop(duration);

    const animationStyles = back ? animationType.reverse : animationType;

    // Setup transition properties
    const applyTransition = (styles: any) => {
      main.style.transition = `
        all ${styles.transition.duration}s
        cubic-bezier(${styles.transition.ease.join(', ')})
      `;
    };

    // Start leave animation
    main.classList.add('page-leave-active');
    Object.assign(main.style, animationStyles.leaveFrom);
    
    requestAnimationFrame(() => {
      applyTransition(animationStyles.leaveActive);
      Object.assign(main.style, animationStyles.leaveTo);

      const finishLeave = () => {
        main.removeEventListener('transitionend', finishLeave);
        
        // Reset to enter-from state without transition
        main.style.transition = 'none';
        Object.assign(main.style, animationStyles.enterFrom);
        
        router.push(href);

        // Start enter animation after minimal delay
        setTimeout(() => {
          requestAnimationFrame(() => {
            main.classList.remove('page-leave-active');
            main.classList.add('page-enter-active');

            // Apply enter transition properties
            main.style.transition = `
              all ${animationStyles.enterActive.transition.duration}s
              cubic-bezier(${animationStyles.enterActive.transition.ease.join(', ')})
            `;
            
            Object.assign(main.style, animationStyles.enterTo);

            const finishEnter = () => {
              main.removeEventListener('transitionend', finishEnter);
              main.classList.remove('page-enter-active');
              main.style.transition = '';
              onComplete?.();
            };

            main.addEventListener('transitionend', finishEnter);
          });
        }, 100); // Minimal delay for route update
      };

      main.addEventListener('transitionend', finishLeave);
    });
  };
}
