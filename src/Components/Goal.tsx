import React, { useState, FC, ReactElement, useEffect } from 'react';

export interface Props {
    setIsVisibleGoal: Function;
    setGoal: Function;
    goal: string;
}

const Goal: FC<Props> = (Props): ReactElement => {
    const [goal, setGoal] = useState("");

    useEffect(() => {
        setGoal(Props.goal);
    }, [])

    const useHandleGoal = (e: React.FormEvent<HTMLInputElement>) => {
        setGoal(e.currentTarget.value);
    }

    const useHandleUpdate = () => {
        Props.setGoal(goal);
        Props.setIsVisibleGoal(false);
    }

    return (
        <div className='goal__bg'>
            <div className='goal'>
                <input className='goal__input' type="text" value={goal} onChange={useHandleGoal} />
                <div className='goal__buttons'>
                    <button className='goal__button' onClick={() => Props.setIsVisibleGoal(false)}>Cancel</button>
                    <button className='goal__button' onClick={useHandleUpdate}>Update</button>
                </div>
            </div>
        </div>
    );
}

export default Goal;