'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { slideDown } from '@/app/styles/transitions';
import { Button } from '@heroui/react';

export default function RegisterPage() {
  const [step, setStep] = useState(0);

  const animation = slideDown(800);

  return (
    <div className="flex h-screen flex-col items-center justify-center p-4">
      <div className="w-full">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={step === 0 ? false : animation.enter}
            animate={animation.enterActive}
            exit={animation.exitActive}
            className="flex items-center justify-center"
          >
            {step === 0 && (
              <div className="flex flex-col items-center justify-center">
                <div className="text-center text-2xl font-bold transition-all duration-300 sm:text-4xl lg:text-6xl xl:text-7xl">
                  Welcome to QUWERTY
                </div>
                <div className="text-center text-xs transition-all duration-300 sm:text-base lg:text-2xl xl:text-3xl">
                  New here? Let&apos;s start your journey.
                </div>
                <div>
                  <Button
                    color="primary"
                    variant="shadow"
                    size="lg"
                    className="mt-4 w-full"
                    onPress={() => setStep(1)}
                  >
                    Let&apos;s go!
                  </Button>
                </div>
              </div>
            )}
            {step === 1 && (
              <div className="w-full rounded-lg bg-green-100 p-6">
                Step 2 Content
              </div>
            )}
            {step === 2 && (
              <div className="w-full rounded-lg bg-red-100 p-6">
                Step 3 Content
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
