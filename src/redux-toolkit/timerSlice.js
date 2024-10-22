import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  minutes: '00',
  seconds: '01',
  timerLabel: 'Session',
  isRunning: false
}

const formatNumber = (number) => number < 10 ? '0' + number : number.toString();

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    setTimer: (state, action) => {
      state.minutes = formatNumber(action.payload.minutes);
      state.seconds = formatNumber(action.payload.seconds);
    },
    setTimerLabel: (state) => {
      state.timerLabel = state.timerLabel === 'Session' ? 'Break' : 'Session';
    },
    setIsRunning: (state, action) => {
      state.isRunning = action.payload;
    }
  }
})

export const timerReducer = timerSlice.reducer;
export const timerActions = timerSlice.actions;

export const tick = (breakLength, sessionLength, audioRef) => (dispatch, getState) => {
  const { minutes, seconds, timerLabel } = getState().timer;

  if (seconds === '00' && minutes === '00') {
    dispatch(timerActions.setTimerLabel(timerLabel === 'Session' ? 'Break' : 'Session'));
    dispatch(timerActions.setTimer({
      minutes: timerLabel === 'Session' ? breakLength : sessionLength,
      seconds: 0
    }));
    audioRef.current.play();
  } else if (seconds === '00') {
    dispatch(timerActions.setTimer({
      minutes: minutes - 1,
      seconds: 59
    }));
  } else {
    dispatch(timerActions.setTimer({
      minutes: Number(minutes),
      seconds: seconds - 1
    }));
  }
}