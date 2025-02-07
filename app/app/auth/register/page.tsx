'use client';

import { startTransition, useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button, Card, CardBody } from '@heroui/react';
import MaterialSymbol from '@/app/components/materialSymbol';
import {
  centerPopTransition,
  slideFromLeftTransition,
} from '@/app/styles/transitions';
import { useAppDispatch } from '@/app/store/hooks';
import { setErrors, validateStep } from '@/app/store/features/registerSlice';
import RegisterStep0 from '@/app/components/register/step0';
import RegisterStep1 from '@/app/components/register/step1';
import RegisterStep2 from '@/app/components/register/step2';
import RegisterStep3 from '@/app/components/register/step3';
import RegisterStep4 from '@/app/components/register/step4';
import RegisterStep5 from '@/app/components/register/step5';
import RegisterStep6 from '@/app/components/register/step6';
import RegisterStep7 from '@/app/components/register/step7';
import SideInfo from '@/app/components/register/sideInfo';

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const [step, setStep] = useState(0);

  const [reverseTransition, setReverseTransition] = useState(false);

  const transition = centerPopTransition();
  const slideTransition = slideFromLeftTransition();

  const termsCheckboxRef = useRef<HTMLInputElement>(null);
  const dateOfBirthInputRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    setReverseTransition(false);
    dispatch(setErrors([]));
    startTransition(() => {
      setStep((prev) => prev + 1);
    });
  };

  const handleBack = () => {
    setReverseTransition(true);
    dispatch(setErrors([]));
    startTransition(() => {
      setStep((prev) => prev - 1);
    });
  };

  const handleNextStep = async () => {
    const validationResult = await dispatch(validateStep(step)).unwrap();

    if (!validationResult.isValid) {
      if (validationResult.errors && validationResult.errors.length > 0) {
        const firstErrorInputName = validationResult.errors[0].input;

        if (firstErrorInputName === 'termsAndConditions' && step === 3) {
          termsCheckboxRef.current?.focus();
        } else if (firstErrorInputName === 'dateOfBirth' && step === 5) {
          // Try to focus the month input specifically using aria-label
          const monthInput = dateOfBirthInputRef.current?.querySelector(
            'input[aria-label="Month"]',
          );
          if (monthInput) {
            if (monthInput instanceof HTMLElement) {
              monthInput.focus();
            }
          } else {
            dateOfBirthInputRef.current?.focus(); // Fallback to focusing the DatePicker container
          }
        } else {
          const inputElement = document.querySelector(
            `input[name="${firstErrorInputName}"]`,
          ) as HTMLInputElement;
          if (inputElement) {
            inputElement.focus();
          }
        }
      }
      return;
    }

    setReverseTransition(false);
    startTransition(() => {
      setStep((prev) => prev + 1);
    });
  };

  const getTransitionConfig = () => ({
    initial: {
      ...transition[reverseTransition ? 'reverse' : 'normal'].enterFrom,
    },
    animate: {
      ...transition[reverseTransition ? 'reverse' : 'normal'].enterTo,
      transition:
        transition[reverseTransition ? 'reverse' : 'normal'].enterActive
          .transition,
    },
    exit: {
      ...transition[reverseTransition ? 'reverse' : 'normal'].leaveTo,
      transition:
        transition[reverseTransition ? 'reverse' : 'normal'].leaveActive
          .transition,
    },
  });

  const getSlideTransitionConfig = () => ({
    initial: {
      ...slideTransition[reverseTransition ? 'reverse' : 'normal'].enterFrom,
    },
    animate: {
      ...slideTransition[reverseTransition ? 'reverse' : 'normal'].enterTo,
      transition:
        slideTransition[reverseTransition ? 'reverse' : 'normal'].enterActive
          .transition,
    },
    exit: {
      ...slideTransition[reverseTransition ? 'reverse' : 'normal'].leaveTo,
      transition:
        slideTransition[reverseTransition ? 'reverse' : 'normal'].leaveActive
          .transition,
    },
  });

  const transitionConfig = getTransitionConfig();
  const slideTransitionConfig = getSlideTransitionConfig();

  return (
    <div className="flex h-screen flex-col items-center justify-center p-4">
      <div className="w-full">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step === 0 || step > 6 ? 'register' : 'login'}
            initial={transitionConfig.initial}
            animate={transitionConfig.animate}
            exit={transitionConfig.exit}
            className="flex h-screen w-screen items-center justify-center"
          >
            {step === 0 && <RegisterStep0 handleNext={handleNext} />}
            {step >= 1 && step <= 6 && (
              <div className="flex h-[450px] w-full flex-col items-center justify-center gap-6">
                {/* Top Row - Form and Info Cards */}
                <div className="flex h-full w-full max-w-4xl gap-6">
                  {/* Form Card */}
                  <Card className="flex w-2/3 flex-col overflow-hidden">
                    <CardBody className="flex flex-1 flex-col justify-center overflow-hidden p-8">
                      <div className="h-full w-full space-y-6">
                        <AnimatePresence mode="wait" initial={false}>
                          <motion.div
                            key={step}
                            initial={slideTransitionConfig.initial}
                            animate={slideTransitionConfig.animate}
                            exit={slideTransitionConfig.exit}
                            className="flex h-full w-full items-center justify-center"
                          >
                            {step === 1 && <RegisterStep1 />}
                            {step === 2 && <RegisterStep2 />}
                            {step === 3 && (
                              <RegisterStep3
                                termsCheckboxRef={termsCheckboxRef as React.RefObject<HTMLInputElement>}
                              />
                            )}
                            {step === 4 && <RegisterStep4 />}
                            {step === 5 && (
                              <RegisterStep5
                                dateOfBirthInputRef={dateOfBirthInputRef as React.RefObject<HTMLDivElement>}
                              />
                            )}
                            {step === 6 && <RegisterStep6 />}
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </CardBody>
                  </Card>

                  {/* Info Card */}
                  <Card className="w-1/3">
                    <CardBody className="overflow-hidden p-8">
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                          key={step}
                          initial={slideTransitionConfig.initial}
                          animate={slideTransitionConfig.animate}
                          exit={slideTransitionConfig.exit}
                          className="flex h-full w-full items-center justify-center"
                        >
                          <SideInfo step={step} />
                        </motion.div>
                      </AnimatePresence>
                    </CardBody>
                  </Card>
                </div>

                {/* Controls Card */}
                <Card className="w-full max-w-4xl">
                  <CardBody className="flex h-full flex-row items-center justify-between overflow-hidden p-4">
                    <Button
                      variant="light"
                      onPress={handleBack}
                      startContent={
                        <MaterialSymbol symbol="arrow_back" size={18} />
                      }
                    >
                      Back
                    </Button>
                    <Button
                      color="primary"
                      endContent={
                        <MaterialSymbol symbol="arrow_forward" size={18} />
                      }
                      onPress={handleNextStep}
                      id="next-step-button"
                    >
                      Continue
                    </Button>
                  </CardBody>
                </Card>
              </div>
            )}
            {step === 7 && <RegisterStep7 />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
