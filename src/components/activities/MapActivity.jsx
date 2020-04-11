import React, { useState, useEffect } from 'react';
import InteractiveMap, {Marker, MapController} from 'react-map-gl';
import useDimensions from "react-use-dimensions";

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

const defaultViewport=()=>{
    return {
        bearing: -44.4105,
        latitude: 41.3870154,
        longitude: 2.1700471,
        zoom: 12
    }
}

function MapActivity (props) {
    const {updateFunction, activityEvents, correctAnswer, userControlled, userId, activityId} = props
    const latestObject = activityEvents && activityEvents.length>0? activityEvents[activityEvents.length-1]:{}
    const [ref, { x, y, width, height }] = useDimensions();
    const viewport = latestObject.value?{ width:width, height:height,...latestObject.value }: { width:width, height:height,...defaultViewport()}
    if (latestObject.value){
        console.log('recieved something')
    }
    const handleUpdate = (objV)=>{
        if (userControlled){
            updateFunction(objV)
        }
    }
    
    return (<>
            <div ref={ref} style={{width:'100%', height:props.heightActivity}}>
            {width&&height?<InteractiveMap
                // onClick={(e)=>{
                //     saveMarker([...markers, {longitude:e.lngLat[0], latitude:e.lngLat[1], from: 8, value: 8 }])
                // }}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                // mapStyle={'mapbox://styles/bernatesquirol/ck82o72do39201iod1pno8huk'}
                {...viewport}
                onViewportChange={({bearing, latitude, longitude, zoom})=>{handleUpdate(getActivityObject(props, {bearing, latitude, longitude, zoom}))}}
                >
                </InteractiveMap>
                :null}
            </div>
            </>)
}

export default MapActivity