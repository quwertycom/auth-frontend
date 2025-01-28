'use client';

import { Button } from '@heroui/react';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { setUsername, resetUsername } from '@/app/store/features/authSlice';

export default function Home() {
  const username = useAppSelector((state) => state.auth.username);
  const dispatch = useAppDispatch();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-16 p-8 pb-20 sm:p-20">
      <h1 className="text-4xl font-bold">Hello World</h1>
      <div className="flex items-center gap-4">
        <Button variant="solid" onPress={() => dispatch(resetUsername())}>
          Reset Username
        </Button>
        <span className="text-2xl" role="status" aria-label="Current username">
          {username}
        </span>
        <Button
          variant="solid"
          onPress={() => dispatch(setUsername('JohnDoe'))}
        >
          Set Username
        </Button>
      </div>
    </div>
  );
}
