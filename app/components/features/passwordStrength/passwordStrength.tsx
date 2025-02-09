import { Card, CardBody, Divider } from '@heroui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { slideFromBottomTransition } from '@/app/styles/transitions';

interface PasswordStrengthProps {
  passwordStrength: number;
  getMissingRequirementsText: () => string;
  getTextColor: () => string;
  isFocused: boolean;
  formDataPasswordLength: number;
}

export default function PasswordStrength({
  passwordStrength,
  getMissingRequirementsText,
  getTextColor,
  isFocused,
  formDataPasswordLength,
}: PasswordStrengthProps) {
  const slideTransition = slideFromBottomTransition(undefined, 'cubic');

  return (
    <AnimatePresence mode="wait" initial={false}>
      {isFocused && (
        <motion.div
          key="passwordStrengthCard"
          initial={slideTransition.reflect.enterFrom}
          animate={slideTransition.reflect.enterTo}
          exit={slideTransition.reflect.leaveTo}
          transition={slideTransition.reflect.enterActive.transition}
          className="absolute left-0 top-[calc(100%-1rem)] z-50 mx-4 w-[calc(100%-2rem)]"
        >
          <Card>
            <CardBody className="bg-white/5 py-2">
              <div className="progress h-2 w-full rounded-full bg-white/10">
                <div
                  className={`h-full rounded-full transition-all duration-300 ease-in-out-quart ${
                    passwordStrength === 0
                      ? 'bg-red-700' // Level 0: Red (Error/Empty)
                      : passwordStrength === 1
                        ? 'bg-red-500' // Level 1: Very Weak
                        : passwordStrength === 2
                          ? 'bg-orange-500' // Level 2: Weak
                          : passwordStrength === 3
                            ? 'bg-yellow-500' // Level 3: Average/Correct
                            : passwordStrength === 4
                              ? 'bg-green-500' // Level 4: Strong
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
              {formDataPasswordLength < 8 && (
                <p className="text-xs text-neutral-400">
                  {formDataPasswordLength} / 8
                </p>
              )}
            </CardBody>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
