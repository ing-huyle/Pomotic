import './styles/App.scss';
import { useState, useEffect, useRef } from 'react';

const initialState = {
  breakLength: 5,
  sessionLength: 25,
  minutes: 25,
  seconds: 0,
  timerLabel: 'Session'
}

const formatNumber = (number) => number > -1 && number < 10 ? '0' + number : number.toString();

const App = () => {
  const [breakLength, setBreakLength] = useState(initialState.breakLength);
  const [sessionLength, setSessionLength] = useState(initialState.sessionLength);
  const [timer, setTimer] = useState({
    minutes: formatNumber(initialState.minutes),
    seconds: formatNumber(initialState.seconds)
  });
  const [timerLabel, setTimerLabel] = useState(initialState.timerLabel);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  const adjustLength = (setLength, increment, isSession) => {
    if (!isRunning) {
      setLength((prev) => {
        const newLength = prev + increment;

        if (newLength >= 1 && newLength <= 60) {
          if ((!isSession && timerLabel === 'Break') || (isSession && timerLabel === 'Session')) {
            setTimer(({ minutes: formatNumber(newLength), seconds: '00' }));  
          }
          return newLength;
        }

        return prev;
      });
    }
  }

  const handleClickBreakDecrement = () => adjustLength(setBreakLength, -1, false);
  const handleClickBreakIncrement = () => adjustLength(setBreakLength, 1, false);
  const handleClickSessionDecrement = () => adjustLength(setSessionLength, -1, true);
  const handleClickSessionIncrement = () => adjustLength(setSessionLength, 1, true);

  const handleClickStartStop = () => setIsRunning((prev) => !prev);

  const handleClickReset = () => {
    setBreakLength(initialState.breakLength);
    setSessionLength(initialState.sessionLength);
    setTimer({
      minutes: formatNumber(initialState.minutes),
      seconds: formatNumber(initialState.seconds)
    });
    setIsRunning(false)
    clearInterval(intervalRef.current);
    console.log(audioRef);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  }

  const tick = () => {
    setTimer((prev) => {
      const { minutes, seconds } = prev;

      if (seconds === '00' && minutes === '00') {
        audioRef.current.play();
        setTimerLabel((prev) => prev === 'Session' ? 'Break' : 'Session');
        return {
          minutes: formatNumber(timerLabel === 'Session' ? breakLength : sessionLength),
          seconds: '00'
        };
      } else if (seconds === '00') {
        return { minutes: formatNumber(minutes - 1), seconds: 59 };
      } else {
        return { ...prev, seconds: formatNumber(seconds - 1) };
      }
    });
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(tick, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, timerLabel]);

  return (
    <div className='clock'>
      <h1>25 + 5 Clock</h1>
      <div className='setting'>
        <div className='setting-part'>
          <div id='break-label'>Break Length</div>
          <div className='set-length'>
            <div id='break-decrement' className='decrement hover' onClick={handleClickBreakDecrement}></div>
            <div id='break-length'>{breakLength}</div>
            <div id='break-increment' className='increment hover' onClick={handleClickBreakIncrement}></div>
          </div>
        </div>
        <div className='setting-part'>
          <div id='session-label'>Session Length</div>
          <div className='set-length'>
            <div id='session-decrement' className='decrement hover' onClick={handleClickSessionDecrement}></div>
            <div id='session-length'>{sessionLength}</div>
            <div id='session-increment' className='increment hover' onClick={handleClickSessionIncrement}></div>
          </div>
        </div>
      </div>
      <div className='timer-wrapper'>
        <div className='timer'>
          <div id='timer-label'>{timerLabel}</div>
          <div id='time-left'>{timer.minutes}:{timer.seconds}</div>
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