import MaterialSymbol from '../materialSymbol';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import { useMemo } from 'react';
import { centerPopTransition } from '@/app/styles/transitions';
import { motion, AnimatePresence } from 'framer-motion';

// Add password strength checker function
const getPasswordStrength = (password: string) => {
  let strength = 0;
  const criteria = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    specialChar: /[^A-Za-z0-9]/.test(password),
  };

  strength += criteria.length ? 1 : 0;
  strength += criteria.uppercase ? 1 : 0;
  strength += criteria.lowercase ? 1 : 0;
  strength += criteria.number ? 1 : 0;
  strength += criteria.specialChar ? 1 : 0;

  const strengthLevels = [
    { label: 'Very Weak', color: 'red', symbol: 'close' },
    { label: 'Weak', color: 'red', symbol: 'close' },
    { label: 'Moderate', color: 'yellow', symbol: 'warning' },
    { label: 'Strong', color: 'green', symbol: 'check' },
    { label: 'Very Strong', color: 'green', symbol: 'check' },
  ];

  return strengthLevels[Math.min(strength, strengthLevels.length - 1)];
};

export default function SideInfo(props: { step: number; isPasswordFocused: boolean }) {
  const { step, isPasswordFocused } = props;
  const formData = useSelector((state: RootState) => state.register.formData);
  
  const passwordStrength = useMemo(
    () => getPasswordStrength(formData.password),
    [formData.password]
  );

  const popTransition = centerPopTransition(500);

  const getPopTransitionConfig = () => ({
    initial: {
      ...popTransition.normal.enterFrom,
    },
    animate: {
      ...popTransition.normal.enterTo,
      transition:
        popTransition.normal.enterActive.transition,
    },
    exit: {
      ...popTransition.normal.leaveTo,
      transition:
        popTransition.normal.leaveActive.transition,
    },
  });

  const showStatus = !isPasswordFocused && formData.password.length > 0;

  return (
    <div className="flex flex-col items-center justify-between gap-6 text-center w-full">
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
        <div className="flex flex-col items-center justify-between gap-6 text-center w-full">
          <AnimatePresence mode='wait'>
            <motion.div
              key={isPasswordFocused ? 'password' : 'password-not-focused'}
              initial={getPopTransitionConfig().initial}
              animate={getPopTransitionConfig().animate}
              exit={getPopTransitionConfig().exit}
              className='w-full'
            >
              {isPasswordFocused && (
                <div
                  className="space-y-4 w-full"
            >
              <div className="space-y-2 w-full">
                <div className="flex items-center w-full justify-between text-sm">
                  <span>Password Strength:</span>
                  <span className="font-medium text-foreground">
                    {passwordStrength.label}
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-neutral-200 dark:bg-neutral-700">
                  <div
                    className={`bg-${passwordStrength.color}-500 h-full rounded-full transition-all duration-300`}
                    style={{ width: `${(passwordStrength.label === 'Very Weak' ? 20 : passwordStrength.label === 'Weak' ? 40 : passwordStrength.label === 'Moderate' ? 60 : passwordStrength.label === 'Strong' ? 80 : 100)}%` }}
                  />
                </div>
                <div className="flex flex-col gap-2 pt-2 text-sm w-full">
                  <div className="flex items-center gap-1">
                    <MaterialSymbol
                      symbol={formData.password.length >= 8 ? 'check' : 'close'}
                      size={16}
                      className={formData.password.length >= 8 ? 'text-green-500' : 'text-red-500'}
                    />
                    <span>8+ characters</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MaterialSymbol
                      symbol={/[A-Z]/.test(formData.password) ? 'check' : 'close'}
                      size={16}
                      className={/[A-Z]/.test(formData.password) ? 'text-green-500' : 'text-red-500'}
                    />
                    <span>Uppercase letter</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MaterialSymbol
                      symbol={/[0-9]/.test(formData.password) ? 'check' : 'close'}
                      size={16}
                      className={/[0-9]/.test(formData.password) ? 'text-green-500' : 'text-red-500'}
                    />
                    <span>Number</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MaterialSymbol
                      symbol={/[^A-Za-z0-9]/.test(formData.password) ? 'check' : 'close'}
                      size={16}
                      className={/[^A-Za-z0-9]/.test(formData.password) ? 'text-green-500' : 'text-red-500'}
                    />
                    <span>Special character</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {showStatus && (
            <div className="flex flex-col items-center justify-between gap-6 text-center">
              <div className='flex flex-col items-center gap-6 h-full'>
                <h3 className="text-xl font-semibold text-foreground">Stay secure</h3>
                <MaterialSymbol
                  symbol="lock"
                  type="rounded"
                  size={128}
                  className="text-primary-600"
                />
              </div>
              <div className="flex items-center gap-2 mt-4 text-sm">
                <MaterialSymbol
                  symbol={passwordStrength.symbol}
                  size={20}
                  className={
                    passwordStrength.color === 'green' ? 'text-green-500' :
                    passwordStrength.color === 'yellow' ? 'text-yellow-500' : 'text-red-500'
                  }
                />
                <span className={
                  passwordStrength.color === 'green' ? 'text-green-500' :
                  passwordStrength.color === 'yellow' ? 'text-yellow-500' : 'text-red-500'
                }>
                  {passwordStrength.color === 'green' && 'Password meets security requirements'}
                  {passwordStrength.color === 'yellow' && 'Password could be stronger'}
                  {passwordStrength.color === 'red' && 'Password does not meet requirements'}
                </span>
              </div>
            </div>
          )}

          {!isPasswordFocused && formData.password === '' && (
            <div className="flex flex-col items-center justify-between gap-6 text-center">
            <div className='flex flex-col items-center gap-6 h-full'>
              <h3 className="text-xl font-semibold text-foreground">Stay secure</h3>
              <MaterialSymbol
                symbol="lock"
                type="rounded"
                size={128}
                className="text-primary-600"
              />
            </div>
            <p className="text-sm text-white">
              Set a secure password that you will use to login, if you forget
              it, you can always reset it via email or phone number. Never share
              your password with others.
            </p>
          </div>
          )}
          </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
