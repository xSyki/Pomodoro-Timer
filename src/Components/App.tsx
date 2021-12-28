import React, { useState, FC, ReactElement } from 'react';

import './css/index.css';
import Goal from './Goal/Goal';

const App: FC = (): ReactElement => {
  const [goal, useGoal] = useState("");
  const [isVisibleGoal, useIsVisibleGoal] = useState(false);

  return (
    <>
      <div className='app'>
        <div className='button settings__button-open'>
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
              <button className='button pomodoro-timer__button'>
                <i className="fas fa-play"></i>
              </button>
              :
              <button className='button pomodoro-timer_button'>
                <i className="fas fa-pause"></i>
              </button>
            }

            {true ?
              <button className='button pomodoro-timer_button'>
                <i className="fas fa-sync-alt"></i>
              </button>
              :
              <button className='button button pomodoro-timer_button'>
                <i className="fas fa-forward"></i>
              </button>
            }
          </div>

          <div className='pomodoro-timer__goal'>
            <i className="pomodoro-timer__goal-icon fas fa-flag"></i>
            <button className='pomodoro-timer__goal-button' onClick={() => useIsVisibleGoal(true)}>
              {goal ? goal : "Your goal"}
            </button>
          </div>
        </div>
        {isVisibleGoal && <Goal useIsVisibleGoal={useIsVisibleGoal} useGoal={useGoal} goal={goal} />}
      </div>
    </>
  );
}

export default App;
