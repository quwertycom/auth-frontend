'use client';

import { Card, CardHeader, CardBody } from "@heroui/react";

export default function OTPCard() {
  return (
    <div className="fixed z-50 backdrop-blur-xl inset-0 flex items-center justify-center bg-black/50">
      <Card>
        <CardHeader>
            <div className="text-center text-2xl font-bold">Two Factor Authentication</div>
        </CardHeader>
        <CardBody>
            <div className="text-center text-2xl font-bold">Enter OTP</div>
        </CardBody>
      </Card>
    </div>
  );
}
