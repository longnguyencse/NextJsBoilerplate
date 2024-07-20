import { Button } from '../ui/button';
import { AnimationProvider } from './animation-provider';
import { Layout } from './layout';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface StepFourProps {
  active: boolean;
  selectedIdealCoach: string[];
  onNextClick: () => void;
  onSelected: (successDescriptionTx: string) => void;
}

const idealCoachTxs = [
  'questionnaire:direct_communication',
  'questionnaire:high_energy',
  'questionnaire:knows_when_to_give_me_tough_love',
  'questionnaire:has_sense_of_humor',
  'questionnaire:truly_holds_me_accountable',
  'questionnaire:laid_back_flexible'
];

export const IdealCoach = ({
  active,
  selectedIdealCoach,
  onSelected,
  onNextClick
}: StepFourProps) => {
  const { t } = useTranslation();

  return (
    <AnimationProvider active={active}>
      <Layout titleTx="questionnaire:describe_your_ideal_coach" titleClassName="max-w-fit">
        <p className="mt-4 text-[#032528] font-inter text-[14px]">
          {t('questionnaire:select_all_that_apply')}
        </p>
        <div className="flex flex-col mt-8 max-w-[394px] w-full gap-3">
          {idealCoachTxs.map((idealCoachTx) => (
            <button
              key={idealCoachTx}
              onClick={() => {
                onSelected(t(idealCoachTx));
              }}
              className={cn(
                'w-full p-4 text-left text-black bg-white rounded-[16px] font-inter hover:text-black hover:bg-gray-100 hover:shadow-lg transition-colors duration-200 ease-in-out',
                { 'bg-gray-200': selectedIdealCoach.includes(t(idealCoachTx)) }
              )}
            >
              {t(idealCoachTx)}
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
