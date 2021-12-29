import { time } from 'console';
import React, { useState, FC, ReactElement } from 'react';

export interface Props {
    setIsVisibleSeetings: Function;
    setTimeManagement: Function;
    timeManagement: any;
}

export interface TimeStamp {
    id: number,
    duration: number,
    type: "work" | "break"
}

const Options: FC<Props> = (Props): ReactElement => {

    const [timeManagement, setTimeManagement] = useState(Props.timeManagement);

    const handleUpdate = () => {
        Props.setTimeManagement(timeManagement);
        Props.setIsVisibleSeetings(false);
    }

    const handleTimeStampsInput = (id: number, type: string) => (event: React.FormEvent<HTMLInputElement>) => {
        const copyTimeManagement = timeManagement;
        console.log(copyTimeManagement[id].type);
        copyTimeManagement[id].type = event.currentTarget.value;

        setTimeManagement(copyTimeManagement);
    }

    return (
        <div className='settings__bg'>
            <div className='settings'>
                <div className='settings__time-management'>
                    {timeManagement.map((timeStamp: TimeStamp, index: number) => {
                        return (
                            <div className='settings__time-stamp'>
                                <h2 className='settings__time-stamp-subtitle'>{timeStamp.id + 1}.</h2>
                                <input className='settings__input' type="number" value={timeStamp.duration} onChange={() => handleTimeStampsInput(timeStamp.id, "duration")} />
                                <input className='settings__input' type="text" value={timeStamp.type} onChange={() => handleTimeStampsInput(timeStamp.id, "type")} />
                            </div>
                        )
                    })}
                </div>
                <div className='settings__buttons'>
                    <button className='settings__button' onClick={() => Props.setIsVisibleSeetings(false)}>Cancle</button>
                    <button className='settings__button' onClick={handleUpdate}>Update</button>
                </div>
            </div>
        </div>
    );
}

export default Options;