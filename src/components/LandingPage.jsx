import React, { useEffect, useState } from 'react'
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Button
} from 'semantic-ui-react'
import MenuSplit from './MenuSplit'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; 
import logo_animated from '../static/logo_animation2.gif'
import final_image from '../static/final_image.png'
import slides from '../static/slides.png'
import jitsi from '../static/jitsi.png'
import profe_icon from '../static/create.svg'
import profe2_icon from '../static/presentation.svg'
import profe3_icon from '../static/school.svg'
import dev from '../static/web-development.svg'
import alumne from '../static/book.svg'
import profe1 from '../static/final_image.png'
import profe2 from '../static/final_image.png'
import profe3 from '../static/final_image.png'
import profe4 from '../static/final_image.png'
import profe5 from '../static/final_image.png'
// import profe3 from '../static/profe3.png'
// import profe1 from '../static/profe1.png'
// import profe2 from '../static/profe2.png'
// import profe3 from '../static/profe3.png'
const imagesProfessorActivity = [
  {src:'../static/profe3.png', desc:'texthere'},
];
const steps = {
  activity: [{src:profe1, text:'hey'}],
  classrom: [{src:profe1, text:'hey'}],
  classrom2: [{src:profe1, text:'hey'}],
  classrom3: [{src:profe1, text:'hey'}],
  dev: [{src:profe1, text:'hey'}],
}
const FixedMenuLayout = (props) => {
  const [animated, changeAnimated] = useState(true)
  useEffect(()=>{
    setTimeout(()=>{
      changeAnimated(false)
    }, 9000)
  },props)
  const [ openLightbox, changeOpenLightBox] = useState(null)
  const [ photoIndex, changePhotoIndex] = useState(0)
  const images = steps[openLightbox]
  return <div className='App'>
    <MenuSplit/>

    <Container text style={{ marginTop: '2em', minHeight: window.innerHeight-80}}>
      <img src={animated?logo_animated:final_image} alt="loading..." style={{height:window.innerHeight/2.5}}/>
      <Header as='h1'>splittt</Header>
      <p>splittt et permet crear fàcilment activitats cooperatives en temps real amb l'ajuda de...:</p>
      <p><img src={slides} width={250}/><img src={jitsi} width={250}/></p>
      <Button primary href='#/new'>Comença ara!</Button>
    </Container>
    <hr></hr>
    <Container>
      <Header as='h2' style={{margin:'40px'}}>Guia d'ús</Header>
      <Grid columns={3}>
        <Grid.Row>
          <Grid.Column>
            <Header>
              Professor
            </Header>
            <Grid columns={2}  style={{width:'100%'}}><Grid.Row>
              <Grid.Column>
                <img src={profe_icon} />
              </Grid.Column>
              <Grid.Column>
                <Button onClick={()=>changeOpenLightBox('activity')}>Crear una activitat</Button>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <img src={profe2_icon} />
              </Grid.Column>
              <Grid.Column>
              <Button onClick={()=>changeOpenLightBox('classrom')}>Crear una classe</Button>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <img src={profe3_icon} />
              </Grid.Column>
              <Grid.Column>
              <Button onClick={()=>changeOpenLightBox('classrom2')}>Fes classe</Button>
              </Grid.Column>
            </Grid.Row>
            </Grid>
          </Grid.Column>
          <Grid.Column style={{borderLeftStyle:'solid', borderLeftStyle:'solid',borderRightStyle:'solid', borderRightStyle:'solid'}}>
            {/* , borderLeftColor:'#e5637c' */}
            <Header>
              Alumne
            </Header>
            <Grid columns={2}  style={{width:'100%'}}><Grid.Row>
              <Grid.Column>
                <img src={alumne} />
              </Grid.Column>
              <Grid.Column>
                <Button onClick={()=>changeOpenLightBox('classrom3')}>Entrar a la classe</Button>
              </Grid.Column>
            </Grid.Row></Grid>
          </Grid.Column>
          <Grid.Column>
            <Header>
              Desenvolupador
            </Header>
            <Grid columns={2}  style={{width:'100%'}}><Grid.Row>
              <Grid.Column>
                <img src={dev} />
              </Grid.Column>
              <Grid.Column>
                <Button onClick={()=>changeOpenLightBox('dev')}>Desenvolupar un nou tipus d'activitat</Button>
              </Grid.Column>
            </Grid.Row></Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      
    </Container>
    {openLightbox!=null&&
        <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => changeOpenLightBox(null)}
            onMovePrevRequest={() =>
              changePhotoIndex((photoIndex + images.length - 1) % images.length)
            }
            onMoveNextRequest={() =>
              changePhotoIndex((photoIndex + images.length - 1) % images.length)
            }
          />}

    
  </div>
}

export default FixedMenuLayout