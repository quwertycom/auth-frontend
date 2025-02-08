import { Input } from '@heroui/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import { updateFormData } from '@/app/store/features/registerSlice';
import { useRef, useEffect } from 'react';

export default function Step2() {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.register.formData);
  const errors = useSelector((state: RootState) => state.register.errors);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-stretch justify-evenly gap-6">
      <div className="flex flex-col items-center justify-center gap-2">
        <h2 className="text-2xl font-bold text-foreground">
          Contact Information
        </h2>
        <p className="text-sm text-neutral-500">
          Tell us how we can contact you
        </p>
      </div>
      <div className="flex flex-col items-stretch justify-center gap-4">
        <Input
          label="Email"
          variant="bordered"
          className={`${errors.find((error) => error.input === 'email') ? 'mb-0' : 'mb-6'}`}
          classNames={{ input: 'text-md' }}
          value={formData.email}
          onChange={(e) => {
            dispatch(
              updateFormData({
                email: e.target.value,
              }),
            );
          }}
          isRequired
          isInvalid={
            errors.find(
              (error: { input: string; message: string }) =>
                error.input === 'email',
            )
              ? true
              : false
          }
          errorMessage={
            errors.find(
              (error: { input: string; message: string }) =>
                error.input === 'email',
            )?.message
          }
          ref={emailInputRef}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              phoneInputRef.current?.focus();
            }
          }}
          name="email"
        />
        <Input
          label="Phone number"
          variant="bordered"
          className={`${errors.find((error) => error.input === 'phone') ? 'mb-0' : 'mb-6'}`}
          classNames={{ input: 'text-md' }}
          value={formData.phone}
          onChange={(e) => {
            dispatch(
              updateFormData({
                phone: e.target.value,
              }),
            );
          }}
          isInvalid={
            errors.find(
              (error: { input: string; message: string }) =>
                error.input === 'phone',
            )
              ? true
              : false
          }
          errorMessage={
            errors.find(
              (error: { input: string; message: string }) =>
                error.input === 'phone',
            )?.message
          }
          ref={phoneInputRef}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              document.getElementById('next-step-button')?.click();
            }
          }}
          name="phone"
        />
      </div>
    </div>
  );
}
