export interface Transition {
  enterFrom: {
    opacity: number;
    transform: string;
    filter: string;
  },
  enterTo: {
    opacity: number;
    transform: string;
    filter: string;
  },
  enterActive: {
    transition: {
      type: string;
      ease: [number, number, number, number];
      duration: number;
    };
  };
  leaveFrom: {
    opacity: number;
    transform: string;
    filter: string;
  },
  leaveTo: {
    opacity: number;
    transform: string;
    filter: string;
  },
  leaveActive: {
    transition: {
      type: string;
      ease: [number, number, number, number];
      duration: number;
    };
  };
}

export interface TransitionBundle {
  normal: Transition;
  reverse: Transition;
}

const reverseTransition = (transition: Transition) => ({
  ...transition,
  enterFrom: transition.leaveTo,
  enterTo: transition.leaveFrom,
  enterActive: transition.enterActive,
  leaveFrom: transition.enterTo,
  leaveTo: transition.enterFrom,
  leaveActive: transition.leaveActive,
});

// --------------------------------------------------------
// --- Easing Functions -----------------------------------
// --------------------------------------------------------

export const easeInQuad: [number, number, number, number] = [0.11, 0, 0.5, 0];
export const easeOutQuad: [number, number, number, number] = [0.5, 1, 0.89, 1];
export const easeInOutQuad: [number, number, number, number] = [0.45, 0, 0.55, 1];

export const easeInCubic: [number, number, number, number] = [0.32, 0, 0.67, 0];
export const easeOutCubic: [number, number, number, number] = [0.33, 1, 0.68, 1];
export const easeInOutCubic: [number, number, number, number] = [0.65, 0, 0.35, 1];

export const easeInQuart: [number, number, number, number] = [0.5, 0, 0.75, 0];
export const easeOutQuart: [number, number, number, number] = [0.25, 1, 0.5, 1];
export const easeInOutQuart: [number, number, number, number] = [0.76, 0, 0.24, 1];

export const easeInQuint: [number, number, number, number] = [0.64, 0, 0.78, 0];
export const easeOutQuint: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const easeInOutQuint: [number, number, number, number] = [0.83, 0, 0.17, 1];

export const easeInExpo: [number, number, number, number] = [0.7, 0, 0.84, 0];
export const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const easeInOutExpo: [number, number, number, number] = [0.87, 0, 0.13, 1];

export const easeInCirc: [number, number, number, number] = [0.55, 0, 1, 0.45];
export const easeOutCirc: [number, number, number, number] = [0, 0.55, 0.45, 1];
export const easeInOutCirc: [number, number, number, number] = [0.85, 0, 0.15, 1];

type EasingOption = 'quad' | 'cubic' | 'quart' | 'quint' | 'expo' | 'circ' | [number, number, number, number];

const getEasing = (easing: EasingOption, type: 'in' | 'out' | 'inOut'): [number, number, number, number] => {
  if (Array.isArray(easing)) {
    return easing;
  }

  const easingMap = {
    quad: {
      in: easeInQuad,
      out: easeOutQuad,
      inOut: easeInOutQuad,
    },
    cubic: {
      in: easeInCubic,
      out: easeOutCubic,
      inOut: easeInOutCubic,
    },
    quart: {
      in: easeInQuart,
      out: easeOutQuart,
      inOut: easeInOutQuart,
    },
    quint: {
      in: easeInQuint,
      out: easeOutQuint,
      inOut: easeInOutQuint,
    },
    expo: {
      in: easeInExpo,
      out: easeOutExpo,
      inOut: easeInOutExpo,
    },
    circ: {
      in: easeInCirc,
      out: easeOutCirc,
      inOut: easeInOutCirc,
    },
  };

  return easingMap[easing][type];
};

// --------------------------------------------------------
// --- Normal Transitions ---------------------------------
// --------------------------------------------------------

