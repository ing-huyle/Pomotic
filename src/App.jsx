import './styles/App.scss';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { breakActions } from './redux-toolkit/breakSlice';
import { sessionActions } from './redux-toolkit/sessionSlice';
import { timerActions, tick } from './redux-toolkit/timerSlice';

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
        <div className='setting-part'>
          <div id='break-label'>Break Length</div>
          <div className='set-length'>
            <div id='break-decrement' className='decrement hover' onClick={handleClickBreak}></div>
            <div id='break-length'>{breakLength}</div>
            <div id='break-increment' className='increment hover' onClick={handleClickBreak}></div>
          </div>
        </div>
        <div className='setting-part'>
          <div id='session-label'>Session Length</div>
          <div className='set-length'>
            <div id='session-decrement' className='decrement hover' onClick={handleClickSession}></div>
            <div id='session-length'>{sessionLength}</div>
            <div id='session-increment' className='increment hover' onClick={handleClickSession}></div>
          </div>
        </div>
      </div>
      <div className='timer-wrapper'>
        <div className='timer'>
          <div id='timer-label'>{timerLabel}</div>
          <div id='time-left'>{minutes}:{seconds}</div>
        </div>
        <div className='timer-controls'>
          <div id='start_stop' className='hover' onClick={handleClickStartStop}>
            <audio id='beep' src='./src/alarm-beep.wav' ref={audioRef} autoPlay></audio>
          </div>
          <div id='reset' className='hover' onClick={handleClickReset}></div>
        </div>
      </div>
    </div>
  )
}

export default App;