import { Button } from '../ui/button';
import { AnimationProvider } from './animation-provider';
import { Layout } from './layout';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface StepTwoProps {
  active: boolean;
  selectedChallenges: string[];
  onNextClick: () => void;
  onSelected: (challenge: string) => void;
}

const challengeTxs = [
  'questionnaire:communication',
  'questionnaire:emotional_intimacy',
  'questionnaire:physical_intimacy',
  'questionnaire:conflict_resolution',
  'questionnaire:time_management',
  'questionnaire:trust',
  'questionnaire:financial_disputes',
  'questionnaire:aligned_vision_goals'
];

export const BiggestChallenge = ({
  active,
  onNextClick,
  onSelected,
  selectedChallenges
}: StepTwoProps) => {
  const { t } = useTranslation();

  return (
    <AnimationProvider active={active}>
      <Layout
        titleTx="questionnaire:what_are_the_biggest_challenges_in_your_relationship"
        titleClassName="max-w-[370px]"
      >
        <p className="mt-4 text-[#032528] font-inter text-[14px]">
          {t('questionnaire:select_all_that_apply')}
        </p>
        <div className="flex flex-wrap gap-3 mt-8 max-w-[394px] w-full">
          {challengeTxs.map((challengeTx) => (
            <Button
              key={challengeTx}
              onClick={() => {
                onSelected(t(challengeTx));
              }}
              className={cn(
                'flex-2 px-4 text-[16px] font-normal py-3 text-black bg-white rounded-[48px] w-fit hover:bg-gray-100 hover:shadow-lg',
                { 'bg-gray-200': selectedChallenges.includes(t(challengeTx)) }
              )}
            >
              {t(challengeTx)}
            </Button>
          ))}
        </div>
        <Button
          className="mt-10 max-w-[394px] w-full text-white font-medium text-[16px]"
          onClick={onNextClick}
        >
          {t('common:next')}
        </Button>
      </Layout>
    </AnimationProvider>
  );
};
