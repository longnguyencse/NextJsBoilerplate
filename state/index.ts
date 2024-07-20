import { createJSONStorage, devtools, persist } from 'zustand/middleware';

import type { Store } from './tyles';
import { create } from 'zustand';
import { createAppSlice } from 'state/slices/app';
import { createAuthSlice } from 'state/slices/auth';
import { createQuestionnaireSlice } from 'state/slices/questionaire';
import { immer } from 'zustand/middleware/immer';

const useStore = create<Store>()(
  immer(
    devtools(
      persist(
        (...a) => ({
          ...createAppSlice(...a),
          ...createAuthSlice(...a),
          ...createQuestionnaireSlice(...a)
        }),
        {
          name: 'paramount-storage',
          partialize: (state) => ({
            currentUser: state.currentUser,
            currentStep: state.currentStep,
            partnerDuration: state.partnerDuration,
            challengeDescription: state.challengeDescription,
            successDescription: state.successDescription,
            idConsultation: state.idConsultation,
            timezone: state.timezone,
            dateTime: state.dateTime
          }),
          storage: createJSONStorage(() => localStorage)
        }
      )
    )
  )
);

export default useStore;
