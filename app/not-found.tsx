import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404: This page could not be found.',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg">The page you are looking for does not exist.</p>
    </div>
  );
} 