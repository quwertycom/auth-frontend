'use client';

import { Card, CardHeader, CardBody, Divider, InputOtp, Button, CardFooter, Link } from "@heroui/react";
import MaterialSymbol from "./materialSymbol";

export default function OTPCard(props: {show: boolean}) {
  return (
    <div className={`fixed z-50 inset-0 flex items-center justify-center bg-transparent ${props.show ? 'opacity-100 blur-none scale-100' : 'opacity-0 translate-y-[30vh] blur-sm scale-110'} transition-all duration-[550ms] ease-in-out-cubic`}>
      <div style={{perspective: '1000px'}}>
        <Card 
          className={`w-full max-w-md`}
        >
          <CardHeader className="flex flex-row gap-2">
              <MaterialSymbol symbol="lock" type="rounded" weight={600} size={24} />
              <div className="text-center text-2xl font-bold">Two Factor Authentication</div>
          </CardHeader>
          <Divider />
          <CardBody>
              <div className="text-center text-sm">One time code has been sent to your email address. Please enter the code below, code is valid only for 15 minutes.</div>
          </CardBody>
          <CardBody className="flex flex-col gap-2">
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-center gap-2">
                <InputOtp length={8} />
                <Link href="/app/auth/login" className="w-full">Didn't receive the code?</Link>
              </div>
            </div>
          </CardBody>
          <CardFooter>
            <Button className="w-full" color="primary">Verify</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
