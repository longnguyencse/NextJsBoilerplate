import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer';

import { Button } from '@/components/ui/button';
import Icon from '../ui/icon';
import { cn } from '@/lib/utils';
import { useDeviceResponsive } from '@/hooks/useDeviceResponsive';
import { useTranslation } from 'react-i18next';

const contents = [
  {
    title: 'questionnaire:is_this_different_than_couples_therapy',
    content: 'questionnaire:this_is_different'
  },
  {
    title: 'questionnaire:why_do_I_need_relationship_coach',
    content: 'questionnaire:this_is_different'
  },
  {
    title: 'questionnaire:do_you_take_insurance',
    content: 'questionnaire:this_is_different'
  },
  {
    title: 'questionnaire:what_are_the_coaches_qualifications',
    content: 'questionnaire:this_is_different'
  },
  {
    title: 'questionnaire:what_If_Id_like_different_coach',
    content: 'questionnaire:this_is_different'
  }
];

const ContentSideBar = () => {
  const { t } = useTranslation();

  return (
    <Accordion type="single" collapsible className="flex flex-col w-full gap-3">
      {contents.map((content) => (
        <AccordionItem
          key={content.title}
          value={content.title}
          className="px-4 bg-white border-b-0 rounded-lg"
        >
          <AccordionTrigger className="text-base font-inter">{t(content.title)}</AccordionTrigger>
          <AccordionContent className="text-[#636363] text-sm">
            {t(content.content)}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export const SideBarHelper = () => {
  const { t } = useTranslation();
  const { isMD } = useDeviceResponsive();

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button className="rounded-3xl fixed text-[#032528] h-7 py-1 pl-2 pr-3 bg-white hover:shadow-lg hover:hover:bg-gray-100 bottom-4 right-4 tex-[14px] font-inter font-medium">
          <Icon width={20} height={20} name="help" className="mr-[2px]" />
          {t('questionnaire:help')}
        </Button>
      </DrawerTrigger>
      <DrawerContent
        className={cn('h-screen top-0 right-0 left-auto mt-0 z-max rounded-none bg-[#F9F5F2]', {
          'w-[500px]': isMD,
          'w-full': !isMD
        })}
      >
        <div className="w-full">
          <DrawerHeader className="px-8 pt-8">
            <DrawerTitle className="text-[#2A4A39] font-fraunces text-2xl font-semibold max-w-[223px]">
              {t('questionnaire:frequently_asked_questions')}
            </DrawerTitle>
          </DrawerHeader>
          <div className="px-8 pt-2 pb-0">
            <ContentSideBar />
          </div>
          <DrawerClose asChild>
            <Button
              variant="ghost"
              className="absolute p-0 bg-transparent top-8 right-8 hover:bg-transparent w-fit h-fit"
            >
              <Icon width={20} height={20} name="close" />
            </Button>
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
