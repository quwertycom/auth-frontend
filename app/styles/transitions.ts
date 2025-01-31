// --------------------------------------------------------
// --- Normal Transitions ---------------------------------
// --------------------------------------------------------

export const centerPop = {
  enter: {
    scale: 0.5,
    opacity: 0,
    transform: 'scale(0.5)'
  },
  enterActive: {
    transform: 'scale(1)',
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.77, 0, 0.175, 1]
    }
  },
  exit: {
    transform: 'scale(1)',
    opacity: 1
  },
  exitActive: {
    opacity: 0,
    transform: 'scale(0.75)',
    transition: {
      duration: 0.3,
      ease: [0.77, 0, 0.175, 1]
    }
  }
};

export const scaleDown = {
  enter: {
    scale: 1.25,
    opacity: 0
  },
  enterActive: {
    scale: 1,
    opacity: 1,
    transition: 'all 300ms cubic-bezier(0.77, 0, 0.175, 1)'
  },
  exit: {
    scale: 1,
    opacity: 1
  },
  exitActive: {
    scale: 0.75,
    opacity: 0,
    transition: 'all 300ms cubic-bezier(0.77, 0, 0.175, 1)'
  }
};

export const scaleUp = {
  enter: {
    scale: 0.75,
    opacity: 0
  },
  enterActive: {
    scale: 1,
    opacity: 1,
    transition: 'all 300ms cubic-bezier(0.77, 0, 0.175, 1)'
  },
  exit: {
    scale: 1,
    opacity: 1
  },
  exitActive: {
    scale: 1.25,
    opacity: 0,
    transition: 'all 300ms cubic-bezier(0.77, 0, 0.175, 1)'
  }
};

// --------------------------------------------------------
// --- Page Transitions -----------------------------------
// --------------------------------------------------------

export const pagePop = {
  leaveFrom: {
    scale: 1,
    opacity: 1,
    filter: 'blur(0)'
  },
  leaveTo: {
    scale: 1.25,
    opacity: 0,
    filter: 'blur(12px)'
  },
  enterFrom: {
    scale: 0.75,
    opacity: 0,
    filter: 'blur(12px)'
  },
  enterTo: {
    scale: 1,
    opacity: 1,
    filter: 'blur(0)'
  },
  enterActive: {
    transition: 'all cubic-bezier(0.34, 1.56, 0.64, 1)'
  },
  leaveActive: {
    transition: 'all cubic-bezier(0.36, 0, 0.66, -0.56)'
  }
};

export const pageSlideDown = {
  leaveFrom: {
    scale: 1,
    opacity: 1,
    filter: 'blur(0)'
  },
  leaveTo: {
    translateY: '6rem',
    scale: 0.95,
    opacity: 0,
    filter: 'blur(12px)'
  },
  enterFrom: {
    translateY: '-6rem',
    scale: 0.95,
    opacity: 0,
    filter: 'blur(12px)'
  },
  enterTo: {
    translateY: '0',
    scale: 1,
    opacity: 1,
    filter: 'blur(0)'
  },
  enterActive: {
    transition: 'all cubic-bezier(0.34, 1.56, 0.64, 1)'
  },
  leaveActive: {
    transition: 'all cubic-bezier(0.36, 0, 0.66, -0.56)'
  }
};

export const pageSlideUp = {
  leaveFrom: {
    scale: 1,
    opacity: 1,
    filter: 'blur(0)'
  },
  leaveTo: {
    translateY: '-6rem',
    scale: 0.95,
    opacity: 0,
    filter: 'blur(12px)'
  },
  enterFrom: {
    translateY: '6rem',
    scale: 0.95,
    opacity: 0,
    filter: 'blur(12px)'
  },
  enterTo: {
    translateY: '0',
    scale: 1,
    opacity: 1,
    filter: 'blur(0)'
  },
  enterActive: {
    transition: 'all cubic-bezier(0.34, 1.56, 0.64, 1)'
  },
  leaveActive: {
    transition: 'all cubic-bezier(0.36, 0, 0.66, -0.56)'
  }
};
