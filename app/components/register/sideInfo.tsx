import MaterialSymbol from '../materialSymbol';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import { useMemo } from 'react';
import { centerPopTransition } from '@/app/styles/transitions';
import { motion, AnimatePresence } from 'framer-motion';

// Update the getPasswordStrength function
const getPasswordStrength = (password: string) => {
  const criteria = {
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    length: password.length >= 8,
    specialChar: /[^A-Za-z0-9]/.test(password),
  };

  // NIST-inspired base requirements (12+ chars with mix)
  const meetsMinimum = criteria.lowercase && criteria.uppercase && criteria.number && criteria.length;
  
  // Additional security factors
  const isLong = password.length >= 12; // CIS recommends 14+ for password-only accounts
  const hasSymbol = criteria.specialChar;
  const isSuperLong = password.length >= 16;

  let label = 'Doesn\'t meet requirements';
  let color = 'red';
  let symbol = 'close';
  
  if (meetsMinimum) {
    if (isSuperLong && hasSymbol) {
      label = 'Very Strong';
      color = 'green';
      symbol = 'check';
    } else if (isLong && hasSymbol || isSuperLong && !hasSymbol) {
      label = 'Strong';
      color = 'green';
      symbol = 'check';
    } else if ((hasSymbol || isLong) && !(hasSymbol && isLong) && !isSuperLong) {
      label = 'Good';
      color = 'green';
      symbol = 'check';
    } else {
      label = 'Ok';
      color = 'yellow';
      symbol = 'warning';
    }
  }

  return {
    label,
    color: meetsMinimum ? color : 'red',
    symbol: meetsMinimum ? symbol : 'close',
    isValid: meetsMinimum,
    criteria
  };
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
                    style={{ 
                      width: `${passwordStrength.isValid ? 
                        (passwordStrength.label.includes('Very Strong') ? 100 :
                         passwordStrength.label.includes('Strong') ? 85 :
                         70) : 20}%` 
                    }}
                  />
                </div>
                <div className="flex flex-col gap-2 pt-2 text-sm w-full">
                  <div className="flex items-center gap-1">
                    <MaterialSymbol
                      symbol={passwordStrength.criteria.lowercase ? 'check' : 'close'}
                      size={16}
                      className={passwordStrength.criteria.lowercase ? 'text-green-500' : 'text-red-500'}
                    />
                    <span>1 lowercase letter</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MaterialSymbol
                      symbol={passwordStrength.criteria.uppercase ? 'check' : 'close'}
                      size={16}
                      className={passwordStrength.criteria.uppercase ? 'text-green-500' : 'text-red-500'}
                    />
                    <span>1 uppercase letter</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MaterialSymbol
                      symbol={passwordStrength.criteria.number ? 'check' : 'close'}
                      size={16}
                      className={passwordStrength.criteria.number ? 'text-green-500' : 'text-red-500'}
                    />
                    <span>1 number</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MaterialSymbol
                      symbol={passwordStrength.criteria.length ? 'check' : 'close'}
                      size={16}
                      className={passwordStrength.criteria.length ? 'text-green-500' : 'text-red-500'}
                    />
                    <span>Minimum 12 characters</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MaterialSymbol
                      symbol={passwordStrength.criteria.specialChar ? 'check' : 'close'}
                      size={16}
                      className={passwordStrength.criteria.specialChar ? 'text-green-500' : 'text-gray-500'}
                    />
                    <span>Special character (optional, recommended)</span>
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
                  className={passwordStrength.isValid ? 'text-green-500' : 'text-red-500'}
                />
                <span className={passwordStrength.isValid ? 'text-green-500' : 'text-red-500'}>
                  {passwordStrength.label}
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
