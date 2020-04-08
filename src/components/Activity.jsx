import React, { useState, useEffect } from 'react';
import { Grid, Image } from 'semantic-ui-react';
import InputActivity from './activities/InputActivity'
function Activity (props) {
    const {renderItem} = props.activityTypeData
    if (renderItem=='input'){
        return <InputActivity {...props}></InputActivity>
    }
    return <div>Nose quina activity vols</div>
}

export default Activity