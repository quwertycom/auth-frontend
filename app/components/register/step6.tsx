import { Card, CardBody, Divider, Input } from '@heroui/react';
import MaterialSymbol from '../materialSymbol';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import { updateFormData } from '@/app/store/features/registerSlice';
import { useState, useRef, useEffect } from 'react';
import { getPasswordStrength } from '@/app/utils/password-strength';
import { motion, AnimatePresence } from 'framer-motion';
import { slideFromBottomTransition } from '@/app/styles/transitions';

export default function RegisterStep6() {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.register.formData);
  const errors = useSelector((state: RootState) => state.register.errors);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | undefined
  >(undefined);

  const passwordInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    passwordInputRef.current?.focus();
  }, []);

  const passwordStrength = getPasswordStrength(formData.password);

  const requirements = [
    {
      id: 'lowercase',
      text: 'Lowercase letter',
      isMet: () => /[a-z]/.test(formData.password),
    },
    {
      id: 'uppercase',
      text: 'Uppercase letter',
      isMet: () => /[A-Z]/.test(formData.password),
    },
    {
      id: 'number',
      text: 'Number',
      isMet: () => /[0-9]/.test(formData.password),
    },
    {
      id: 'length',
      text: 'Characters',
      isMet: () => formData.password.length >= 8,
    },
  ];

  const getMissingRequirementsText = () => {
    const missing = requirements.filter((req) => !req.isMet());

    if (passwordStrength === 0) {
      return 'Create a strong, unique, and easy-to-remember password.'; // Step 0 text
    }

    if (missing.length === 0) {
      if (
        formData.password.length < 12 &&
        !/[^A-Za-z0-9]/.test(formData.password)
      ) {
        return 'Your password is okay, but can be enhanced.';
      } else if (
        formData.password.length >= 12 &&
        !/[^A-Za-z0-9]/.test(formData.password)
      ) {
        return 'Your password strength is good.';
      } else if (
        formData.password.length < 12 &&
        /[^A-Za-z0-9]/.test(formData.password)
      ) {
        return 'Your password strength is good.';
      } else if (
        formData.password.length >= 12 &&
        /[^A-Za-z0-9]/.test(formData.password)
      ) {
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

  const slideTransition = slideFromBottomTransition(undefined, 'cubic');

  return (
    <div className="flex h-full w-full flex-col items-stretch justify-evenly gap-6">
      <div className="flex flex-col items-center justify-center gap-2">
        <h2 className="text-2xl font-bold text-foreground">Stay secure</h2>
        <p className="text-sm text-neutral-500">
          Set a secure and easy to remember password
        </p>
      </div>
      <div className="flex w-full flex-col items-stretch justify-center gap-4">
        <div className="relative w-full">
          <Input
            label="Password"
            variant="bordered"
            type={showPassword ? 'text' : 'password'}
            className={`${
              errors.find((error) => error.input === 'password')
                ? 'mb-0'
                : 'mb-6'
            }`}
            classNames={{ input: 'text-md' }}
            value={formData.password}
            onChange={(e) => {
              dispatch(
                updateFormData({
                  password: e.target.value,
                }),
              );
            }}
            isRequired
            isInvalid={
              errors.find((error) => error.input === 'password') ? true : false
            }
            errorMessage={
              errors.find((error) => error.input === 'password')?.message
            }
            ref={passwordInputRef}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            endContent={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="focus:outline-none"
              >
                <MaterialSymbol
                  symbol={showPassword ? 'visibility_off' : 'visibility'}
                  size={20}
                  className="text-neutral-500"
                />
              </button>
            }
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                document
                  .querySelector<HTMLInputElement>(
                    'input[name="confirmPassword"]',
                  )
                  ?.focus();
              }
            }}
            name="password"
          />
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
                    {formData.password.length < 8 && (
                      <p className="text-xs text-neutral-400">
                        {formData.password.length} / 8
                      </p>
                    )}
                  </CardBody>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Input
          label="Confirm password"
          variant="bordered"
          type={showConfirmPassword ? 'text' : 'password'}
          className={`${confirmPasswordError ? 'mb-0' : 'mb-6'}`}
          classNames={{ input: 'text-md' }}
          value={formData.confirmPassword}
          onChange={(e) => {
            dispatch(
              updateFormData({
                confirmPassword: e.target.value,
              }),
            );
          }}
          isRequired
          isInvalid={!!confirmPasswordError}
          errorMessage={confirmPasswordError}
          onBlur={() => {
            if (
              formData.password.length > 0 &&
              formData.password !== formData.confirmPassword
            ) {
              setConfirmPasswordError('Passwords do not match');
            } else {
              setConfirmPasswordError(undefined);
            }
          }}
          endContent={
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="focus:outline-none"
            >
              <MaterialSymbol
                symbol={showConfirmPassword ? 'visibility_off' : 'visibility'}
                size={20}
                className="text-neutral-500"
              />
            </button>
          }
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              document.getElementById('next-step-button')?.click();
            }
          }}
          name="confirmPassword"
        />
      </div>
    </div>
  );
}
