
import React, {useState, useEffect} from 'react';
import { Input, Button } from 'semantic-ui-react'
import {
  useParams,
  useHistory
} from "react-router-dom";
import cookie from 'cookie'
import firebase from '../config/firebase'
import { useDrag, useDrop } from 'react-dnd'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
const changeTeam = (userObj, oldGroupObj, groupObj)=>{
    let setGroupsPromiseOld = oldGroupObj.ref.update({
        users: firebase.firestore.FieldValue.arrayRemove(userObj.ref)
    })
    let setGroupsPromiseNew = groupObj.ref.update({
        users: firebase.firestore.FieldValue.arrayUnion(userObj.ref)
    })
    let userDataPromise = userObj.ref.update({ group: groupObj.ref})
}
function User({user, group}){
    const item = { user, group, type: 'box' }
    const [{ isDragging }, drag] = useDrag({
        item,
        end: (item, monitor) => {
          const dropResult = monitor.getDropResult()
          if (item && dropResult) {
            // alert(`item.name} into ${dropResult.name}!`)
            changeTeam(item.user, item.group, dropResult.group)
          }
        },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
    })
    return (
        <div ref={drag} >
            {user.name}
        </div>
    )
}


function Team({group, children}){
    const [{ canDrop, isOver }, drop] = useDrop({
        accept: 'box',
        drop: () => ({ group: group }),
        collect: (monitor) => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        }),
    })
    return (
        <div ref={drop} >
            {group.name} - {group.id}
            {children}
        </div>
    )
}
function LobbyProfessor(props){
    const db = firebase.firestore()
    const { room_id } = useParams();
    // const [ loaded, changeLoaded ] = useState(false)
    // const [ user, changeLoaded ] = useState(false)
    const [ groups, changeGroups ] = useState({})
    const [ users, changeUsers ] = useState({})
    
    useEffect(()=>{
      db.collection(`room/${room_id}/groups/`).onSnapshot((groupsCall)=>{
        let groupsDict = groupsCall.docs.reduce((acc,g)=>({...acc, [g.id]: {...g.data(), id:g.id, ref: g.ref}}),{})
        changeGroups(groupsDict)
      })
    },[room_id])
    useEffect(()=>{
      db.collection(`room/${room_id}/users/`).onSnapshot((usersCall)=>{
        let usersDict = usersCall.docs.reduce((acc,u)=>({...acc, [u.id]: {...u.data(), id:u.id, ref: u.ref}}),{})
        changeUsers(usersDict)
      })
    },[room_id])
    
    
    return (<DndProvider backend={Backend}>
                <div>
                {Object.values(groups).map((g)=>
                    <Team group={g}>
                        {g.users.filter((u)=>Object.keys(users).indexOf(u.id)>=0)
                                .map((u)=><User user={users[u.id]} group={g}></User>)}
                    </Team>)
                }
                <Button onClick={()=>{}}>Ready</Button>
                </div>
            </DndProvider>
            )
  
}
export default LobbyProfessor