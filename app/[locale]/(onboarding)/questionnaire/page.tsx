'use client';

import {
  BiggestChallenge,
  CoachInfo,
  Header,
  IdealCoach,
  PartnerDuration,
  Payment,
  StockPhotoSelective,
  SuccessfulDescription,
  TimingSection
} from '@/components/questionnaire';

import { ConsultationService } from '@utils/supabase/consultationService';
import { cn } from '@/lib/utils';
import { createCheckoutSession } from '@/app/api/checkout_sessions';
import getStripe from '@utils/stripe/get-stripejs';
import useStore from '@/state';

const QuestionnairePage = () => {
  const {
    currentStep,
    challengeDescription,
    successDescription,
    idealCoach,
    partnerDuration,
    dateTime,
    timezone,
    idConsultation,
    setTimeZone,
    setCurrentStep,
    setPartnerDuration,
    setChallengeDescription,
    setSuccessDescription,
    setIdealCoach,
    setIdConsultation,
    setDateTime,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    clearQuestionnaireState
  } = useStore((state) => state);

  const onSelectedDuration = (duration: string) => {
    setPartnerDuration(duration);
    setCurrentStep(currentStep + 1);
  };

  const onSelectedDateTime = (dateTime: string) => {
    setDateTime(dateTime);
  };

  const onSelectedTimeZone = (timezone: string) => {
    setTimeZone(timezone);
  };

  const saveIdConsultation = (id: string) => {
    setIdConsultation(id);
  };

  const onNextClick = () => {
    setCurrentStep(currentStep + 1);
  };

  const paymentClick = async (data: any) => {
    // save timezone, available time of consultation
    await ConsultationService.updateConsultation(idConsultation, {
      timezone,
      available_time: dateTime
    });
    console.log(idConsultation, idConsultation);
    // Create checkout session
    const checkoutSession = await createCheckoutSession('hosted', data.email, 250, idConsultation);

    if ((checkoutSession as any).statusCode === 500) {
      console.error((checkoutSession as any).message);
      return;
    }

    // Redirect to check out.
    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: checkoutSession.id
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    console.warn(error.message);
  };

  const noHeaderSteps = [10];
  const noProgressBarSteps = [8];
  const transitionSteps = [3, 5, 6];

  return (
    <>
      <Header
        currentStep={currentStep}
        totalStep={10}
        hiddenProgressBar={noProgressBarSteps.includes(currentStep)}
        hidden={noHeaderSteps.includes(currentStep)}
        className={cn({ 'bg-transparent': transitionSteps.includes(currentStep) })}
      />
      <PartnerDuration active={currentStep === 1} onSelected={onSelectedDuration} />

      <BiggestChallenge
        active={currentStep === 2}
        onNextClick={onNextClick}
        onSelected={(challenge) => {
          setChallengeDescription(challenge);
        }}
        selectedChallenges={challengeDescription}
      />
      <StockPhotoSelective
        active={currentStep === 3}
        titleTx="questionnaire:the_human_difference"
        contentTx="questionnaire:your_coach_will_build_tailored"
        backgroundUrl="/images/smiling-women.jpeg"
        onNextClick={onNextClick}
      />
      <SuccessfulDescription
        active={currentStep === 4}
        onNextClick={onNextClick}
        onSelected={(description) => {
          setSuccessDescription(description);
        }}
        selectedSuccessDescriptions={successDescription}
      />
      <StockPhotoSelective
        active={currentStep === 5}
        titleTx="questionnaire:invest_in_your_relationship_the_same_way_you_invest_in_work"
        titleClassName="max-w-[456px]"
        contentTx="questionnaire:consistency_is_key_to_meaningful_results"
        backgroundUrl="/images/husband-using-laptop-kitchen.jpg"
        onNextClick={onNextClick}
      />
      <StockPhotoSelective
        active={currentStep === 6}
        titleTx="questionnaire:always_here_for_you"
        contentTx="questionnaire:outside_of_sessions"
        backgroundUrl="/images/smiling-man.jpg"
        onNextClick={onNextClick}
      />

      <IdealCoach
        active={currentStep === 7}
        onNextClick={onNextClick}
        onSelected={(idealCoach) => {
          setIdealCoach(idealCoach);
        }}
        selectedIdealCoach={idealCoach}
      />
      <CoachInfo
        active={currentStep === 8}
        partnerDuration={partnerDuration}
        challengeDescription={challengeDescription}
        successDescription={successDescription}
        idealCoach={idealCoach}
        onNextClick={onNextClick}
        saveIdConsultation={saveIdConsultation}
      />
      <TimingSection
        active={currentStep === 9}
        timezone={timezone}
        selectedDateTime={dateTime}
        onNextClick={onNextClick}
        onSelectedTimeZone={onSelectedTimeZone}
        onSelectedDateTime={onSelectedDateTime}
      />
      <Payment active={currentStep === 10} uiMode="hosted" onPaymentClick={paymentClick} />
    </>
  );
};

export const runtime = 'edge';
export default QuestionnairePage;
