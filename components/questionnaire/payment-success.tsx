'use client';

import { AnimationProvider } from '@components/questionnaire/animation-provider';
import useStore from '@/state';
import { useEffect } from 'react';

export const PaymentSuccess = () => {
  const { clearQuestionnaireState } = useStore((state) => state);

  useEffect(() => {
    clearQuestionnaireState();
  }, [clearQuestionnaireState]);

  return (
    <AnimationProvider active={true}>
      <div className="flex h-full min-h-screen">
        <div
          className="flex-1"
          style={{
            background: 'url(/images/payment-success-2.webp) lightgray 50% / cover no-repeat'
          }}
        ></div>
        <div className="flex flex-col items-center justify-center flex-1 w-1/2">
          <div className="flex flex-col items-start gap-4 px-4">
            <h1 className="text-[40px] leading-[48px] text-[#2A4A39] font-fraunces max-w-[266px]">
              Payment successful
            </h1>
          </div>
        </div>
      </div>
    </AnimationProvider>
  );
};
