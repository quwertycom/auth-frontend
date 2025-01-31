import TransitionLink from '@/app/components/transitionLink';

export default function RegisterPage() {
  return (
    <div>
      <h1>Register</h1>
      <TransitionLink href="/app/auth/login">Back to login</TransitionLink>
    </div>
  );
}
