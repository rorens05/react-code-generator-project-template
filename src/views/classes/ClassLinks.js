import React from 'react'
import {Row, Col} from 'react-bootstrap'
import AccordionConference from './components/AccordionConference'
import AccordionLinks from './components/AccordionLinks'
import AccordionVideos from './components/AccordionVideos'
import HeaderLinks from './components/HeaderLinks'

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