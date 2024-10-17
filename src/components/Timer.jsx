import '../styles/Timer.scss';

const Timer = ({ timerLabel, minutes, seconds, handleClickStartStop, audioRef, handleClickReset }) => {
  return (
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
  );
}

export default Timer;