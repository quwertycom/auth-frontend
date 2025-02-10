import { Card, CardBody, Divider } from '@heroui/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  slideFromBottomTransition,
  slideFromLeftTransition,
} from '@/app/styles/transitions';
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
  const slideFromBottomReflect = slideFromBottomTransition(
    600,
    'quint',
  ).reflect;
  const slideFromLeftReflect = slideFromLeftTransition(600, 'quint').reflect;
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

    if (!lastMissing) {
      return 'Your password strength is good.';
    }

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
    <div className="relative">
      <div>{children}</div>
      <div className="absolute z-50 mt-1 w-full">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={isFocused ? 'focused' : 'blurred'}
            initial={slideFromBottomReflect.enterFrom}
            animate={slideFromBottomReflect.enterTo}
            exit={slideFromBottomReflect.leaveTo}
            transition={slideFromBottomReflect.enterActive.transition}
          >
            {isFocused && (
              <Card radius="md">
                <CardBody className="bg-white/5">
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
                </CardBody>
                <Divider />
                <CardBody className="overflow-hidden bg-white/5">
                  <div className="flex flex-row items-center justify-between">
                    <p
                      className={`text-sm ${getTextColor()} truncate ${password.length > 8 || !hideCharacterCount ? 'max-w-[80%]' : 'max-w-[100%]'}`}
                    >
                      {getMissingRequirementsText()}
                    </p>
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.div
                        key={password.length > 7 ? 'hidden' : 'visible'}
                        initial={slideFromLeftReflect.enterFrom}
                        animate={slideFromLeftReflect.enterTo}
                        exit={slideFromLeftReflect.leaveTo}
                        transition={slideFromLeftReflect.enterActive.transition}
                      >
                        {!hideCharacterCount && password.length < 8 && (
                          <p className="whitespace-nowrap text-xs text-neutral-400">
                            {password.length} / 8
                          </p>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </CardBody>
              </Card>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
