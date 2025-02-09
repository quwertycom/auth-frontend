import { Button, Card, CardBody } from '@heroui/react';
import MaterialSymbol from '../../common/materialSymbol';
import TransitionLink from '../../common/transitionLink';

export default function RegisterStep0(props: { handleNext: () => void }) {
  const { handleNext } = props;

  return (
    <div className="flex flex-col items-center justify-center">
      <Card className="w-full max-w-md" radius="lg">
        <CardBody className="flex flex-col items-center gap-6 p-8">
          <div className="flex flex-col items-center gap-4">
            <MaterialSymbol
              symbol="person_add"
              type="rounded"
              size={96}
              className="text-primary-500"
            />
            <div className="text-center">
              <h1 className="text-3xl font-bold">Create Your qID</h1>
              <p className="mt-2 text-neutral-600">
                Don&apos;t have a qID yet? No worries!
                <br />
                Create your account now to access all our services.
              </p>
            </div>
          </div>
          <Button
            color="primary"
            variant="solid"
            size="lg"
            className="w-full"
            onPress={handleNext}
            endContent={
              <MaterialSymbol
                symbol="arrow_forward"
                size={20}
                className="text-white"
              />
            }
          >
            Get Started
          </Button>
        </CardBody>
      </Card>
      <div className="mt-6 flex flex-col items-center justify-center">
        <TransitionLink href="/app/auth/login">
          Already have an account? Login
        </TransitionLink>
      </div>
    </div>
  );
}
