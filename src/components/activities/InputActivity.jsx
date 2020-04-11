import React, { useState, useEffect , useCallback} from 'react';
import {  Input } from 'semantic-ui-react';

const getActivityObject = ({activityId, userId}, value)=>{
    return {
        activityId,
        userId,
        value,
        createdAt: Date.now()
    }
}

const getIfAnswerIsCorrect = ({correctAnswer},activityObject)=>{
    return correctAnswer==activityObject.value
}

function InputActivity (props) {
    const {updateFunction, activityEvents, correctAnswer, userControlled, userId, activityId} = props
    let handleUpdate = userControlled?updateFunction:()=>{}
    // const latestObject = activityEvents && activityEvents.length>0? activityEvents[activityEvents.length-1]:{}
    const [input, changeInput] = useState('')
    const handleUserKeyPress = useCallback(event => {
        const { key, keyCode } = event;    
        if (keyCode === 13) {
            handleUpdate(getActivityObject(props,input ))
            changeInput('')
        }
    }, [input]);

    useEffect(() => {
        window.addEventListener('keydown', handleUserKeyPress);

        return () => {
            window.removeEventListener('keydown', handleUserKeyPress);
        };
    }, [handleUserKeyPress]);

      
    const correct = false //latestObject? getIfAnswerIsCorrect(props,latestObject): null
    return (<>
                <Input onChange={(e, {value})=>changeInput(value)} value={input} disabled={!userControlled}>
                </Input>
                <div>{activityEvents? activityEvents.map(a=>a.value).join(', '):null}</div>
            </>)
}

export default InputActivity