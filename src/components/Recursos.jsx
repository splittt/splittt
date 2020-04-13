import React, { useState , useEffect} from 'react'
import {Tab, Header, Container} from 'semantic-ui-react'
import {comm, maths} from './recursos_diagrams'
import MenuSplit from './MenuSplit'
import axios from 'axios'
import {
  useLocation
} from "react-router-dom";
const objResources = [
    {name:'Comunicació', src:"https://raw.githubusercontent.com/splittt/splittt/master/resources/comm.txt"},
    {name:'Col·laboratiu', src:"https://raw.githubusercontent.com/splittt/splittt/master/resources/colab.txt"},
    {name:'Llengua', src:"https://raw.githubusercontent.com/splittt/splittt/master/resources/llengues.txt"},
    {name:'Matemàtiques', src:"https://raw.githubusercontent.com/splittt/splittt/master/resources/mates.txt"},
    {name:'Ciències', src:"https://raw.githubusercontent.com/splittt/splittt/master/resources/ciencies.txt"},
    {name:'Música', src:"https://raw.githubusercontent.com/splittt/splittt/master/resources/musica.txt"}
]
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Diagram({r}){

    const [url, changeUrl] = useState('')
    useEffect(()=>{
        axios.get(r.src).then((v)=>{
            changeUrl(v.data)
        }).catch(()=>{console.log('bad')})
    },[r])
    return (
        <Tab.Pane>
            <iframe frameborder="0" style={{width:'100%',height:window.innerHeight-150}} src={url}></iframe>
        </Tab.Pane>
    )

}
function panes(){
    return objResources.map((r)=>({
        menuItem:r.name,
        render:()=><Diagram r={r}/>
    }))
}
function getIndexR(r){
    let index = ['com', 'colab', 'llengua', 'mates', 'ciencia', 'musica'].indexOf(r)
    if (index>=0) return index
    return 0
}
function Recursos(){
    const r = useQuery().get('r')
    return <><MenuSplit/><div className='App'>
        <Container>
        <Header as='h1' style={{padding:20}}>Recursos</Header>
        <Tab defaultActiveIndex={r?getIndexR(r):0} menu={{ pointing: true, style:{borderStyle:'solid', borderColor:'#e5637c'} }} panes={panes()}/>
        </Container>
        </div></>
    
}
export default Recursos