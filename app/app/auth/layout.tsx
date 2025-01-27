
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Auth Layout</h1>
      {children}
    </div>
  );
}
