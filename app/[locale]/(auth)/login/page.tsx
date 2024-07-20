'use client';

import { FormProvider, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { type LoginPayload } from '@/types/common';
import { ROUTERS } from '@/constants/routers';
import { createClient } from '@/utils/supabase/client';
import useClient from '@/hooks/useClient';
import useCustomRouter from '@/hooks/useCustomRouter';
import useFormKeyboard from '@/hooks/useFormKeyboard';
import { useTranslation } from 'react-i18next';
import useValidation from '@/hooks/useValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import useStore from '@/state';
import toast from '@/utils/toast';

const Login = () => {
  const { t } = useTranslation();
  const { routerPush } = useCustomRouter();
  const { isClient } = useClient();
  const { handleKeyDown } = useFormKeyboard();
  const { useShape, emailSchema, passwordSchema } = useValidation();
  const { setUser } = useStore((state) => state);
  const supabase = createClient();

  const onSubmit = async (formData: LoginPayload) => {
    const { email, password } = formData;
    const {
      data: { user },
      error
    } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) {
      const msg = error.message || 'Please check your email and password again';
      toast.error({
        message: msg
      });
    } else {
      setUser(user);
      routerPush(ROUTERS.HOME);
    }
  };

  const onSignInWithGoogleClick = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${origin}/api/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        }
      }
    });
  };

  const onSignUpClick = () => {
    routerPush(ROUTERS.SIGN_UP);
  };

  const onForgotPasswordClick = () => {
    routerPush(ROUTERS.FORGOT_PASSWORD);
  };

  const schema = useShape({
    email: emailSchema,
    password: passwordSchema
  });

  const methods = useForm<LoginPayload>({
    mode: 'onChange',
    defaultValues: {
      email: 'trang.tran@devbase.us',
      password: '12345678',
      rememberMe: false
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
    <div className="flex flex-col flex-1 w-full gap-2 px-8 sm:max-w-md">
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
          <h1 className="mb-4 text-4xl font-bold text-center">{t('auth:sign_in')}</h1>
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
            {t('auth:sign_in')}
          </Button>
          <div className="flex justify-between">
            <Button variant="link" type="button" onClick={onSignUpClick} className="p-0 w-fit">
              {t('auth:sign_up')}
            </Button>
            <Button
              variant="link"
              type="button"
              onClick={onForgotPasswordClick}
              className="p-0 w-fit"
            >
              {t('auth:forgot_password')}
            </Button>
          </div>

          <div className="flex items-center justify-center w-full">
            <div className="flex-1 border-t border-black"></div>
            <div className=" font-regular text-[12px] font-secondary text-alto mx-[0.9375rem] uppercase break-all">
              or
            </div>
            <div className="flex-1 border-t border-black"></div>
          </div>
          {/* <Button type="button" className="text-white bg-blue-500 hover:bg-blue-500/90">
            {t('auth:continue_with_facebook')}
          </Button> */}
          <Button
            type="button"
            onClick={onSignInWithGoogleClick}
            className="text-white bg-red-500 hover:bg-red-500/90"
          >
            {t('auth:continue_with_google')}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export const runtime = 'edge';
export default Login;
