import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { Modal, Input, Button } from 'semantic-ui-react'
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import firebase from 'firebase'
import Dashboard from './components/Dashboard'
import Play from './components/Play'
import Teacher from './components/Teacher'
import cookie from 'cookie'
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
function App() {
  const [user, changeUser] = useState(null)
  const [confirmed, changeConfirmed] = useState(true)
  const [cookieReact, changeCookieReact] = useState(0)
  // useEffect(()=>{
  //   changeCookieReact(cookie.parse(document.cookie).slides)
  // })
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <iframe></iframe>
          <button onClick={()=>{changeCookieReact(cookieReact+1);document.cookie=cookie.serialize('slides', cookieReact+1)}}>set cookie</button>
          {document.cookie.slides}
          {`${cookieReact}`}
        </Route>
        <Route path="/provaslides">
          hey {document.cookie.slides}
          {`${cookieReact}`}
        </Route>
        <Route path="/play/:id">
          {!confirmed? (
              <Modal open={!confirmed}>
                <Modal.Header>Benvinguda a Split!</Modal.Header>
                <Modal.Content>
                  <Input placeholder="Nom d'usuari" onChange={(e,{value})=>changeUser(value)} value={user}></Input>
                  <br/>
                  <Button active={user!=null} onClick={()=>{changeConfirmed(true)}}>A jugar!</Button>
                </Modal.Content>
              </Modal>
            ):<Play user={'prova'}></Play>}
        </Route>
        <Route path="/teacher">
            <Teacher></Teacher>
        </Route>
        <Route path="dashboard">
          <Dashboard user={user}></Dashboard>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
