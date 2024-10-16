import { configureStore } from '@reduxjs/toolkit';
import { breakReducer } from './breakSlice';
import { sessionReducer } from './sessionSlice';
import { timerReducer } from './timerSlice';

const store = configureStore({
  reducer: {
    break: breakReducer,
    session: sessionReducer,
    timer: timerReducer
  }
});

export default store;