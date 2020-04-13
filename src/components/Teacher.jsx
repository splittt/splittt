
import React, {useState, useEffect, useRef, useCallback} from 'react';
import { List, Button, Checkbox, Grid, Modal, Form, Header, Label } from 'semantic-ui-react'
import cookie from 'cookie'
import firebase from '../config/firebase'
import OrderableListItem from './OrderableListItem';
import update from 'immutability-helper'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import {activityExtraFields, activityNames} from './activitiesEnum'
import axios from 'axios'

//DBs
const createRoom=(roomValues, selectedActivities, changeRoomId)=>{
    const db = firebase.firestore()
    let roomDoc = db.collection('room').doc()
            
    let docsGroups = new Array(roomValues.numGroups).fill(1).map(()=>db.collection(`room/${roomDoc.id}/groups`).doc())
    let groupUsersCount = {}
        docsGroups.forEach((d)=>{
        groupUsersCount[d.id]=0
    })
    let setValuesPromise = roomDoc.set({...roomValues, groupUsersCount:groupUsersCount, activitiesIds: selectedActivities.map((a)=>a.id)})
    let initGroupsPromise = Promise.all(docsGroups.map((d,i)=>
        d.set({ 
            name:'Equip '+String.fromCharCode(i+65),
            users:[],
            
        })
    ))
    document.cookie = cookie.serialize('professor', roomDoc.id)
    changeRoomId(roomDoc.id)
    Promise.all([setValuesPromise, initGroupsPromise])
}

const createActivity=(activityData)=>{
    const db = firebase.firestore()
    let doc = db.collection('activities').doc()
    doc.set(activityData)
    return doc
}

//ELEMENTS
const renderItem = (props, index, checked, onCheck)=>{
    return <List.Item index={index}><Checkbox checked={checked} onChange={(e,{checked})=>onCheck(index, props.id, checked)} style={{paddingTop: 4,marginRight: 4}}/>{props.name}</List.Item>
}

const renderItemDrag = (props, index, onCheck,  moveCard) => {
    return (
        <OrderableListItem
            key={props.id}
            index={index}
            moveCard={moveCard}
            {...props}
        >
        {<List.Item index={index}>{index+1}. {props.name}<Button primary compact icon='delete'  style={{padding:2, paddingLeft:1, paddingRight:1, marginLeft:8}} onClick={()=>onCheck(index, props.id, false)}/></List.Item>}
        
      </OrderableListItem>
    )
}

const quickFormElement = (object, onChange)=>{
    return React.createElement(object.element, {...object, element:null, onChange:onChange})
}

function CreateActivityModal (props) {
    const db = firebase.firestore()
    const [activityData, changeActivityData] = useState({})
    const [timed, changeTimed] = useState(false)
    const getChangeActivityDataKey = (key)=> ((e, {value})=>{changeActivityData({...activityData,[key]:value})})
    const activityTypes = Object.keys(activityExtraFields).map((k)=>({key:k, value:k, text:activityNames[k]}))
    const [open, setOpen] = useState(false)
    return (<Modal trigger={<Button style={{padding:3, marginLeft:5, marginTop:3}} onClick={()=>setOpen(true)} icon='add'></Button>} onClose={()=>setOpen(false)} open={open}>
        <Modal.Header>Crea una nova activitat</Modal.Header>
        <Modal.Content>
            <Form>
            <Form.Input label="Enunciat" onChange={getChangeActivityDataKey('name')} value={activityData['name']}></Form.Input>
                <Form.Dropdown 
                    placeholder="Tipus"
                    label="Tipus d'activitat"
                    options={activityTypes}
                    value={activityData.type}
                    onChange={getChangeActivityDataKey('type')}
                >
                </Form.Dropdown>
                <Form.Checkbox checked={timed} onChange={()=>changeTimed(!timed)} label="Amb temps"/>
                {timed?<Form.Input label="Nombre de segons per respondre" type='number' onChange={getChangeActivityDataKey('time')} value={activityData['time']}></Form.Input>:null}
                {activityData.type?Object.keys(activityExtraFields[activityData.type]).map((k)=>{
                    return quickFormElement(activityExtraFields[activityData.type][k], getChangeActivityDataKey(k))
                }):null}
                <Form.Button onClick={()=>{
                    let doc = createActivity(activityData);
                    changeActivityData({})
                    props.callback(activityData, doc)
                    setOpen(false)                    
                }}>Guarda</Form.Button>
            </Form>
            
            
        </Modal.Content>
        </Modal>)
}
function getDomain(){
  return document.location.href.slice(0,-3)
}
function createJSONslides (id, roomValues,selectedActivities){
  const link = getDomain()+'room/'+id
  const getSlide = (activity)=>{
    return {"blocks": [
              {
                "type": "text",
                "value": activity.name,
                "format": "h1"
              },
              {
                "type": "iframe",
                "value": link+'?activityId='+activity.id+'&withSlides=true'
              }
            ]}
  }
  let json = { 
    "title": roomValues.name,
    "loop": false,
    "slide-number": true,
    "theme-font": "overpass",
    "transition": "convex",
    "slides": [
      {
        "notes": "These are speaker notes, the'll only appear when this deck is presented.",
        "blocks": [
          {
            "type": "text",
            "value": roomValues.name,
            "format": "h1"
          },
          {
            "type": "text",
            "value": 'Fes click a "Save deck" per poder modificar la presentació',
            "format": "h2"
          },
          {
            "type": "image",
            "value": "https://raw.githubusercontent.com/splittt/splittt/master/public/savedeck.png"
          },
          {
            "type": "text",
            "value": '👇',
            "format": "h1"
          },
        ]
      },
      {
        "notes": "These are speaker notes, the'll only appear when this deck is presented.",
        "blocks": [
          {
            "type": "text",
            "value": "Lobby",
            "format": "h1"
          },
          {
            "type": "text",
            "value": `Aquesta presentació tindrà ${roomValues.numGroups} grups`
          },
          {
            "type": "iframe",
            "value": link+'?withSlides=true'
          }
        ]
      },
      ...selectedActivities.map(getSlide)
    ]
  }
  return JSON.stringify(json)
}

