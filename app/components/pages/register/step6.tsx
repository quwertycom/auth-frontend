import { Input } from '@heroui/react';
import MaterialSymbol from '../../common/materialSymbol';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import { updateFormData } from '@/app/store/features/registerSlice';
import { useState, useRef, useEffect } from 'react';
import PasswordStrength from '../../features/passwordStrength/passwordStrength';

export default function RegisterStep6() {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.register.formData);
  const errors = useSelector((state: RootState) => state.register.errors);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | undefined
  >(undefined);

  const passwordInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    passwordInputRef.current?.focus();
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-stretch justify-evenly gap-6">
      <div className="flex flex-col items-center justify-center gap-2">
        <h2 className="text-2xl font-bold text-foreground">Stay secure</h2>
        <p className="text-sm text-neutral-500">
          Set a secure and easy to remember password
        </p>
      </div>
      <div className="flex w-full flex-col items-stretch justify-center gap-4">
        <div
          className={`${
            errors.find((error) => error.input === 'password') ? 'mb-0' : 'mb-6'
          }`}
        >
          <PasswordStrength isFocused={isFocused} password={formData.password}>
            <Input
              label="Password"
              variant="bordered"
              type={showPassword ? 'text' : 'password'}
              classNames={{ input: 'text-md' }}
              value={formData.password}
              onChange={(e) => {
                dispatch(
                  updateFormData({
                    password: e.target.value,
                  }),
                );
              }}
              isRequired
              isInvalid={
                errors.find((error) => error.input === 'password')
                  ? true
                  : false
              }
              errorMessage={
                errors.find((error) => error.input === 'password')?.message
              }
              ref={passwordInputRef}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              endContent={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="focus:outline-none"
                >
                  <MaterialSymbol
                    symbol={showPassword ? 'visibility_off' : 'visibility'}
                    size={20}
                    className="text-neutral-500"
                  />
                </button>
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  document
                    .querySelector<HTMLInputElement>(
                      'input[name="confirmPassword"]',
                    )
                    ?.focus();
                }
              }}
              name="password"
            />
          </PasswordStrength>
        </div>

        <Input
          label="Confirm password"
          variant="bordered"
          type={showConfirmPassword ? 'text' : 'password'}
          className={`${confirmPasswordError ? 'mb-0' : 'mb-6'}`}
          classNames={{ input: 'text-md' }}
          value={formData.confirmPassword}
          onChange={(e) => {
            dispatch(
              updateFormData({
                confirmPassword: e.target.value,
              }),
            );
          }}
          isRequired
          isInvalid={!!confirmPasswordError}
          errorMessage={confirmPasswordError}
          onBlur={() => {
            if (
              formData.password.length > 0 &&
              formData.password !== formData.confirmPassword
            ) {
              setConfirmPasswordError('Passwords do not match');
            } else {
              setConfirmPasswordError(undefined);
            }
          }}
          endContent={
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="focus:outline-none"
            >
              <MaterialSymbol
                symbol={showConfirmPassword ? 'visibility_off' : 'visibility'}
                size={20}
                className="text-neutral-500"
              />
            </button>
          }
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              document.getElementById('next-step-button')?.click();
            }
          }}
          name="confirmPassword"
        />
      </div>
    </div>
  );
}
