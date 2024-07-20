import { AnimationProvider } from './animation-provider';
import { Layout } from './layout';
import { useTranslation } from 'react-i18next';

interface PartnerDurationProps {
  active: boolean;
  onSelected: (duration: string) => void;
}

const partnerDurationTx = [
  'questionnaire:less_than_1_years',
  'questionnaire:1_to_3_years',
  'questionnaire:3_to_5_years',
  'questionnaire:5_to_10_years',
  'questionnaire:over_10_years'
];

export const PartnerDuration = ({ active, onSelected }: PartnerDurationProps) => {
  const { t } = useTranslation();

  return (
    <AnimationProvider active={active}>
      <Layout titleTx="questionnaire:how_long_have_you_been_with_your_partner">
        <div className="flex flex-col gap-3 mt-8 max-w-[394px] w-full ">
          {partnerDurationTx.map((durationTx) => (
            <button
              key={durationTx}
              onClick={() => {
                onSelected(t(durationTx));
              }}
              className="w-full p-4 text-left text-black bg-white rounded-[16px] font-inter hover:text-black hover:bg-gray-100 hover:shadow-lg transition-colors duration-200 ease-in-out"
            >
              {t(durationTx)}
            </button>
          ))}
        </div>
      </Layout>
    </AnimationProvider>
  );
};
