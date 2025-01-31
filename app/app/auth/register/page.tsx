'use client'

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { centerPop } from '@/app/styles/transitions';
import { Button } from '@heroui/react';

export default function RegisterPage() {
  const [step, setStep] = useState(0);

  return (
    <div className='flex flex-col items-center justify-center h-screen p-4'>
      <div className="w-full">
        <AnimatePresence mode='wait'>
          <motion.div
            key={step}
            initial={centerPop.enter}
            animate={centerPop.enterActive}
            exit={centerPop.exitActive}
            className="flex justify-center items-center"
          >
            {step === 0 && (
              <div className='flex flex-col items-center justify-center'>
                <div className='text-2xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold text-center transition-all duration-300'>
                  Welcome to QUWERTY
                </div>
                <div className='text-xs sm:text-base lg:text-2xl xl:text-3xl text-center transition-all duration-300'>
                  New here? Let&apos;s start your journey.
                </div>
                <div>
                  <Button
                    color='primary'
                    variant='shadow'
                    size='lg'
                    className='w-full mt-4'
                  >
                    Let&apos;s go!
                  </Button>
                </div>
              </div>
            )}
            {step === 1 && (
              <div className="bg-green-100 p-6 rounded-lg w-full">
                Step 2 Content
              </div>
            )}
            {step === 2 && (
              <div className="bg-red-100 p-6 rounded-lg w-full">
                Step 3 Content
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
