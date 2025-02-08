'use client';

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
} from '@heroui/react';
import MaterialSymbol from '@/app/components/materialSymbol';
import { useState } from 'react';
import TransitionLink from '@/app/components/transitionLink';
export default function ForgotPassword() {
  const [username, setUsername] = useState('');

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-8">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center gap-2">
          <MaterialSymbol symbol="help_outline" size={32} />
          <span className="text-2xl font-bold">Forgot Password</span>
        </CardHeader>
        <Divider />
        <CardBody>
          <Input
            label="Username or Email"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </CardBody>
        <CardFooter>
          <Button color="primary" variant="flat" className="w-full">
            Send reset link
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardBody className="flex flex-row items-center gap-2">
          <span>Need more help?</span>
          <TransitionLink href="/app/auth/login">
            Contact support
          </TransitionLink>
        </CardBody>
      </Card>
    </div>
  );
}
