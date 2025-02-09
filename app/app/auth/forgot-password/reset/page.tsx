'use client';

import MaterialSymbol from '@/app/components/common/materialSymbol';
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Input,
  Button,
  CardFooter,
  Spinner,
} from '@heroui/react';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { centerPopTransition } from '@/app/styles/transitions';
import TransitionLink from '@/app/components/common/transitionLink';
import { useNavigateWithAnimation } from '@/app/utils/NavigateWithAnimation';
import PasswordStrength from '@/app/components/features/passwordStrength/passwordStrength';

export default function ForgotPasswordReset() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const nodeRef = useRef(null);
  const navigate = useNavigateWithAnimation();
  const [isFocused, setIsFocused] = useState(false);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
    }, 3000);
  };

  const transition = centerPopTransition();

  const transitionConfig = {
    initial: {
      ...transition.normal.enterFrom,
    },
    animate: {
      ...transition.normal.enterTo,
      transition: transition.normal.enterActive.transition,
    },
    exit: {
      ...transition.normal.leaveTo,
      transition: transition.normal.leaveActive.transition,
    },
  };

  return (
    <div className="relative h-screen w-screen">
      <div
        className={`relative flex h-screen w-screen flex-col items-center justify-center gap-8 ${status !== 'idle' ? 'scale-95 opacity-50 blur-sm' : 'scale-100 opacity-100 blur-0'} transition-all duration-[350ms] ease-in-out-cubic`}
      >
        <Card className="w-full max-w-md">
          <CardHeader className="flex flex-row items-center gap-2">
            <MaterialSymbol symbol="lock" size={32} />
            <span className="text-2xl font-bold">Reset password</span>
          </CardHeader>
          <Divider />
          <CardBody className="flex flex-col gap-4">
            <div className="flex flex-col">
              <p>Please enter new password below.</p>
              <p className="text-sm text-neutral-500">
                Make it strong and easy to remember.
              </p>
            </div>
            <div className="relative w-full">
              <Input
                label="New password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                ref={passwordInputRef}
              />
              <PasswordStrength
                isFocused={isFocused}
                password={password}
                hideCharacterCount
              />
            </div>
            <Input
              label="Confirm password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </CardBody>
          <Divider />
          <CardFooter className="flex flex-row items-center gap-2">
            <Button
              color="primary"
              variant="solid"
              className="w-full"
              onPress={handleSubmit}
            >
              Reset password
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <AnimatePresence mode="wait">
          {status && status !== 'idle' ? (
            <motion.div
              key={status}
              ref={nodeRef}
              initial={transitionConfig.initial}
              animate={transitionConfig.animate}
              exit={transitionConfig.exit}
              className="z-50 flex h-screen w-screen items-center justify-center"
            >
              {status === 'loading' ? (
                <Card className="rounded-full">
                  <CardBody>
                    <Spinner size="lg" />
                  </CardBody>
                </Card>
              ) : status === 'success' ? (
                <Card className="w-full max-w-xs">
                  <CardHeader className="flex flex-col items-center gap-4 pt-8 text-success">
                    <MaterialSymbol symbol="check_circle" size={128} fill />
                    <span className="text-3xl font-bold">Success!</span>
                  </CardHeader>
                  <CardBody className="pb-8">
                    <p className="text-center text-sm">
                      Password has been reset successfully. Please use your new
                      password to login.
                    </p>
                  </CardBody>
                  <CardFooter>
                    <Button
                      color="primary"
                      variant="flat"
                      className="w-full"
                      onPress={() => navigate({ href: '/app/auth/login' })}
                    >
                      Back to login
                    </Button>
                  </CardFooter>
                </Card>
              ) : status === 'error' ? (
                <Card className="w-full max-w-xs">
                  <CardHeader className="text-error flex flex-col items-center gap-4 pt-8 text-danger">
                    <MaterialSymbol symbol="error" size={128} fill />
                    <span className="text-3xl font-bold">Error!</span>
                  </CardHeader>
                  <CardBody>
                    <p className="text-center text-sm">
                      Something went wrong while trying to reset your password,
                      please try again later. if issue persists, please{' '}
                      <TransitionLink
                        href="/app/auth/login"
                        className="text-sm"
                      >
                        contact our support
                      </TransitionLink>
                      .
                    </p>
                  </CardBody>
                  <CardFooter>
                    <Button
                      color="primary"
                      variant="flat"
                      className="w-full"
                      onPress={() => setStatus('idle')}
                    >
                      Close
                    </Button>
                  </CardFooter>
                </Card>
              ) : null}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
