import { updateFormData } from '@/app/store/features/registerSlice';
import { Input } from '@heroui/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import MaterialSymbol from '@/app/components/common/materialSymbol';
import { useRef, useEffect } from 'react';

export default function Step4() {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.register.formData);
  const errors = useSelector((state: RootState) => state.register.errors);

  const usernameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    usernameInputRef.current?.focus();
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-stretch justify-evenly gap-6">
      <div className="flex flex-col items-center justify-center gap-2">
        <h2 className="text-2xl font-bold text-foreground">
          Select your username
        </h2>
        <p className="text-sm text-neutral-500">
          Choose a username that suits you best
        </p>
      </div>
      <div className="flex flex-col items-stretch justify-center gap-4">
        <Input
          label="Username"
          variant="flat"
          className={`${errors.find((error) => error.input === 'username') ? 'mb-0' : 'mb-6'}`}
          classNames={{ input: 'text-md' }}
          value={formData.username}
          onChange={(e) => {
            dispatch(
              updateFormData({
                username: e.target.value,
              }),
            );
          }}
          isRequired
          isInvalid={
            errors.find((error) => error.input === 'username') ? true : false
          }
          errorMessage={
            errors.find((error) => error.input === 'username')?.message
          }
          ref={usernameInputRef}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              document.getElementById('next-step-button')?.click();
            }
          }}
          name="username"
        />
        <div className="flex h-12 w-full flex-row items-start justify-start">
          <div className="flex flex-row items-center justify-start gap-2">
            <MaterialSymbol
              symbol="info"
              type="rounded"
              size={24}
              className="text-neutral-500"
              fill
            />
            <p className="text-sm text-neutral-500">
              Username must be between 3 and 20 characters
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
