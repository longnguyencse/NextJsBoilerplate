import { cn } from '@/lib/utils';
import { AnimationProvider } from './animation-provider';
import { Layout } from './layout';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface TimingSectionProps {
  active: boolean;
  timezone: string;
  selectedDateTime: string[];
  onSelectedDateTime: (dateTimeTx: string) => void;
  onSelectedTimeZone: (timezone: string) => void;
  onNextClick: () => void;
}

const dateTimeTxs = [
  'questionnaire:mornings',
  'questionnaire:early_afternoons',
  'questionnaire:evenings',
  'questionnaire:weekdays',
  'questionnaire:weekends'
];

// Todo: Replace with actual timezone data
const timezoneMockData = [
  {
    value: 'est',
    label: 'Eastern Standard Time (EST)'
  },
  {
    value: 'cst',
    label: 'Central Standard Time (CST)'
  },
  {
    value: 'mst',
    label: 'Mountain Standard Time (MST)'
  },
  {
    value: 'pst',
    label: 'Pacific Standard Time (PST)'
  },
  {
    value: 'akst',
    label: 'Alaska Standard Time (AKST)'
  },
  {
    value: 'hst',
    label: 'Hawaii Standard Time (HST)'
  },
  {
    value: 'gmt',
    label: 'Greenwich Mean Time (GMT)'
  },
  {
    value: 'cet',
    label: 'Central European Time (CET)'
  },
  {
    value: 'eet',
    label: 'Eastern European Time (EET)'
  },
  {
    value: 'west',
    label: 'Western European Summer Time (WEST)'
  },
  {
    value: 'cat',
    label: 'Central Africa Time (CAT)'
  },
  {
    value: 'eat',
    label: 'East Africa Time (EAT)'
  },
  {
    value: 'msk',
    label: 'Moscow Time (MSK)'
  },
  {
    value: 'ist',
    label: 'India Standard Time (IST)'
  },
  {
    value: 'cst_china',
    label: 'China Standard Time (CST)'
  },
  {
    value: 'jst',
    label: 'Japan Standard Time (JST)'
  },
  {
    value: 'kst',
    label: 'Korea Standard Time (KST)'
  },
  {
    value: 'ist_indonesia',
    label: 'Indonesia Central Standard Time (WITA)'
  },
  {
    value: 'awst',
    label: 'Australian Western Standard Time (AWST)'
  },
  {
    value: 'acst',
    label: 'Australian Central Standard Time (ACST)'
  },
  {
    value: 'aest',
    label: 'Australian Eastern Standard Time (AEST)'
  },
  {
    value: 'nzst',
    label: 'New Zealand Standard Time (NZST)'
  },
  {
    value: 'fjt',
    label: 'Fiji Time (FJT)'
  },
  {
    value: 'art',
    label: 'Argentina Time (ART)'
  },
  {
    value: 'bot',
    label: 'Bolivia Time (BOT)'
  },
  {
    value: 'brt',
    label: 'Brasilia Time (BRT)'
  },
  {
    value: 'clt',
    label: 'Chile Standard Time (CLT)'
  }
];

export const TimingSection = ({
  active,
  selectedDateTime,
  timezone,
  onSelectedTimeZone,
  onSelectedDateTime,
  onNextClick
}: TimingSectionProps) => {
  const { t } = useTranslation();

  return (
    <AnimationProvider active={active}>
      <Layout titleTx="questionnaire:what_timezone_are_you_in" titleClassName="max-w-fit">
        <Select onValueChange={onSelectedTimeZone} defaultValue={timezone}>
          <SelectTrigger className="w-[200px] h-10 rounded-[100px] mt-3 text-[16px]">
            <SelectValue placeholder="Select a timezone" />
          </SelectTrigger>
          <SelectContent>
            {timezoneMockData.map((timezone) => (
              <SelectItem key={timezone.value} value={timezone.value}>
                {timezone.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <h1 className="mt-8 text-[#2A4A39] font-fraunces text-center text-[24px] font-semibold max-w-[287px] leading-8">
          {t('questionnaire:best_days_and_times_for_sessions')}
        </h1>
        <p className="mt-4 text-[#032528] font-inter text-[14px]">
          {t('questionnaire:select_all_that_apply')}
        </p>
        <div className="flex flex-col mt-8 max-w-[394px] w-full gap-3">
          {dateTimeTxs.map((dateTimeTx) => (
            <button
              key={dateTimeTx}
              onClick={() => {
                onSelectedDateTime(t(dateTimeTx));
              }}
              className={cn(
                'w-full p-4 text-left text-black bg-white rounded-[16px] font-inter hover:text-black hover:bg-gray-100 hover:shadow-lg transition-colors duration-200 ease-in-out',
                { 'bg-gray-200': selectedDateTime.includes(t(dateTimeTx)) }
              )}
            >
              {t(dateTimeTx)}
            </button>
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
