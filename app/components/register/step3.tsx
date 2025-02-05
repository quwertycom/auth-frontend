import { Checkbox } from '@heroui/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import { updateFormData } from '@/app/store/features/registerSlice';

export default function Step3() {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.register.formData);
  const errors = useSelector((state: RootState) => state.register.errors);

  return (
    <div className="flex h-full w-full flex-col items-stretch justify-evenly gap-6">
      <div className="flex flex-col items-center justify-center gap-2">
        <h2 className="text-2xl font-bold text-foreground">Boring stuff...</h2>
        <p className="text-sm text-neutral-500">
          As every company, we need you to agree with our policies etc.
        </p>
      </div>
      <div className="flex flex-col items-stretch justify-center gap-4">
        <Checkbox
          isRequired
          isInvalid={
            errors.find(
              (error: { input: string; message: string }) =>
                error.input === 'termsAndConditions',
            )
              ? true
              : false
          }
          onChange={(e) => {
            dispatch(
              updateFormData({
                termsAndConditions: e.target.checked,
              }),
            );
          }}
          isSelected={formData.termsAndConditions}
        >
          I agree to the terms, conditions and privacy policy
        </Checkbox>
        <Checkbox
          onChange={(e) => {
            dispatch(
              updateFormData({
                emailNewsletter: e.target.checked,
              }),
            );
          }}
          isSelected={formData.emailNewsletter}
        >
          I want to receive updates and news on mail
        </Checkbox>
        <Checkbox
          onChange={(e) => {
            dispatch(
              updateFormData({
                phoneNewsletter: e.target.checked,
              }),
            );
          }}
          isSelected={formData.phoneNewsletter}
        >
          I want to receive updates and news on phone
        </Checkbox>
      </div>
    </div>
  );
}
