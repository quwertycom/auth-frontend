'use client';

import { Card, CardBody, CardFooter, CardHeader, Divider, InputOtp, Button } from "@heroui/react";
import TransitionLink from "@/app/components/transitionLink";
export default function ForgotPasswordVerify() {
  return (
  <div className="flex h-screen w-screen flex-col items-center justify-center gap-8">
    <Card className="w-full max-w-md">
      <CardHeader>
        <span className="text-2xl font-bold">Reset your password</span>
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-col gap-4 items-center text-center">
        <p>We sent 8 digits code to your email, please enter it below to reset your password. code is valid only for 15 minutes</p>
        <InputOtp length={8}/>  
        <p className="text-left w-full">Did not get the code? <span className="text-primary cursor-pointer">Send it again.</span></p>
      </CardBody>
      <CardFooter>
        <Button color="primary" variant="flat" className="w-full">
          Reset password
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
