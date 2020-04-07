import React, {useState, useEffect} from 'react';
import { Input, Button } from 'semantic-ui-react'
import {
  useParams
} from "react-router-dom";
import cookie from 'cookie'
import firebase from 'firebase'

function Lobby(props){
    const db = firebase.firestore()
    const { room_id, group_id, user_id } = useParams();
    useEffect(()=>{
      document.cookie = cookie.serialize('room_id', room_id)  
      document.cookie = cookie.serialize('group_id', group_id)  
      document.cookie = cookie.serialize('user_id', group_id)  
    }, [room_id, group_id, user_id])
    const [ teamMates, changeTeamMates ] = useState([])
    const teamMatesIds = teamMates.map((u)=>u.id)
    const [ users, changeUsers ] = useState({})
    useEffect(()=>{
      db.collection(`room/${room_id}/groups`).doc(group_id).onSnapshot((group)=>{
        changeTeamMates(group.data().users.filter((u=>u.id!=user_id)))
      })
    }, [room_id])
    useEffect(()=>{
      db.collection(`room/${room_id}/users`).onSnapshot((usersCall)=>{
        let usersDict = usersCall.docs.reduce((acc,u)=>({...acc, [u.id]: {...u.data(), id:u.id}}),{})
        changeUsers(usersDict)
      })
    },[room_id])
    const getUsersNames = (refs)=>refs.filter((u)=>Object.keys(users).indexOf(u.id)>=0).map((u)=>users[u.id].name).join(', ')
    const usersNotTeam = Object.values(users).filter((u)=>u.id!=user_id && teamMatesIds.indexOf(u.id)<0)
    const me = Object.values(users).filter((u)=>u.id==user_id)
    return <div>You are: {getUsersNames(me)}. In your team {getUsersNames(teamMates)}. Also playing: {getUsersNames(usersNotTeam)}</div>
  
  }
export default Lobby