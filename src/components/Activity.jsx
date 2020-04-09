import React, { useState, useEffect } from 'react';
import { Grid, Image } from 'semantic-ui-react';
import {activityComponents} from './activitiesEnum'

function Activity (props) {
    const {renderItem} = props.activityTypeData
    return React.createElement(activityComponents[renderItem], props)
}

export default Activity