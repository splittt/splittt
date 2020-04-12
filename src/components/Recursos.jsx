import React from 'react'
import {Tab, Header, Container} from 'semantic-ui-react'
import {comm, maths} from './recursos_diagrams'
import MenuSplit from './MenuSplit'
function panes(){
    return [
        {
            menuItem: 'Comunicació',
            render:()=>(<Tab.Pane><iframe frameborder="0" style={{width:'100%',height:window.innerHeight-150}} src={comm}></iframe></Tab.Pane>)
        },
        {
            menuItem: 'Col·laboratiu',
            render:()=>(<div></div>)
        },
        {
            menuItem: 'Llengua',
            render:()=>(<div></div>)
        },
        {
            menuItem: 'Matemàtiques',
            render:()=>(<Tab.Pane><iframe frameborder="0" style={{width:'100%',height:window.innerHeight-150}} src={maths}></iframe></Tab.Pane>)
        },
        {
            menuItem: 'Ciències',
            render:()=>(<div></div>)
        },
        {
            menuItem: 'Art',
            render:()=>(<div></div>)
        }
        
    ]
}
function Recursos(){

    return <><MenuSplit/><div className='App'>
        <Container>
        <Header as='h1' style={{padding:20}}>Recursos</Header>
        <Tab menu={{ pointing: true, style:{borderStyle:'solid', borderColor:'#e5637c'} }} panes={panes()}/>
        </Container>
        </div></>
    
}
export default Recursos