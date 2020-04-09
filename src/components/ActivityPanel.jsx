import React,{useState, useEffect} from 'react';
import { Grid, Image } from 'semantic-ui-react';
import _ from 'lodash'
import firebase from 'firebase'
import Activity from './Activity'

const getColumnAndRowsNumbers = (players)=>{
  switch(players) {
      case 0:
        return  [0,0,0]
      case 1:
          return [1,1,0]
      case 2:
          return  [2,1, 0]
      case 3:
          return  [3,1, 0]
      case 4:
          return  [2,2, 0]
      case 5:
          return [3, 2, 1]
      case 6:
          return  [3,2, 0]
      case 7:
          return [3,3,2]
      case 8:
          return [3,3,1]
      case 9:
          return [3,3,0]
      case 10:
          return [4,3,2]
      case 11:
          return [4,3,1]
      case 12:
          return [4,3,0]
      }
}

function ActivityPanel (props) {
    const db = firebase.firestore()
    const [ teamMates, changeTeamMates ] = useState([])
    const teamMatesIds = teamMates.map((u)=>u.id)
    const [ users, changeUsers ] = useState({})
    const [ activitiesByUser, changeActivitiesByUser ] = useState({})
    const [ activityTypeData, changeActivityTypeData ] = useState({})
    useEffect(()=>{
        if (!props.roomId || !props.groupId) return
        db.collection(`room/${props.roomId}/groups`).doc(props.groupId).get().then((group)=>{
          changeTeamMates(group.data().users) //.filter((u=>u.id!=user_id))
        })
    }, [props.roomId, props.groupId])
    useEffect(()=>{
        if (!props.roomId || !props.groupId || !props.activityId) return
        db.collection(`room/${props.roomId}/users`).get().then((usersCall)=>{
          let docs = usersCall.docs
          docs.sort((d1,d2)=>d1.id>d2.id)
          let usersDict = usersCall.docs.reduce((acc,u)=>({...acc, [u.id]: {...u.data(), id:u.id}}),{})
          return changeUsers(usersDict)
        })
    },[props.roomId,, props.groupId, props.activityId])
    useEffect(()=>{
        if (!props.roomId || !props.groupId || !props.activityId || Object.keys(users).length==0) return
        db.collection(`room/${props.roomId}/activites`)
            .where('activityId','==',props.activityId)    
            .where('userId','in', teamMatesIds)
            .onSnapshot((activities)=>{
                let dataActivities = activities.docs.map((a)=>a.data())
                dataActivities = _.sortBy(dataActivities,(a1)=>a1.createdAt)
                let groupByObject = _.groupBy(dataActivities, (a)=>a.userId)

              changeActivitiesByUser(groupByObject)
            })
    }, [props.roomId, props.groupId, props.activityId, users])

    useEffect(()=>{
        if (!props.activityId) return
        db.collection(`activities`).doc(props.activityId).get().then((a)=>{
            changeActivityTypeData(a.data())
        })
    }, [props.activityId])

    const [cols, rows, wierd] = getColumnAndRowsNumbers(teamMatesIds.length)
    console.log("props", props.roomId, props.groupId, props.activityId, props.userId)

    const getActivity=(i)=>{
        return <Activity userId={teamMatesIds[i]}
                  userControlled={teamMatesIds[i]==props.userId} 
                  activityId={props.activityId}
                  activityEvents={activitiesByUser[teamMatesIds[i]]}
                  activityTypeData={activityTypeData}                  
                  teamMatesIds={teamMatesIds}
                  updateFunction={(actObj)=>{
                    db.collection(`room/${props.roomId}/activites`).add(actObj)
                  }}
                  />
    }

    return (
    <>
      {/* <div>Activity {props.activityId}, {props.roomId}, { props.groupId}, { props.userId}</div> */}
      {/* <div>{Object.keys(activitiesByUser).map((u)=>activitiesByUser[u].map(a=>a.value).join(', '))}</div> */}

      {cols>0?(<Grid columns={cols} divided>
            {wierd==2 &&
                <Grid.Row>
                {Array.apply(null, Array(cols-1)).map((m, i)=>(
                    <Grid.Column>
                      {getActivity(i)}
                    </Grid.Column>
                ))}  
                </Grid.Row>
            }
            {rows-wierd>0 && Array.apply(null, Array(rows-wierd)).map((m, i)=>{
                let base = wierd==2? cols-2 : 0
                return (<Grid.Row>
                {Array.apply(null, Array(cols)).map((m, i)=>(
                    <Grid.Column>
                        {getActivity(i)}
                    </Grid.Column>
                ))}
                </Grid.Row>)
            })}
            {wierd>=1 &&
                <Grid.Row>
                {Array.apply(null, Array(cols-1)).map((m, i)=>{
                  let base = wierd==2? cols-2:0
                  base += rows>=2? (rows-wierd)*cols : 0
                  return (<Grid.Column>
                        {getActivity(i)}
                    </Grid.Column>)
                })}  
                </Grid.Row>
            }
        </Grid>):null}

      <button onClick={()=>{
        db.collection(`room/${props.roomId}/activites`).doc().set({userId: props.userId, value: 'prova'+props.userId, activityId: props.activityId})
      }}>HEY</button>
    </>)
}
export default ActivityPanel