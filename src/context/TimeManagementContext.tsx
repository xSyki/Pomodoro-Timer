import React, { createContext, useState } from "react";

import upgradedPomodoro from '../timeManagementTemplates/upgradedPomodoroTemplate';

export interface ITimeManagement {
    id: number,
    duration: number,
    type: string
}

const defaultState = {
    timeManagement: upgradedPomodoro
}

export const TimeManagementContext = createContext(null);

export interface timeManagementProviderProps {
    children: React.ReactChild | React.ReactChildren;
}

const TimeManagementProvider = ({ children }: timeManagementProviderProps) => {
    const [timeManagement, setTimeManagement] = useState<ITimeManagement[]>(upgradedPomodoro);

    const addNewTimeStamp = (timeStamp: ITimeManagement[]) => {
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

    const updateTimeManagement = (timeStamp: ITimeManagement) => {
        timeManagement.filter((updatedTimeStamp: ITimeManagement) => {
            if (updatedTimeStamp.id === timeStamp.id) {
                updatedTimeStamp.duration = timeStamp.duration;
                updatedTimeStamp.type = timeStamp.type;
                setTimeManagement([...timeManagement])
            }
        })
    }

    return (
        { children }
    );
};

export default TimeManagementProvider;