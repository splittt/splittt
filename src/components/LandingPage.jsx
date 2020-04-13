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
import profe1 from '../static/profe1.png'
import profe1_1 from '../static/profe1_1.png'
import profe3 from '../static/profe3.png'
import profec from '../static/profec.png'
import profe4 from '../static/profe4.png'
import profe5 from '../static/profe5.png'
import profe6 from '../static/profe6.png'
import profe7 from '../static/profe7.png'
import profe8 from '../static/profe8.png'
import profe9 from '../static/profe9.png'
import profe10 from '../static/profe10.png'
import alumne1 from '../static/alumne1.png'
import alumne2 from '../static/alumne2.png'
import alumne3 from '../static/alumne3.png'
import dev1 from '../static/dev.png'
import dev2 from '../static/dev2.png'
import dev3 from '../static/dev3.png'
import dev4 from '../static/dev4.png'
import gif1 from '../static/gif1.gif'
import gif2 from '../static/gif2.gif'
import gif3 from '../static/gif3.gif'
import CustomDotGroup from './CustomDotGroup'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

const steps = {
  activity: [
    {src:profe1, text:'Entra a Splitt.com. Una vegada dins, introdueix un nom de classe, escull el nombre de grups en què vols dividir-la i si t’agrada alguna de les activitats predeterminades afegeix-la. '},
    {src:profe1_1, text:'Si vols crear una activitat diferent, fes clic al signe de suma que es troba al costat d’activitats. '},
    {src:profe3, text:'Introdueix un nom per l’activitat, escull de quin tipus vols que sigui i si vols que hi hagi un límit de temps.  '},
	],
  classrom: [
    {src:profec, text:'Clica el botó que diu “crea una presentació”'},
    {src:profe4, text:'Una vegada dins la presentació és indispensable que cliquis el botó “save deck”. '},
    {src:profe5, text:'Ara podràs editar la presentació afegint explicacions de classe, imatges, vídeos i fins i tot activitats interactives com jocs que puguis trobar a internet. '},
	],
  classrom2: [
    {src:profe6, text:'Clica sobre la icona de play per iniciar la presentació. '},
    {src:profe7, text:'Desplaça el cursor cap a baix, copia el link. '},
    {src:profe8, text:'Comparteix-lo amb els teus alumnes com més t’agradi. '},
    {src:profe9, text:'Quan ells hi hagin accedit, podràs veure els diferents equips. Si arrossegues  els noms amb el cursor podràs reubicar els alumnes. Si fas clic sobre la icona del telèfon entraràs a les trucades de veu i so de cada equip.  '},
    {src:profe10, text:'Quan passis la diapositiva, podràs veure les pantalles de cada equip i com van donant solució a l’activitat proposada. Quan hagin acabat passa a la següent diapositiva per fer l’activitat número 2.  '},
	],
  classrom3: [
    {src:profe8, text:'Accedeix al link que t’ha compartit el/la teu/va mestr@. '},
    {src:alumne1, text:' A la primera pantalla et demanarà un nom d’usuari, introdueix-lo i fes click sobre “save”.'},
    {src:alumne2, text:'Aquí podràs veure a quin equip has estat assignat, qui en forma part i tots els companys de classe. Per comunicar-te amb veu i so amb el teu equip només cal que cilquis sobre l’icona del telèfon. '},
    {src:alumne3, text:'Quan el/la mestr@ ho decideixi començaràs l’activitat '},
	],
  dev: [
  {src:dev1, text:"Vés al repositori de github de splittt/splittt i cerca a Issues els que tenen l'etiqueta nova-activitat"},
  {src:dev2, text:'Crea un nou component de react a la carpeta activities. Aquest serà el que cada alumne veurà'},
  {src:dev3, text:"Has de definir l'objecte d'activitat que tindrà el value que li vulguis rebre per mostrar en pantalla. T'arribarà a activityEvents els nous objectes activitat que ha creat l'usuari, tant si es el que controla com si no."},
  {src:dev4, text:"Assegura't que tot funciona i crea un pull request a github."},
	],
}
const FixedMenuLayout = (props) => {
  const [animated, changeAnimated] = useState(true)
  useEffect(()=>{
    setTimeout(()=>{
      changeAnimated(false)
    }, 9000)
  },props)
  const [ openLightbox, changeStateOpenLightBox] = useState(null)
  const changeOpenLightBox = (value)=>{
    changeStateOpenLightBox(value)
    changePhotoIndex(0)
  }
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
      <Header as='h2' style={{margin:'40px'}}>Tipus d'activitats</Header>
      <CarouselProvider
        naturalSlideHeight={425}
        naturalSlideWidth={900}
        totalSlides={3}
        orientation={'horizontal'}
      >
        <Slider>
          <Slide tag="a" index={0}>
            <img src={gif1} />
          </Slide>
          <Slide tag="a" index={1}>
            <img src={gif2} />
          </Slide>
          <Slide tag="a" index={2}>
            <img src={gif3} />
          </Slide>
        </Slider>
        <CustomDotGroup slides={3} />
      </CarouselProvider>
    </Container>
    <hr></hr>
    <Container>
      <Header as='h2' style={{margin:'40px'}}>Guia d'ús</Header>
      <Grid columns={3} style={{marginBottom:'40px'}}>
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
            mainSrc={images[photoIndex].src}
            nextSrc={images[(photoIndex + 1) % images.length].src}
            prevSrc={images[(photoIndex + images.length - 1) % images.length].src}
            imageCaption={(photoIndex+1)+". "+images[photoIndex].text}
            onCloseRequest={() => changeOpenLightBox(null)}
            onMovePrevRequest={() =>
              changePhotoIndex((photoIndex + images.length - 1) % images.length)
            }
            onMoveNextRequest={() =>
              changePhotoIndex((photoIndex + 1) % images.length)
            }
          />}

    
  </div>
}

export default FixedMenuLayout