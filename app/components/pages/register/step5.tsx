import { DatePicker, Select, SelectItem } from '@heroui/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import { updateFormData } from '@/app/store/features/registerSlice';
import { parseDate } from '@internationalized/date';

export default function RegisterStep5(props: {
  dateOfBirthInputRef: React.RefObject<HTMLDivElement>;
}) {
  const { dateOfBirthInputRef } = props;
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.register.formData);
  const errors = useSelector((state: RootState) => state.register.errors);

  const genders = [
    { key: 'male', label: 'Male' },
    { key: 'female', label: 'Female' },
    { key: 'other', label: 'Other' },
    { key: 'prefer_not_to_say', label: 'Prefer not to say' },
  ];

  return (
    <div className="flex h-full w-full flex-col items-stretch justify-evenly gap-6">
      <div className="flex flex-col items-center justify-center gap-2">
        <h2 className="text-2xl font-bold text-foreground">
          Personalize your experience
        </h2>
        <p className="text-sm text-neutral-500">
          Give us some more details about you to know you better and make your
          life even easier!
        </p>
      </div>
      <div className="flex flex-col items-stretch justify-center gap-4">
        <DatePicker
          label="Date of birth"
          variant="flat"
          showMonthAndYearPickers
          className={`${errors.find((error) => error.input === 'dateOfBirth') ? 'mb-0' : 'mb-6'}`}
          classNames={{ input: 'text-md' }}
          value={formData.dateOfBirth ? parseDate(formData.dateOfBirth) : null}
          onChange={(date) => {
            if (date) {
              const year = String(date.year).padStart(4, '0');
              const month = String(date.month).padStart(2, '0');
              const day = String(date.day).padStart(2, '0');
              dispatch(
                updateFormData({
                  dateOfBirth: `${year}-${month}-${day}`,
                }),
              );
            } else {
              dispatch(updateFormData({ dateOfBirth: '' }));
            }
          }}
          isRequired
          isInvalid={
            errors.find((error) => error.input === 'dateOfBirth') ? true : false
          }
          errorMessage={
            errors.find((error) => error.input === 'dateOfBirth')?.message
          }
          ref={dateOfBirthInputRef}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              document.getElementById('next-step-button')?.click();
            }
          }}
          name="dateOfBirth"
        />
        <Select
          label="Gender"
          className={`${errors.find((error) => error.input === 'gender') ? 'mb-0' : 'mb-6'}`}
          variant="flat"
          selectedKeys={[formData.gender]}
          onSelectionChange={(keys) =>
            dispatch(
              updateFormData({
                gender: Array.from(keys)[0] as string,
              }),
            )
          }
          isInvalid={
            errors.find((error) => error.input === 'gender') ? true : false
          }
          errorMessage={
            errors.find((error) => error.input === 'gender')?.message
          }
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              document.getElementById('next-step-button')?.click();
            }
          }}
          name="gender"
        >
          {genders.map((genderOption) => (
            <SelectItem key={genderOption.key} value={genderOption.key}>
              {genderOption.label}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
}
