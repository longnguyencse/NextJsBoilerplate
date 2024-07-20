import { FormProvider, useForm } from 'react-hook-form';

import { AnimationProvider } from './animation-provider';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Layout } from './layout';
import { SESSION_FEE } from '@/constants/common';
import { SideBarHelper } from './side-bar-helper';
import useFormKeyboard from '@/hooks/useFormKeyboard';
import { useTranslation } from 'react-i18next';
import useValidation from '@/hooks/useValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { type Stripe } from 'stripe';

interface PaymentProps {
  active: boolean;
  onPaymentClick: (data: any) => void;
  uiMode: Stripe.Checkout.SessionCreateParams.UiMode;
}

export const Payment = ({ active, onPaymentClick, uiMode }: PaymentProps) => {
  const { t } = useTranslation();
  const { handleKeyDown } = useFormKeyboard();
  const { useShape, emailSchema, phoneSchema, firstNameSchema, lastNameSchema } = useValidation();

  const schema = useShape({
    email: emailSchema,
    firstName: firstNameSchema,
    lastName: lastNameSchema,
    phoneNumber: phoneSchema
  });

  const methods = useForm<any>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: ''
    },
    resolver: yupResolver(schema)
  });
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = methods;

  const onSubmit = (data: any) => {
    console.log(data);
    onPaymentClick(data);
  };

  return (
    <AnimationProvider active={active}>
      <Layout hasIcon titleTx="questionnaire:initial_coaching_session">
        <p className="text-[#032528] leading-5 max-w-[327px] mt-2 text-center">
          {t('questionnaire:virtual_expect_coaching_session')}
        </p>
        <div className="flex flex-col w-full gap-3 max-w-[368px] mt-9">
          <div className="flex flex-col items-center gap-2 py-3 bg-white rounded-2xl w-ful">
            <div className="text-[#2A4A39] font-fraunces leading-6 font-semibold">
              {t('questionnaire:1st_session_fee')}
            </div>
            <div className="text-[#2A4A39] text-[32px] font-fraunces font-semibold">
              {SESSION_FEE}
            </div>
          </div>
          <FormProvider {...methods}>
            <input type="hidden" name="uiMode" value={uiMode} />
            <form
              className="flex flex-col justify-center flex-1 w-full gap-2 animate-in text-foreground"
              onSubmit={handleSubmit(onSubmit)}
              onKeyDown={(event) => {
                handleKeyDown(event, isSubmitting, handleSubmit, onSubmit);
              }}
            >
              <Input
                id="email"
                {...register('email')}
                className="h-12 px-4 py-3 text-black rounded-md bg-inherit"
                placeholder="Email"
              />
              <div className="flex flex-1 gap-3">
                <Input
                  id="firstName"
                  {...register('firstName')}
                  className="h-12 px-4 py-3 text-black rounded-md bg-inherit"
                  placeholder="First Name"
                />
                <Input
                  id="lastName"
                  {...register('lastName')}
                  className="h-12 px-4 py-3 text-black rounded-md bg-inherit"
                  placeholder="Last Name"
                />
              </div>
              <Input
                id="phoneNumber"
                {...register('phoneNumber')}
                className="h-12 px-4 py-3 text-black rounded-md bg-inherit"
                placeholder="Phone Number"
              />
              <Button type="submit">{t('common:pay_with_card')}</Button>
            </form>
          </FormProvider>
          <SideBarHelper />
        </div>
      </Layout>
    </AnimationProvider>
  );
};
