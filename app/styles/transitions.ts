// --------------------------------------------------------
// --- Normal Transitions ---------------------------------
// --------------------------------------------------------

export const centerPop = (duration = 1000) => ({
  enterFrom: {
    scale: 0.5,
    opacity: 0,
    transform: 'scale(0.5)',
    filter: 'blur(8px)',
  },
  enterTo: {
    transform: 'scale(1)',
    opacity: 1,
    filter: 'blur(0)',
  },
  enterActive: {
    transition: {
      type: 'tween',
      ease: [0, 0.55, 0.45, 1],
      duration: duration / 2 / 1000,
    },
  },
  leaveFrom: {
    transform: 'scale(1)',
    opacity: 1,
    filter: 'blur(0)',
  },
  leaveTo: {
    opacity: 0,
    transform: 'scale(0.75)',
    filter: 'blur(8px)',
  },
  leaveActive: {
    transition: {
      type: 'tween',
      ease: [0.4, 0, 0.6, 1],
      duration: duration / 2 / 1000,
    },
  },
});

export const defaultCenterPop = centerPop();

export const scaleDown = (duration = 1000) => ({
  enterFrom: {
    scale: 1.25,
    opacity: 0,
    filter: 'blur(8px)',
  },
  enterTo: {
    scale: 1,
    opacity: 1,
    filter: 'blur(0)',
  },
  enterActive: {
    transition: {
      type: 'tween',
      ease: [0, 0.55, 0.45, 1],
      duration: duration / 2 / 1000,
    },
  },
  leaveFrom: {
    scale: 1,
    opacity: 1,
    filter: 'blur(0)',
  },
  leaveTo: {
    scale: 0.75,
    opacity: 0,
    filter: 'blur(8px)',
  },
  leaveActive: {
    transition: {
      type: 'tween',
      ease: [0.4, 0, 0.6, 1],
      duration: duration / 2 / 1000,
    },
  },
});

export const defaultScaleDown = scaleDown();

export const scaleUp = (duration = 1000) => ({
  enterFrom: {
    scale: 0.75,
    opacity: 0,
    filter: 'blur(8px)',
  },
  enterTo: {
    scale: 1,
    opacity: 1,
    filter: 'blur(0)',
  },
  enterActive: {
    transition: {
      type: 'tween',
      ease: [0, 0.55, 0.45, 1],
      duration: duration / 2 / 1000,
    },
  },
  leaveFrom: {
    scale: 1,
    opacity: 1,
    filter: 'blur(0)',
  },
  leaveTo: {
    scale: 1.25,
    opacity: 0,
    filter: 'blur(8px)',
  },
  leaveActive: {
    transition: {
      type: 'tween',
      ease: [0.4, 0, 0.6, 1],
      duration: duration / 2 / 1000,
    },
  },
});

export const defaultScaleUp = scaleUp();

export const slideDown = (duration = 1000) => ({
  enterFrom: {
    translateY: '-6rem',
    opacity: 0,
    filter: 'blur(8px)',
  },
  enterTo: {
    translateY: '0',
    opacity: 1,
    filter: 'blur(0)',
  },
  enterActive: {
    transition: {
      type: 'tween',
      ease: [0.22, 1, 0.36, 1],
      duration: duration / 2 / 1000,
    },
  },
  leaveFrom: {
    translateY: '0',
    opacity: 1,
    filter: 'blur(0)',
  },
  leaveTo: {
    translateY: '10rem',
    opacity: 0,
    filter: 'blur(8px)',
  },
  leaveActive: {
    transition: {
      type: 'tween',
      ease: [0.64, 0, 0.78, 0],
      duration: duration / 2 / 1000,
    },
  },
});

export const defaultSlideDown = slideDown();

export const slideUp = (duration = 1000) => ({
  enterFrom: {
    translateY: '10rem',
    opacity: 0,
    filter: 'blur(8px)',
  },
  enterTo: {
    translateY: '0',
    opacity: 1,
    filter: 'blur(0)',
  },
  enterActive: {
    transition: {
      type: 'tween',
      ease: [0.22, 1, 0.36, 1],
      duration: duration / 2 / 1000,
    },
  },
  leaveFrom: {
    translateY: '0',
    opacity: 1,
    filter: 'blur(0)',
  },
  leaveTo: {
    translateY: '-10rem',
    opacity: 0,
    filter: 'blur(8px)',
  },
  leaveActive: {
    transition: {
      type: 'tween',
      ease: [0.64, 0, 0.78, 0],
      duration: duration / 2 / 1000,
    },
  },
});

export const defaultSlideUp = slideUp();

