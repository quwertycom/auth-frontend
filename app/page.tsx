"use client";

import { Button } from "@heroui/react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="text-4xl font-bold">Hello World</div>
      <Button variant="solid">Click me</Button>
    </div>
  );
}
