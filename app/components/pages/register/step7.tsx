import { Button, Card, CardBody } from '@heroui/react';
import MaterialSymbol from '../../common/materialSymbol';

export default function RegisterStep7() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6">
      <Card className="w-full max-w-md" radius="lg">
        <CardBody className="flex flex-col items-center gap-6 p-8">
          <div className="flex flex-col items-center gap-4">
            <MaterialSymbol
              symbol="verified_user"
              type="rounded"
              size={96}
              className="text-primary-500"
            />
            <div className="text-center">
              <h1 className="text-3xl font-bold">We&apos;re Almost Done!</h1>
              <p className="mt-2 text-neutral-600">
                Just one more step! We&apos;ll send a verification code to your
                email to complete your account setup and ensure it&apos;s
                secure.
              </p>
            </div>
          </div>
          <Button
            color="primary"
            variant="solid"
            size="lg"
            className="w-full"
            startContent={
              <MaterialSymbol symbol="send" size={20} className="text-white" />
            }
          >
            Send Verification Email
          </Button>
          <div className="mt-4 flex items-center gap-2 text-sm text-neutral-500">
            <MaterialSymbol symbol="info" size={16} />
            <span>Check your inbox after clicking above</span>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
