import { Card, CardBody, Divider, Input } from '@heroui/react';
import MaterialSymbol from '../materialSymbol';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import { updateFormData } from '@/app/store/features/registerSlice';
import { useState } from 'react';
import { getPasswordStrength } from '@/app/utils/password-strength';

export default function RegisterStep6() {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.register.formData);
  const errors = useSelector((state: RootState) => state.register.errors);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="flex h-full w-full flex-col items-stretch justify-evenly gap-6">
      <div className="flex flex-col items-center justify-center gap-2">
        <h2 className="text-2xl font-bold text-foreground">Stay secure</h2>
        <p className="text-sm text-neutral-500">
          Set a secure and easy to remember password
        </p>
      </div>
      <div className="flex w-full flex-col items-stretch justify-center gap-4">
        <div className='w-full relative'>
          <Input
            label="Password"
            variant="bordered"
            type={showPassword ? 'text' : 'password'}
            className={`relative ${
              errors.find((error) => error.input === 'password') ? 'mb-0' : 'mb-2'
            }`}
            classNames={{
              input: 'text-md',
              inputWrapper: 'pb-4',
            }}
            value={formData.password}
            onFocus={() => {
              setIsFocused(true);
            }}
            onBlur={() => {
              setIsFocused(false);
            }}
            onChange={(e) => {
              dispatch(updateFormData({ password: e.target.value }));
            }}
            isRequired
            isInvalid={!!errors.find((error) => error.input === 'password')}
            errorMessage={
              errors.find((error) => error.input === 'password')?.message
            }
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
          />
          <Card className="absolute z-50 w-[calc(100%-2rem)] left-0 top-full mx-4">
            <CardBody className="bg-white/5">
              <div className="progress w-full h-2 rounded-full bg-white/10">
                <div
                  className={`h-full rounded-full transition-all duration-300 ease-in-out-quart ${
                    passwordStrength === 0
                      ? 'bg-red-700'
                      : passwordStrength === 1
                      ? 'bg-red-500'
                      : passwordStrength === 2
                      ? 'bg-orange-500'
                      : passwordStrength === 3
                      ? 'bg-yellow-500'
                      : passwordStrength === 4
                      ? 'bg-green-500'
                      : 'bg-green-700'
                  }`}
                  style={{ width: `${(passwordStrength / 5) * 100}%` }}
                ></div>
              </div>
            </CardBody>
            <Divider />
            <CardBody className="flex flex-col gap-2 bg-white/5">
              {passwordStrength === 0 && (
                <p className="text-sm text-neutral-500">
                  Enter strong and easy to remember password...
                </p>
              )}
              {passwordStrength === 1 && (
                <p className="text-sm text-red-500">
                  Very weak password. Needs more requirements.
                </p>
              )}
              {passwordStrength === 2 && (
                <p className="text-sm text-orange-500">
                  Weak password. At least minimum requirements are needed.
                </p>
              )}
              {passwordStrength === 3 && (
                <p className="text-sm text-yellow-500">
                  Correct password. Minimum requirements are satisfied.
                </p>
              )}
              {passwordStrength === 4 && (
                <p className="text-sm text-green-500">
                  Strong password. Secure level 1.
                </p>
              )}
              {passwordStrength === 5 && (
                <p className="text-sm text-green-700">
                  Very strong password! Secure level 2.
                </p>
              )}
            </CardBody>
          </Card>
        </div>

        <Input
          label="Confirm password"
          variant="bordered"
          type={showConfirmPassword ? 'text' : 'password'}
          className={`${errors.find((error) => error.input === 'confirmPassword') ? 'mb-0' : 'mb-6'}`}
          classNames={{ input: 'text-md' }}
          value={formData.confirmPassword}
          isDisabled={formData.password.length < 8}
          onChange={(e) => {
            dispatch(
              updateFormData({
                confirmPassword: e.target.value,
              }),
            );
          }}
          isRequired
          isInvalid={
            errors.find((error) => error.input === 'confirmPassword')
              ? true
              : false
          }
          errorMessage={
            errors.find((error) => error.input === 'confirmPassword')?.message
          }
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
        />
      </div>
    </div>
  );
}