export const slideDownScaleUp = (duration = 1000) => ({
  enterFrom: {
    scale: 1.25,
    opacity: 0,
    filter: 'blur(8px)',
    translateY: '-16rem',
  },
  enterTo: {
    scale: 1,
    opacity: 1,
    filter: 'blur(0)',
    translateY: '0',
  },
  enterActive: {
    transition: {
      type: 'tween',
      ease: [0, 0.55, 0.45, 1],
      duration: duration / 2 / 1000,
    },
  },
  leaveFrom: {
    scale: 1,
    opacity: 1,
    filter: 'blur(0)',
    translateY: '0',
  },
  leaveTo: {
    scale: 1.25,
    opacity: 0,
    filter: 'blur(8px)',
    translateY: '16rem',
  },
  leaveActive: {
    transition: {
      type: 'tween',
      ease: [0.4, 0, 0.6, 1],
      duration: duration / 2 / 1000,
    },
  },
});

export const defaultSlideDownScaleUp = slideDownScaleUp();

export const slideDownScaleDown = (duration = 1000) => ({
  enterFrom: {
    scale: 0.75,
    opacity: 0,
    filter: 'blur(8px)',
    translateY: '-16rem',
  },
  enterTo: {
    scale: 1,
    opacity: 1,
    filter: 'blur(0)',
    translateY: '0',
  },
  enterActive: {
    transition: {
      type: 'tween',
      ease: [0, 0.55, 0.45, 1],
      duration: duration / 2 / 1000,
    },
  },
  leaveFrom: {
    scale: 1,
    opacity: 1,
    filter: 'blur(0)',
    translateY: '0',
  },
  leaveTo: {
    scale: 0.75,
    opacity: 0,
    filter: 'blur(8px)',
    translateY: '16rem',
  },
  leaveActive: {
    transition: {
      type: 'tween',
      ease: [0.4, 0, 0.6, 1],
      duration: duration / 2 / 1000,
    },
  },
});

export const defaultSlideDownScaleDown = slideDownScaleDown();

export const slideUpScaleUp = (duration = 1000) => ({
  enterFrom: {
    scale: 1.25,
    opacity: 0,
    filter: 'blur(8px)',
    translateY: '16rem',
  },
  enterTo: {
    scale: 1,
    opacity: 1,
    filter: 'blur(0)',
    translateY: '0',
  },
  enterActive: {
    transition: {
      type: 'tween',
      ease: [0, 0.55, 0.45, 1],
      duration: duration / 2 / 1000,
    },
  },
  leaveFrom: {
    scale: 1,
    opacity: 1,
    filter: 'blur(0)',
    translateY: '0',
  },
  leaveTo: {
    scale: 1.25,
    opacity: 0,
    filter: 'blur(8px)',
    translateY: '-16rem',
  },
  leaveActive: {
    transition: {
      type: 'tween',
      ease: [0.4, 0, 0.6, 1],
      duration: duration / 2 / 1000,
    },
  },
});

export const defaultSlideUpScaleUp = slideUpScaleUp();

export const slideUpScaleDown = (duration = 1000) => ({
  enterFrom: {
    scale: 0.75,
    opacity: 0,
    filter: 'blur(8px)',
    translateY: '16rem',
  },
  enterTo: {
    scale: 1,
    opacity: 1,
    filter: 'blur(0)',
    translateY: '0',
  },
  enterActive: {
    transition: {
      type: 'tween',
      ease: [0, 0.55, 0.45, 1],
      duration: duration / 2 / 1000,
    },
  },
  leaveFrom: {
    scale: 1,
    opacity: 1,
    filter: 'blur(0)',
    translateY: '0',
  },
  leaveTo: {
    scale: 0.75,
    opacity: 0,
    filter: 'blur(8px)',
    translateY: '-16rem',
  },
  leaveActive: {
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

export const pagePop = (duration = 300) => ({
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
      ease: [0.075, 0.82, 0.165, 1],
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
      ease: [0.6, 0.04, 0.98, 0.335],
      duration: duration / 1000,
    },
  },
});

export const defaultPagePop = pagePop(300);

export const pagePopDown = (duration = 300) => ({
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
      ease: [0.075, 0.82, 0.165, 1],
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
      ease: [0.6, 0.04, 0.98, 0.335],
      duration: duration / 1000,
    },
  },
});

export const defaultPagePopDown = pagePopDown(300);

export const pageSlideDown = (duration = 300) => ({
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
      ease: [0.075, 0.82, 0.165, 1],
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
      ease: [0.6, 0.04, 0.98, 0.335],
      duration: duration / 1000,
    },
  },
});

export const defaultPageSlideDown = pageSlideDown(300);

export const pageSlideUp = (duration = 300) => ({
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
      ease: [0.075, 0.82, 0.165, 1],
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
      ease: [0.6, 0.04, 0.98, 0.335],
      duration: duration / 1000,
    },
  },
});

export const defaultPageSlideUp = pageSlideUp(300);
