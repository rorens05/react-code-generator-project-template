import React, { useState, useEffect} from 'react'
import ClassesAPI from '../../api/ClassesAPI'
import AccordionConference from './components/Links/AccordionConference'
import AccordionLinks from './components/Links/AccordionLinks'
import AccordionVideos from './components/Links/AccordionVideos'
import HeaderLinks from './components/Links/HeaderLinks'
import { useParams } from 'react-router'
import AccordionEdit from './components/Links/AccordionEdit'


function ClassLinks({classInfo}) {
  const [openEditModal, setOpenEditModal] = useState(false)
  const [conference, setConference] = useState([])
  const [videos, setVidoes] = useState([])
  const [links, setLinks] = useState([])
  const [editLinks, setEditLinks] = useState()
  const {id} = useParams()
  
  
  const getConfe = async() => {
    let typeId = '1'
    let response = await new ClassesAPI().getLink(id, typeId)
    if(response.ok){
      setConference(response.data)
    }else{
      alert("Something went wrong while fetching all Conference")
    }
  }

  useEffect(() => {
    getConfe()
  }, [])

  const getVideos = async() => {
    let typeId = '2'
    let response = await new ClassesAPI().getLink(id, typeId)
    if(response.ok){
      setVidoes(response.data)
    }else{
      alert("Something went wrong while fetching all Conference")
    }
  }

  useEffect(() => {
    getVideos()
  }, [])

  const getLinks = async() => {
    let typeId = '3'
    let response = await new ClassesAPI().getLink(id, typeId)
    if(response.ok){
      setLinks(response.data)
    }else{
      alert("Something went wrong while fetching all Conference")
    }
  }

  useEffect(() => {
    getLinks()
  }, [])

  return (
   <>
    <HeaderLinks getConfe={getConfe} getVideos={getVideos} getLinks={getLinks}  />
    <div style={{paddingBottom:'10px'}}>
      <AccordionConference getConfe={getConfe} conference={conference} setOpenEditModal={setOpenEditModal}  setEditLinks={setEditLinks} />
    </div>
    <div style={{paddingBottom:'10px'}}>
      <AccordionVideos getVideos={getVideos} videos={videos} setOpenEditModal={setOpenEditModal}  setEditLinks={setEditLinks}   />
    </div>
    <div style={{paddingBottom:'10px'}}>
      <AccordionLinks getLinks={getLinks} links={links} setOpenEditModal={setOpenEditModal}  setEditLinks={setEditLinks}  />
    </div>
    <AccordionEdit getConfe={getConfe} getVideos={getVideos} getLinks={getLinks}  editLinks={editLinks} openEditModal={openEditModal} setOpenEditModal={setOpenEditModal} />
   </>
  )
}
export default ClassLinks