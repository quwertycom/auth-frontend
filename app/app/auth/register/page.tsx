'use client';

import { startTransition, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Button,
  CalendarDate,
  Card,
  CardBody,
  Checkbox,
  DatePicker,
  Input,
  Select,
  SelectItem,
} from '@heroui/react';
import MaterialSymbol from '@/app/components/materialSymbol';
import {
  centerPopTransition,
  slideFromLeftTransition,
} from '@/app/styles/transitions';
import TransitionLink from '@/app/components/transitionLink';
import { parseDate } from '@internationalized/date';

export default function RegisterPage() {
  const [step, setStep] = useState(0);
  const [reverseTransition, setReverseTransition] = useState(false);

  const transition = centerPopTransition();
  const insideTransition = slideFromLeftTransition();

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [dateOfBirth, setDateOfBirth] = useState<CalendarDate>(
    parseDate(new Date().toISOString().split('T')[0]) as CalendarDate,
  );
  const [gender, setGender] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [termsAndConditions, setTermsConditions] = useState<boolean>(false);
  const [emailNewsletter, setEmailNewsletter] = useState<boolean>(false);
  const [phoneNewsletter, setPhoneNewsletter] = useState<boolean>(false);

  const genders = [
    {key: "male", label: "Male"},
    {key: "female", label: "Female"},
    {key: "other", label: "Other"},
    {key: "prefer_not_to_say", label: "Prefer not to say"},
  ];

  const [errors, setErrors] = useState<
    | {
        input: string;
        message: string;
      }[]
    | null
  >(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validate = () => {
    setErrors(null);

    const localErrors: {
      input: string;
      message: string;
    }[] = [];

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    const usernameRegex = /^[a-z0-9_.]{3,20}$/;

    switch (step) {
      case 1:
        if (firstName === '' || !firstName)
          localErrors.push({
            input: 'firstName',
            message: 'First name is required',
          });
        else if (firstName.length > 128)
          localErrors.push({
            input: 'firstName',
            message: 'First name must be less than 128 characters',
          });
        if (lastName === '' || !lastName)
          localErrors.push({
            input: 'lastName',
            message: 'Last name is required',
          });
        else if (lastName.length > 128)
          localErrors.push({
            input: 'lastName',
            message: 'Last name must be less than 128 characters',
          });
          console.warn(localErrors)
        break;
      case 2:
        if (email === '' || !email)
          localErrors.push({
            input: 'email',
            message: 'Email is required',
          });
        else if (email.length > 128)
          localErrors.push({
            input: 'email',
            message: 'Email must be less than 128 characters',
          });
        else if (!email.includes('@') || !email.includes('.'))
          localErrors.push({
            input: 'email',
            message: 'Invalid email address, missing @ or .',
          });
        else if (!emailRegex.test(email))
          localErrors.push({
            input: 'email',
            message: 'Invalid email address',
          });

        if (phone !== '') {
          if (!phoneRegex.test(phone))
            localErrors.push({
              input: 'phone',
              message:
                'Invalid phone number, remember to include country code like +1, +7, +41 etc.',
            });
          else if (phone.length > 15)
            localErrors.push({
              input: 'phone',
              message: 'Phone number must be less than 15 characters',
            });
          else if (phone.length < 10)
            localErrors.push({
              input: 'phone',
              message:
                'Phone number must be at least 10 characters, remember to include country code like +1, +7, +41 etc.',
            });
          else if (phone.length > 15)
            localErrors.push({
              input: 'phone',
              message: 'Phone number must be less than 15 characters',
            });
        }
        break;
      case 3:
        if (!termsAndConditions)
          localErrors.push({
            input: 'termsAndConditions',
            message: 'You must agree to the terms and conditions',
          });
        break;
      case 4:
        if (username === '' || !username)
          localErrors.push({
            input: 'username',
            message: 'You need to choose username',
          });
        else if (username.length > 20)
          localErrors.push({
            input: 'username',
            message: 'Username must be less than 20 characters',
          });
        else if (username.length < 3)
          localErrors.push({
            input: 'username',
            message: 'Username must be at least 3 characters',
          });
        else if (!usernameRegex.test(username))
          localErrors.push({
            input: 'username',
            message:
              'Username must contain only letters, numbers, underscores and dots',
          });
        break;
      case 5:
        const today = new Date();
        const isToday = dateOfBirth && 
                       dateOfBirth.year === today.getFullYear() &&
                       dateOfBirth.month === today.getMonth() + 1 &&
                       dateOfBirth.day === today.getDate();

        if (dateOfBirth.toString() === '' || !dateOfBirth || isToday) {
          localErrors.push({
            input: 'dateOfBirth',
            message: 'Date of birth is required',
          });
        } else {
          const birthYear = dateOfBirth.year;
          const birthMonth = dateOfBirth.month;
          const birthDay = dateOfBirth.day;

          // Check if year is before 1900
          if (birthYear < 1900) {
            localErrors.push({
              input: 'dateOfBirth',
              message: 'Year must be set to 1900 or later',
            });
          }

          // Calculate age
          let age = today.getFullYear() - birthYear;
          const monthDiff = today.getMonth() + 1 - birthMonth;
          if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDay)
          ) {
            age--;
          }

          // Check if at least 16 years old
          if (age < 16) {
            localErrors.push({
              input: 'dateOfBirth',
              message: 'You must be at least 16 years old to register',
            });
          }
        }

        if (gender === '') {
          localErrors.push({
            input: 'gender',
            message: 'You must select your gender',
          });
        } else if (gender !== 'male' && gender !== 'female' && gender !== 'other' && gender !== 'prefer_not_to_say') {
          localErrors.push({
            input: 'gender',
            message: 'Invalid gender',
          });
        }
        break;
      case 6:
        if (password === '' || !password)
          localErrors.push({
            input: 'password',
            message: 'Password is required',
          });
        else if (password.length < 8)
          localErrors.push({
            input: 'password',
            message: 'Password must be at least 8 characters',
          });
        else if (confirmPassword === '' || !confirmPassword)
          localErrors.push({
            input: 'confirmPassword',
            message: 'Confirm password is required',
          });
        else if (password !== confirmPassword)
          localErrors.push({
            input: 'confirmPassword',
            message: 'Passwords do not match',
          });
        else if (password.length > 128)
          localErrors.push({
            input: 'password',
            message: 'Password must be less than 128 characters',
          });
        else if (confirmPassword.length > 128)
          localErrors.push({
            input: 'confirmPassword',
            message: 'Confirm password must be less than 128 characters',
          });
        break;
    }

    if (localErrors.length > 0) {
      setErrors(localErrors);
      return true;
    }

    return false;
  };

  const handleNext = () => {
    // Get validation result immediately
    const hasErrors = validate();
  
    // Use the direct validation result instead of state
    if (hasErrors) {
      return;
    } else {
      setErrors(null);
    }
  
    setReverseTransition(false);
    startTransition(() => {
      setStep(step + 1);
    });
  };

  const handleBack = () => {
    setErrors(null);
    setReverseTransition(true);
    startTransition(() => {
      setStep(step - 1);
    });
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center p-4">
      <div className="w-full">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step === 0 || step > 6 ? 'register' : 'login'}
            initial={{
              ...transition[reverseTransition ? 'reverse' : 'normal'].enterFrom,
            }}
            animate={{
              ...transition[reverseTransition ? 'reverse' : 'normal'].enterTo,
              transition:
                transition[reverseTransition ? 'reverse' : 'normal'].enterActive
                  .transition,
            }}
            exit={{
              ...transition[reverseTransition ? 'reverse' : 'normal'].leaveTo,
              transition:
                transition[reverseTransition ? 'reverse' : 'normal'].leaveActive
                  .transition,
            }}
            className="flex h-screen w-screen items-center justify-center"
          >
            {step === 0 && (
              <div className="flex flex-col items-center justify-center">
                <Card className="w-full max-w-md" radius="lg">
                  <CardBody className="flex flex-col items-center gap-6 p-8">
                    <div className="flex flex-col items-center gap-4">
                      <MaterialSymbol
                        symbol="person_add"
                        type="rounded"
                        size={96}
                        className="text-primary-500"
                      />
                      <div className="text-center">
                        <h1 className="text-3xl font-bold">Create Your qID</h1>
                        <p className="mt-2 text-neutral-600">
                          Don&apos;t have a qID yet? No worries!
                          <br />
                          Create your account now to access all our services.
                        </p>
                      </div>
                    </div>
                    <Button
                      color="primary"
                      variant="solid"
                      size="lg"
                      className="w-full"
                      onPress={handleNext}
                      endContent={
                        <MaterialSymbol
                          symbol="arrow_forward"
                          size={20}
                          className="text-white"
                        />
                      }
                    >
                      Get Started
                    </Button>
                  </CardBody>
                </Card>
                <div className="mt-6 flex flex-col items-center justify-center">
                  <TransitionLink href="/app/auth/login">
                    Already have an account? Login
                  </TransitionLink>
                </div>
              </div>
            )}
            {step >= 1 && step <= 6 && (
              <div className="flex h-[450px] w-full flex-col items-center justify-center gap-6">
                {/* Top Row - Form and Info Cards */}
                <div className="flex h-full w-full max-w-4xl gap-6">
                  {/* Form Card */}
                  <Card className="flex w-2/3 flex-col overflow-hidden">
                    <CardBody className="flex flex-1 flex-col justify-center overflow-hidden p-8">
                      <div className="h-full w-full space-y-6">
                        <AnimatePresence mode="wait" initial={false}>
                          <motion.div
                            key={step}
                            initial={{
                              ...insideTransition[
                                reverseTransition ? 'reverse' : 'normal'
                              ].enterFrom,
                            }}
                            animate={{
                              ...insideTransition[
                                reverseTransition ? 'reverse' : 'normal'
                              ].enterTo,
                              transition:
                                insideTransition[
                                  reverseTransition ? 'reverse' : 'normal'
                                ].enterActive.transition,
                            }}
                            exit={{
                              ...insideTransition[
                                reverseTransition ? 'reverse' : 'normal'
                              ].leaveTo,
                              transition:
                                insideTransition[
                                  reverseTransition ? 'reverse' : 'normal'
                                ].leaveActive.transition,
                            }}
                            className="flex h-full w-full items-center justify-center"
                          >
                            {step === 1 && (
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
                                    variant="bordered"
                                    className={`${errors?.find((error) => error.input === 'firstName') ? 'mb-0' : 'mb-6'}`}
                                    classNames={{ input: 'text-md' }}
                                    value={firstName}
                                    onChange={(e) =>
                                      setFirstName(e.target.value)
                                    }
                                    isRequired
                                    isInvalid={errors?.find((error) => error.input === 'firstName') ? true : false}
                                    errorMessage={
                                      errors?.find(
                                        (error) => error.input === 'firstName'
                                      )?.message
                                    }
                                  />
                                  <Input
                                    label="Last name"
                                    variant="bordered"
                                    className={`${errors?.find((error) => error.input === 'lastName') ? 'mb-0' : 'mb-6'}`}
                                    classNames={{ input: 'text-md' }}
                                    value={lastName}
                                    onChange={(e) =>
                                      setLastName(e.target.value)
                                    }
                                      isRequired
                                    isInvalid={errors?.find((error) => error.input === 'lastName') ? true : false}
                                    errorMessage={
                                      errors?.find(
                                        (error) => error.input === 'lastName'
                                      )?.message
                                    }
                                  />
                                </div>
                              </div>
                            )}
                            {step === 2 && (
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
                                    className={`${errors?.find((error) => error.input === 'email') ? 'mb-0' : 'mb-6'}`}
                                    classNames={{ input: 'text-md' }}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    isRequired
                                    isInvalid={errors?.find((error) => error.input === 'email') ? true : false}
                                    errorMessage={
                                      errors?.find(
                                        (error) => error.input === 'email'
                                      )?.message
                                    }
                                  />
                                  <Input
                                    label="Phone number"
                                    variant="bordered"
                                    className={`${errors?.find((error) => error.input === 'phone') ? 'mb-0' : 'mb-6'}`}
                                    classNames={{ input: 'text-md' }}
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    isInvalid={errors?.find((error) => error.input === 'phone') ? true : false}
                                    errorMessage={
                                      errors?.find(
                                        (error) => error.input === 'phone'
                                      )?.message
                                    }
                                  />
                                </div>
                              </div>
                            )}
                            {step === 3 && (
                              <div className="flex h-full w-full flex-col items-stretch justify-evenly gap-6">
                                <div className="flex flex-col items-center justify-center gap-2">
                                  <h2 className="text-2xl font-bold text-foreground">
                                    Boring stuff...
                                  </h2>
                                  <p className="text-sm text-neutral-500">
                                    As every company, we need you to agree with
                                    our policies etc.
                                  </p>
                                </div>
                                <div className="flex flex-col items-stretch justify-center gap-4">
                                  <Checkbox
                                    isRequired
                                    isInvalid={errors?.find((error) => error.input === 'termsAndConditions') ? true : false}
                                    onChange={(e) =>
                                      setTermsConditions(e.target.checked)
                                    }
                                    isSelected={termsAndConditions}
                                  >
                                    I agree to the terms, conditions and privacy
                                    policy
                                  </Checkbox>
                                  <Checkbox
                                    onChange={(e) =>
                                      setEmailNewsletter(e.target.checked)
                                    }
                                    isSelected={emailNewsletter}
                                  >
                                    I want to receive updates and news on mail
                                  </Checkbox>
                                  <Checkbox
                                    onChange={(e) =>
                                      setPhoneNewsletter(e.target.checked)
                                    }
                                    isSelected={phoneNewsletter}
                                  >
                                    I want to receive updates and news on phone
                                  </Checkbox>
                                </div>
                              </div>
                            )}
                            {step === 4 && (
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
                                    variant="bordered"
                                    className={`${errors?.find((error) => error.input === 'username') ? 'mb-0' : 'mb-6'}`}
                                    classNames={{ input: 'text-md' }}
                                    value={username}
                                    onChange={(e) =>
                                      setUsername(e.target.value)
                                    }
                                    isRequired
                                    isInvalid={errors?.find((error) => error.input === 'username') ? true : false}
                                    errorMessage={
                                      errors?.find(
                                        (error) => error.input === 'username'
                                      )?.message
                                    }
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
                                        Username must be between 3 and 20
                                        characters
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            {step === 5 && (
                              <div className="flex h-full w-full flex-col items-stretch justify-evenly gap-6">
                                <div className="flex flex-col items-center justify-center gap-2">
                                  <h2 className="text-2xl font-bold text-foreground">
                                    Some more details
                                  </h2>
                                  <p className="text-sm text-neutral-500">
                                    Give us some more details for more
                                    personalized experience!
                                  </p>
                                </div>
                                <div className="flex flex-col items-stretch justify-center gap-4">
                                  <DatePicker
                                    label="Date of birth"
                                    variant="bordered"
                                    showMonthAndYearPickers
                                    className={`${errors?.find((error) => error.input === 'dateOfBirth') ? 'mb-0' : 'mb-6'}`}
                                    classNames={{ input: 'text-md' }}
                                    value={dateOfBirth}
                                    onChange={(date) => {
                                      if (date) {
                                        setDateOfBirth(date);
                                      }
                                    }}
                                    isRequired
                                    isInvalid={errors?.find((error) => error.input === 'dateOfBirth') ? true : false}
                                    errorMessage={
                                      errors?.find(
                                        (error) => error.input === 'dateOfBirth'
                                      )?.message
                                    }
                                  />
                                  <Select
                                    label="Gender"
                                    className={`${errors?.find((error) => error.input === 'gender') ? 'mb-0' : 'mb-6'}`}
                                    variant="bordered"
                                    selectedKeys={[gender]}
                                    onSelectionChange={(keys) => setGender(Array.from(keys)[0] as string)}
                                    isInvalid={errors?.find((error) => error.input === 'gender') ? true : false}
                                    errorMessage={
                                      errors?.find(
                                        (error) => error.input === 'gender'
                                      )?.message
                                    }
                                  >
                                    {genders.map((genderOption) => (
                                      <SelectItem key={genderOption.key} value={genderOption.key}>
                                        {genderOption.label}
                                      </SelectItem>
                                    ))}
                                  </Select>
                                </div>
                              </div>
                            )} 
                            {step === 6 && (
                              <div className="flex h-full w-full flex-col items-stretch justify-evenly gap-6">
                                <div className="flex flex-col items-center justify-center gap-2">
                                  <h2 className="text-2xl font-bold text-foreground">
                                    Stay secure
                                  </h2>
                                  <p className="text-sm text-neutral-500">
                                    Set a secure and easy to remember password
                                  </p>
                                </div>
                                <div className="flex flex-col items-stretch justify-center gap-4">
                                  <Input
                                    label="Password"
                                    variant="bordered"
                                    type={showPassword ? "text" : "password"}
                                    className={`${errors?.find((error) => error.input === 'password') ? 'mb-0' : 'mb-6'}`}
                                    classNames={{ input: 'text-md' }}
                                    value={password}
                                    onChange={(e) =>
                                      setPassword(e.target.value)
                                    }
                                    isRequired
                                    isInvalid={errors?.find((error) => error.input === 'password') ? true : false}
                                    errorMessage={errors?.find((error) => error.input === 'password')?.message}
                                    endContent={
                                      <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="focus:outline-none"
                                      >
                                        <MaterialSymbol
                                          symbol={showPassword ? "visibility_off" : "visibility"}
                                          size={20}
                                          className="text-neutral-500"
                                        />
                                      </button>
                                    }
                                  />
                                  <Input
                                    label="Confirm password"
                                    variant="bordered"
                                    type={showConfirmPassword ? "text" : "password"}
                                    className={`${errors?.find((error) => error.input === 'confirmPassword') ? 'mb-0' : 'mb-6'}`}
                                    classNames={{ input: 'text-md' }}
                                    value={confirmPassword}
                                    onChange={(e) =>
                                      setConfirmPassword(e.target.value)
                                    }
                                    isRequired
                                    isInvalid={errors?.find((error) => error.input === 'confirmPassword') ? true : false}
                                    errorMessage={errors?.find((error) => error.input === 'confirmPassword')?.message}
                                    endContent={
                                      <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="focus:outline-none"
                                      >
                                        <MaterialSymbol
                                          symbol={showConfirmPassword ? "visibility_off" : "visibility"}
                                          size={20}
                                          className="text-neutral-500"
                                        />
                                      </button>
                                    }
                                  />
                                </div>
                              </div>
                            )}
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </CardBody>
                  </Card>

                  {/* Info Card */}
                  <Card className="w-1/3">
                    <CardBody className="overflow-hidden p-8">
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                          key={step}
                          initial={{
                            ...insideTransition[
                              reverseTransition ? 'reverse' : 'normal'
                            ].enterFrom,
                          }}
                          animate={{
                            ...insideTransition[
                              reverseTransition ? 'reverse' : 'normal'
                            ].enterTo,
                            transition:
                              insideTransition[
                                reverseTransition ? 'reverse' : 'normal'
                              ].enterActive.transition,
                          }}
                          exit={{
                            ...insideTransition[
                              reverseTransition ? 'reverse' : 'normal'
                            ].leaveTo,
                            transition:
                              insideTransition[
                                reverseTransition ? 'reverse' : 'normal'
                              ].leaveActive.transition,
                          }}
                          className="flex h-full w-full items-center justify-center"
                        >
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
                                  We use your name to personalize your
                                  experience while maintaining strict privacy
                                  controls. Your name will not be visible
                                  publicly unless you create a developer
                                  profile.
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
                                  By entering you email or phone number, you
                                  will be first that know about new features and
                                  updates, also you will be able to reset your
                                  password if you forget it.s
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
                                  Select what you want to agree with. You can
                                  always change it later in account settings or
                                  via our support.
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
                                You will use it to login and other will be able
                                to find you by it. It is visible publicly, do
                                not include any personal information here
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
                                  Give us some more details about you to know
                                  you better and make your life even easier!
                                </p>
                              </div>
                            </div>
                          )}
                          {step === 6 && (
                            <div className="flex flex-col items-center justify-between gap-6 text-center">
                              <h3 className="text-xl font-semibold text-foreground">
                                Stay secure
                              </h3>
                              <MaterialSymbol
                                symbol="lock"
                                type="rounded"
                                size={128}
                                className="text-primary-600"
                              />
                              <div className="space-y-4">
                                <p className="text-sm text-white">
                                  Set a secure password that you will use to
                                  login, if you forget it, you can always reset
                                  it via email or phone number. Never share your
                                  password with others.
                                </p>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </CardBody>
                  </Card>
                </div>

                {/* Controls Card */}
                <Card className="w-full max-w-4xl">
                  <CardBody className="flex h-full flex-row items-center justify-between overflow-hidden p-4">
                    <Button
                      variant="light"
                      onPress={handleBack}
                      startContent={
                        <MaterialSymbol symbol="arrow_back" size={18} />
                      }
                    >
                      Back
                    </Button>
                    <Button
                      color="primary"
                      endContent={
                        <MaterialSymbol symbol="arrow_forward" size={18} />
                      }
                      onPress={handleNext}
                    >
                      Continue
                    </Button>
                  </CardBody>
                </Card>
              </div>
            )}
            {step === 7 && (
              <div className="flex h-full w-full flex-col items-center justify-center gap-6">
                <Card className="w-full max-w-md" radius="lg">
                  <CardBody className="flex flex-col items-center gap-6 p-8">
                    <div className="flex flex-col items-center gap-4">
                      <MaterialSymbol
                        symbol="verified_user"
                        type="rounded"
                        size={96}
                        className="text-primary-500"
                      />
                      <div className="text-center">
                        <h1 className="text-3xl font-bold">
                          We&apos;re Almost Done!
                        </h1>
                        <p className="mt-2 text-neutral-600">
                          Just one more step! We&apos;ll send a verification
                          code to your email to complete your account setup and
                          ensure it&apos;s secure.
                        </p>
                      </div>
                    </div>
                    <Button
                      color="primary"
                      variant="solid"
                      size="lg"
                      className="w-full"
                      startContent={
                        <MaterialSymbol
                          symbol="send"
                          size={20}
                          className="text-white"
                        />
                      }
                    >
                      Send Verification Email
                    </Button>
                    <div className="mt-4 flex items-center gap-2 text-sm text-neutral-500">
                      <MaterialSymbol symbol="info" size={16} />
                      <span>Check your inbox after clicking above</span>
                    </div>
                  </CardBody>
                </Card>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
