import type { AppSlice } from 'state/slices/app';
import type { AuthSlice } from 'state/slices/auth';
import { QuestionnaireSlice } from 'state/slices/questionaire';
import type { StateCreator } from 'zustand';

export type Store = AppSlice & AuthSlice & QuestionnaireSlice;

export type StateSlice<T, U> = StateCreator<T, [never, unknown][], [], U>;
