import { MouseEventHandler } from 'react';
import store from './redux-toolkit/store';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export interface TimerType {
  timerLabel: string;
  minutes: string;
  seconds: string;
  handleClickStartStop: () => void;
  handleClickReset: () => void;
}

export interface LengthSettingType {
  isSession: boolean;
  length: number;
  handleClick: MouseEventHandler<HTMLDivElement>;
}
