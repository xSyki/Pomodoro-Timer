import React, { useState, FC, ReactElement, useEffect } from 'react';

export interface Props {
    useIsVisibleGoal: Function;
    useGoal: Function;
    goal: string;
}

const Goal: FC<Props> = (Props): ReactElement => {
    const [goal, useGoal] = useState("");

    useEffect(() => {
        useGoal(Props.goal);
    }, [])

    const useHandleGoal = (e: React.FormEvent<HTMLInputElement>) => {
        useGoal(e.currentTarget.value);
    }

    const handleUpdate = () => {
        Props.useGoal(goal);
        Props.useIsVisibleGoal(false);
    }

    return (
        <div className='goal__bg'>
            <div className='goal'>
                <input className='goal__input' type="text" value={goal} onChange={useHandleGoal} />
                <div className='goal__buttons'>
                    <button className='goal__button' onClick={() => Props.useIsVisibleGoal(false)}>Cancel</button>
                    <button className='goal__button' onClick={handleUpdate}>Update</button>
                </div>
            </div>
        </div>
    );
}

export default Goal;