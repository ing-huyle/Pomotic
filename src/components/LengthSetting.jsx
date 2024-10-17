import '../styles/LengthSetting.scss';

const LengthSetting = ({ isSession, length, handleClick }) => {
  return (
    <div className='setting-part'>
      <div id={isSession ? 'session-label' : 'break-label'}>{isSession ? 'Session' : 'Break'} Length</div>
      <div className='set-length'>
        <div id={isSession ? 'session-decrement' : 'break-decrement'} className='decrement hover' onClick={handleClick}></div>
        <div id={isSession ? 'session-length' : 'break-length'}>{length}</div>
        <div id={isSession ? 'session-increment' : 'break-increment'} className='increment hover' onClick={handleClick}></div>
      </div>
    </div>
  );
}

export default LengthSetting;