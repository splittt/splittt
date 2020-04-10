
import React, {useState, useEffect} from 'react';
import { Grid, Button, Icon } from 'semantic-ui-react'
import {
  useParams,
  useLocation,
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
            <label className='label-semantic'>{group.name}<Icon circular name='call' color='blue' link={'https://meet.jit.si/'+group.id} style={{marginLeft:4}}></Icon></label>
            {children}
        </div>
    )
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function LobbyProfessor(props){
    const db = firebase.firestore()
    const { room_id } = useParams();
    const history = useHistory()
    // const [ user, changeLoaded ] = useState(false)
    const [ groups, changeGroups ] = useState({})
    const [ users, changeUsers ] = useState({})
    const [ roomData, changeRoomData ] = useState({})
    // const withSlides = useQuery().get('withSlides')
    useEffect(()=>{
      if (room_id) document.cookie = cookie.serialize('room_id', room_id)
    }, [room_id])

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
    useEffect(()=>{
      db.collection(`room`).doc(room_id).get().then((r)=>
        changeRoomData(r.data())
      )
    },[room_id])
    return (<div className='App'>
              <DndProvider backend={Backend}>
                <Grid style={{borderStyle:'solid', borderColor:'#e5637c'}}>
                <Grid.Row columns={Object.keys(groups).length}>
                {Object.values(groups).map((g, i)=>
                  (<Grid.Column >
                      <Grid columns={1}>
                      <Grid.Row>
                      <Grid.Column>
                      <Team group={g}>
                          {g.users.filter((u)=>Object.keys(users).indexOf(u.id)>=0)
                                  .map((u)=><User user={users[u.id]} group={g}></User>)}
                      </Team>
                      </Grid.Column>
                      </Grid.Row>
                      </Grid>
                  </Grid.Column>))
                }
                <hr></hr>
                </Grid.Row>
                
                {/* !withSlides?
                <Grid.Row>
                  <Grid.Column>
                  <Button primary onClick={()=>{
                    db.collection('room').doc(room_id).update({currentActivity:roomData.activitiesIds[0]})
                    history.push(`/room/${room_id}?activityId=${roomData.activitiesIds[0]}`)
                  }}>Comença activitat</Button>
                  </Grid.Column>
                </Grid.Row>
                 :null} */}
                </Grid>
                
            </DndProvider>
            
            </div>
            )
  
}
export default LobbyProfessor