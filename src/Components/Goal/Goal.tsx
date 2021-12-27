import React, { useState, FC, ReactElement } from 'react';



const Goal: FC = (useToggleIsGoal): ReactElement => {
    const [goal, useGoal] = useState("");

    const useHandleGoal = (e: React.FormEvent<HTMLInputElement>) => {
        console.log("test");
        useGoal(e.currentTarget.value);
    }

    return (
        <div className='goal__bg'>
            <div className='goal'>
                <input className='goal__input' type="text" value={goal} onChange={useHandleGoal} />
                <div className='goal__buttons'>
                    <button className='goal__button'>Cancel</button>
                    <button className='goal__button'>Update</button>
                </div>
            </div>
        </div>
    );
}

export default Goal;