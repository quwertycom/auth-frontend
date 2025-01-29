'use client';

import { Card, CardHeader, CardBody, Divider } from "@heroui/react";
import MaterialSymbol from "./materialSymbol";

export default function OTPCard() {
  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black/50">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row gap-2">
            <MaterialSymbol symbol="lock" type="rounded" weight={600} size={24} />
            <div className="text-center text-2xl font-bold">Two Factor Authentication</div>
        </CardHeader>
        <Divider />
        <CardBody>
            <div className="">One time code has been sent to your email address. Please enter the code below to verify your identity.</div>
        </CardBody>
      </Card>
    </div>
  );
}
