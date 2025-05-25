import './styles/App.scss';
import { MouseEventHandler, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { breakActions } from './redux-toolkit/breakSlice';
import { sessionActions } from './redux-toolkit/sessionSlice';
import { timerActions, tick } from './redux-toolkit/timerSlice';
import LengthSetting from './components/LengthSetting';
import Timer from './components/Timer';
import { AppDispatch, RootState } from './types';

const App = () => {
  const intervalRef = useRef(0);
  const breakLength = useSelector((state: RootState) => state.break.breakLength);
  const sessionLength = useSelector((state: RootState) => state.session.sessionLength);
  const { minutes, seconds, timerLabel, isRunning } = useSelector((state: RootState) => state.timer);
  const dispatch = useDispatch<AppDispatch>();

  const handleClickBreak: MouseEventHandler<HTMLDivElement> = (event): void => {
    let increment;
    if ((event.target as HTMLElement).id === 'break-decrement') {
      dispatch(breakActions.decrementBreakLength())
      increment = -1;
    } else {
      dispatch(breakActions.incrementBreakLength());
      increment = +1;
    }

    if (timerLabel === 'Break') dispatch(timerActions.setTimer({
      minutes: Math.min(Math.max(breakLength + increment, 1), 60),
      seconds: 0
    }));
  }

  const handleClickSession: MouseEventHandler<HTMLDivElement> = (event): void => {
    let increment;
    if ((event.target as HTMLElement).id === 'session-decrement') {
      dispatch(sessionActions.decrementSessionLength())
      increment = -1;
    } else {
      dispatch(sessionActions.incrementSessionLength());
      increment = +1;
    }

    if (timerLabel === 'Session') dispatch(timerActions.setTimer({
      minutes: Math.min(Math.max(sessionLength + increment, 1), 60),
      seconds: 0
    }));
  }

  const handleClickStartStop = (): void => {
    const newIsRunning = !isRunning;
    dispatch(timerActions.setIsRunning(newIsRunning))
    
    if (intervalRef) clearInterval(intervalRef.current);

    newIsRunning
    ? intervalRef.current = setInterval(() => dispatch(tick(breakLength, sessionLength)), 1000)
    : clearInterval(intervalRef.current);
  };

  const handleClickReset = (): void => {
    dispatch(breakActions.setBreakLength(4))
    dispatch(sessionActions.setSessionLength(20))
    dispatch(timerActions.setTimerLabel('Session'));
    dispatch(timerActions.setTimer({ minutes: 20, seconds: 0 }));
    dispatch(timerActions.setIsRunning(false));
    clearInterval(intervalRef.current);
  }

  return (
    <div className='clock'>
      <h1>Pomotic</h1>
      <div className='setting'>
        <LengthSetting isSession={false} length={breakLength} handleClick={handleClickBreak} />
        <LengthSetting isSession={true} length={sessionLength} handleClick={handleClickSession} />
      </div>
      <Timer
        timerLabel={timerLabel}
        minutes={minutes}
        seconds={seconds}
        handleClickStartStop={handleClickStartStop}
        handleClickReset={handleClickReset}
      />
      <p>Coded by <a href='https://www.linkedin.com/in/ing-huyle' target='_blank'>ing<span>.</span>huyle</a></p>
    </div>
  )
}

export default App;