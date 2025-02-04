'use client';

import { Link } from '@heroui/react';

export default function Home() {

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-16 p-8 pb-20 sm:p-20">
      <h1 className="text-4xl font-bold">Hello World</h1>
      <div className="flex items-center gap-4">
        <Link href="/app/auth/login">Auth</Link>
      </div>
    </div>
  );
}
