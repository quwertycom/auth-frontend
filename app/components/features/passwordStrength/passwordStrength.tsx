import { Card, Divider } from '@heroui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { slideFromTopTransition } from '@/app/styles/transitions';
import { getPasswordStrength } from '@/app/utils/password-strength';
import React, { ReactNode, useRef, useState, useLayoutEffect } from 'react';

interface PasswordStrengthProps {
  password: string;
  isFocused: boolean;
  hideCharacterCount?: boolean;
  children: ReactNode;
}

export default function PasswordStrength({
  password,
  isFocused,
  hideCharacterCount = false,
  children,
}: PasswordStrengthProps) {
  const slideTransition = slideFromTopTransition(600, 'quint');
  const passwordStrength = getPasswordStrength(password);
  const [contentHeight, setContentHeight] = useState(0);
  const [childrenHeight, setChildrenHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (childrenRef.current) {
      setChildrenHeight(childrenRef.current.offsetHeight);
    }
  }, [children]);

  useLayoutEffect(() => {
    if (isFocused && contentRef.current) {
      setContentHeight(contentRef.current.offsetHeight);
    } else {
      setContentHeight(0);
    }
  }, [isFocused, childrenHeight, contentHeight]);

  const animatedHeight = isFocused ? childrenHeight + contentHeight + 16 : childrenHeight;

  const requirements = [
    {
      id: 'lowercase',
      text: 'Lowercase letter',
      isMet: () => /[a-z]/.test(password),
    },
    {
      id: 'uppercase',
      text: 'Uppercase letter',
      isMet: () => /[A-Z]/.test(password),
    },
    {
      id: 'number',
      text: 'Number',
      isMet: () => /[0-9]/.test(password),
    },
    {
      id: 'length',
      text: 'Characters',
      isMet: () => password.length >= 8,
    },
  ];

  const getMissingRequirementsText = () => {
    const missing = requirements.filter((req) => !req.isMet());

    if (passwordStrength === 0) {
      return 'Create a strong, unique, and easy-to-remember password.'; // Step 0 text
    }

    if (missing.length === 0) {
      if (password.length < 12 && !/[^A-Za-z0-9]/.test(password)) {
        return 'Your password is okay, but can be enhanced.';
      } else if (password.length >= 12 && !/[A-Za-z0-9]/.test(password)) {
        return 'Your password strength is good.';
      } else if (password.length < 12 && /[^A-Za-z0-9]/.test(password)) {
        return 'Your password strength is good.';
      } else if (password.length >= 12 && /[^A-Za-z0-9]/.test(password)) {
        return 'Your password is great!';
      }
    }

    if (missing.length === requirements.length) {
      return 'Ensure your password includes 1 lowercase letter, 1 uppercase letter, 1 number, and is at least 8 characters.'; // Step 0 text
    }

    const missingTexts = missing.map((req) => {
      if (req.id === 'length') {
        return `8 ${req.text.toLowerCase()}`; // For length, use "8 characters"
      } else {
        return `1 ${req.text.toLowerCase()}`; // Step 0 text
      }
    });

    if (missing.length === 1) {
      return `You need: ${missingTexts[0]}.`; // Changed to "You need:" and used modified missing text
    }

    const lastMissing = missingTexts.pop();
    return `You need: ${missingTexts.join(', ')}, and ${lastMissing}.`; // Changed to "You need:" and used modified missing texts
  };

  const getTextColor = () => {
    switch (passwordStrength) {
      case 0:
        return 'text-neutral-400'; // Gray for empty/error
      case 1:
        return 'text-red-500'; // Very Weak
      case 2:
        return 'text-orange-500'; // Weak
      case 3:
        return 'text-yellow-500'; // Average
      case 4:
        return 'text-green-500'; // Strong
      default:
        return 'text-green-700'; // Very Strong (shouldn't happen with current logic)
    }
  };

  return (
    <div className={`${isFocused? '-mx-2 transform -translate-y-2' : '-mx-0'} transition-all transition-marginX duration-300 ease-in-out-quint relative before:absolute before:top-0 before:left-0 before:w-full before:h-full before:pointer-events-none z-50`} style={{ height: childrenHeight }}>
      <motion.div
        className="relative top-0 left-0 w-full overflow-hidden"
        initial={{ height: childrenHeight }}
        animate={{ height: isFocused ? animatedHeight : childrenHeight }}
        transition={{ duration: 0.3, ease: [0.83, 0, 0.17, 1] }}
      >
        <Card className={`rounded-2xl absolute top-0 left-0 w-full h-full transition-z ${isFocused ? 'z-50' : 'z-0'}`}>
          <div className="relative w-full h-full bg-white bg-opacity-[2%]">
            <div className={`${isFocused ? 'p-2' : 'p-0'} transition-[padding] duration-300 ease-in-out-quint`}>
              <div className={`z-10`} ref={childrenRef}>
                {children}
              </div>
            </div>
            <div className={`${isFocused ? 'mx-0' : '-mx-2'} transition-[margin] duration-300 ease-in-out-quint`}>
              <AnimatePresence mode="wait" initial={false}>
                {isFocused && (
                  <motion.div
                    key="passwordStrengthCard"
                    ref={contentRef}
                    initial={slideTransition.reflect.enterFrom}
                    animate={slideTransition.reflect.enterTo}
                    exit={slideTransition.reflect.leaveTo}
                    transition={slideTransition.reflect.enterActive.transition}
                    className="w-full left-0 top-[100%]"
                  >
                    <div className="p-2">
                      <div className="progress h-2 w-full rounded-full bg-white/10">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ease-in-out-quint ${
                            passwordStrength === 0
                              ? 'bg-red-700'
                              : passwordStrength === 1
                                ? 'bg-red-500'
                                : passwordStrength === 2
                                  ? 'bg-orange-500'
                                  : passwordStrength === 3
                                    ? 'bg-yellow-500'
                                    : passwordStrength === 4
                                      ? 'bg-green-500'
                                      : 'bg-green-700'
                          }`}
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <Divider />
                    <div className="flex flex-row items-center justify-between p-2">
                      <p className={`text-sm ${getTextColor()} truncate max-w-[80%]`}>
                        {getMissingRequirementsText()}
                      </p>
                      {!hideCharacterCount && (
                        <p className="text-xs text-neutral-400">
                          {password.length} / 8
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}