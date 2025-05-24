import '../styles/Timer.scss';
import { TimerType } from '../types';

const Timer = ({ timerLabel, minutes, seconds, handleClickStartStop, handleClickReset }: TimerType) => {
  return (
    <div className='timer-wrapper'>
      <div className='timer'>
        <div id='timer-label'>{timerLabel}</div>
        <div id='time-left'>{minutes}:{seconds}</div>
      </div>
      <div className='timer-controls'>
        <div id='start_stop' className='hover' onClick={handleClickStartStop}></div>
        <div id='reset' className='hover' onClick={handleClickReset}></div>
      </div>
    </div>
  );
}

export default Timer;