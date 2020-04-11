
import React, {useState, useEffect} from 'react';
import ActivityPanel from './ActivityPanel'
import firebase from '../config/firebase'
import {
    useParams,
    useHistory,
    useLocation
} from "react-router-dom";
import { Grid, Tab } from 'semantic-ui-react'
function ActivityPanelProfessor(props){
    const db = firebase.firestore()
    const history = useHistory()
    const [groups,changeGroups] = useState([])
    
    useEffect(()=>{
        if (!props.roomId) return
        db.collection(`room/${props.roomId}/groups`).get().then((groups)=>{
          changeGroups(groups.docs.map(g=>({...g.data(),id:g.id})))
        })
    }, [props.roomId])
    useEffect(()=>{

    }) 
    
    const panes = groups.map((g)=> ({
        menuItem: g.name,
        render:()=>(<Tab.Pane style={{borderStyle:'solid', borderColor:'#e5637c'}}>
        <ActivityPanel yPadding={180} groupId={g.id} roomId={props.roomId} activityId={props.activityId}></ActivityPanel>
        </Tab.Pane>)
    }))

    
    return <div className='App' >
    
    <Tab menu={{ pointing: true, style:{borderStyle:'solid', borderColor:'#e5637c'} }} panes={panes}/>
        
        {/* <Grid.Row>
      <Grid.Column>
      <label className='label-semantic'>{teamMates.length>0? `Al teu equip hi ha: ${getUsersNames(teamMates)}`: `Ets l'únic membre de l'equip`}</label>
      </Grid.Column>
      </Grid.Row>
      <Grid.Row>
      <Grid.Column>
      <label className='label-semantic'> {usersNotTeam.length>0?`També són a classe: ${getUsersNames(usersNotTeam)}`:`Estàs sol a classe`}</label>
      </Grid.Column>  
      </Grid.Row> */}
    
    
  </div>


}

export default ActivityPanelProfessor