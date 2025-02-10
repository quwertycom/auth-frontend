import { RootState } from '@/app/store/store';
import { useSelector, useDispatch } from 'react-redux';
import { updateFormData } from '@/app/store/features/registerSlice';
import { Input } from '@heroui/react';
import { useEffect, useRef } from 'react';

export default function Step1() {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.register.formData);
  const errors = useSelector((state: RootState) => state.register.errors);

  const firstNameInputRef = useRef<HTMLInputElement>(null);
  const lastNameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    firstNameInputRef.current?.focus();
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-stretch justify-around gap-6">
      <div className="flex flex-col items-center justify-center gap-2">
        <h2 className="text-2xl font-bold text-foreground">
          Personal Information
        </h2>
        <p className="text-sm text-neutral-500">
          Tell us how we should address you
        </p>
      </div>
      <div className="flex flex-col items-stretch justify-center gap-4">
        <Input
          label="First name"
          variant="flat"
          className={`${errors.find((error) => error.input === 'firstName') ? 'mb-0' : 'mb-6'}`}
          classNames={{ input: 'text-md' }}
          value={formData.firstName}
          onChange={(e) => {
            dispatch(updateFormData({ firstName: e.target.value }));
          }}
          isRequired
          isInvalid={
            errors.find(
              (error: { input: string; message: string }) =>
                error.input === 'firstName',
            )
              ? true
              : false
          }
          errorMessage={
            errors.find(
              (error: { input: string; message: string }) =>
                error.input === 'firstName',
            )?.message
          }
          ref={firstNameInputRef}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              lastNameInputRef.current?.focus();
            }
          }}
          name="firstName"
        />
        <Input
          label="Last name"
          variant="flat"
          className={`${errors.find((error) => error.input === 'lastName') ? 'mb-0' : 'mb-6'}`}
          classNames={{ input: 'text-md' }}
          value={formData.lastName}
          onChange={(e) => {
            dispatch(updateFormData({ lastName: e.target.value }));
          }}
          isRequired
          isInvalid={
            errors.find(
              (error: { input: string; message: string }) =>
                error.input === 'lastName',
            )
              ? true
              : false
          }
          errorMessage={
            errors.find(
              (error: { input: string; message: string }) =>
                error.input === 'lastName',
            )?.message
          }
          ref={lastNameInputRef}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              document.getElementById('next-step-button')?.click();
            }
          }}
          name="lastName"
        />
      </div>
    </div>
  );
}
