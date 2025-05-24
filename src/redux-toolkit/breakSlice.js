import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  breakLength: 4
}

const breakSlice = createSlice({
  name: 'break',
  initialState,
  reducers: {
    setBreakLength: (state, action) => {
      state.breakLength = action.payload;
    },
    decrementBreakLength: (state) => {
      const newBreakLength = state.breakLength - 1;
      state.breakLength = newBreakLength >= 1 ? newBreakLength : state.breakLength;
    },
    incrementBreakLength: (state) => {
      const newBreakLength = state.breakLength + 1;
      state.breakLength = newBreakLength <= 60 ? newBreakLength : state.breakLength;
    }
  }
});

export const breakReducer = breakSlice.reducer;
export const breakActions = breakSlice.actions;