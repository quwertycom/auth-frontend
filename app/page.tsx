"use client";

import { Button } from "@heroui/react";
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { setUsername, resetUsername } from '@/app/store/features/authSlice';

export default function Home() {
  const username = useAppSelector((state) => state.auth.username);
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="text-4xl font-bold">Hello World</div>
      <div className="flex gap-4 items-center">
        <Button variant="solid" onPress={() => dispatch(resetUsername())}>Reset Username</Button>
        <span className="text-2xl">{username}</span>
        <Button variant="solid" onPress={() => dispatch(setUsername('JohnDoe'))}>Set Username</Button>
      </div>
    </div>
  );
}
