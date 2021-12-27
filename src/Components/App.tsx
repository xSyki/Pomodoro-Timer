import React, { useState } from 'react';

import './css/index.css';

function App() {
  const [goal, useGoal] = useState("");

  return (
    <>
      <div className='app'>
        <div className='settings'>
          <i className="fas fa-cog"></i>
        </div>
        <div className="pomodoro-timer">
          <div className='timer pomodoro-timer__timer'>
            <div className='timer__clock'>
              <p className='timer__time'>50:00</p>
            </div>
          </div>
          <div className='pomodoro-timer__buttons'>
            {true ?
              <button className='button pomodoro-timer__button'><i className="fas fa-play"></i></button>
              :
              <button className='button pomodoro-timer_button'><i className="fas fa-pause"></i></button>
            }

            {true ?
              <button className='button pomodoro-timer_button'><i className="fas fa-sync-alt"></i></button>
              :
              <button className='button button pomodoro-timer_button'><i className="fas fa-forward"></i></button>
            }
          </div>

          <div className='pomodoro-timer__goal'>
            <i className="pomodoro-timer__goal-icon fas fa-flag"></i>
            <button className='pomodoro-timer__goal-button'>
              {goal ? goal : "Your goal"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;