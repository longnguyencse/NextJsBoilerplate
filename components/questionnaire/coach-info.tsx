import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { FormProvider, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

import { AnimationProvider } from './animation-provider';
import { Button } from '@/components/ui/button';
import CoachService from '@/utils/supabase/coachService';
import { type Coaches } from '@/types/coaches';
import { ConsultationService } from '@/utils/supabase/consultationService';
import { Input } from '@components/ui/input';
import { type RevealMyMatch } from '@/types/common';
import moment from 'moment';
import useFormKeyboard from '@/hooks/useFormKeyboard';
import { useTranslation } from 'react-i18next';
import useValidation from '@/hooks/useValidation';
import { v4 as uuidv4 } from 'uuid';
import { yupResolver } from '@hookform/resolvers/yup';
import { cn } from '@/lib/utils';
import { useDeviceResponsive } from '@/hooks/useDeviceResponsive';
import { delay } from 'lodash';

interface CoachInfoProps {
  active: boolean;
  partnerDuration: string;
  challengeDescription: string[];
  successDescription: string[];
  idealCoach: string[];
  onNextClick: () => void;
  saveIdConsultation: (id: string) => void;
}

export const CoachInfo = (prop: CoachInfoProps) => {
  const {
    active,
    partnerDuration,
    challengeDescription,
    successDescription,
    idealCoach,
    onNextClick,
    saveIdConsultation
  } = prop;

  const { t } = useTranslation();
  const { isMD } = useDeviceResponsive();
  const [isOpen, setIsOpen] = useState(active);
  const [coach, setCoach] = useState<Partial<Coaches>>({});
  const [isShowDetail, setShowDetail] = useState(false);
  const { useShape, emailSchema, nameSchema } = useValidation();

  useEffect(() => {
    if (active) {
      delay(() => {
        setIsOpen(true);
      }, 100);
    }
  }, [active]);

  const schema = useShape({
    email: emailSchema,
    name: nameSchema
  });
  const methods = useForm<RevealMyMatch>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      name: ''
    },
    resolver: yupResolver(schema)
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = methods;
  const { handleKeyDown } = useFormKeyboard();

  const onSubmit = async (formData: RevealMyMatch) => {
    const { email, name } = formData;
    const id = uuidv4();
    await ConsultationService.createConsultation({
      id,
      partner_duration: partnerDuration,
      challenge_description: challengeDescription,
      success_description: successDescription,
      ideal_coach: idealCoach,
      full_name: name,
      email,
      created_at: moment.utc().format()
    });
    // save id consultations on state
    saveIdConsultation(id);
    // TODO: revoke api get best coach
    // get coach detail
    const coachInfo = await CoachService.getCoachRandom();
    if (coachInfo) {
      setCoach(coachInfo);
      setIsOpen(false);
    }
  };

  const handleShowCoachDetail = async () => {
    setShowDetail(!isShowDetail);
  };

  return (
    <AnimationProvider active={active}>
      <div
        className={cn('flex  justify-center pt-32 ', {
          'flex-col items-center gap-2': !isMD,
          'gap-14 items-start': isMD
        })}
      >
        <section className="flex flex-col">
          {!isShowDetail && (
            <>
              <span className="text-center font-fraunces text-[32px] text-[#2A4A39]">
                {t('questionnaire:get_started_with_a_coach')}
              </span>
              <span className="font-inter text-[#032528]] mt-4 text-center mx-5">
                {t('questionnaire:based_on_your_responses')}
              </span>
            </>
          )}
          <div className="flex justify-center">
            <div className="relative">
              <img
                className={cn(
                  'max-w-[280px] w-full h-[440px] object-cover rounded-[24px] shadow-lg',
                  {
                    'mt-5': !isShowDetail
                  }
                )}
                src={coach?.avatar ?? '/images/avatar-default-2.jpeg'}
                alt="Img Coach"
              />
              <span className="absolute text-white transform -translate-x-1/2 -translate-y-full text-[18px] font-inter name -bottom-10 top-full left-1/2">
                {coach?.name ?? ''}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="mt-5">
              <Button className="font-Inter text-[16px]" onClick={onNextClick}>
                {t('questionnaire:schedule_your_consultation')}
              </Button>
            </div>

            <div>
              <Button
                className="font-Inter text-[#032528] text-[16px]"
                variant="link"
                onClick={handleShowCoachDetail}
              >
                {isShowDetail ? t('common:close') : t('common:learn_more')}
              </Button>
            </div>
          </div>
        </section>
        {isShowDetail && (
          <section className={cn({ 'mb-10 px-3': !isMD })}>
            <div className="mb-3">
              <div className="font-semibold text-[#2A4A39] font-fraunces leading-normal mb-3">
                {t('questionnaire:specialties')}
              </div>
              <ul>
                {coach?.specialties?.map((specialty: string, index: number) => (
                  <li
                    key={specialty}
                    className="mb-[6px] leading-normal text-[#032528] font-inter text-[14px]"
                  >
                    ✦ {specialty}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-3">
              <div className="mb-3">
                <span className="font-semibold text-[#2A4A39] font-fraunces leading-normal">
                  {t('questionnaire:coaching_style')}
                </span>
              </div>
              {coach?.coaching_style && (
                <ul>
                  {coach.coaching_style.map((style: string, index: number) => (
                    <li
                      key={index}
                      className="mb-[6px] leading-normal text-[#032528] font-inter text-[14px]"
                    >
                      ✦ {style}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="mt-3">
              <div className="mb-3">
                <span className="font-semibold text-[#2A4A39] font-fraunces leading-normal">
                  {t('questionnaire:about')}
                </span>
              </div>
              <div className="my-3 max-w-[356px]">
                <span className="text=[#032528] text-sm leading-tight font-inter text-[24px]">
                  {coach?.biography ?? ''}
                </span>
              </div>

              <Button
                variant="link"
                className="p-0 text-sm font-normal leading-tight underline text-[#032528] font-inter h-fit"
              >
                {t('questionnaire:read_bio')}
              </Button>
            </div>
            <div className="mt-3">
              <span className="font-semibold text-[#2A4A39] font-fraunces leading-normal">
                {t('questionnaire:loves')}
              </span>
              {coach?.loves && (
                <ul>
                  {coach.loves.map((love: string, index: number) => (
                    <li
                      key={index}
                      className="leading-normal text-[#032528] font-inter text-[14px]"
                    >
                      ✦ {love}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        )}
      </div>
      <Dialog open={isOpen}>
        <DialogContent className="p-10 !rounded-[24px] sm:max-w-md" autoFocus={false}>
          <DialogHeader>
            <DialogTitle className="font-fraunces text-[32px] font-semibold text-[#2A4A39]">
              {t('questionnaire:we_found_the_perfect_coach_for_you')}
            </DialogTitle>
            <DialogDescription className="font-inter text-[16px] text-[#032528]">
              {t('questionnaire:view_your_match')}
            </DialogDescription>
          </DialogHeader>
          <FormProvider {...methods}>
            <form
              className="flex flex-col flex-1 w-full gap-3 animate-in text-foreground"
              onSubmit={handleSubmit(onSubmit)}
              onKeyDown={(event) => {
                handleKeyDown(event, isSubmitting, handleSubmit, onSubmit);
              }}
              autoFocus={false}
            >
              <Input
                id="name"
                autoFocus={false}
                {...register('name')}
                className="h-12 rounded-md bg-inherit"
                placeholder={'Full Name'}
              ></Input>
              <Input
                id="email"
                autoFocus={false}
                {...register('email')}
                className="h-12 rounded-md bg-inherit"
                placeholder="Email"
              />
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button type="submit" disabled={isSubmitting} className="mt-1 text-[16px]">
                    {t('common:reveal_my_match')}
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </AnimationProvider>
  );
};
