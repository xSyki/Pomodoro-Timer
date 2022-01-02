import React, { useState, FC, ReactElement } from 'react';

const upgradedPomodoro = [
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

const classicPomodoro = [
    {
        id: 0,
        duration: 1500,
        type: "work"
    },
    {
        id: 1,
        duration: 300,
        type: "break"
    },
    {
        id: 2,
        duration: 1500,
        type: "work"
    },
    {
        id: 3,
        duration: 300,
        type: "break"
    },
    {
        id: 4,
        duration: 1500,
        type: "work"
    },
    {
        id: 5,
        duration: 300,
        type: "break"
    },
    {
        id: 6,
        duration: 1500,
        type: "work"
    },
    {
        id: 3,
        duration: 900,
        type: "break"
    }
]

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
    const [template, setTemplate] = useState("own");

    const handleCancel = () => {
        Props.setIsVisibleSeetings(false);
    }

    const handleUpdate = () => {
        Props.setTimeManagement(timeManagement);
        Props.setIsVisibleSeetings(false);
    }

    const handleTemplateInput = (event: React.FormEvent<HTMLSelectElement>) => {
        setTemplate(event.currentTarget.value);

        if (event.currentTarget.value === "upgradedPomodoro") {
            setTimeManagement(upgradedPomodoro);
        } else if (event.currentTarget.value === "classicPomodoro") {
            setTimeManagement(classicPomodoro);
        }
    }

    const handleDurationInput = (id: number, type: string) => (event: React.FormEvent<HTMLInputElement>) => {
        setTemplate("own");
        const copyTimeManagement = JSON.parse(JSON.stringify(timeManagement));

        const currentValue = parseInt(event.currentTarget.value);

        if (type === "hours") {
            const hours = Math.floor(copyTimeManagement[id].duration / (60 * 60));
            const seconds = copyTimeManagement[id].duration - (hours * 60 * 60) + (currentValue * 60 * 60);

            copyTimeManagement[id].duration = seconds;
        } else if (type === "minutes") {
            const divisor_for_minutes = copyTimeManagement[id].duration % (60 * 60);
            const minutes = Math.floor(divisor_for_minutes / 60);
            const seconds = copyTimeManagement[id].duration - (minutes * 60) + (currentValue * 60);

            copyTimeManagement[id].duration = seconds;
        } else if (type === "seconds") {
            const divisor_for_seconds = copyTimeManagement[id].duration % 60;
            const prevSeconds = Math.ceil(divisor_for_seconds);
            const seconds = copyTimeManagement[id].duration - prevSeconds + currentValue;

            copyTimeManagement[id].duration = seconds;
        }

        setTimeManagement(copyTimeManagement);
    }

    const handleTypeInput = (id: number) => (event: React.FormEvent<HTMLSelectElement>) => {
        const copyTimeManagement = JSON.parse(JSON.stringify(timeManagement));

        copyTimeManagement[id].type = event.currentTarget.value;

        setTimeManagement(copyTimeManagement);
    }

    const secConvertion = (duration: number, type: string) => {
        if (type === "hours") {
            const hours = Math.floor(duration / (60 * 60));
            return hours;
        } else if (type === "minutes") {
            const divisor_for_minutes = duration % (60 * 60);
            const minutes = Math.floor(divisor_for_minutes / 60);
            return minutes;
        } else if (type === "seconds") {
            const divisor_for_seconds = duration % 60;
            const seconds = Math.ceil(divisor_for_seconds);
            return seconds;
        }
    }

    return (
        <div className='settings__bg'>
            <div className='settings'>
                <div className='settings__templates'>
                    <label>
                        Template:
                        <select className='settings__input' value={template} onChange={handleTemplateInput}>
                            <option className='settings__input' value="upgradedPomodoro">50/10/50/30</option>
                            <option className='settings__input' value="classicPomodoro">Classic Pomodoro</option>
                            <option className='settings__input' value="own">Own</option>
                        </select>
                    </label>
                </div>
                <div className='settings__time-management'>
                    {timeManagement.map((timeStamp: TimeStamp) => {
                        return (
                            <div className='settings__time-stamp'>
                                <h2 className='settings__time-stamp-subtitle'>{timeStamp.id + 1}.</h2>
                                <label>
                                    Duration:
                                    <input className='settings__input-time' type="number" value={secConvertion(timeStamp.duration, "hours")} onChange={handleDurationInput(timeStamp.id, "hours")} />
                                    :
                                    <input className='settings__input-time' type="number" value={secConvertion(timeStamp.duration, "minutes")} onChange={handleDurationInput(timeStamp.id, "minutes")} />
                                    :
                                    <input className='settings__input-time' type="number" value={secConvertion(timeStamp.duration, "seconds")} onChange={handleDurationInput(timeStamp.id, "seconds")} />
                                </label>
                                {/* Typ: <input className='settings__input' type="text" value={timeStamp.type} onChange={handleTimeStampsInput(timeStamp.id, "type")} /> */}
                                <label>
                                    Type:
                                    <select className='settings__input' value={timeStamp.type} onChange={handleTypeInput(timeStamp.id)}>
                                        <option className='settings__input' value="work">Work</option>
                                        <option className='settings__input' value="break">Break</option>
                                    </select>
                                </label>
                            </div>
                        )
                    })}
                </div>
                <div className='settings__buttons'>
                    <button className='settings__button' onClick={handleCancel}>Cancle</button>
                    <button className='settings__button' onClick={handleUpdate}>Update</button>
                </div>
            </div>
        </div>
    );
}

export default Options;