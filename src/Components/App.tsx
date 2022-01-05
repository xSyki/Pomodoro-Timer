import React, { useState, FC, ReactElement, useEffect } from 'react';
import useSound from 'use-sound';

import './css/index.css';
import Goal from './Goal';
import Settings from './Settings';

const bellAlert = require('../sounds/Clear-Long-Bell-01.wav');

export interface TimeStamp {
  id: number,
  duration: number,
  type: "work" | "break"
}

const timeManagementDefault = [
  {
    id: 0,
    duration: 3000,
    type: "work"
  },
  {
    id: 1,
    duration: 600,
    type: "break"
  },
  {
    id: 2,
    duration: 3000,
    type: "work"
  },
  {
    id: 3,
    duration: 1800,
    type: "break"
  }
]

const App: FC = (): ReactElement => {

  const [isStarted, setIsStarted] = useState(false);

  const [timeManagement, setTimeManagement] = useState(timeManagementDefault);
  const [actualTimeManagementId, setActualTimeManagementId] = useState(0);

  const [intervalId, setIntervalId] = useState(setInterval(() => { }, 0));
  const [actualTimerTime, setActualTimerTime] = useState(timeManagement[0].duration);
  const [actualTimeLeft, setActualTimeLeft] = useState(actualTimerTime);

  const [goal, setGoal] = useState("");
  const [isVisibleGoal, setIsVisibleGoal] = useState(false);

  const [isVisibleSettings, setIsVisibleSettings] = useState(false);
  const [templateName, setTemplateName] = useState("50/10/50/30");

  const [playBellAlert] = useSound(bellAlert);

  const startTimer = () => {
    setIsStarted(true);

    const timerInterval = setInterval(() => {
      setActualTimeLeft(prevValue => prevValue - 1)
    }, 1000)
    setIntervalId(timerInterval);
  }

  function secondsToTime(secs: number) {
    const hours = Math.floor(secs / (60 * 60));
    const hoursReturn = hours > 0 ? hours + ":" : "";

    const divisor_for_minutes = secs % (60 * 60);
    const minutes = Math.floor(divisor_for_minutes / 60);
    const minutesReturn = minutes < 10 ? "0" + minutes : minutes;

    const divisor_for_seconds = divisor_for_minutes % 60;
    const seconds = Math.ceil(divisor_for_seconds);
    const secondsReturn = seconds < 10 ? "0" + seconds : seconds;

    return hoursReturn + minutesReturn + ":" + secondsReturn;
  }

  useEffect(() => {
    if (actualTimeLeft <= 0) {
      playBellAlert();
      const newTimeManagementId = actualTimeManagementId === timeManagement.length - 1 ? 0 : actualTimeManagementId + 1;
      setActualTimerTime(timeManagement[newTimeManagementId].duration);
      setActualTimeLeft(timeManagement[newTimeManagementId].duration);
      setActualTimeManagementId(newTimeManagementId);
    }
  }, [actualTimeLeft])

  useEffect(() => {
    if (actualTimerTime != timeManagement[actualTimeManagementId].duration) {
      setActualTimerTime(timeManagement[actualTimeManagementId].duration);
      setActualTimeLeft(timeManagement[actualTimeManagementId].duration);
    }
  }, [isVisibleSettings]);

  const restartTimer = () => {
    setIsStarted(false);
    setActualTimeLeft(actualTimerTime);
    clearInterval(intervalId);
  }

  const pauseTimer = () => {
    setIsStarted(false);
    clearInterval(intervalId);
  }

  const skipTimer = () => {
    const newTimeManagementId = actualTimeManagementId === timeManagement.length - 1 ? 0 : actualTimeManagementId + 1;
    setActualTimerTime(timeManagement[newTimeManagementId].duration);
    setActualTimeLeft(timeManagement[newTimeManagementId].duration);
    setActualTimeManagementId(newTimeManagementId);
  }

  return (
    <>
      <div className='app'>
        <button className='button settings__button-open' onClick={() => setIsVisibleSettings(true)}>
          <i className="fas fa-cog"></i>
        </button>
        <div className="pomodoro-timer">
          <div className='timer pomodoro-timer__timer'>
            <div className='timer__clock'>
              <p className='timer__time'>{secondsToTime(actualTimeLeft)}</p>
            </div>
          </div>
          <div className='pomodoro-timer__buttons'>
            {isStarted ?
              <button className='button pomodoro-timer_button' onClick={pauseTimer}>
                <i className="fas fa-pause"></i>
              </button>
              :
              <button className='button pomodoro-timer__button' onClick={startTimer}>
                <i className="fas fa-play"></i>
              </button>
            }

            {isStarted ?
              <button className='button pomodoro-timer_button' onClick={restartTimer}>
                <i className="fas fa-sync-alt"></i>
              </button>
              :
              <button className='button button pomodoro-timer_button' onClick={skipTimer}>
                <i className="fas fa-forward"></i>
              </button>
            }
          </div>

          <div className='pomodoro-timer__goal'>
            <i className="pomodoro-timer__goal-icon fas fa-flag"></i>
            <button className='pomodoro-timer__goal-button' onClick={() => setIsVisibleGoal(true)}>
              {goal ? goal : "Your goal"}
            </button>
          </div>
        </div>
        {isVisibleGoal &&
          <Goal
            setIsVisibleGoal={setIsVisibleGoal}
            setGoal={setGoal}
            goal={goal} />
        }
        {isVisibleSettings &&
          <Settings
            setIsVisibleSeetings={setIsVisibleSettings}
            setTimeManagement={setTimeManagement}
            timeManagement={timeManagement}
            templateName={templateName}
            setTemplateName={setTemplateName}
          />
        }
      </div>
    </>
  );
}

export default App;
