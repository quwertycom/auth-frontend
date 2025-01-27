'use client';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
  Divider,
  Link,
} from '@heroui/react';

export default function LoginPage() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">QUWERTY Auth</h1>
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="w-full text-center text-2xl font-bold">Login</div>
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col gap-4">
          <Input label="Email" />
          <Input label="Password" />
          <Link href="/app/auth/forgot-password">Forgot Password?</Link>
        </CardBody>
        <CardFooter>
          <Button className="w-full" color="primary">
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