function Teacher (props) {
    const [showLink, changeShowLink] = useState(false)
    const form = useRef(null)
    const db = firebase.firestore()
    const [roomValues, changeRoomValues] = useState({numGroups:1, name:''})
    const [selectedActivities, changeSelectedActivities] = useState([])
    const [activities, changeActivities] = useState([])
    const moveCard = useCallback((dragIndex, hoverIndex) => {
        const dragCard = selectedActivities[dragIndex]
        changeSelectedActivities(
          update(selectedActivities, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, dragCard],
            ],
          }),
        )
      },[selectedActivities])

      // useEffect(()=>{
      //   if (!roomValues.id) return
      //   createJSONslides(roomValues, selectedActivities)
      // },[roomValues, selectedActivities])
      useEffect(()=>{
            db.collection(`activities`).get().then((activities)=>{
                changeActivities(activities.docs.map((a)=>({...a.data(),id:a.id})))
            })
        }, [props])

    const onCheck = (index, id, value)=>{
        let newActivities = [...activities]
        let newSelectedActivities = [...selectedActivities]
        if (value) {
            let activity = newActivities.filter(a=>(a.id==id))[0]
            newActivities = newActivities.filter(a=>(a.id!=id))
            newSelectedActivities = [...newSelectedActivities, activity]
        }else{
            let activity = newSelectedActivities.filter(a=>(a.id==id))[0]
            newSelectedActivities = newSelectedActivities.filter(a=>(a.id!=id))
            newActivities = [...newActivities, activity]
        }
        changeSelectedActivities(newSelectedActivities)
        changeActivities(newActivities)
    }
    return (
    <div className="App">  
        <Header>Nova classe</Header>
        <Grid style={{marginBottom:20}}>
        <Grid.Row columns={2}>
        <Grid.Column>
          <Form>
            <Form.Input label={'Nom de la classe'} placeholder={'Escriu aquí un nom per la classe'} value={roomValues.name} onChange={(e, {value})=>changeRoomValues({...roomValues,name:value})}></Form.Input>
          </Form>
        </Grid.Column>
        <Grid.Column>
          <Form>
            <Form.Input label={'Nombre de grups'} type='number' value={roomValues.numGroups} onChange={(e, {value})=>changeRoomValues({...roomValues,numGroups:parseInt(value)})}></Form.Input>
          </Form>
        </Grid.Column>
        </Grid.Row>
        
        
        <Grid.Row columns={2} style={{minHeight:200}}>
        <Grid.Column>
        <List divided>
        <label className='label-semantic'>Activitats disponibles<CreateActivityModal callback={(activityData, doc)=>{changeSelectedActivities([...selectedActivities, {...activityData, id:doc.id}])}}/></label>
        {activities.filter((a)=>!a.checked).map((card, i) => renderItem({...card}, i, false, onCheck))}
        
        </List>
        </Grid.Column>
        <Grid.Column>
        <List divided>        
        <label className='label-semantic' >Activitats escollides</label>
        <DndProvider backend={Backend}>
            {selectedActivities.map((card, i) => renderItemDrag({...card}, i, onCheck, moveCard))}
        </DndProvider>
        </List>
        </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1} style={{marginBottom:20}}>
        <Grid.Column>
        <form ref={form} action="https://slides.com/decks/define" method="POST" target="_blank">
            <textarea style={{display:'none'}} name="definition">{`${JSON.stringify({})}`}</textarea>
        </form>
        <Button.Group style={{marginBottom:20}}>
          <Button disabled={!roomValues.name||selectedActivities.length==0} onClick={()=>{
            if(!roomValues.id){
              createRoom(roomValues, selectedActivities, (id)=>{
                changeRoomValues({...roomValues, id:id})
                // form.current.children[0].value = createJSONslides(id, roomValues, selectedActivities)
                // form.current.submit()
                changeShowLink(true)
              })
            }else{
              changeShowLink(true)
            }  
          }}>Aconsegueix el link</Button>
          <Button.Or />
          <Button primary disabled={!roomValues.name||selectedActivities.length==0} onClick={()=>{
          if(!roomValues.id){
            createRoom(roomValues, selectedActivities, (id)=>{
              changeRoomValues({...roomValues, id:id})
              form.current.children[0].value = createJSONslides(id, roomValues, selectedActivities)
              form.current.submit()
            })
          }else{
            form.current.children[0].value = createJSONslides(roomValues.id, roomValues, selectedActivities)
            form.current.submit()
          }
        }}>Crea una presentació</Button>
        </Button.Group>
        {/* <Label active={!roomValues.name||selectedActivities.length==0}>Your password must be 6 characters or more</Label> */}
        </Grid.Column>
        </Grid.Row>
        <Grid.Row column={1}>
          <Grid.Column>
          {showLink?
            <div>Aquí tens el link per compartir: <br/>
                <a href={getDomain()+'room/'+roomValues.id}>{getDomain()+'room/'+roomValues.id}</a>
                <br></br>
                {selectedActivities.map(a=><><a href={getDomain()+'room/'+roomValues.id+'?activityId='+a.id}>{getDomain()+'room/'+roomValues.id+'?activityId='+a.id}</a><br/></>)}
                </div>
          
          :null}
          </Grid.Column>
        </Grid.Row>
        </Grid>
    </div>)
}


export default Teacher