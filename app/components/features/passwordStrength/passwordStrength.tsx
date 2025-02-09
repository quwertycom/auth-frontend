import { Card, CardBody, Divider } from '@heroui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { slideFromBottomTransition } from '@/app/styles/transitions';
import { getPasswordStrength } from '@/app/utils/password-strength';
import React, { ReactNode } from 'react';

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
  const slideTransition = slideFromBottomTransition(undefined, 'cubic');
  const passwordStrength = getPasswordStrength(password);

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
      return 'Ensure your password includes 1 lowercase letter, 1 uppercase letter, 1 number, and is at least 8 characters.'; // Rephrased default text
    }

    const missingTexts = missing.map((req) => {
      if (req.id === 'length') {
        return `8 ${req.text.toLowerCase()}`; // For length, use "8 characters"
      } else {
        return `1 ${req.text.toLowerCase()}`; // For others, use "1 requirement"
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
    <div className="relative w-full">
      {children}
      <AnimatePresence mode="wait" initial={false}>
        {isFocused && (
          <motion.div
            key="passwordStrengthCard"
            initial={slideTransition.reflect.enterFrom}
            animate={slideTransition.reflect.enterTo}
            exit={slideTransition.reflect.leaveTo}
            transition={slideTransition.reflect.enterActive.transition}
            className="z-50 w-full mt-2 absolute left-0"
          >
            <Card>
              <CardBody className="bg-white/5 py-2">
                <div className="progress h-2 w-full rounded-full bg-white/10">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ease-in-out-quart ${
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
              <CardBody className="flex flex-row items-center justify-between bg-white/5 py-2">
                <p className={`text-sm ${getTextColor()}`}>
                  {getMissingRequirementsText()}
                </p>
                {!hideCharacterCount && (
                  <p className="text-xs text-neutral-400">
                    {password.length} / 8
                  </p>
                )}
              </CardBody>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
