import MaterialSymbol from '../materialSymbol';

export default function SideInfo(props: { step: number }) {
  const { step } = props;
  return (
    <div className="flex flex-col items-center justify-between gap-6 text-center">
      {step === 1 && (
        <div className="flex flex-col items-center justify-between gap-6 text-center">
          <h3 className="text-xl font-semibold text-foreground">
            Why We Ask This?
          </h3>
          <MaterialSymbol
            symbol="help"
            type="rounded"
            size={128}
            className="text-primary-600"
          />
          <div className="space-y-4">
            <p className="text-sm text-white">
              We use your name to personalize your experience while maintaining
              strict privacy controls. Your name will not be visible publicly
              unless you create a developer profile.
            </p>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="flex flex-col items-center justify-between gap-6 text-center">
          <h3 className="text-xl font-semibold text-foreground">
            Be in contact
          </h3>
          <MaterialSymbol
            symbol="upcoming"
            type="rounded"
            size={128}
            className="text-primary-600"
          />
          <div className="space-y-4">
            <p className="text-sm text-white">
              By entering you email or phone number, you will be first that know
              about new features and updates, also you will be able to reset
              your password if you forget it.s
            </p>
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="flex flex-col items-center justify-between gap-6 text-center">
          <h3 className="text-xl font-semibold text-foreground">
            Select what you agree with
          </h3>
          <MaterialSymbol
            symbol="checklist"
            type="rounded"
            size={128}
            className="text-primary-600"
          />
          <div className="space-y-4">
            <p className="text-sm text-white">
              Select what you want to agree with. You can always change it later
              in account settings or via our support.
            </p>
          </div>
        </div>
      )}
      {step === 4 && (
        <div className="flex flex-col items-center justify-between gap-6 text-center">
          <h3 className="text-xl font-semibold text-foreground">
            Select your username
          </h3>
          <MaterialSymbol
            symbol="alternate_email"
            type="rounded"
            size={128}
            className="text-primary-600"
          />
          <div className="space-y-4">
            You will use it to login and other will be able to find you by it.
            It is visible publicly, do not include any personal information here
          </div>
        </div>
      )}
      {step === 5 && (
        <div className="flex flex-col items-center justify-between gap-6 text-center">
          <h3 className="text-xl font-semibold text-foreground">
            Personalize your experience
          </h3>
          <MaterialSymbol
            symbol="tune"
            type="rounded"
            size={128}
            className="text-primary-600"
          />
          <div className="space-y-4">
            <p className="text-sm text-white">
              Give us some more details about you to know you better and make
              your life even easier!
            </p>
          </div>
        </div>
      )}
      {step === 6 && (
        <div className="flex flex-col items-center justify-between gap-6 text-center">
          <h3 className="text-xl font-semibold text-foreground">Stay secure</h3>
          <MaterialSymbol
            symbol="lock"
            type="rounded"
            size={128}
            className="text-primary-600"
          />
          <div className="space-y-4">
            <p className="text-sm text-white">
              Set a secure password that you will use to login, if you forget
              it, you can always reset it via email or phone number. Never share
              your password with others.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
