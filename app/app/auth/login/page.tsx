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
  Spinner,
} from '@heroui/react';
import { useState } from 'react';
import OTPCard from '@/app/components/otpCard';
export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<{
    username: { invalid: boolean; message: string } | null;
    password: { invalid: boolean; message: string } | null;
  } | null>(null);
  const [showOTP, setShowOTP] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setError(null);

    const usernameRegex = /^[a-zA-Z0-9_-]{3,50}$/;
    const passwordRegex = /^.{8,}$/;

    const errors = {
      username: null as { invalid: boolean; message: string } | null,
      password: null as { invalid: boolean; message: string } | null,
    };

    // Check for empty fields
    if (username === '') {
      errors.username = {
        invalid: true,
        message: 'Please enter your username',
      };
    }
    if (password === '') {
      errors.password = {
        invalid: true,
        message: 'Please enter your password',
      };
    }

    // Check regex patterns regardless of empty fields
    if (username !== '' && !usernameRegex.test(username)) {
      errors.username = {
        invalid: true,
        message: 'Only letters, numbers, - and _ allowed',
      };
    }
    if (password !== '' && !passwordRegex.test(password)) {
      errors.password = {
        invalid: true,
        message: 'Enter at least 8 characters',
      };
    }


    // TODO: Uncomment after testing
    // If any errors exist, set them and return
    // if (errors.username || errors.password) {
    //   setError(errors);
    //   return;
    // }

    setIsLoading(true);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className={`flex h-screen w-full flex-col items-center justify-center gap-6 ${isLoading && 'scale-85 blur-lg opacity-50'} transition-all duration-[500ms] ease-in-out-quint`}>
        <Card className="w-full max-w-md" data-testid="heroui-card">
          <CardHeader>
            <div className="w-full text-center text-3xl font-bold">
              Login with qID
            </div>
          </CardHeader>
          <CardBody className="flex flex-col gap-2">
            <Input
              label="Username"
              isInvalid={error?.username?.invalid ?? false}
              errorMessage={error?.username?.message}
              className={error?.username?.invalid ? 'mb-0' : 'mb-6'}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleLogin();
                }
              }}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              label="Password"
              type="password"
              isInvalid={error?.password?.invalid ?? false}
              errorMessage={error?.password?.message}
              className={error?.password?.invalid ? 'mb-0' : 'mb-6'}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleLogin();
                }
              }}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Link href="/app/auth/forgot-password">Forgot Password?</Link>
          </CardBody>
          <CardBody>
            <Button className="w-full" color="primary" onPress={handleLogin}>
              Login
            </Button>
          </CardBody>
          <Divider />
          <CardFooter>
            <Link href="/app/auth/register">
              Don&apos;t have an account? Register
            </Link>
          </CardFooter>
        </Card>
      </div>
      <div className={`${isLoading ? 'opacity-100' : 'opacity-0'} transition-all duration-[500ms] ease-in-out-quint fixed left-50 top-50 translate-x-[-50%] translate-y-[-50%]`}>
        <Spinner size="lg" />
      </div>
    </div>
  );
}
