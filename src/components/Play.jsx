import React,{useState, useEffect } from 'react';
import { Grid, Image } from 'semantic-ui-react'
import { useParams } from "react-router-dom";
import firebase from 'firebase'

const enterRoom = (user, id, handleRoomLoaded)=>{
    let db = firebase.firestore()
    db.collection('activityUser').add({
        user:user,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then((activityUserRef)=>{
        let room = db.collection('rooms').doc(id)
        room.update({
            activitiesUsers:firebase.firestore.FieldValue.arrayUnion(activityUserRef)
        }).then(()=>{
            room.get().then(function(doc) {
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                    handleRoomLoaded(doc.data(), activityUserRef)
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });

        },(err)=>{
            console.log('error')
        })        
    })
}

const getColumnAndRowsNumbers = (players)=>{
    switch(players) {
        case 1:
            return [1,1,0]
        case 2:
            return  [2,1, 0]
        case 3:
            return  [3,1, 0]
        case 4:
            return  [2,2, 0]
        case 5:
            return [3, 2, 1]
        case 6:
            return  [3,2, 0]
        case 7:
            return [3,3,2]
        case 8:
            return [3,3,1]
        case 9:
            return [3,3,0]
        case 10:
            return [4,3,2]
        case 11:
            return [4,3,1]
        case 12:
            return [4,3,0]
        }
}



function Play (props) {
    let { id } = useParams();
    
    const [room, changeRoom] = useState(null)
    const [activityUserRef, changeActivityUserRef] = useState(null)

    useEffect(()=>{
        enterRoom(props.user, id, (roomData, activityUserRef)=>{
            changeRoom(roomData)
            changeActivityUserRef(activityUserRef)
        })
    }, [props.id])
    const ready = activityUserRef && room
    const otherActivities = ready ? room.activitiesUsers.filter((v)=>v==activityUserRef): null
    let players = 7
    const [cols, rows, wierd] = ready ? getColumnAndRowsNumbers(room.activitiesUsers.length) : [null,null,null]
    return (
        <>
        {ready && <div>{room.activitiesUsers.length}</div>}
        {ready &&
            (<Grid columns={cols} divided>
                {wierd==2 &&
                    <Grid.Row>
                    {Array.apply(null, Array(cols-1)).map((m, i)=>(
                        <Grid.Column>
                            <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
                        </Grid.Column>
                    ))}  
                    </Grid.Row>
                }
                {rows>2 && Array.apply(null, Array(rows-wierd)).map((m, i)=>(
                    <Grid.Row>
                    {Array.apply(null, Array(cols)).map((m, i)=>(
                        <Grid.Column>
                            <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
                        </Grid.Column>
                    ))}
                    </Grid.Row>
                ))}
                {wierd>=1 &&
                    <Grid.Row>
                    {Array.apply(null, Array(cols-1)).map((m, i)=>(
                        <Grid.Column>
                            <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
                        </Grid.Column>
                    ))}  
                    </Grid.Row>
                }
            </Grid>)}
        {<div>Loading...</div>}
        </>)
}
export default Play