
import React, {useState, useEffect} from 'react';
import { Input, Button } from 'semantic-ui-react'
import {
  useParams,
  useHistory
} from "react-router-dom";
import firebase from 'firebase'

function Room(props){
    const db = firebase.firestore()
    const { room_id } = useParams();
    const [userData, changeUseData] = useState({name:'', group:null})
    const history = useHistory()
    const createUser = ()=>{
      let roomRef = db.collection(`room`).doc(room_id)
      let userRef = roomRef.collection(`users`).doc()
      
      roomRef.get().then((r)=>{
        let groupUsersCount = r.data().groupUsersCount
        let usersXGroup = Object.values(groupUsersCount)
        // let ids = Object.keys(groupUsersCount)
        let argMin = usersXGroup.map((x, i) => [x, i]).reduce((r, a) => (a[0] < r[0] ? a : r))[1]
        let keyMin = Object.keys(groupUsersCount)[argMin]
        let groupMinDoc = roomRef.collection('groups').doc(keyMin)
        groupUsersCount[keyMin]+=1
  
        let globalRoomDictPromise = roomRef.update({groupUsersCount: groupUsersCount}).then(()=>{return groupUsersCount})
  
        let setGroupsPromise = groupMinDoc.update({
          users: firebase.firestore.FieldValue.arrayUnion(userRef)
        }).then(()=>{return groupMinDoc})
  
        let userDataPromise = userRef.set({...userData, group: groupMinDoc}).then(()=>{return userRef})
  
        return Promise.all([setGroupsPromise, userDataPromise, globalRoomDictPromise])
      }).then((result)=>{
        let [groupMinRef, userRef, groupUsersCount] = result
        history.push(`/room/${room_id}/${groupMinRef.id}/${userRef.id}/`)
      })
      // 
    }
    return <div>
            <Input onChange={(e, {value})=>changeUseData({...userData,name:value})} value={userData.name}></Input>
            <Button onClick={createUser}>Save</Button>
          </div>
}
export default Room