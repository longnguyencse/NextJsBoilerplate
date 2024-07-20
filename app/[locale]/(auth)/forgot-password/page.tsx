'use client';

import { FormProvider, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { type ForgotPasswordPayload } from '@/types/common';
import { createClient } from '@/utils/supabase/client';
import useClient from '@/hooks/useClient';
import useCustomRouter from '@/hooks/useCustomRouter';
import useFormKeyboard from '@/hooks/useFormKeyboard';
import { useTranslation } from 'react-i18next';
import useValidation from '@/hooks/useValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { ROUTERS } from '@/constants/routers';
import toast from '@utils/toast';

const ForgotPassword = () => {
  const { t } = useTranslation();
  const { routerPush } = useCustomRouter();
  const { isClient } = useClient();
  const { handleKeyDown } = useFormKeyboard();
  const { useShape, emailSchema } = useValidation();

  const onSubmit = async (formData: ForgotPasswordPayload) => {
    const { email } = formData;
    const supabase = createClient();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}/update-password`
    });

    if (error) {
      toast.error({
        message: 'Please check your email and try again'
      });
    } else {
      toast.info({
        message: 'Password reset link has been sent to your email. Please check your inbox.'
      });
      routerPush(ROUTERS.LOGIN);
    }
  };

  const onLoginClick = () => {
    routerPush(ROUTERS.LOGIN);
  };

  const schema = useShape({
    email: emailSchema
  });

  const methods = useForm<ForgotPasswordPayload>({
    mode: 'onChange',
    defaultValues: {
      email: ''
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
          <h1 className="mb-4 text-4xl font-bold text-center">{t('auth:forgot_password')}</h1>
          <label className="text-md" htmlFor="email">
            {t('form:fields.email')}
          </label>
          <Input
            id="email"
            {...register('email')}
            className="mb-6 rounded-md bg-inherit"
            placeholder="you@example.com"
          />

          <Button type="submit" disabled={isSubmitting}>
            {t('auth:continue')}
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
export default ForgotPassword;
