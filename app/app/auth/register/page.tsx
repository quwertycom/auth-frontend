'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { centerPop } from '@/app/styles/transitions';
import { Button, Card, CardBody, Divider, Input } from '@heroui/react';
import MaterialSymbol from '@/app/components/materialSymbol';

export default function RegisterPage() {
  const [step, setStep] = useState(0);

  const animation = centerPop(400);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center p-4">
      <div className="w-full">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={step === 0 ? false : animation.enterFrom}
            animate={animation.enterTo}
            exit={animation.leaveTo}
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
                        <h1 className="text-3xl font-bold text-gray-900">
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
              <div className="flex h-[400px] w-full items-center justify-center">
                <Card className="flex h-full w-full max-w-[750px] flex-row">
                  <div className="flex w-3/5 flex-col gap-4">
                    <CardBody className="h-full w-full">
                      <div className="flex h-full w-full flex-col items-center justify-center">
                        {step === 1 && (
                          <div className="flex h-fit w-full max-w-xs flex-col items-center justify-center gap-4">
                            <Input label="First name" />
                            <Input label="Last name" />
                          </div>
                        )}
                      </div>
                    </CardBody>
                    <Divider />
                    <CardBody>
                      <Button variant="ghost" onPress={handleBack}>
                        Next
                      </Button>
                    </CardBody>
                  </div>
                  <Divider orientation="vertical" />
                  <CardBody className="w-2/5">
                    <div className="flex h-full w-full flex-col items-center justify-center">
                      {step === 1 && (
                        <div className="flex h-fit w-full max-w-xs flex-col items-center justify-center gap-8">
                          <div className="text-center text-xl font-bold">
                            Let&apos;s get to know each other
                          </div>
                          <MaterialSymbol
                            symbol="waving_hand"
                            type="rounded"
                            size={96}
                            color="white"
                          />
                        </div>
                      )}
                    </div>
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
