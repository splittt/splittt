import React, {useState, useEffect} from 'react';
import './App.css';
import { Input, Button } from 'semantic-ui-react'
import {
  HashRouter as Router,
  Switch,
  Route,
  useParams,
  useHistory
} from "react-router-dom";
import cookie from 'cookie'
import firebase from 'firebase'
import Teacher from './components/Teacher'
import LobbyProfessor from './components/LobbyProfessor'
import Room from './components/Room'
import Lobby from './components/Lobby'

const firebaseConfig  ={
  apiKey: "AIzaSyAXuYMUodZvHzxgJKqzr5OFX32G0YH_pX4",
  authDomain: "split-games.firebaseapp.com",
  databaseURL: "https://split-games.firebaseio.com",
  projectId: "split-games",
  storageBucket: "split-games.appspot.com",
  messagingSenderId: "39941079391",
  appId: "1:39941079391:web:0ddd79b690167fb3ddf6ea"
}
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()

function Play(props){
  const { room_id, group_id, user_id } = useParams();
  
}
function App() {
  const [user, changeUser] = useState(null)
  const [confirmed, changeConfirmed] = useState(true)
  const [professor, changeProfessorCookie] = useState(false)
  const [roomId, changeRoomId] = useState(cookie.parse(document.cookie).roomId)
  const [groupId, changeGroupId] = useState(cookie.parse(document.cookie).groupId)
  const [userId, changeUserId] = useState(cookie.parse(document.cookie).userId)
  useEffect(()=>{
    changeProfessorCookie(cookie.parse(document.cookie).professor)
    cookie.parse(document.cookie)
  }, [document.cookie])
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Teacher></Teacher>
        </Route>
        <Route exact path="/room/:room_id">
          {roomId}
          {professor && <><div>You are the professor</div><LobbyProfessor></LobbyProfessor></>}
          {!professor && <Room></Room>}
          {/* <button onClick={()=>{changeCookieReact(cookieReact+1);document.cookie=cookie.serialize('slides', cookieReact+1)}}>set cookie</button>
          {document.cookie.slides}
          {`${cookieReact}`} */}
        </Route>
        <Route exact path="/room/:room_id/:user_id/">
          {roomId}, {userId}
          {professor?<div>You should not be here</div>:<Lobby></Lobby>}
        </Route>
        <Route path="/room/:room_id/:group_id/:user_id/">
          {roomId}, {groupId}, {userId}
          <Lobby></Lobby>
        </Route>
        
      </Switch>
    </Router>
  );
}

export default App;
