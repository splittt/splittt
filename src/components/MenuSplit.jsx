import React, { useEffect, useState } from 'react'
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Button,
  Image,
  List,
  Menu,
  Icon
} from 'semantic-ui-react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import final_image from '../static/final_image.png'

function MenuSplit(){
    return (<Menu fixed='top' inverted >
        <Container>
        <Menu.Item header>
            <Image size='mini' src={final_image} style={{ marginRight: '1.5em' }} />
            splittt
        </Menu.Item>
        <Menu.Item as="a" href='#/'>Inici</Menu.Item>

        <Dropdown item simple text='Recursos' as="a" href='#/resources'>
            <Dropdown.Menu>
            <Dropdown.Item href="#/resources?r=com">Comunicació</Dropdown.Item>
            <Dropdown.Item href="#/resources?r=colab">Col·laboració</Dropdown.Item>
            <Dropdown.Item href="#/resources?r=llengua">Llengua</Dropdown.Item>
            <Dropdown.Item href="#/resources?r=ciencia">Ciència</Dropdown.Item>
            <Dropdown.Item href="#/resources?r=mates">Matemàtiques</Dropdown.Item>
            <Dropdown.Item href="#/resources?r=musica">Música</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown> 
        <Menu.Item position='right' as='a'  ><Button href='#/new' primary className='App'><Icon name='add' color='white'></Icon>{window.innerWidth>500?"Nova classe":null}</Button></Menu.Item>
        </Container>
    </Menu>)
}
export default MenuSplit