import React, { useState, useEffect } from 'react';
import { Grid, Image } from 'semantic-ui-react';
import {activityComponents} from './activitiesEnum'

function Activity (props) {
    const {type} = props.activityTypeData
    return React.createElement(activityComponents[type], props)
}

export default Activity