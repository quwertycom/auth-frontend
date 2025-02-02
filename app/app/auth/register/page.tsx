'use client';

import { startTransition, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button, Card, CardBody, Divider, Input } from '@heroui/react';
import MaterialSymbol from '@/app/components/materialSymbol';
import { centerPopTransition } from '@/app/styles/transitions';

export default function RegisterPage() {
  const [step, setStep] = useState(0);
  const [reverseTransition, setReverseTransition] = useState(false);

  const transition = centerPopTransition();

  const handleNext = () => {
    setReverseTransition(false);
    startTransition(() => {
      setStep(step + 1);
    });
  };

  const handleBack = () => {
    setReverseTransition(true);
    startTransition(() => {
      setStep(step - 1);
    });
  }
  return (
    <div className="flex h-screen flex-col items-center justify-center p-4">
      <div className="w-full">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={{
              ...transition[reverseTransition ? 'reverse' : 'normal'].enterFrom
            }}
            animate={{
              ...transition[reverseTransition ? 'reverse' : 'normal'].enterTo,
              transition: transition[reverseTransition ? 'reverse' : 'normal'].enterActive.transition
            }}
            exit={{
              ...transition[reverseTransition ? 'reverse' : 'normal'].leaveTo,
              transition: transition[reverseTransition ? 'reverse' : 'normal'].leaveActive.transition
            }}
            className="flex h-screen w-screen items-center justify-center"
          >
            {step === 0 && (
              <div className="flex flex-col items-center justify-center">
                <Card className="w-full max-w-md" radius="lg">
                  <CardBody className="flex flex-col items-center gap-6 p-8">
                    <div className="flex flex-col items-center gap-4">
                      <MaterialSymbol
                        symbol="person_add"
                        type="rounded"
                        size={96}
                        className="text-primary-500"
                      />
                      <div className="text-center">
                        <h1 className="text-3xl font-bold">
                          Create Your qID
                        </h1>
                        <p className="mt-2 text-gray-600">
                          Don&apos;t have a qID yet? No worries!
                          <br />
                          Create your account now to access all our services.
                        </p>
                      </div>
                    </div>
                    <Button
                      color="primary"
                      variant="solid"
                      size="lg"
                      className="w-full"
                      onPress={handleNext}
                      endContent={
                        <MaterialSymbol
                          symbol="arrow_forward"
                          size={20}
                          className="text-white"
                        />
                      }
                    >
                      Get Started
                    </Button>
                  </CardBody>
                </Card>
              </div>
            )}
            {step >= 1 && (
              <div className="flex h-[450px] w-full flex-col items-center justify-center gap-6">
                {/* Top Row - Form and Info Cards */}
                <div className="flex h-full w-full max-w-4xl gap-6">
                  {/* Form Card */}
                  <Card className="flex w-2/3 flex-col">
                    <CardBody className="flex flex-1 flex-col justify-center p-8">
                      <div className="w-full space-y-6">
                        {step === 1 && (
                          <div className="flex flex-col gap-6 items-stretch justify-center">
                            <div className="space-y-2">
                              <h2 className="text-2xl font-bold text-foreground">
                                Personal Information
                              </h2>
                              <p className="text-sm text-neutral-500">
                                Tell us how we should address you
                              </p>
                            </div>
                            <div className="space-y-4">
                              <Input
                                label="First name"
                                variant="bordered"
                                classNames={{ input: "text-md" }}
                              />
                              <Input
                                label="Last name"
                                variant="bordered"
                                classNames={{ input: "text-md" }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </CardBody>
                  </Card>

                  {/* Info Card */}
                  <Card className="w-1/3 bg-primary-50">
                    <CardBody className="flex flex-col items-center justify-between gap-6 p-8 text-center">
                      <h3 className="text-xl font-semibold text-foreground">
                          Why We Ask This?
                      </h3>
                      <MaterialSymbol
                        symbol="help"
                        type="rounded"
                        size={128}
                        className="text-primary-600"
                      />
                      <div className="space-y-4">
                        <p className="text-sm text-white">
                          We use your name to personalize your experience while maintaining 
                          strict privacy controls. Your name will not be visible publicly
                          unless you create a developer profile.
                        </p>
                      </div>
                    </CardBody>
                  </Card>
                </div>

                {/* Controls Card */}
                <Card className="w-full max-w-4xl">
                  <CardBody className="flex flex-row items-center justify-between h-full overflow-hidden p-4">
                    <Button
                      variant="light"
                      onPress={handleBack}
                      startContent={<MaterialSymbol symbol="arrow_back" size={18} />}
                    >
                      Back
                    </Button>
                    <Button 
                      color="primary"
                      endContent={<MaterialSymbol symbol="arrow_forward" size={18} />}
                    >
                      Continue
                    </Button>
                  </CardBody>
                </Card>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