export const centerPop = (duration = 750, easing: EasingOption = 'cubic'): Transition => ({
  enterFrom: {
    opacity: 0,
    transform: 'scale(0.95)',
    filter: 'blur(2px)'
  },
  enterTo: {
    transform: 'scale(1)',
    opacity: 1,
    filter: 'blur(0)'
  },
  enterActive: {
    transition: {
      type: 'tween',
      ease: getEasing(easing, 'out'),
      duration: duration / 2000,
    },
  },
  leaveFrom: {
    transform: 'scale(1)',
    opacity: 1,
    filter: 'blur(0)'
  },
  leaveTo: {
    opacity: 0,
    transform: 'scale(1.05)',
    filter: 'blur(2px)'
  },
  leaveActive: {
    transition: {
      type: 'tween',
      ease: getEasing(easing, 'in'),
      duration: duration / 2000,
    },
  },
});

export const centerPopReverse = (duration = 750, easing: EasingOption = 'cubic'): Transition => reverseTransition(centerPop(duration, easing));

export const centerPopTransition = (duration = 750, easing: EasingOption = 'cubic'): TransitionBundle => ({
  normal: centerPop(duration, easing),
  reverse: centerPopReverse(duration, easing),
});

// --------------------------------------------------------
// --- Page Transitions -----------------------------------
// --------------------------------------------------------

export const pagePop = (duration = 600) => ({
  enterFrom: {
    scale: 0.9,
    opacity: 0,
    filter: 'blur(6px)',
  },
  enterTo: {
    scale: 1,
    opacity: 1,
    filter: 'blur(0)',
  },
  enterActive: {
    transition: {
      type: 'tween',
      ease: [0.33, 1, 0.68, 1],
      duration: duration / 1000,
    },
  },
  leaveFrom: {
    scale: 1,
    opacity: 1,
    filter: 'blur(0)',
  },
  leaveTo: {
    scale: 1.1,
    opacity: 0,
    filter: 'blur(6px)',
  },
  leaveActive: {
    transition: {
      type: 'tween',
      ease: [0.32, 0, 0.67, 0],
      duration: duration / 1000,
    },
  },
  reverse: {
    enterFrom: {
      scale: 1.1,
      opacity: 0,
      filter: 'blur(6px)',
    },
    enterTo: {
      scale: 1,
      opacity: 1,
      filter: 'blur(0)',
    },
    enterActive: {
      transition: {
        type: 'tween',
        ease: [0.33, 1, 0.68, 1],
        duration: duration / 1000,
      },
    },
    leaveFrom: {
      scale: 1,
      opacity: 1,
      filter: 'blur(0)',
    },
    leaveTo: {
      scale: 0.9,
      opacity: 0,
      filter: 'blur(6px)',
    },
    leaveActive: {
      transition: {
        type: 'tween',
        ease: [0.32, 0, 0.67, 0],
        duration: duration / 1000,
      },
    },
  },
});

export const defaultPagePop = pagePop();

export const pagePopDown = (duration = 600) => ({
  enterFrom: {
    scale: 0.95,
    opacity: 0,
    filter: 'blur(6px)',
    transform: 'translateY(0)',
  },
  enterTo: {
    scale: 1,
    opacity: 1,
    filter: 'blur(0)',
    transform: 'translateY(0)',
  },
  enterActive: {
    transition: {
      type: 'tween',
      ease: [0.33, 1, 0.68, 1],
      duration: duration / 1000,
    },
  },
  leaveFrom: {
    opacity: 1,
    filter: 'blur(0)',
    transform: 'translateY(0)',
    scale: 1,
  },
  leaveTo: {
    opacity: 0,
    filter: 'blur(6px)',
    scale: 0.96,
    transform: 'translateY(4rem)',
  },
  leaveActive: {
    transition: {
      type: 'tween',
      ease: [0.32, 0, 0.67, 0],
      duration: duration / 1000,
    },
  },
  reverse: {
    enterFrom: {
      scale: 0.96,
      opacity: 0,
      filter: 'blur(6px)',
      transform: 'translateY(4rem)',
    },
    enterTo: {
      scale: 1,
      opacity: 1,
      filter: 'blur(0)',
      transform: 'translateY(0)',
    },
    enterActive: {
      transition: {
        type: 'tween',
        ease: [0.33, 1, 0.68, 1],
        duration: duration / 1000,
      },
    },
    leaveFrom: {
      scale: 1,
      opacity: 1,
      filter: 'blur(0)',
      transform: 'translateY(0)',
    },
    leaveTo: {
      scale: 0.95,
      opacity: 0,
      filter: 'blur(6px)',
      transform: 'translateY(0)',
    },
    leaveActive: {
      transition: {
        type: 'tween',
        ease: [0.32, 0, 0.67, 0],
        duration: duration / 1000,
      },
    },
  },
});

