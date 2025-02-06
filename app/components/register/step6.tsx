import { Input } from '@heroui/react';
import MaterialSymbol from '../materialSymbol';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import { updateFormData } from '@/app/store/features/registerSlice';
import { useState } from 'react';

export default function RegisterStep6({ onFocusChange }: { onFocusChange: (isFocused: boolean) => void }) {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.register.formData);
  const errors = useSelector((state: RootState) => state.register.errors);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [, setIsFocused] = useState(false);

  return (
    <div className="flex h-full w-full flex-col items-stretch justify-evenly gap-6">
      <div className="flex flex-col items-center justify-center gap-2">
        <h2 className="text-2xl font-bold text-foreground">Stay secure</h2>
        <p className="text-sm text-neutral-500">
          Set a secure and easy to remember password
        </p>
      </div>
      <div className="flex w-full flex-col items-stretch justify-center gap-4">
        <Input
          label="Password"
          variant="bordered"
          type={showPassword ? 'text' : 'password'}
          className={`${errors.find((error) => error.input === 'password') ? 'mb-0' : 'mb-6'}`}
          classNames={{ input: 'text-md' }}
          value={formData.password}
          onFocus={() => {
            setIsFocused(true);
            onFocusChange(true);
          }}
          onBlur={() => {
            setIsFocused(false);
            onFocusChange(false);
          }}
          onChange={(e) => {
            dispatch(updateFormData({ password: e.target.value }));
          }}
          isRequired
          isInvalid={!!errors.find((error) => error.input === 'password')}
          errorMessage={errors.find((error) => error.input === 'password')?.message}
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

        <Input
          label="Confirm password"
          variant="bordered"
          type={showConfirmPassword ? 'text' : 'password'}
          className={`${errors.find((error) => error.input === 'confirmPassword') ? 'mb-0' : 'mb-6'}`}
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
