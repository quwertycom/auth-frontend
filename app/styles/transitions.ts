// --------------------------------------------------------
// --- Normal Transitions ---------------------------------
// --------------------------------------------------------

export const centerPop = (duration = 1000) => ({
  enter: {
    scale: 0.5,
    opacity: 0,
    transform: 'scale(0.5)',
    filter: 'blur(8px)',
  },
  enterActive: {
    transform: 'scale(1)',
    opacity: 1,
    filter: 'blur(0)',
    transition: {
      type: 'tween',
      ease: [0, 0.55, 0.45, 1],
      duration: duration / 2 / 1000,
    },
  },
  exit: {
    transform: 'scale(1)',
    opacity: 1,
    filter: 'blur(0)',
  },
  exitActive: {
    opacity: 0,
    transform: 'scale(0.75)',
    filter: 'blur(8px)',
    transition: {
      type: 'tween',
      ease: [0.4, 0, 0.6, 1],
      duration: duration / 2 / 1000,
    },
  },
});

export const defaultCenterPop = centerPop();

export const scaleDown = (duration = 1000) => ({
  enter: {
    scale: 1.25,
    opacity: 0,
    filter: 'blur(8px)',
  },
  enterActive: {
    scale: 1,
    opacity: 1,
    filter: 'blur(0)',
    transition: {
      type: 'tween',
      ease: [0, 0.55, 0.45, 1],
      duration: duration / 2 / 1000,
    },
  },
  exit: {
    scale: 1,
    opacity: 1,
    filter: 'blur(0)',
  },
  exitActive: {
    scale: 0.75,
    opacity: 0,
    filter: 'blur(8px)',
    transition: {
      type: 'tween',
      ease: [0.4, 0, 0.6, 1],
      duration: duration / 2 / 1000,
    },
  },
});

export const defaultScaleDown = scaleDown();

export const scaleUp = (duration = 1000) => ({
  enter: {
    scale: 0.75,
    opacity: 0,
    filter: 'blur(8px)',
  },
  enterActive: {
    scale: 1,
    opacity: 1,
    filter: 'blur(0)',
    transition: {
      type: 'tween',
      ease: [0, 0.55, 0.45, 1],
      duration: duration / 2 / 1000,
    },
  },
  exit: {
    scale: 1,
    opacity: 1,
    filter: 'blur(0)',
  },
  exitActive: {
    scale: 1.25,
    opacity: 0,
    filter: 'blur(8px)',
    transition: {
      type: 'tween',
      ease: [0.4, 0, 0.6, 1],
      duration: duration / 2 / 1000,
    },
  },
});

export const defaultScaleUp = scaleUp();

export const slideDown = (duration = 1000) => ({
  enter: {
    translateY: '-6rem',
    opacity: 0,
    filter: 'blur(8px)',
  },
  enterActive: {
    translateY: '0',
    opacity: 1,
    filter: 'blur(0)',
    transition: {
      type: 'tween',
      ease: [0.22, 1, 0.36, 1],
      duration: duration / 2 / 1000,
    },
  },
  exit: {
    translateY: '0',
    opacity: 1,
    filter: 'blur(0)',
  },
  exitActive: {
    translateY: '10rem',
    opacity: 0,
    filter: 'blur(8px)',
    transition: {
      type: 'tween',
      ease: [0.64, 0, 0.78, 0],
      duration: duration / 2 / 1000,
    },
  },
});

export const defaultSlideDown = slideDown();

export const slideUp = (duration = 1000) => ({
  enter: {
    translateY: '10rem',
    opacity: 0,
    filter: 'blur(8px)',
  },
  enterActive: {
    translateY: '0',
    opacity: 1,
    filter: 'blur(0)',
    transition: {
      type: 'tween',
      ease: [0.22, 1, 0.36, 1],
      duration: duration / 2 / 1000,
    },
  },
  exit: {
    translateY: '0',
    opacity: 1,
    filter: 'blur(0)',
  },
  exitActive: {
    translateY: '-10rem',
    opacity: 0,
    filter: 'blur(8px)',
    transition: {
      type: 'tween',
      ease: [0.64, 0, 0.78, 0],
      duration: duration / 2 / 1000,
    },
  },
});

export const defaultSlideUp = slideUp();

export const slideDownScaleUp = (duration = 1000) => ({
  enter: {
    scale: 1.25,
    opacity: 0,
    filter: 'blur(8px)',
    translateY: '-16rem',
  },
  enterActive: {
    scale: 1,
    opacity: 1,
    filter: 'blur(0)',
    translateY: '0',
    transition: {
      type: 'tween',
      ease: [0, 0.55, 0.45, 1],
      duration: duration / 2 / 1000,
    },
  },
  exit: {
    scale: 1,
    opacity: 1,
    filter: 'blur(0)',
    translateY: '0',
  },
  exitActive: {
    scale: 1.25,
    opacity: 0,
    filter: 'blur(8px)',
    translateY: '16rem',
    transition: {
      type: 'tween',
      ease: [0.4, 0, 0.6, 1],
      duration: duration / 2 / 1000,
    },
  },
});

