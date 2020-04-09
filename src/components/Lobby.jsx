import React, {useState, useEffect} from 'react';
import { Input, Button } from 'semantic-ui-react'
import {
  useParams
} from "react-router-dom";
import cookie from 'cookie'
import firebase from '../config/firebase'


function Lobby(props){
    const db = firebase.firestore()
    const { room_id, group_id, user_id } = useParams();
    const [ groupId, changeGroupId ] = useState(group_id)
    const [ groupsListener, changeGroupsListener ] = useState(()=>(()=>{}))
    const [ usersListener, changeUsersListener ] = useState(()=>(()=>{}))
    // set all the cookies
    useEffect(()=>{
      if (room_id) document.cookie = cookie.serialize('room_id', room_id)  
      if (groupId) document.cookie = cookie.serialize('group_id', groupId)  
      if (user_id) document.cookie = cookie.serialize('user_id', user_id)
    }, [room_id, groupId, user_id])
    const [ teamMates, changeTeamMates ] = useState([])
    const teamMatesIds = teamMates.map((u)=>u.id)
    const [ users, changeUsers ] = useState({})
    useEffect(()=>{
      if (groupsListener) groupsListener()
      let newGroupsListener = db.collection(`room/${room_id}/groups`).doc(groupId).onSnapshot((group)=>{
        changeTeamMates(group.data().users.filter((u=>u.id!=user_id)))
      })
      changeGroupsListener(()=>(newGroupsListener))
    }, [room_id, groupId])
    useEffect(()=>{
      if (usersListener) usersListener()
      let newUsersListener = db.collection(`room/${room_id}/users`).onSnapshot((usersCall)=>{
        let usersDict = usersCall.docs.reduce((acc,u)=>({...acc, [u.id]: {...u.data(), id:u.id}}),{})
        changeUsers(usersDict)
        let me = usersCall.docs.filter((u)=>u.id==user_id).map((u)=>u.data())
        if (me.length>0 && me[0].group.id!=groupId){ 
          changeGroupId(me[0].group.id)
        }
      })
      changeUsersListener(()=>(newUsersListener))
    },[room_id, groupId])
    const getUsersNames = (refs)=>refs.filter((u)=>Object.keys(users).indexOf(u.id)>=0).map((u)=>users[u.id].name).join(', ')
    const usersNotTeam = Object.values(users).filter((u)=>u.id!=user_id && teamMatesIds.indexOf(u.id)<0)
    const me = Object.values(users).filter((u)=>u.id==user_id)
    return <div>You are: {getUsersNames(me)}. In your team {getUsersNames(teamMates)}. Also playing: {getUsersNames(usersNotTeam)}</div>
  
  }
export default Lobby