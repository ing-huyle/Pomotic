import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sessionLength: 20
}

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSessionLength: (state, action) => {
      state.sessionLength = action.payload;
    },
    decrementSessionLength: (state) => {
      const newSessionLength = state.sessionLength - 1;
      state.sessionLength = newSessionLength >= 1 ? newSessionLength : state.sessionLength;
    },
    incrementSessionLength: (state) => {
      const newSessionLength = state.sessionLength + 1;
      state.sessionLength = newSessionLength <= 60 ? newSessionLength : state.sessionLength;
    }
  }
});

export const sessionReducer = sessionSlice.reducer;
export const sessionActions = sessionSlice.actions;