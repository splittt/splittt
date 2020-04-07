
import React, {useState, useEffect} from 'react';
import { Input, Button } from 'semantic-ui-react'
import {
  useParams,
  useHistory
} from "react-router-dom";
import cookie from 'cookie'
import firebase from 'firebase'

function Teacher (props) {
    const [link, changeLink] = useState(null)
    const [roomValues, changeRoomValues] = useState({numGroups:1})
    const db = firebase.firestore()
    return (
    <>
        <Input type='number' value={roomValues.numGroups} onChange={(e, {value})=>changeRoomValues({...roomValues,numGroups:parseInt(value)})}></Input>
        <Button onClick={()=>{
            let roomDoc = db.collection('room').doc()
            
            let docsGroups = new Array(roomValues.numGroups).fill(1).map(()=>db.collection(`room/${roomDoc.id}/groups`).doc())
            let groupUsersCount = {}
                docsGroups.forEach((d)=>{
                groupUsersCount[d.id]=0
            })
            let setValuesPromise = roomDoc.set({...roomValues, groupUsersCount:groupUsersCount})
            let initGroupsPromise = Promise.all(docsGroups.map((d,i)=>
                d.set({ 
                    name:'Grup'+i,
                    users:[],

                })
            ))
            document.cookie = cookie.serialize('professor', roomDoc.id)
            Promise.all([setValuesPromise, initGroupsPromise]).then(()=>changeLink(document.location.href+'room/'+roomDoc.id))
            
        }}>Create room</Button>
        
        {link?<div>Here is your link: <a href={link}>{link}</a></div>:null}
    </>)
}
export default Teacher