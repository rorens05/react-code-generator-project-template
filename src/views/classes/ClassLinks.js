import React from 'react'
import {Row, Col} from 'react-bootstrap'
import AccordionConference from './components/Links/AccordionConference'
import AccordionLinks from './components/Links/AccordionLinks'
import AccordionVideos from './components/Links/AccordionVideos'
import HeaderLinks from './components/Links/HeaderLinks'

function ClassLinks() {
  return (
   <>
    <HeaderLinks/>
    <div style={{paddingBottom:'10px'}}>
      <AccordionConference />
    </div>
    <div style={{paddingBottom:'10px'}}>
      <AccordionVideos />
    </div>
    <div style={{paddingBottom:'10px'}}>
      <AccordionLinks />
    </div>
   </>
  )
}
export default ClassLinks