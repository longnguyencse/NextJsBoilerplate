'use client';

import { FormProvider, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { type SignUpPayload } from '@/types/common';
import { createClient } from '@/utils/supabase/client';
import useClient from '@/hooks/useClient';
import useCustomRouter from '@/hooks/useCustomRouter';
import useFormKeyboard from '@/hooks/useFormKeyboard';
import { useTranslation } from 'react-i18next';
import useValidation from '@/hooks/useValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { ROUTERS } from '@/constants/routers';
import toast from '@utils/toast';

const SignUp = () => {
  const { t } = useTranslation();
  const { routerPush } = useCustomRouter();
  const { isClient } = useClient();
  const { handleKeyDown } = useFormKeyboard();
  const { useShape, emailSchema, passwordSchema } = useValidation();

  const onSubmit = async (formData: SignUpPayload) => {
    const { email, password } = formData;
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/api/auth/callback`
      }
    });
    if (error) {
      const msg = error.message || 'Could not sign up user';
      toast.error({ message: msg });
    } else {
      toast.info({
        message: 'Please check your email to verify your account'
      });
      routerPush(ROUTERS.LOGIN);
    }
  };

  const onLoginClick = () => {
    routerPush(ROUTERS.LOGIN);
  };

  const schema = useShape({
    email: emailSchema,
    password: passwordSchema
  });

  const methods = useForm<SignUpPayload>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(schema)
  });
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = methods;

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex flex-col justify-center flex-1 w-full gap-2 px-8 sm:max-w-md">
      <Link
        href="/"
        className="absolute flex items-center px-4 py-2 text-sm no-underline rounded-md left-8 top-8 text-foreground bg-btn-background hover:bg-btn-background-hover group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back
      </Link>
      <FormProvider {...methods}>
        <form
          className="flex flex-col justify-center flex-1 w-full gap-2 animate-in text-foreground"
          onSubmit={handleSubmit(onSubmit)}
          onKeyDown={(event) => {
            handleKeyDown(event, isSubmitting, handleSubmit, onSubmit);
          }}
        >
          <h1 className="mb-4 text-4xl font-bold text-center">{t('auth:sign_up')}</h1>
          <label className="text-md" htmlFor="email">
            {t('form:fields.email')}
          </label>
          <Input
            id="email"
            {...register('email')}
            className="mb-6 rounded-md bg-inherit"
            placeholder="you@example.com"
          />
          <label className="text-md" htmlFor="password">
            {t('form:fields.password')}
          </label>
          <Input
            id="password"
            {...register('password')}
            className="mb-6 rounded-md bg-inherit"
            type="password"
            placeholder="••••••••"
          />
          <Button type="submit" disabled={isSubmitting}>
            {t('auth:sign_up')}
          </Button>
          <div className="flex justify-between">
            <Button variant="link" type="button" onClick={onLoginClick} className="p-0 w-fit">
              {t('auth:sign_in')}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export const runtime = 'edge';
export default SignUp;
