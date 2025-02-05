'use client';

import { startTransition, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Button,
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
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { 
  updateFormData, 
  setErrors,
  validateStep
} from '@/app/store/features/registerSlice';

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const [step, setStep] = useState(0);
  const { formData, errors } = useAppSelector((state) => ({
    formData: state.register.formData,
    errors: Array.isArray(state.register.errors) 
      ? state.register.errors 
      : []
  }));

  const [reverseTransition, setReverseTransition] = useState(false);

  const transition = centerPopTransition();
  const insideTransition = slideFromLeftTransition();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const genders = [
    { key: 'male', label: 'Male' },
    { key: 'female', label: 'Female' },
    { key: 'other', label: 'Other' },
    { key: 'prefer_not_to_say', label: 'Prefer not to say' },
  ];

  const handleNext = () => {
    setReverseTransition(false);
    dispatch(setErrors([]));
    startTransition(() => {
      setStep(prev => prev + 1);
    });
  };

  const handleBack = () => {
    setReverseTransition(true);
    dispatch(setErrors([]));
    startTransition(() => {
      setStep(prev => prev - 1);
    });
  };

  const handleNextStep = async () => {
    const validationResult = await dispatch(validateStep(step)).unwrap();
    
    if (!validationResult.isValid) return;

    setReverseTransition(false);
    startTransition(() => {
      setStep(prev => prev + 1);
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
                                    className={`${errors.find((error) => error.input === 'firstName') ? 'mb-0' : 'mb-6'}`}
                                    classNames={{ input: 'text-md' }}
                                    value={formData.firstName}
                                    onChange={(e) => {
                                      dispatch(updateFormData({ firstName: e.target.value }));
                                    }}
                                    isRequired
                                    isInvalid={
                                      errors.find(
                                        (error: { input: string; message: string }) => error.input === 'firstName',
                                      )
                                        ? true
                                        : false
                                    }
                                    errorMessage={
                                      errors.find(
                                        (error: { input: string; message: string }) => error.input === 'firstName',
                                      )?.message
                                    }
                                  />
                                  <Input
                                    label="Last name"
                                    variant="bordered"
                                    className={`${errors.find((error) => error.input === 'lastName') ? 'mb-0' : 'mb-6'}`}
                                    classNames={{ input: 'text-md' }}
                                    value={formData.lastName}
                                    onChange={(e) => {
                                      dispatch(updateFormData({ lastName: e.target.value }));
                                    }}
                                    isRequired
                                    isInvalid={
                                      errors.find(
                                        (error: { input: string; message: string }) => error.input === 'lastName',
                                      )
                                        ? true
                                        : false
                                    }
                                    errorMessage={
                                      errors.find(
                                        (error: { input: string; message: string }) => error.input === 'lastName',
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
                                    className={`${errors.find((error) => error.input === 'email') ? 'mb-0' : 'mb-6'}`}
                                    classNames={{ input: 'text-md' }}
                                    value={formData.email}
                                    onChange={(e) => {
                                      dispatch(updateFormData({ email: e.target.value }));
                                    }}
                                    isRequired
                                    isInvalid={
                                      errors.find(
                                        (error: { input: string; message: string }) => error.input === 'email',
                                      )
                                        ? true
                                        : false
                                    }
                                    errorMessage={
                                      errors.find(
                                        (error: { input: string; message: string }) => error.input === 'email',
                                      )?.message
                                    }
                                  />
                                  <Input
                                    label="Phone number"
                                    variant="bordered"
                                    className={`${errors.find((error) => error.input === 'phone') ? 'mb-0' : 'mb-6'}`}
                                    classNames={{ input: 'text-md' }}
                                    value={formData.phone}
                                    onChange={(e) => {
                                      dispatch(updateFormData({ phone: e.target.value }));
                                    }}
                                    isInvalid={
                                      errors.find(
                                        (error: { input: string; message: string }) => error.input === 'phone',
                                      )
                                        ? true
                                        : false
                                    }
                                    errorMessage={
                                      errors.find(
                                        (error: { input: string; message: string }) => error.input === 'phone',
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
                                    isInvalid={
                                      errors.find(
                                        (error: { input: string; message: string }) => error.input === 'termsAndConditions',
                                      )
                                        ? true
                                        : false
                                    }
                                    onChange={(e) => {
                                      dispatch(updateFormData({ termsAndConditions: e.target.checked }));
                                    }}
                                    isSelected={formData.termsAndConditions}
                                  >
                                    I agree to the terms, conditions and privacy
                                    policy
                                  </Checkbox>
                                  <Checkbox
                                    onChange={(e) => {
                                      dispatch(updateFormData({ emailNewsletter: e.target.checked }));
                                    }}
                                    isSelected={formData.emailNewsletter}
                                  >
                                    I want to receive updates and news on mail
                                  </Checkbox>
                                  <Checkbox
                                    onChange={(e) => {
                                      dispatch(updateFormData({ phoneNewsletter: e.target.checked }));
                                    }}
                                    isSelected={formData.phoneNewsletter}
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
                                    className={`${errors.find((error) => error.input === 'username') ? 'mb-0' : 'mb-6'}`}
                                    classNames={{ input: 'text-md' }}
                                    value={formData.username}
                                    onChange={(e) => {
                                      dispatch(updateFormData({ username: e.target.value }));
                                    }}
                                    isRequired
                                    isInvalid={
                                      errors.find(
                                        (error) => error.input === 'username',
                                      )
                                        ? true
                                        : false
                                    }
                                    errorMessage={
                                      errors.find(
                                        (error) => error.input === 'username',
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
                                    Personalize your experience
                                  </h2>
                                  <p className="text-sm text-neutral-500">
                                    Give us some more details about you to know
                                    you better and make your life even easier!
                                  </p>
                                </div>
                                <div className="flex flex-col items-stretch justify-center gap-4">
                                  <DatePicker
                                    label="Date of birth"
                                    variant="bordered"
                                    showMonthAndYearPickers
                                    className={`${errors.find((error) => error.input === 'dateOfBirth') ? 'mb-0' : 'mb-6'}`}
                                    classNames={{ input: 'text-md' }}
                                    value={formData.dateOfBirth ? parseDate(formData.dateOfBirth) : null}
                                    onChange={(date) => {
                                      if (date) {
                                        const year = String(date.year).padStart(4, '0');
                                        const month = String(date.month).padStart(2, '0');
                                        const day = String(date.day).padStart(2, '0');
                                        dispatch(updateFormData({ dateOfBirth: `${year}-${month}-${day}` }));
                                      } else {
                                        dispatch(updateFormData({ dateOfBirth: '' }));
                                      }
                                    }}
                                    isRequired
                                    isInvalid={
                                      errors.find(
                                        (error) =>
                                          error.input === 'dateOfBirth',
                                      )
                                        ? true
                                        : false
                                    }
                                    errorMessage={
                                      errors.find(
                                        (error) =>
                                          error.input === 'dateOfBirth',
                                      )?.message
                                    }
                                  />
                                  <Select
                                    label="Gender"
                                    className={`${errors.find((error) => error.input === 'gender') ? 'mb-0' : 'mb-6'}`}
                                    variant="bordered"
                                    selectedKeys={[formData.gender]}
                                    onSelectionChange={(keys) => 
                                      dispatch(updateFormData({ gender: Array.from(keys)[0] as string }))
                                    }
                                    isInvalid={
                                      errors.find(
                                        (error) => error.input === 'gender',
                                      )
                                        ? true
                                        : false
                                    }
                                    errorMessage={
                                      errors.find(
                                        (error) => error.input === 'gender',
                                      )?.message
                                    }
                                  >
                                    {genders.map((genderOption) => (
                                      <SelectItem
                                        key={genderOption.key}
                                        value={genderOption.key}
                                      >
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
                                    type={showPassword ? 'text' : 'password'}
                                    className={`${errors.find((error) => error.input === 'password') ? 'mb-0' : 'mb-6'}`}
                                    classNames={{ input: 'text-md' }}
                                    value={formData.password}
                                    onChange={(e) => {
                                      dispatch(updateFormData({ password: e.target.value }));
                                    }}
                                    isRequired
                                    isInvalid={
                                      errors.find(
                                        (error) => error.input === 'password',
                                      )
                                        ? true
                                        : false
                                    }
                                    errorMessage={
                                      errors.find(
                                        (error) => error.input === 'password',
                                      )?.message
                                    }
                                    endContent={
                                      <button
                                        type="button"
                                        onClick={() =>
                                          setShowPassword(!showPassword)
                                        }
                                        className="focus:outline-none"
                                      >
                                        <MaterialSymbol
                                          symbol={
                                            showPassword
                                              ? 'visibility_off'
                                              : 'visibility'
                                          }
                                          size={20}
                                          className="text-neutral-500"
                                        />
                                      </button>
                                    }
                                  />
                                  <Input
                                    label="Confirm password"
                                    variant="bordered"
                                    type={
                                      showConfirmPassword ? 'text' : 'password'
                                    }
                                    className={`${errors.find((error) => error.input === 'confirmPassword') ? 'mb-0' : 'mb-6'}`}
                                    classNames={{ input: 'text-md' }}
                                    value={formData.confirmPassword}
                                    onChange={(e) => {
                                      dispatch(updateFormData({ confirmPassword: e.target.value }));
                                    }}
                                    isRequired
                                    isInvalid={
                                      errors.find(
                                        (error) =>
                                          error.input === 'confirmPassword',
                                      )
                                        ? true
                                        : false
                                    }
                                    errorMessage={
                                      errors.find(
                                        (error) =>
                                          error.input === 'confirmPassword',
                                      )?.message
                                    }
                                    endContent={
                                      <button
                                        type="button"
                                        onClick={() =>
                                          setShowConfirmPassword(
                                            !showConfirmPassword,
                                          )
                                        }
                                        className="focus:outline-none"
                                      >
                                        <MaterialSymbol
                                          symbol={
                                            showConfirmPassword
                                              ? 'visibility_off'
                                              : 'visibility'
                                          }
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
                      onPress={handleNextStep}
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
