import React, {useState, useRef, useEffect} from 'react';
import CanvasDraw from "react-canvas-draw";
import useDimensions from "react-use-dimensions";


const getActivityObject = ({activityId, userId}, value)=>{
    return {
        activityId,
        userId,
        value,
        createdAt: Date.now()
    }
}


function drawLine(ctx, lastLocation,  location) {
    ctx.beginPath();
    ctx.moveTo(lastLocation.x, lastLocation.y);
    ctx.lineTo(location.x, location.y);
    ctx.stroke();
}

function CanvasActivity(props){
    const {updateFunction, activityEvents, userControlled, userId, activityId} = props
    const [numLines, changeNumLines] = useState(0)
    const canvasRef = useRef(null)
    let handleUpdate = userControlled?updateFunction:()=>{}
    const changeCanvas = (canvas)=>{
        if(canvas.lines.length!=numLines){
            changeNumLines(numLines+1)
            let newLine = canvas.lines[canvas.lines.length-1]
            handleUpdate(getActivityObject(props, newLine))
        }
    }
    useEffect(()=>{
        if (userControlled||!activityEvents) return
        let lines = activityEvents.map(e=>e.value)
        let newData = JSON.stringify({lines:lines, width:canvasRef.current.props.canvasWidth, height:canvasRef.current.props.canvasHeight})
        canvasRef.current.loadSaveData(newData, true)
    }, [activityEvents])
    useEffect(()=>{
        
    }, activityId)
    const [ref, { x, y, width, height }] = useDimensions();

    return (
        <div ref={ref} style={{width:'100%', height:props.heightActivity}}>
            {width&&height?<CanvasDraw disabled={!userControlled} ref={canvasRef} onChange={()=>changeCanvas(canvasRef.current)} canvasWidth={width} canvasHeight={height} />:null}

        </div>
    );
}

export default CanvasActivity