export const defaultPagePopDown = pagePopDown();

export const pageSlideDown = (duration = 600) => ({
  enterFrom: {
    transform: 'translateY(-4rem)',
    opacity: 0,
    filter: 'blur(6px)',
    scale: 1.04,
  },
  enterTo: {
    transform: 'translateY(0)',
    opacity: 1,
    filter: 'blur(0)',
    scale: 1,
  },
  enterActive: {
    transition: {
      type: 'tween',
      ease: [0.33, 1, 0.68, 1],
      duration: duration / 1000,
    },
  },
  leaveFrom: {
    transform: 'translateY(0)',
    opacity: 1,
    filter: 'blur(0)',
    scale: 1,
  },
  leaveTo: {
    transform: 'translateY(4rem)',
    opacity: 0,
    filter: 'blur(6px)',
    scale: 0.96,
  },
  leaveActive: {
    transition: {
      type: 'tween',
      ease: [0.32, 0, 0.67, 0],
      duration: duration / 1000,
    },
  },
  reverse: {
    enterFrom: {
      transform: 'translateY(4rem)',
      opacity: 0,
      filter: 'blur(6px)',
      scale: 0.96,
    },
    enterTo: {
      transform: 'translateY(0)',
      opacity: 1,
      filter: 'blur(0)',
      scale: 1,
    },
    enterActive: {
      transition: {
        type: 'tween',
        ease: [0.33, 1, 0.68, 1],
        duration: duration / 1000,
      },
    },
    leaveFrom: {
      transform: 'translateY(0)',
      opacity: 1,
      filter: 'blur(0)',
      scale: 1,
    },
    leaveTo: {
      transform: 'translateY(-4rem)',
      opacity: 0,
      filter: 'blur(6px)',
      scale: 1.04,
    },
    leaveActive: {
      transition: {
        type: 'tween',
        ease: [0.32, 0, 0.67, 0],
        duration: duration / 1000,
      },
    },
  },
});

export const defaultPageSlideDown = pageSlideDown();

export const pageSlideUp = (duration = 600) => ({
  enterFrom: {
    transform: 'translateY(4rem)',
    opacity: 0,
    filter: 'blur(6px)',
    scale: 1.04,
  },
  enterTo: {
    transform: 'translateY(0)',
    opacity: 1,
    filter: 'blur(0)',
    scale: 1,
  },
  enterActive: {
    transition: {
      type: 'tween',
      ease: [0.33, 1, 0.68, 1],
      duration: duration / 1000,
    },
  },
  leaveFrom: {
    transform: 'translateY(0)',
    opacity: 1,
    filter: 'blur(0)',
    scale: 1,
  },
  leaveTo: {
    transform: 'translateY(-4rem)',
    opacity: 0,
    filter: 'blur(6px)',
    scale: 0.96,
  },
  leaveActive: {
    transition: {
      type: 'tween',
      ease: [0.32, 0, 0.67, 0],
      duration: duration / 1000,
    },
  },
  reverse: {
    enterFrom: {
      transform: 'translateY(-4rem)',
      opacity: 0,
      filter: 'blur(6px)',
      scale: 0.96,
    },
    enterTo: {
      transform: 'translateY(0)',
      opacity: 1,
      filter: 'blur(0)',
      scale: 1,
    },
    enterActive: {
      transition: {
        type: 'tween',
        ease: [0.33, 1, 0.68, 1],
        duration: duration / 1000,
      },
    },
    leaveFrom: {
      transform: 'translateY(0)',
      opacity: 1,
      filter: 'blur(0)',
      scale: 1,
    },
    leaveTo: {
      transform: 'translateY(4rem)',
      opacity: 0,
      filter: 'blur(6px)',
      scale: 1.04,
    },
    leaveActive: {
      transition: {
        type: 'tween',
        ease: [0.32, 0, 0.67, 0],
        duration: duration / 1000,
      },
    },
  },
});

export const defaultPageSlideUp = pageSlideUp();
