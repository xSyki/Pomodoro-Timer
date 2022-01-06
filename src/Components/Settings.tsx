import React, { useState, FC, ReactElement, useEffect } from 'react';

import classicPomodoro from '../timeManagementTemplates/classicPomodoroTemplate';

import upgradedPomodoro from '../timeManagementTemplates/upgradedPomodoroTemplate';

export interface Props {
    setIsVisibleSeetings: React.Dispatch<React.SetStateAction<boolean>>;
    setTimeManagement: React.Dispatch<React.SetStateAction<TimeStamp["timeStamp"]>>;
    timeManagement: TimeStamp["timeStamp"];
    templateName: string;
    setTemplateName: React.Dispatch<React.SetStateAction<string>>;
}

export interface TimeStamp {
    timeStamp: {
        id: number,
        duration: number,
        type: string
    }[]
}

const Options: FC<Props> = (Props): ReactElement => {

    const [timeManagement, setTimeManagement] = useState<TimeStamp["timeStamp"]>(Props.timeManagement);
    const [template, setTemplate] = useState("own");

    useEffect(() => {
        setTemplate(Props.templateName);
    }
        , [])

    const handleCancel = () => {
        Props.setIsVisibleSeetings(false);
    }

    const handleUpdate = () => {
        if (timeManagement.some(timeStamp => timeStamp.duration < 1)) {
            return;
        }

        Props.setTimeManagement(timeManagement);
        Props.setTemplateName(template);
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

    const renderTimeStamps = () => {
        return timeManagement.map((timeStamp, index) => {
            return (
                <div className='settings__time-stamp'>
                    <h2 className='settings__time-stamp-subtitle'>{index + 1}.</h2>
                    <label>
                        Duration:
                        <input className='settings__input-time' type="number" value={secConvertion(timeStamp.duration, "hours")} onChange={handleDurationInput(timeStamp.id, "hours")} />
                        :
                        <input className='settings__input-time' type="number" value={secConvertion(timeStamp.duration, "minutes")} onChange={handleDurationInput(timeStamp.id, "minutes")} />
                        :
                        <input className='settings__input-time' type="number" value={secConvertion(timeStamp.duration, "seconds")} onChange={handleDurationInput(timeStamp.id, "seconds")} />
                    </label>
                    <label>
                        Type:
                        <select className='settings__input' value={timeStamp.type} onChange={handleTypeInput(timeStamp.id)}>
                            <option className='settings__input' value="work">Work</option>
                            <option className='settings__input' value="break">Break</option>
                        </select>
                    </label>
                    <button className='settings__delete-button' onClick={() => deleteTimeStamp(timeStamp.id)}><i className="fas fa-minus"></i></button>
                </div>
            )
        })
    }

    const addNewTimeStamp = () => {
        setTimeManagement([...timeManagement,
        {
            id: timeManagement.length,
            duration: 0,
            type: timeManagement[timeManagement.length - 1].type === "work" ? "break" : "work"
        }])
    }

    const deleteTimeStamp = (id: number) => {
        if (timeManagement.length === 1) return;

        timeManagement.splice(id, 1);

        timeManagement.forEach((timeStamp, index: number) => {
            timeStamp.id = index;
        });

        setTimeManagement([...timeManagement]);
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
                    {renderTimeStamps()}
                    {timeManagement.length === 10 ? null : <button className='settings__add-button' onClick={addNewTimeStamp}><i className="fas fa-plus"></i></button>}
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