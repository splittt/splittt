import React, { useState, useEffect } from 'react';
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
    const latestObject = activityEvents && activityEvents.length>0? activityEvents[activityEvents.length-1]:{}
    const correct = latestObject? getIfAnswerIsCorrect(props,latestObject): null
    return (<>
                <Input onChange={(e, {value})=>handleUpdate(getActivityObject(props, value))} value={latestObject.value} disabled={correct||!userControlled}>
                </Input>
                <div>{correct?`Molt bé!, la resposta correcta era ${correctAnswer}`:null}</div>
            </>)
}

export default InputActivity