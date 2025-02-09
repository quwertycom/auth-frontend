'use client';

import MaterialSymbol from '@/app/components/common/materialSymbol';
import { Card, CardHeader, CardBody, Divider, Input } from '@heroui/react';
import { useState } from 'react';

export default function ForgotPasswordReset() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-8">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center gap-2">
          <MaterialSymbol symbol="lock" size={32} />
          <span className="text-2xl font-bold">Reset password</span>
        </CardHeader>
        <Divider />
        <CardBody>
          <p>
            Please enter new password below. Make it strong and easy to remember. 
          </p>
          <Input
            label="New password"
            placeholder="New password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            label="Confirm password"
            placeholder="Confirm password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </CardBody>
      </Card>
    </div>
  )
}
