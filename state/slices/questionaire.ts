import { IdealCoach } from '@/components/questionnaire';
import type { StateSlice, Store } from '@state/tyles';

export const initialState = {
  currentStep: 1,
  partnerDuration: '',
  challengeDescription: [],
  successDescription: [],
  idealCoach: [],
  dateTime: [],
  email: '',
  fullName: '',
  idConsultation: '',
  timezone: ''
};

export type QuestionnaireSlice = {
  // state
  currentStep: number;
  partnerDuration: string;
  email: string;
  fullName: string;
  challengeDescription: string[];
  successDescription: string[];
  idealCoach: string[];
  dateTime: string[];
  timezone: string;
  idConsultation: string;
  // reducers
  setCurrentStep(payload: QuestionnaireSlice['currentStep']): void;
  setPartnerDuration(payload: QuestionnaireSlice['partnerDuration']): void;
  setChallengeDescription(payload: string): void;
  setSuccessDescription(payload: string): void;
  setIdealCoach(payload: string): void;
  clearQuestionnaireState(): void;
  setIdConsultation(payload: string): void;
  setDateTime(payload: string): void;
  setTimeZone(payload: string): void;
};

export const createQuestionnaireSlice: StateSlice<Store, QuestionnaireSlice> = (set) => {
  const setCurrentStep = (payload: QuestionnaireSlice['currentStep']) => {
    return set((state) => ({ ...state, currentStep: payload }));
  };

  const setPartnerDuration = (payload: QuestionnaireSlice['partnerDuration']) => {
    return set((state) => ({ ...state, partnerDuration: payload }));
  };

  const setChallengeDescription = (payload: string) => {
    return set((state) => {
      if (state.challengeDescription.includes(payload)) {
        return {
          ...state,
          challengeDescription: [...state.challengeDescription.filter((item) => item !== payload)]
        };
      }

      return {
        ...state,
        challengeDescription: [...state.challengeDescription, payload]
      };
    });
  };

  const setSuccessDescription = (payload: string) => {
    return set((state) => {
      if (state.successDescription.includes(payload)) {
        return {
          ...state,
          successDescription: [...state.successDescription.filter((item) => item !== payload)]
        };
      }

      return {
        ...state,
        successDescription: [...state.successDescription, payload]
      };
    });
  };

  const setIdealCoach = (payload: string) => {
    return set((state) => {
      if (state.idealCoach.includes(payload)) {
        return {
          ...state,
          idealCoach: [...state.idealCoach.filter((item) => item !== payload)]
        };
      }

      return {
        ...state,
        idealCoach: [...state.idealCoach, payload]
      };
    });
  };

  const setDateTime = (payload: string) => {
    return set((state) => {
      if (state.dateTime.includes(payload)) {
        return {
          ...state,
          dateTime: [...state.dateTime.filter((item) => item !== payload)]
        };
      }

      return {
        ...state,
        dateTime: [...state.dateTime, payload]
      };
    });
  };

  const setTimeZone = (payload: QuestionnaireSlice['timezone']) => {
    return set((state) => ({ ...state, timezone: payload }));
  };

  const clearQuestionnaireState = () => {
    set(initialState);
  };

  const setIdConsultation = (payload: QuestionnaireSlice['idConsultation']) => {
    return set((state) => ({ ...state, idConsultation: payload }));
  };

  return {
    ...initialState,
    setCurrentStep,
    setPartnerDuration,
    setChallengeDescription,
    setSuccessDescription,
    setIdealCoach,
    clearQuestionnaireState,
    setIdConsultation,
    setDateTime,
    setTimeZone
  };
};
