import React, {useState} from 'react'
// import { Button, Checkbox, Form, Dropdown } from 'semantic-ui-react'
import {
    Button,
    Form
  } from 'semantic-ui-react'
const saveActivity = (dataActivity)=>{

}
function Dashboard (props) {
    const [activity, changeActivity] = useState({...props.userData})
    return (<Form onSubmit={()=>props.changeUserData(activity)}>
            <Form.Field>
            <label>Benvingut {activity.userName?' '+activity.userName:null}!</label>
            <Form.Dropdown
                placeholder='Pis'
                fluid
                search
                selection
                // options={possibleFloors}
                onChange={(e, {value})=>changeActivity({...activity, floor:value})}
            />
            <Form.Input placeholder='Teacher user' onChange={(e, {value})=>changeActivity({...activity,name:value})}/>
            </Form.Field>
            <Form.Field>
            <Form.Dropdown
                placeholder='Pis'
                fluid
                search
                selection
                // options={possibleFloors}
                onChange={(e, {value})=>changeActivity({...activity, floor:value})}
            />
            </Form.Field>
            
            {<Form.Group inline>
                <label>VizName</label>
                <Form.Checkbox
                    checked={activity.visibleName}
                    onChange={(e, {value})=>changeActivity({...activity,visibleName:value})}
                />
                <label>VizPis</label>
                <Form.Checkbox
                    checked={activity.visibleFlat}
                    onChange={(e, {value})=>changeActivity({...activity, visibleFlat:value})}
                />
            </Form.Group>}
            
            <Form.Field>
            </Form.Field>
            <Button type='submit'>Submit</Button>
        </Form>)
}
export default Dashboard