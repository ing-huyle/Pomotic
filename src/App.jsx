import './styles/App.scss';
import { useEffect, useRef } from 'react';
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
    dispatch(timerActions.setIsRunning(!isRunning))
  };

  const handleClickReset = () => {
    dispatch(breakActions.setBreakLength(5))
    dispatch(sessionActions.setSessionLength(25))
    dispatch(timerActions.setTimer({ minutes: 25, seconds: 0 }));
    dispatch(timerActions.setIsRunning(false));
    clearInterval(intervalRef.current);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  }

  useEffect(() => {
    if (isRunning) {
      if (seconds === '00' && minutes === '00') {
        audioRef.current.play();
      }
      intervalRef.current = setInterval(() => {dispatch(tick(breakLength, sessionLength));}, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, timerLabel, seconds]);

  return (
    <div className='clock'>
      <h1>25 + 5 Clock</h1>
      <div className='setting'>
        <LengthSetting isSession={false} length={breakLength} handleClick={handleClickBreak} />
        <LengthSetting isSession={true} length={sessionLength} handleClick={handleClickSession} />
      </div>
      <Timer timerLabel={timerLabel} minutes={minutes} seconds={seconds} handleClickStartStop={handleClickStartStop} audioRef={audioRef} handleClickReset={handleClickReset} />
    </div>
  )
}

export default App;