import { Button } from '../ui/button';
import { AnimationProvider } from './animation-provider';
import { Layout } from './layout';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface SuccessfulDescriptionProps {
  active: boolean;
  selectedSuccessDescriptions: string[];
  onNextClick: () => void;
  onSelected: (successDescriptionTx: string) => void;
}

const descriptionTxs = [
  'questionnaire:feel_more_emotionally_connected',
  'questionnaire:feel_more_prioritized',
  'questionnaire:feel_more_seen',
  'questionnaire:feel_more_heard',
  'questionnaire:feel_more_sexually_satisfied_and_desired',
  'questionnaire:overcoming_a_specific_challenge',
  'questionnaire:building_a_strong_foundation_for_the_future',
  'questionnaire:creating_shared_vision_and_goals',
  'questionnaire:getting_to_know_your_partner_better',
  'questionnaire:getting_to_know_yourself_better'
];

export const SuccessfulDescription = ({
  active,
  selectedSuccessDescriptions,
  onSelected,
  onNextClick
}: SuccessfulDescriptionProps) => {
  const { t } = useTranslation();

  return (
    <AnimationProvider active={active}>
      <Layout
        titleTx="questionnaire:what_does_success_look_like_to_you"
        titleClassName="max-w-[250px]"
      >
        <p className="mt-4 text-[#032528] font-inter text-[14px]">
          {t('questionnaire:select_all_that_apply')}
        </p>
        <div className="flex flex-col mt-8 max-w-[394px] w-full gap-3">
          {descriptionTxs.map((descriptionTx) => (
            <button
              key={descriptionTx}
              onClick={() => {
                onSelected(t(descriptionTx));
              }}
              className={cn(
                'w-full p-4 text-left text-black bg-white rounded-[16px] font-inter hover:text-black hover:bg-gray-100 hover:shadow-lg transition-colors duration-200 ease-in-out',
                { 'bg-gray-200': selectedSuccessDescriptions.includes(t(descriptionTx)) }
              )}
            >
              {t(descriptionTx)}
            </button>
          ))}
        </div>
        <Button
          className="mt-8 max-w-[394px] w-full text-white font-medium text-[16px]"
          onClick={onNextClick}
        >
          {t('common:next')}
        </Button>
      </Layout>
    </AnimationProvider>
  );
};