export const defaultSlideDownScaleUp = slideDownScaleUp();
export const slideDownScaleDown = (duration = 1000) => ({
  enter: {
    scale: 0.75,
    opacity: 0,
    filter: 'blur(8px)',
    translateY: '-16rem',
  },
  enterActive: {
    scale: 1,
    opacity: 1,
    filter: 'blur(0)',
    translateY: '0',
    transition: {
      type: 'tween',
      ease: [0, 0.55, 0.45, 1],
      duration: duration / 2 / 1000,
    },
  },
  exit: {
    scale: 1,
    opacity: 1,
    filter: 'blur(0)',
    translateY: '0',
  },
  exitActive: {
    scale: 0.75,
    opacity: 0,
    filter: 'blur(8px)',
    translateY: '16rem',
    transition: {
      type: 'tween',
      ease: [0.4, 0, 0.6, 1],
      duration: duration / 2 / 1000,
    },
  },
});

export const defaultSlideDownScaleDown = slideDownScaleDown();

export const slideUpScaleUp = (duration = 1000) => ({
  enter: {
    scale: 1.25,
    opacity: 0,
    filter: 'blur(8px)',
    translateY: '16rem',
  },
  enterActive: {
    scale: 1,
    opacity: 1,
    filter: 'blur(0)',
    translateY: '0',
    transition: {
      type: 'tween',
      ease: [0, 0.55, 0.45, 1],
      duration: duration / 2 / 1000,
    },
  },
  exit: {
    scale: 1,
    opacity: 1,
    filter: 'blur(0)',
    translateY: '0',
  },
  exitActive: {
    scale: 1.25,
    opacity: 0,
    filter: 'blur(8px)',
    translateY: '-16rem',
    transition: {
      type: 'tween',
      ease: [0.4, 0, 0.6, 1],
      duration: duration / 2 / 1000,
    },
  },
});
export const defaultSlideUpScaleUp = slideUpScaleUp();

export const slideUpScaleDown = (duration = 1000) => ({
  enter: {
    scale: 0.75,
    opacity: 0,
    filter: 'blur(8px)',
    translateY: '16rem',
  },
  enterActive: {
    scale: 1,
    opacity: 1,
    filter: 'blur(0)',
    translateY: '0',
    transition: {
      type: 'tween',
      ease: [0, 0.55, 0.45, 1],
      duration: duration / 2 / 1000,
    },
  },
  exit: {
    scale: 1,
    opacity: 1,
    filter: 'blur(0)',
    translateY: '0',
  },
  exitActive: {
    scale: 0.75,
    opacity: 0,
    filter: 'blur(8px)',
    translateY: '-16rem',
    transition: {
      type: 'tween',
      ease: [0.4, 0, 0.6, 1],
      duration: duration / 2 / 1000,
    },
  },
});
// --------------------------------------------------------
// --- Page Transitions -----------------------------------
// --------------------------------------------------------

export const pagePop = (duration = 1000) => ({
  enter: {
    scale: 0.85,
    opacity: 0,
    filter: 'blur(12px)',
  },
  enterActive: {
    scale: 1,
    opacity: 1,
    filter: 'blur(0)',
    transition: {
      type: 'tween',
      ease: [0, 0.55, 0.45, 1],
      duration: duration / 2 / 1000,
    },
  },
  exit: {
    scale: 1,
    opacity: 1,
    filter: 'blur(0)',
  },
  exitActive: {
    scale: 1.15,
    opacity: 0,
    filter: 'blur(12px)',
    transition: {
      type: 'tween',
      ease: [0.4, 0, 0.6, 1],
      duration: duration / 2 / 1000,
    },
  },
});

export const defaultPagePop = pagePop();

export const pageSlideDown = (duration = 1000) => ({
  enter: {
    transform: 'translateY(-10vh)',
    opacity: 0,
    filter: 'blur(12px)',
  },
  enterActive: {
    transform: 'translateY(0)',
    opacity: 1,
    filter: 'blur(0)',
    transition: {
      type: 'tween',
      ease: [0, 0.55, 0.45, 1],
      duration: duration / 2 / 1000,
    },
  },
  exit: {
    transform: 'translateY(0)',
    opacity: 1,
    filter: 'blur(0)',
  },
  exitActive: {
    transform: 'translateY(10vh)',
    opacity: 0,
    filter: 'blur(12px)',
    transition: {
      type: 'tween',
      ease: [0.4, 0, 0.6, 1],
      duration: duration / 2 / 1000,
    },
  },
});

export const defaultPageSlideDown = pageSlideDown();

export const pageSlideUp = (duration = 1000) => ({
  enter: {
    transform: 'translateY(10vh)',
    opacity: 0,
    filter: 'blur(12px)',
  },
  enterActive: {
    transform: 'translateY(0)',
    opacity: 1,
    filter: 'blur(0)',
    transition: {
      type: 'tween',
      ease: [0, 0.55, 0.45, 1],
      duration: duration / 2 / 1000,
    },
  },
  exit: {
    transform: 'translateY(0)',
    opacity: 1,
    filter: 'blur(0)',
  },
  exitActive: {
    transform: 'translateY(-10vh)',
    opacity: 0,
    filter: 'blur(12px)',
    transition: {
      type: 'tween',
      ease: [0.4, 0, 0.6, 1],
      duration: duration / 2 / 1000,
    },
  },
});

export const defaultPageSlideUp = pageSlideUp();
