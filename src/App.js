import React, {useState, useEffect} from 'react';
import './App.css';
import { Input, Button } from 'semantic-ui-react'
import {
  HashRouter as Router,
  Switch,
  Route,
  useParams,
  useLocation
} from "react-router-dom";
import cookie from 'cookie'
import firebase from 'firebase'
import Teacher from './components/Teacher'
import LobbyProfessor from './components/LobbyProfessor'
import Room from './components/Room'
import Lobby from './components/Lobby'
import ActivityPanel from './components/ActivityPanel'



function Play(props){
  const { room_id, group_id, user_id } = useParams();
  
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function App() {
  const [user, changeUser] = useState(null)
  const [confirmed, changeConfirmed] = useState(true)
  const [professor, changeProfessorCookie] = useState(cookie.parse(document.cookie).professor)
  const [roomId, changeRoomId] = useState(cookie.parse(document.cookie).room_id)
  const [groupId, changeGroupId] = useState(cookie.parse(document.cookie).group_id)
  const [userId, changeUserId] = useState(cookie.parse(document.cookie).user_id)
  // useEffect(()=>{
  //   changeProfessorCookie(cookie.parse(document.cookie).professor)
  //   changeRoomId(cookie.parse(document.cookie).room_id)
  //   changeGroupId(cookie.parse(document.cookie).group_id)
  //   changeUserId(cookie.parse(document.cookie).user_id)
  // })
  console.log(roomId, groupId, userId)
  const activityId = useQuery().get('activityId')
  console.log(activityId, professor)
  return (
    
      <Switch>
        <Route exact path="/">
          <Teacher></Teacher>
        </Route>
        <Route exact path="/room/:room_id">
          {professor && <><div>You are the professor</div><LobbyProfessor></LobbyProfessor></>}
          {!professor && !activityId && <Room></Room>}
          {!professor && activityId && 
              <ActivityPanel activityId={activityId} roomId={roomId} groupId={groupId} userId={userId}></ActivityPanel>}
        </Route>
        <Route exact path="/room/:room_id/:user_id">
          {professor?<div>You should not be here</div>:<Lobby></Lobby>}
        </Route>
        <Route path="/room/:room_id/:group_id/:user_id">
          {roomId}, {groupId}, {userId}
          <Lobby></Lobby>
        </Route>        
      </Switch>
  );
}

export default App;
