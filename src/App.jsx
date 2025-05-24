import './styles/App.scss';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { breakActions } from './redux-toolkit/breakSlice';
import { sessionActions } from './redux-toolkit/sessionSlice';
import { timerActions, tick } from './redux-toolkit/timerSlice';
import LengthSetting from './components/LengthSetting';
import Timer from './components/Timer';

const App = () => {
  const intervalRef = useRef(null);
  const audioRef = useRef(null);
  const breakLength = useSelector((state) => state.break.breakLength);
  const sessionLength = useSelector((state) => state.session.sessionLength);
  const { minutes, seconds, timerLabel, isRunning } = useSelector((state) => state.timer);
  const dispatch = useDispatch();

  const handleClickBreak = (event) => {
    let increment;
    if (event.target.id === 'break-decrement') {
      dispatch(breakActions.decrementBreakLength())
      increment = -1;
    } else {
      dispatch(breakActions.incrementBreakLength());
      increment = +1;
    }

    if (timerLabel === 'Break') {
      dispatch(timerActions.setTimer({ minutes: Math.min(Math.max(breakLength + increment, 1), 60), seconds: 0 }));
    }
  }

  const handleClickSession = (event) => {
    let increment;
    if (event.target.id === 'session-decrement') {
      dispatch(sessionActions.decrementSessionLength())
      increment = -1;
    } else {
      dispatch(sessionActions.incrementSessionLength());
      increment = +1;
    }

    if (timerLabel === 'Session') {
      dispatch(timerActions.setTimer({ minutes: Math.min(Math.max(sessionLength + increment, 1), 60), seconds: 0 }));
    }
  }

  const handleClickStartStop = () => {
    const newIsRunning = !isRunning;
    dispatch(timerActions.setIsRunning(newIsRunning))
    
    if (intervalRef) {
      clearInterval(intervalRef.current);
    }

    if (newIsRunning) {
      intervalRef.current = setInterval(() => {dispatch(tick(breakLength, sessionLength, audioRef));}, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
  };

  const handleClickReset = () => {
    dispatch(breakActions.setBreakLength(4))
    dispatch(sessionActions.setSessionLength(20))
    dispatch(timerActions.setTimerLabel('Session'));
    dispatch(timerActions.setTimer({ minutes: 20, seconds: 0 }));
    dispatch(timerActions.setIsRunning(false));
    clearInterval(intervalRef.current);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  }

  return (
    <div className='clock'>
      <h1>Pomodoro</h1>
      <div className='setting'>
        <LengthSetting isSession={false} length={breakLength} handleClick={handleClickBreak} />
        <LengthSetting isSession={true} length={sessionLength} handleClick={handleClickSession} />
      </div>
      <Timer timerLabel={timerLabel} minutes={minutes} seconds={seconds} handleClickStartStop={handleClickStartStop} audioRef={audioRef} handleClickReset={handleClickReset} />
      <p>Coded by <a href='https://www.linkedin.com/in/ing-huyle' target='_blank'>ing<span>.</span>huyle</a></p>
    </div>
  )
}

export default App;