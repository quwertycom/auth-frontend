'use client';

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
  Spinner,
} from '@heroui/react';
import MaterialSymbol from '@/app/components/common/materialSymbol';
import { useState, useRef } from 'react';
import TransitionLink from '@/app/components/common/transitionLink';
import { motion, AnimatePresence } from 'framer-motion';
import { centerPopTransition } from '@/app/styles/transitions';
import { useNavigateWithAnimation } from '@/app/utils/NavigateWithAnimation';

export default function ForgotPassword() {
  const navigate = useNavigateWithAnimation();

  const [username, setUsername] = useState('');

  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const nodeRef = useRef(null);

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
            <MaterialSymbol symbol="help_outline" size={32} />
            <span className="text-2xl font-bold">Forgot Password</span>
          </CardHeader>
          <Divider />
          <CardBody className="flex flex-col gap-2">
            <Input
              label="Username or Email"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <p className="w-full text-left text-sm text-neutral-500">
              After that you will receive a link to reset your password on your
              email. If you don&apos;t have access to it, please{' '}
              <TransitionLink href="/app/auth/login" className="text-sm">
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
              onPress={handleSubmit}
            >
              Send reset link
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardBody className="flex flex-row items-center gap-2">
            <span>Need more help?</span>
            <TransitionLink href="/app/auth/login">Help center</TransitionLink>
          </CardBody>
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
                      We have sent a reset link to your email. Please check your
                      inbox and spam folder. If you don&apos;t see it, please{' '}
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
                      Something went wrong while trying to sent reset link,
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
