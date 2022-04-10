import React, {useState, useEffect} from 'react'
import {Row, Col, Accordion, Button} from 'react-bootstrap'
import CoursesAPI from '../../../api/CoursesAPI'
import { useParams } from "react-router";
function SchoolCourseFiles() {
  const [modules, setModules] = useState([])
  const [moduleId, setModuleId] = useState(null)
  const [discussioninfo, setDiscussionInfo] = useState([])
  const [viewDiscussion, setViewDiscussion] = useState(false)
  const [discussionName, setDiscussionName] = useState('')
  const [discussionIntruction, setdiscussionIntruction] = useState('')
  const [moduleName, setModuleName] = useState('')
  const {id} = useParams()
  
  const getCourseUnit = async () =>{
    let response = await new CoursesAPI().getCourseUnit(id)
      if(response.ok){
        setModules(response.data)
      }else{
        alert(response.data.errorMessage)
      }
  }

  useEffect(() => {
    getCourseUnit()
  }, [])

  const getFiles = async (e, id) =>{
    let response = await new CoursesAPI().getFiles(id)
    if(response.ok){
      setDiscussionInfo(response.data)
      setModuleId(id)
    }else{
      alert(response.data.errorMessage)
    }
  }

  useEffect(() => {
    if(moduleId !== null){
      return(
        getFiles() 
      )
    }  
  }, [])

  return (
        <div className='rounded-white-container'>
      <div className="col-md-10 pages-header"><p className='title-header'>Files </p>
			</div>
      <Accordion>
        {modules.map((item, index) => {
          return(
            <Accordion.Item eventKey={index} onClick={(e) => getFiles(e, item?.id)}>
            <Accordion.Header><div style={{fontSize:'20px'}}>{item.moduleName}</div></Accordion.Header>
            <Accordion.Body>
              {discussioninfo.map(item =>{
                return(
                  <>
                    <div className='title-exam' >
                      <Row>
                        <Col >
                         <a target="_blank" style={{color:'#EE9337', textDecoration:'none'}}  href={item?.path_Base}> {item?.fileName}</a>
                        </Col>
                      </Row>
                     
                    </div>
                  </>
                )
              })}
            </Accordion.Body>
          </Accordion.Item>
          )
        })}
     </Accordion>
    </div>
  )
}

export default SchoolCourseFiles