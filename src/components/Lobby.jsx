import React, {useState, useEffect} from 'react';
import { Input, Button, Grid, Icon } from 'semantic-ui-react'
import {
  useParams,
  useHistory,
  useLocation
} from "react-router-dom";
import cookie from 'cookie'
import firebase from '../config/firebase'

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Lobby(props){
    const db = firebase.firestore()
    const history = useHistory()
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
    const [ jitsi, changeJitsi ] = useState({})
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
    useEffect(()=>{
      db.collection('room').doc(room_id).get().then((r)=>{
        if (r.data().jitsi==true){
          changeJitsi(true)
        }
      })
    },[room_id])
    const getUsersNames = (refs)=>refs.filter((u)=>Object.keys(users).indexOf(u.id)>=0).map((u)=>users[u.id].name).join(', ')
    const usersNotTeam = Object.values(users).filter((u)=>u.id!=user_id && teamMatesIds.indexOf(u.id)<0)
    const me = Object.values(users).filter((u)=>u.id==user_id)
    let withSlides = useQuery().get('withSlides')
    useEffect(()=>{
      if (withSlides||!user_id) return
      const listener = db.collection('room').doc(room_id).onSnapshot((r)=>{
        let currentActivity = r.data().currentActivity
        if (currentActivity){ 
          listener()
          history.push(`/room/${room_id}?activityId=${currentActivity}`)
        }
      })
    }, [room_id, withSlides])
    
    return (<div className='App'>
            <Grid style={{borderStyle:'solid', borderColor:'#e5637c'}}>
              <Grid.Row>
              <Grid.Column>
            <label className='label-semantic'>Benvingut {getUsersNames(me)}.</label>
              </Grid.Column>  
              </Grid.Row>
              <Grid.Row>
              <Grid.Column>
              <label className='label-semantic'>{teamMates.length>0? `Al teu equip hi ha: ${getUsersNames(teamMates)}`: `Ets l'únic membre de l'equip`}</label>
              </Grid.Column>
              </Grid.Row>
              <Grid.Row>
              <Grid.Column>
              <a target='_blank' href={'https://meet.jit.si/'+groupId}><Icon circular name='call'></Icon>Comunica't amb els teus companys!</a>
              </Grid.Column>
              </Grid.Row>
              <Grid.Row>
              <Grid.Column>
              <label className='label-semantic'> {usersNotTeam.length>0?`També són a classe: ${getUsersNames(usersNotTeam)}`:`No hi ha ningú més`}</label>
              </Grid.Column>  
              </Grid.Row>
            </Grid>
            
          </div>)
  }
export default Lobby
// You are: {}. In your team {getUsersNames(teamMates)}. Also playing: {getUsersNames(usersNotTeam)}